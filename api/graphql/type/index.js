const { mergeTypeDefs } = require('@graphql-tools/merge');
const FoodType = require("./food")
const UserType = require("./user")
const MerchantType = require("./merchant")
const RestaurantType = require("./restaurant")
const DisType = require("./dishType")
const OrderType = require("./order")

const types = [
    FoodType,
    UserType,
    MerchantType,
    RestaurantType,
    DisType,
    OrderType
]
module.exports = mergeTypeDefs(types)