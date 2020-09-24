const mongose = require("mongoose")

const UserSchema = new mongose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String, 
        required: true, 
    },
    role: {
        type: String,
        enum: ['admin', 'customer']
    },
    password: {
        type: String,
        required: true,
    },
    password_confirm : {
        type: String,
        required: true,
    }
})

module.exports = mongose.model("User", UserSchema)