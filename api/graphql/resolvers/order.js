const Order = require("../../../models/Oder")
const User = require("../../../models/User")
const Restaurant = require("../../../models/Restaurant")
const NotificationOder = require("../../../models/notificationOder")
const Device = require("../../../models/device.model")
const Food = require("../../../models/Food")
const API = require("../../../services/notification")

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
        orderById: async (_, { orderId }) => {
            try {
                const order = await Order.findById(orderId)
                    .populate('items.food')
                    .populate('user')
                    .populate('restaurant')
                    .exec()
                return {
                    ...order._doc,
                    _id: order._id
                }
            } catch (error) {
                throw error
            }
        }
    },
    Mutation: {
        createOrder: async (_, { orderInput }) => {
            try {
                const newOrder = new Order({
                    ...orderInput,
                    subtotal: +orderInput.subtotal,
                    total: +orderInput.total,
                })
                await newOrder.save()
                const userOrder = await User.findById(newOrder.user)
                if(!userOrder) throw new Error("Not found user for ordrer")
                userOrder.orders.push(newOrder)
                await userOrder.save()
                const resofOrder = await Restaurant.findByIdAndUpdate(
                    newOrder.restaurant, {$inc: {numOrders: 1}}
                )
                const newNotice = new NotificationOder({
                    title: "New order",
                    order: newOrder,
                    receiver: resofOrder._doc.merchant
                })
                await newNotice.save()
                const devices = await Device.find({ merchant: resofOrder.merchant})
                for (const el of devices) {
                    let { fcmTokenMerchant } = el;
                    console.log(fcmTokenMerchant);
                    API.sendNotification(
                      { ...newNotice._doc, orderId: newOrder._id },
                      'rest',
                      fcmTokenMerchant,
                      resofOrder._id,
                      res => console.log(res),
                      err => { throw err });
                };
                // await User.findByIdAndUpdate({_id: userId}, {
                //     $push: {
                //         "orders": newOrder._id
                //     }
                // })
                const foodArr = orderInput.items.map(item => {
                    return item.food
                  });
                await Food.updateMany({ _id: { $in: foodArr } }, { $inc: { total_order: 1 } })
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
        
    },
    Item: {
        food: async ({ food }) => {
          return await Food.findById(food);
        }
    },
    Order: {
        restaurant: async ({ restaurant }) => {
            return await Restaurant.findById(restaurant).exec()
        },
        user: async ({ user }) => {
            return await User.findById(user);
        }
    }
}