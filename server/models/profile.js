import mongoose from "mongoose";

/**
 * Todo: What information should be stored in the profile?
 */

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});