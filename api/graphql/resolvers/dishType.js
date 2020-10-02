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
        }
    },
    Mutation: {
        createDishType: async (_,{dishTypeInput}) => {
            const resId = await Restaurant.findById(dishTypeInput.restaurant).exec()
            if(!resId) throw new Error("Restaurant is not exist")
            const newDishType = new DishType({
                ...dishTypeInput
            })

            await newDishType.save()
            return {
                ...newDishType._doc,
                id: newDishType._id
            }
        }
    }
}