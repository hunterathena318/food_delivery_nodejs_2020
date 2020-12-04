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
    type Query {
        orders: [Order!]
        orderByRestaurant(restaurantId: ID!): [Order!]
        orderByUser(userId: ID!): [Order!]
        orderById(orderId: ID!): Order!
    }
    type Mutation {
        createOrders(inputOrder: InputOrder!): Order!
        updateOrder(orderId: ID!, status: String!): Order!
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


