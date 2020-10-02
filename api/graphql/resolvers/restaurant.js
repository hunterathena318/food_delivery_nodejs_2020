const Restaurant = require("../../../models/Restaurant")
const Merchant = require("../../../models/merchant")

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
    }
}