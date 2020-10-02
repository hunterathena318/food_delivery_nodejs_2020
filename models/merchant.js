const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schemaMerchant = new Schema({
    fname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createRestaurant: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant"
    }

})

module.exports = mongoose.model("Merchant", schemaMerchant)