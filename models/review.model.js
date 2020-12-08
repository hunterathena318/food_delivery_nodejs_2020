const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  star: Number,
  description: String,
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Oder'
  }
})

module.exports = mongoose.model('Review', reviewSchema);