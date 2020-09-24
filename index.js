const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const router = require("./routes")
const expressValidator = require('express-validator')
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)

const app = express()
const db = mongoose.connection;
require("dotenv").config()

app.use(bodyParser.json())
app.use(expressValidator())

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
const PORT = 3000
app.listen(PORT, () => {
  console.log(`app is listening to PORT ${PORT}`)
})