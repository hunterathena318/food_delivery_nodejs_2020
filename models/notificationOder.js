const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schemaNofication =  new Schema({
    reciver: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: "Order"
    },
    hasRead: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model("Notification", schemaNofication)