const Restaurant = require("../../../models/Restaurant")
const Food = require("../../../models/Food")
const Merchant = require("../../../models/merchant")
const DishType = require("../../../models/dishType")
const Order = require("../../../models/Oder")
const { mergeArr } = require("../../../helpers/array")
const dateToString = require("../../../helpers/date")
const getDistanceFromLatLonInKm  = require("../../../helpers/distance")

module.exports = {
  Query: {
      getallRestaurant: async () => {
          try {
              const restaurants = await Restaurant.find().exec()
              return restaurants.map(restaurant => {
                  return {
                      ...restaurant._doc
                  }
              })
          } catch (error) {
              throw error
          }
      },
      restaurants: async (_, { userLocation }) => {
        const { lat, long } = userLocation;
        try {
          const restaurants = await Restaurant.find();
          return restaurants.map(item => {
            return {
              ...item._doc,
              _id: item._id,
              distance: getDistanceFromLatLonInKm(
                lat,
                long,
                item._doc.position.lat,
                item._doc.position.long
              ),
            }
          })
        } catch (error) {
          throw error
        }
      },
      restaurantById: async (_, { restaurantId }) => {
        try {
          const restaurant = await Restaurant
            .findById(restaurantId)
            .populate('menu_info.foods')         // const rest = await Restaurant.aggregate([{ $match: { _id: ObjectId(restaurantId) } }])
          // const rest2 = await Restaurant.populate(rest, { path: 'menu_info', populate: { path: 'foods' } })
          // console.log(rest2[0].menu_info[0].foods);
          return {
            ...restaurant._doc,
            _id: restaurant._id,
            createdAt: dateToString(restaurant._doc.createdAt),
            updatedAt: dateToString(restaurant._doc.updatedAt)
          }
        } catch (error) {
          throw error
        }
      },
      searchRestaurant: async (_,{query}) => {
        try {
          // console.log(query, "query")
          const restaurants = await Restaurant.aggregate([
            { $match: { $text: { $search: query } } },
            { $sort: { score: { $meta: "textScore" } } },
          ])
          const food = await Food.aggregate([
            {
              $match: { $text: { $search: query } }
            },
            {
              $lookup:
              {
                from: "restaurants",
                localField: "restaurant",
                foreignField: "_id",
                as: "restaurants"
              }
            },
            { $addFields: { score: { $meta: "textScore" } } },
            {
              $group:
              {
                _id: "$restaurants",
                avgScore: { $avg: "$score" }
              }
            },
            { $sort: { avgScore: -1 } },
          ])
          const searchByFood = food.map(item => {
            return {
              ...item._id['0'],
              score: item.avgScore
            }
          })
          const dishType = await DishType.aggregate([
            {
              $match: { $text: { $search: query } }
            },
            {
              $lookup:
              {
                from: "restaurants",
                localField: "restaurant",
                foreignField: "_id",
                as: "restaurants"
              }
            },
            { $addFields: { score: { $meta: "textScore" } } },
            {
              $group:
              {
                _id: "$restaurants",
                avgScore: { $avg: "$score" }
              }
            },
            { $sort: { avgScore: -1 } },
          ])
          const searchByDishType = dishType.map(item => {
            return {
              ...item._id['0'],
              score: item.avgScore
            }
          })
          const mergedArr = mergeArr(restaurants, searchByDishType)
          const result2 = mergeArr(mergedArr, searchByFood)
          return result2.map(item => {
            return {
              ...item
            }
          })
        } catch (error) {
          throw error  
        }
      }
  },
  Mutation: {
    createRestaurant: async(_, {inputRestaurant}) => {
      const { name } = inputRestaurant
      const ex_res = await Restaurant.findOne({name: name}).exec()
      if(ex_res) throw new Error("Restaurant already exist")
      const newRestaunrant = new Restaurant({
          ...inputRestaurant
      })
      await Merchant.findByIdAndUpdate(
          inputRestaurant.merchant,
          {$set: {createRestaurant: newRestaunrant } }
      )
      
      await newRestaunrant.save()
      return {
          ...newRestaunrant._doc,
          _id: newRestaunrant._id
      }
    }
  },
  Restaurant: {
    menu_info: async ({ _id }) => {
      return await DishType.find({ restaurant: _id });
    },
    orders: async ({ _id }) => {
      const orders = await Order.find({ restaurant: _id }).sort({ updatedAt: -1 });
      return orders.map(order => {
        return {
          ...order._doc,
          _id: order._id,
          createdAt: dateToString(order._doc.createdAt),
          updatedAt: dateToString(order._doc.updatedAt)
        }
      })
    }
  }
}