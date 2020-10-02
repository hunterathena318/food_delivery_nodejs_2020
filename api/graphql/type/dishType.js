module.exports = `
    type DishType {
        _id: ID!
        name: String!
        food: [Food!]
        restaurant: ID!
    }

    type Query {
        getAllDishType: [DishType]!
    }
    type Mutation {
        createDishType(dishTypeInput: dishTypeInput!): DishType!
    }

    input dishTypeInput {
        restaurant: ID!
        name: String!
        food: ID
    }
`