const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schemaMerchant = new Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    phone: {
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
    createdRestaurants: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant"
    }

})

module.exports = mongoose.model("Merchant", schemaMerchant)