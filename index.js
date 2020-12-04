const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const router = require("./routes")
const expressValidator = require('express-validator')
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { ApolloServer, gql } = require("apollo-server-express")
const schema = require("./api/graphql")

const app = express()
const db = mongoose.connection;
require("dotenv").config()

let users = [
  {
  id: '1',
  name: 'Nara-1',
  email: 'nara-1@jang',
  password: '123456',
  },
  {
    id: '2',
    name: 'Nar213123a-1',
    email: 'nara-1@jang',
    password: '123456'
  },
   {
    id: '3',
    name: 'Narasdasdasdasda-1',
    email: 'nara-1@jang',
    password: '123456'
   }
]

const typeDefs  = gql`
  type User {
    id: ID!,
    name: String!,
    email: String!,
    password: String!,
    order: [Order]
  }
  type Order {
    qty: Int!,
    name: String!
  }
  type Query {
    hello: String,
    users: [User],
    userById(userId: ID!): User!
  }
  type Mutation {
    sign_up(name: String!, email: String!, password: String!): User!
  }
`

const resolvers = {
  Query : {
    hello: () => { return "hello"},
    users: () => users,
    userById: () => {return users[1]}
  }
}

const server = new ApolloServer({ schema,  context: ({ req }) => ({ ...req }) });
server.applyMiddleware({ app,  path: '/graphql' });


app.use(bodyParser.json())
app.use(expressValidator())

// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: "true",
  useUnifiedTopology: true
})

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
      mongooseConnection: db
  })
}))

mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  app.use("/", router)
  app.use(expressValidator())
  app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
     error: {
     status: error.status || 500,
     message: error.message || "server error",
    },
   })
  })
  console.log("mongoose is connected")
})
const PORT = 8080
app.listen(PORT, () => {  
  console.log(`app is listening to PORT ${PORT}`)
})