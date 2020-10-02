module.exports = `
    type Order {
        _id: ID!
        user: User!
        items: [Items!]
        delivery_position: Position!
    }

    type Items {
        _id: ID
        food: Food!
        qty: Int!
    }
    type Mutation {
        createOrders(inputOrder: InputOrder!): Order!
    }
    input ItemInput {
        qty: Int!
        food: ID!
    }

    input InputOrder {
        userId: ID!
        items: [ItemInput]!
        delivery_positon: PositionInput!
        restaurant: ID!
    }
`