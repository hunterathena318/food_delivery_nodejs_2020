const { mergeTypeDefs } = require('@graphql-tools/merge');
const FoodType = require("./food")
const UserType = require("./user")
const MerchantType = require("./merchant")
const RestaurantType = require("./restaurant")
const DisType = require("./dishType")
const OrderType = require("./order")
const NotificationOrderType = require("./notificationOrder.type")
const DeviceType = require("./device.type")

const types = [
    FoodType,
    UserType,
    MerchantType,
    RestaurantType,
    DisType,
    OrderType,
    NotificationOrderType,
    DeviceType
]
module.exports = mergeTypeDefs(types)