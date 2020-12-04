const Order = require("../../../models/Oder")
const User = require("../../../models/User")
const Restaurant = require("../../../models/Restaurant")
const NotificationOder = require("../../../models/notificationOder")

module.exports = {
    Query: {
        orders: async () => {
            try {
                const orders = await Order.find()
                    .populate('items.food')
                    .populate('user')
                    .populate('restaurant')
                    .exec()
                console.log("orders", orders[0].items)  
                return orders.map(order => {
                    return {
                        ...order._doc,
                        _id: order._id
                    }
                })                 
            } catch (error) {
                throw error
            }
        },
        orderByRestaurant: async (_,{restaurantId}) => {
            try {
                const order = await Order.find({restaurant: restaurantId })
                    .populate('items.food')
                    .populate('user')
                    .populate('restaurant')
                    .exec()
                return order.map(item => ({
                    ...item._doc
                }))
            } catch (error) {
                throw error
            }
        },
        orderByUser: async (_,{userId}) => {
            try {
                const order = await Order.find({user: userId})
                    .populate('items.food')
                    .populate('user')
                    .populate('restaurant')
                    .exec()
                return order.map(item => ({
                    ...item._doc
                }))
            } catch (error) {
                throw error
            }
        },
        orderById: async (_, {orderId }) => {
            try {
                const order = await Order.findById(orderId)
                    .populate('items.food')
                    .populate('user')
                    .populate('restaurant')
                    .exec()
                return {
                    ...order._doc
                }
            } catch (error) {
                throw error
            }
        }
    },
    Mutation: {
        createOrders: async (_, { inputOrder }) => {
            try {
                let { userId } = inputOrder
                const userOrder = await User.findById(userId)
                if(!userOrder) throw new Error("Not found user for ordrer")
                const newOrder = new Order({
                    ...inputOrder,
                })
                await newOrder.save()
                const resofOrder = await Restaurant.findByIdAndUpdate(
                    newOrder.restaurant, {$inc: {numOrders: 1}}
                )
                const newNotice = new NotificationOder({
                    title: "New order",
                    order: newOrder,
                    receiver: resofOrder._doc.merchant
                })
                await newNotice.save()
                await User.findByIdAndUpdate({_id: userId}, {
                    $push: {
                        "orders": newOrder._id
                    }
                })
                return {
                    ...newOrder._doc,
                    _id: newOrder._id
                }
            } catch (error) {
                throw error
            }
        },
        updateOrder: async (_,{ orderId, status}) => {
            try {
                let order = await Order.findById(orderId)
                const orderSt =  order.status
                if (orderSt === 'pending' || orderSt === 'cancelled') throw new Error("Update fail")
                order.status = status
                const resOfOrder = await Restaurant.findById(order.restaurant)
                const user = await User.findByIdAndUpdate(order.user, {$inc: {
                    numNotifications: 1
                }})
                const newNotice = new NotificationOder({
                    title: `Your order has been ${status}`,
                    order,
                    receiver: user
                })
                await newNotice.save()
                return {
                    ...order._doc
                }
            } catch (error) {
                
            }
        }
        
    }
}