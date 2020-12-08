const mongose = require("mongoose")

const UserSchema = new mongose.Schema({
    email: {
        type: String,
        required: true,
    },
    bookmarks: [
      {
        type: mongose.Schema.Types.ObjectId,
        ref: 'Restaurant'
      }
    ],
    fName: {
        type: String, 
        required: true, 
    },
    lName: {
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
    confirmPassword : {
        type: String,
        required: true,
    },
    orders: [
        {
            type: mongose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
    phone: {
      type: String,
      required: true
    },
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
    numNotifications: {
        type: Number,
        default: 0
    },
    payment: {
      type: [
        {
          paymentType: {
            type: String,
            required: true
          },
          detail: {
            type: String,
            required: true
          }
        }
      ],
      default: [
        {
          paymentType: 'cash',
          detail: 'Payment on delivery'
        }
      ]
    },
}, {timestamps: true})

module.exports = mongose.model("User", UserSchema)