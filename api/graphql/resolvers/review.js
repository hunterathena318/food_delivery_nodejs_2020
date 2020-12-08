const Order = require('../../../models/Oder')
const User = require('../../../models/User')

module.exports = {
  Query: {
    reviewsByRestaurant: async (_, { restaurantId }) => {
      try {
        const ordersByRestaurant = await Order
          .find({ restaurant: restaurantId, "review.star": { $ne: null } });
        return ordersByRestaurant.map(order => {
          return {
            ...order._doc,
            star: order._doc.review.star,
            description: order._doc.review.description,
          }
        });
      } catch (error) {
        throw error
      }
    }
  },
  Review: {
    user: async ({user}) => {
      return await User.findById(user);
    }
  }
}