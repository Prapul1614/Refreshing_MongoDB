import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    Comment: {
        type: String, required: true
    }
}, {timestamps: true});

export const Comment = mongoose.model("Comment", CommentSchema)