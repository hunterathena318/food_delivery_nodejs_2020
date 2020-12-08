const { mergeTypeDefs } = require('@graphql-tools/merge');
const FoodType = require("./food")
const UserType = require("./user")
const MerchantType = require("./merchant")
const RestaurantType = require("./restaurant")
const DisType = require("./dishType")
const OrderType = require("./order")
const NotificationOrderType = require("./notificationOrder.type")
const DeviceType = require("./device.type")
const ReviewType = require("./review.type")

const types = [
    FoodType,
    UserType,
    MerchantType,
    RestaurantType,
    DisType,
    OrderType,
    NotificationOrderType,
    DeviceType,
    ReviewType
]
module.exports = mergeTypeDefs(types)