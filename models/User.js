const mongose = require("mongoose")

const UserSchema = new mongose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String, 
        required: true, 
    },
    role: {
        type: String,
        enum: ['admin', 'customer']
    },
    password: {
        type: String,
        required: true,
    },
    password_confirm : {
        type: String,
        required: true,
    },
    orders: [
        {
            type: mongose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
    position: [
        {
          address: {
            type: String,
            required: true
          },
          lat: {
            type: Number,
            required: true
          },
          long: {
            type: Number,
            required: true
          }
        }
      ],
    numNotification: {
        type: Number,
        default: 0
    }
})

module.exports = mongose.model("User", UserSchema)