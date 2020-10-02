const mongoose = require("mongoose")
const Schema =  mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const reviewSchema = new schema({
    user: {
        type: ObjectId,
        ref: "User" 
    },
    content: String,
    order: {
        type: ObjectId,
        ref: "Order"
    }
})

module.exports = mongoose.model("Review", reviewSchema)