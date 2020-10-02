const { ERROR_SYMBOL } = require("graphql-tools")
const Order = require("../../../models/Oder")
const User = require("../../../models/User")

module.exports = {
    Mutation: {
        createOrders: async (_, {inputOrder}) => {
            let { userId } = inputOrder
            const userOrder = await User.findById(userId)
            if(!userOrder) throw new Error("Not found user for ordrer")
            const newOrder = new Order({
                ...inputOrder,
            })
            await newOrder.save()
            await User.findByIdAndUpdate({_id: userId}, {
                $push: {
                    "orders": newOrder._id
                }
            })
            return {
                ...newOrder._doc,
                _id: newOrder._id
            }
        }
    }
}