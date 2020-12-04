const mongoose = require("mongoose");
const Schema = mongoose.Schema

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    default: false
  },
  img_uri: {type: String},
  price: {
    unit: {
      type: String,
      required: true,
      enum: ['đ','USD']
    },
    value: {
      type: Number,
      required: true
    }
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  dishType: {
    type: Schema.Types.ObjectId,
    ref: "DishType"
  }
});

module.exports = mongoose.model("Food", schema);
