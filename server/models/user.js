import mongoose from 'mongoose';
// store also comments of the post (different model to be implemented)

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "user must have a name"]
        },
        email: {
            type: String,
            required: [true, "user must have an email"],
            unique: [true, "user email must be unique"]
        },
        password: {
            type: String,
            required: [true, "user must have a password"]
        },
        avatar: {                   
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }                   
    },
    {collection: 'user'}
)

const User = mongoose.model('User', userSchema);

export default User;