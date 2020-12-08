const mongoose = require("mongoose")
const Schema = mongoose.Schema

const SchemaRes = new Schema({
    name: {
        type: String
    },
    cuisines: {
        type: String,
        // required: true
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
    menu_info: [
        {
          type: Schema.Types.ObjectId,
          ref: 'DishType'
        }
    ],
    rating: {
        avg: {
          type: Number,
          default: 0
        },
        total_review: {
          type: Number,
          default: 0
        }
    },
    img_url: {
        type: String,
        default: 'https://res.cloudinary.com/ndhienedu/image/upload/v1576662631/brooke-lark-4J059aGa5s4-unsplash_nqhc4k.jpg'
    },
    bookmarks: {
        type: Number,
        default: 0
    },
    numOrders: {
        type: Number,
        default: 0
    }
}, {timestamps: true})
mongoose.set('useCreateIndex', true);
SchemaRes.index(
    {
        'name': 'text',
        'position.address': 'text'
        },
        {
        weights:
        {
            name: 10,
            'position.address': 5
        },
        name: "restaurant"
    }
)
module.exports = mongoose.model("Restaurant", SchemaRes)