const mongoose = require("mongoose")
const Schema = mongoose.Schema

const SchemaRes = new Schema({
    name: {
        type: String
    },
    position: {
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
    },
    is_open: {
        type: Boolean
    },
    merchant: {
        type: Schema.Types.ObjectId,
        ref: "Merchant"
    },
    menuInfo: [
        {
            type: Schema.Types.ObjectId,
            ref: "DishType"
        }
    ],
    numOrders: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Restaurant", SchemaRes)