import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const LikeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    post: {
        type: Schema.Types.ObjectId, ref: "Post"
    }
}, {timestamps: true});

export const Like = mongoose.model("Like", LikeSchema)