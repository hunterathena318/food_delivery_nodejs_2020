module.exports = `
    type User {
        _id: ID!
        fName: String!
        lName: String!
        password: String
        email: String!
        position: [Position!]
        payment: [Payment!]!
        phone: String!
        likes: [Food!]
        orders: [Order!]
        bookmarks: [Restaurant!]
        device: [Device!]
        numNotifications: Int!
    }
    type Authdata {
        userId: ID!,
        token: String!,
        refreshToken: String!
    }
    type Payment{
        _id: ID!
        paymentType: String!
        detail: String!
    }
    type Query {
        users: [User!]
        userById(id: ID!): User!
    }
    type Mutation {
        createUser(userInput: UserInput!): User!
        login(loginInput: LoginInput!): Authdata!
        updateUser(userId: ID!, updateValue: UpdateUserInput!): User!
    }
    type Position{
        _id: ID!
        address: String!
        lat: Float!
        long: Float!
    }
    type PositionInput {
        address: String!
        lat: Float!
        long: Float!
    }

    input UpdateUserInput{
        fName: String
        lName: String
        numNotification: Int
        position: PositionInput
        email: String
    }
    input UserInput {
        fName: String!
        lName: String!
        phone: String!
        email: String!
        password: String!
        confirmPassword: String!
        position: PositionInput!
    }

    input LoginInput {
        email: String!
        password: String!
        uniqueId: String!
        fcmTokenUser: String!
    }
     
`