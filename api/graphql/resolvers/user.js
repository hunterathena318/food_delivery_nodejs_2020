const User = require("../../../models/User")
const bcrypt = require("bcrypt")
const { generateToken } = require("../../../common/middleware/auth")
const jwt = require("jsonwebtoken")

const refreshTokens = []

module.exports = {
    Query: {
        users: async () => {
            try {
                let users = await User.find().exec()
                return users.map(user => {
                  return { 
                   ...user._doc
                  }
                })
              } catch (err) {
                throw err
              }
        },
        userById: async (_,{id}) => {
          try {
            let user = await User.findOne({_id: id}).exec()
            return {
              email: user.email,
              username: user.username
            }
          } catch (error) {
            throw error
          }
        }
    },  

    Mutation: {
      createUser: async(_,{user}) => {
       try {
          let { email, username, password, password_confirm } = user
          let ex_user = await User.findOne({email: email}).exec()
          if(ex_user) {
            throw new Error("Already user")
          }
          if (password === password_confirm) {
            password = await bcrypt.hash(password, 10)
          }  else {
            throw new Error("Password not equal password_confirm")
          }
          let newUser = new User({
            ...user,
            password: password,
            password_confirm: password,
            role: 'customer'
          })
          await newUser.save()
          return newUser
       } catch (error) {
         throw error
       }
      },
      login: async (_, {userInput}) => {
        try {
          const user = await User.findOne({email: userInput.email}).exec()
          const result = await bcrypt.compare(userInput.password, user.password )
          if(result) {
            const token = generateToken(user)
              return {
                id: user._id,
                token: token
              }
          } else {
            throw new Error("Password is not correcr")
          }
        } catch (error) {
          throw error
        }
      }
    }
}












