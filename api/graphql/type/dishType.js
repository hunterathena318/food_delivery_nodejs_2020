module.exports = `
    type DishType {
        _id: ID!
        name: String!
        foods: [Food!]
        restaurant: ID!
    }

    type Query {
        getAllDishType: [DishType]!
        menuByRestaurant(restaurantId: ID!): [DishType]!
    }
    type Mutation {
        createDishType(dishTypeInput: dishTypeInput!): DishType!
    }

    input dishTypeInput {
        restaurant: ID!
        name: String!
    }
`