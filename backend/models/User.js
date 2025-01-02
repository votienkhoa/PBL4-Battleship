import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 1000
    }
})

const UserModel = mongoose.model('User', userSchema);

export default UserModel