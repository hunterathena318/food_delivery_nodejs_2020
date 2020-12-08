const mongoose = require("mongoose");
const Schema = mongoose.Schema

const OderSchema = new Schema({
  items: [
    {
      food: {
      type: Schema.Types.ObjectId,
      ref: "Food"
      },
      qty: {
        type: Number
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  delivery_position: {
    address: {
      type: String,
      require: true
    },
    long: {
      type: Number
    },
    lat: {
      type: Number
    } 
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'delivering', 'completed', 'cancelled'],
    default: 'pending'
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant"
  },
  review: {
    star: Number,
    description: String,
  },
  subtotal: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  payment:{
    paymentType:{
      type: String,
      required:true
    },
    detail:{
      type: String,
      required:true
    }
  }
}, {timestamps: true})

module.exports = mongoose.model("Oder", OderSchema);
