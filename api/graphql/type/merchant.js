module.exports = `
    type Merchant {
        fname: String!
        email: String!
        password: String!
        createRestaurant: Restaurant
    }
    type Mutation {
        createMerchant(merchantInput: MerchantInput!): Merchant!
    }

    input MerchantInput {
        fname: String!
        email: String!
        password: String!
    }
`