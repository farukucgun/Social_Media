import mongoose from 'mongoose';
// store also comments of the post (different model to be implemented)

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "link must have a title"]
        },
        image: {
            type: String,
            required: [true, "post must have an image"]
        },
        vote: {
            type: Number,
            default: 0
        },
        user: {                     // I should store the user id later when I have multiple users
            type: String,
            required: [true, "post must have a user"]
        },
        date: {
            type: Date,
            default: Date.now
        }                   
    },
    {collection: 'post'}
)

const Post = mongoose.model('Post', postSchema);

export default Post;