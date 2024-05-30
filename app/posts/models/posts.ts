import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    title: {
        type: String, required: true
    },
    body: {
        type: String
    },
    likes: [{
        type: Schema.Types.ObjectId, ref: "Like"
    }],
    comments: [{
        type: Schema.Types.ObjectId, ref: "Comment"
    }]
}, {timestamps: true})

export const Post = mongoose.model("Post", PostSchema)