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
  delivery_positon: {
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
  }
  

})

module.exports = mongoose.model("Oder", OderSchema);
