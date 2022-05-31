const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
        index: true,
    },
     email:{
        type: String,
        required: true,
        unique: false,
        max: 50,
        index: true,
    },
    password:{
        type: String,
        required: true,
        min: 8,
    },
    isAvatarImageSet:{
        type: Boolean,
        default: false,
    },
    avatarImage:{
        type: String,
        default: "",
    }
})

module.exports=mongoose.model("Users",userSchema);