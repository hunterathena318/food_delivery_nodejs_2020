const DishType = require("../../../models/dishType")
const Food =  require("../../../models/Food") 

module.exports =  {
    Mutation: {
        createFood: async (_,{foodInput}) => {
            try {
                const food = await Food.findOne({name: foodInput.name, restaurant: foodInput.restaurant})
                if(food) throw new Error("This food already existss")
                const newFood = new Food({
                    ...foodInput,
                    price: {
                        ...foodInput.price,
                        value: +foodInput.price.value
                      }
                })
                await newFood.save()
                await DishType.findOneAndUpdate({_id: foodInput.dishType}, {
                    $push: {
                        "foods": newFood
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
    },
    Query: {
        foods: async () => {
            try {
                const foods = await Food.find().exec()
                
                console.log(foods)
                return foods
            } catch (error) {
                throw error
            }
        },
        foodsByRestaurant: async (_,{ restaurantId }) => {
            try {
                const foods = await Food.find({restaurant: restaurantId}).exec()
                console.log(foods)
                return foods
                
            } catch (error) {
                throw error
            }
        }    
    }
}