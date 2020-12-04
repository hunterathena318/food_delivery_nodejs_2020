const DishType = require("../../../models/dishType")
const Restaurant = require("../../../models/Restaurant")

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
                _id: item.id
              }
            })
          }
    },
    Mutation: {
        createDishType: async (_,{dishTypeInput}) => {
            const restaurant = await Restaurant.findById(dishTypeInput.restaurant).exec()
            if(!restaurant) throw new Error("Restaurant is not exist")
            const newDishType = new DishType({
                ...dishTypeInput
            })

            await newDishType.save()
            restaurant.menuInfo.push(newDishType)
            restaurant.save()
            return {
                ...newDishType._doc,
                id: newDishType._id
            }
        }
    }
}