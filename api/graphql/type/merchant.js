module.exports = `
    type Merchant {
        fName: String!
        lName: String!
        phone: String!
        email: String!
        password: String!
        createdRestaurants: Restaurant
    }
    type AuthMerchantData{
        merchantId: ID!
        fName: String!
        lName: String!
        authToken: String!
        tokenExpiration: Int!
    }
    type Mutation {
        createMerchant(merchantInput: MerchantInput!): Merchant!
        merchantLogin(loginInput: MerchantLoginInput!): AuthMerchantData!
    }

    input MerchantLoginInput{
        email: String!
        password: String!
        uniqueId: String!
        fcmTokenMerchant: String!
    }

    input MerchantInput {
        fname: String!
        email: String!
        password: String!
    }
`