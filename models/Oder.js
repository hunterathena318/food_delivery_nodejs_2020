const mongoose = require("mongoose");
const Schema = mongoose.Schema

const OderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
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
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant"
  }
  

})

module.exports = mongoose.model("Oder", OderSchema);
