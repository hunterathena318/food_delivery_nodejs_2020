const NotificationOrder = require('../../../models/notificationOder')
const User = require('../../../models/User')
const Restaurant = require('../../../models/Restaurant')
const Order = require('../../../models/Oder')
const dateToString = require('../../../helpers/date')

module.exports = {
  Query: {
    notificationByUser: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) throw new Error('User do not exist');
        const notifications = await NotificationOrder.find({ receiver: userId }).sort({ createdAt: -1 })
        return notifications.map(item => {
          return {
            ...item._doc,
            _id: item._id,
            createdAt: dateToString(item._doc.createdAt)
          };
        });
      }
      catch (error) {
        throw error
      }
    },
    notificationByRest: async (_, { restId }) => {
      try {
        const restaurant = await Restaurant.findById(restId);
        if (!restaurant) throw new Error('Restaurant do not exist');
        const notifications = await NotificationOrder.find({ restaurant: restId });
        return notifications.map(item => {
          return {
            ...item._doc,
            _id: item._id
          };
        });
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    markAsRead: async (_, { notificationId }) => {
      try {
        const notification = await NotificationOrder
          .findByIdAndUpdate(notificationId, { $set: { hasRead: true } }, { new: true });
        return {
          ...notification._doc,
          _id: notification._id
        }
      } catch (error) {
        throw error
      }
    },
    deleteNoti: async (_, { notificationId }) => {
      try {
        const noticeHasDelete = await NotificationOrder.findByIdAndDelete(notificationId)
        return {
          ...noticeHasDelete._doc,
          _id: noticeHasDelete._id,
        }
      } catch (error) {
        throw error
      }
    }
  },
  NotificationOrder: {
    order: async ({ order }) => {
      try {
        return await Order.findById(order);
      } catch (error) {
        throw error
      }
    }
  }
}