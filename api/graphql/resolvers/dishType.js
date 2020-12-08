const DishType = require("../../../models/dishType")
const Restaurant = require("../../../models/Restaurant")
const Food = require("../../../models/Food")

module.exports = {
    Query: {
        getAllDishType: async () => {
            const dishTypes = await DishType.find().exec()
            console.log(dishTypes);
            return dishTypes.map(dishType => {
                return {
                    ...dishType._doc
                }
            })
        },
        menuByRestaurant: async (_, { restaurantId }) => {
            const menu = await DishType.find({ restaurant: restaurantId });
            return menu.map(item => {
              return {
                ...item._doc,
                _id: item._id              }
            })
          }
    },
    Mutation: {
        createDishType: async (_,{ dishTypeInput }) => {
            try {
                const restaurant = await Restaurant.findById(dishTypeInput.restaurant).exec()
                if(!restaurant) throw new Error("Restaurant is not exist")
                const newDishType = new DishType({
                    name: dishTypeInput.name,
                    restaurant: dishTypeInput.restaurant
                })
                await newDishType.save()
                restaurant.menu_info.push(newDishType)
                await restaurant.save()
                return {
                    ...newDishType._doc,
                    _id: newDishType._id
                }
            } catch (error) {
                throw error
            }
        }
    },
    DishType: {
        foods: async ({ _id }) => {
          return await Food.find({ dishType: _id });
        }
    }
}