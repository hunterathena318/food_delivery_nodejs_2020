module.exports =  `
    type Food {
        _id: ID!,
        name: String!,
        is_active: Boolean!
        img_uri: String,
        price: Price,
        restaurant: Restaurant!,
        dishType: DishType!,
        createdAt: String!
        updatedAt: String!
    }
    type Price{
        unit: String!
        value: Float!
      }
    type Query {
        foods: [Food],
        foodsByRestaurant(restaurantId: ID!): [Food]!
    }

    type Mutation {
        createFood(foodInput: FoodInput!): Food!,
        createOd(input: OdItem ): Item!
    }

    type Item {
        name: String!,
        qty: Int!
    }
    
    type DishType {
        name: String!
    }

    input PriceInput{
        unit: String!
        value: Float!
    }

    input FoodInput{
        name: String!,
        price: PriceInput,
        is_active: Boolean
        img_uri: String
        restaurant: ID!
        dishType: ID!
    }

    input OdItem {
        name: String!,
        qty: Int!
    }
`