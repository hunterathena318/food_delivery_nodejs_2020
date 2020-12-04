module.exports = `
    type User {
        id: ID!,
        email: String!,
        fName: String!,
        lName: String!,
        phone: String!,
        orders: [Order!],
        numNotifications: Int!,
        position: [Position!]
    }
    type Authdata {
        id: ID!,
        token: String!,
        refreshToken: String!
    }
    type Query {
        users: [User!]
        userById(id: ID!): User!
    }
    type Mutation {
        createUser(userInput: userInput!): User!
        login(loginInput: LoginInput!): Authdata!
    }
    type Position{
        _id: ID!
        address: String!
        lat: Float!
        long: Float!
      }


    input userInput {
        email: String!,
        username: String!,
        phone: String!,
        password: String!,
        password_confirm: String!
    }

    input LoginInput {
        email: String!,
        password: String!
    }
     
`