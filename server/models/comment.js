import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "comment must have a user"]
        },
        text: {
            type: String,
            required: [true, "comment must have text"]
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        },
        votes: {
            upvotes: [          // I might put name and avatar here for quick access if I were to use them
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "user"
                    }
                }
            ],
            downvotes: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "user"
                    }
                }
            ]
        }
    },
    {collection: 'comment'}
);

const Comment = mongoose.model("comment", commentSchema);

export default Comment;

