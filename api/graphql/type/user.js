module.exports = `
    type User {
        id: ID!,
        email: String!,
        username: String!,
        password: String!
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
        createUser(user: userInput!): User!
        login(userInput: loginInput!): Authdata!
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
        password: String!,
        password_confirm: String!
    }

    input loginInput {
        email: String!,
        password: String!
    }
     
`