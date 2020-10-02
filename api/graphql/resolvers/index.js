const { mergeResolvers } = require('@graphql-tools/merge');
const FoodResolver = require("./food")
const UserResolver = require("./user")
const MerchantResolver = require("./merchant")
const RestaurantResolver = require("./restaurant")
const DishTypeResolver = require("./dishType")
const OrderResolver = require("./order")

const resolvers = [
    FoodResolver,
    UserResolver,
    MerchantResolver,
    RestaurantResolver,
    DishTypeResolver,
    OrderResolver
]
module.exports = mergeResolvers(resolvers)