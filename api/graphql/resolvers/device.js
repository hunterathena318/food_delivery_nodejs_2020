// const Restaurant = require('../../models/restaurant.model')
// const Food = require('../../models/food.model')
// const DishType = require('../../models/dishType.model')
const Device = require('../../models/device.model')

module.exports = {
  Mutation: {
    clearUserDeviceInfo: async (_, { uniqueId }) => {
      try {
        const deviceHasUpdated = await Device
          .findOneAndUpdate({ uniqueId }, { $set: { fcmTokenUser: '', user: null } }, { new: true });
        return {
          ...deviceHasUpdated._doc,
          _id: deviceHasUpdated._id
        }
      } catch (error) {
        throw error
      }
    },
    clearMerchantDeviceInfo: async (_, { uniqueId }) => {
      try {
        const deviceHasUpdated = await Device
          .findOneAndUpdate({ uniqueId }, { $set: { fcmTokenMerchant: '', merchant: null } }, { new: true })
        return {
          ...deviceHasUpdated._doc,
          _id: deviceHasUpdated.id
        }
      } catch (error) {
        throw error
      }
    }
  }
}