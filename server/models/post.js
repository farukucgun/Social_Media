/**
 * I opted for an embedded document for posts since I need user names and avatars whenever I need the post itself.
 * might want to change this later on
 */

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        user: {                    
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user', 
            required: [true, "post must have a user"]
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        title: {
            type: String,
            required: [true, "post must have a title"]
        },
        image: {
            type: String,
            required: [true, "post must have an image"]
        },
        votes: {                 // I might put name and avatar here for quick access if I were to use them
            upvotes: [          
                {               
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                    }    
                }
            ],
            downvotes: [
                {
                    user: { 
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                    }
                }
            ]
        },   
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'comment'
            }
        ],
        date: {
            type: Date,
            default: Date.now
        }                   
    },
    {collection: 'post'}
)

const Post = mongoose.model('Post', postSchema);

export default Post;