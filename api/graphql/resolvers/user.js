const User = require("../../../models/User")
const bcrypt = require("bcrypt")
const { generateToken } = require("../../../common/middleware/auth")
const jwt = require("jsonwebtoken")

const refreshTokens = []

module.exports = {
    Query: {
        users: async () => {
            try {
              // return await User.find().exec()
                let users = await User.find().exec()
                return users.map(user => {
                  return { 
                   ...user._doc,
                   id: user.id
                  }
                })
              } catch (err) {
                throw err
              }
        },
        userById: async (_,{id}) => {
          try {
            const user = await User.findOne({_id: id}).exec()
            return user
          } catch (error) {
            throw error
          }
        }
    },  

    Mutation: {
      createUser: async(_,{userInput}) => {
       try {
          const { email, password, password_confirm } = userInput
          let hashpass = ''
          const ex_user = await User.findOne({email: email}).exec()
          if(ex_user) {
            throw new Error("Already user")
          }
          if (password === password_confirm) {
            hashpass = await bcrypt.hash(password, 10)
          }  else {
            throw new Error("Password not equal password_confirm")
          }
          const newUser = new User({
            ...userInput,
            password: hashpass,
            password_confirm: hashpass,
            role: 'customer'
          })
          await newUser.save()
          return newUser
       } catch (error) {
         throw error
       }
      },
      login: async (_, {loginInput}) => {
        try {
          const user = await User.findOne({email: loginInput.email}).exec()
          const result = await bcrypt.compare(loginInput.password, user.password )
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












