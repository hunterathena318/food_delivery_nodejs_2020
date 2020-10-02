const DishType = require("../../../models/dishType")
const Food =  require("../../../models/Food") 

module.exports =  {
    Mutation: {
        createFood: async (_,{foodInput}) => {
            try {
                let { dishType } = foodInput
                const food = await Food.findOne({name: foodInput.name, restaurant: foodInput.restaurant})
                if(food) throw new Error("This food already existss")
                const newFood = new Food({
                    ...foodInput,
                })
                await newFood.save()
                await DishType.findOneAndUpdate({_id: dishType}, {
                    $push: {
                        "food": newFood
                    }
                })

                return {
                    ...newFood._doc,
                    _id: newFood._id
                }
            } catch (error) {
                throw error
            }
        },
        createOd: (_,{input}) => {
           return input
        }
    },
    Query: {
        foodsByRestaurant: async () => {
            try {
                const foods = await Food.find().exec()
                return foods.map(food => {
                    return {
                        ...food._doc
                    }
                })
            } catch (error) {
                throw error
            }
        }    
    }
}