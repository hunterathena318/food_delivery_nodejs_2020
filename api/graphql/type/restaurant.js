module.exports = ` 
    type Restaurant {
        _id: String!
        name: String!
        position: Position
        isOpen: Boolean!
        menuInfo: [DishType!]
        numOrder: Int!
    }
    type Query {
        getallRestaurant: [Restaurant]
    }
    type Mutation {
        createRestaurant(inputRestaurant: inputRestaurant!): Restaurant!
    }

    input PositionInput {
        address: String!
        lat: Float!
        long: Float!
      }
    

    input inputRestaurant {
        name: String!
        position: PositionInput!
        merchant: ID!
    }
`