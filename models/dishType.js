const mongoose = require("mongoose")
const Schema = mongoose.Schema

const SchemaDishType = new Schema({
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    food: [
        {
            type: Schema.Types.ObjectId,
            ref: "Food"
        }
    ],
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("DishType", SchemaDishType)