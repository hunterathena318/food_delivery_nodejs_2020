const User = require("../../../models/User")
const Device = require("../../../models/device.model")
const Order = require("../../../models/Oder")
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
          const { email, password, confirmPassword } = userInput
          let hashpass = ''
          const ex_user = await User.findOne({email: email}).exec()
          if(ex_user) {
            throw new Error("Already user")
          }
          if (password === confirmPassword) {
            hashpass = await bcrypt.hash(password, 10)
          }  else {
            throw new Error("Password not equal password_confirm")
          }
          const newUser = new User({
            ...userInput,
            password: hashpass,
            confirmPassword: hashpass,
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
          const { uniqueId, fcmTokenUser } = loginInput
          const user = await User.findOne({email: loginInput.email}).exec()
          const result = await bcrypt.compare(loginInput.password, user.password )
          if(!result) throw new Error("Password is not correct")
          const token = generateToken(user)
          console.log(user, "userrrrrr")
          await Device.findOneAndUpdate(
            { uniqueId },
            { user, fcmTokenUser },
            { new: true, upsert: true }
          )
          return {
            userId: user._id,
            fName: user.fName,
            lName: user.lName,
            token: token,
            tokenExpiration: 2
          }
        } catch (error) {
          throw error
        }
      },
      updateUser: async (_,{ userId, updateValue }) => {
        try {
          const user = await User.findByIdAndUpdate(userId, { $set: { ...updateValue } }, { new: true })
          return {
            ...user._doc,
            _id: user._id
          }
        } catch (error) {
          throw error
        }

      }
    },
    User: {
      orders: async ({ _id }) => {
        return await Order.find({ user: _id })
      }
    }
}












