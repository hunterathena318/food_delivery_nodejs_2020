module.exports = ` 
    type Restaurant {
        _id: ID!
        cuisines: String!
        name: String!
        position: Position!
        menu_info: [DishType!]
        distance: Float
        rating: Rating!
        createdAt: String!
        updatedAt: String!
        img_url: String!
        bookmarks: Int!
        hasBookmarked: Boolean!
        orders: [Order!]
    }
    
    type Rating{
        avg: Float!
        total_review: Int!
    }
    
    type Query {
        getallRestaurant: [Restaurant]
        restaurants(userLocation: LocationInput!): [Restaurant!]
        restaurantById(restaurantId: ID!): Restaurant!
        searchRestaurant(query: String!): [Restaurant!]
    }
    type Mutation {
        createRestaurant(inputRestaurant: RestaurantInput!): Restaurant!
    }

    input LocationInput{
        address: String
        lat: Float!
        long: Float!
    }

    input PositionInput {
        address: String!
        lat: Float!
        long: Float!
    }
    
    input RestaurantInput{
        name: String!
        position: PositionInput!
        cuisines: String!
        merchant: ID!
    }
`