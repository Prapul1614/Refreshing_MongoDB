import mongoose, { Schema } from "mongoose";

// import mongooseSchemaJsonschema from 'mongoose-schema-jsonschema';
// mongooseSchemaJsonschema(mongoose);

const schema = mongoose.Schema;

export const UserSchema = new schema({
    username: {
        type: String, required: true, unique: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    fullname: String,
    posts: [{
        type: Schema.Types.ObjectId, ref: "Post"
    }],
    likes: [{
        type: Schema.Types.ObjectId, ref: "Like"
    }],
    comments: [{
        type: Schema.Types.ObjectId, ref: "Comment"
    }]
}, {timestamps: true});

export const User = mongoose.model("User", UserSchema)

export interface UserInterface{
    username: string,
    email: string,
    password: string,
    fullname: string,
    posts: Array<Schema.Types.ObjectId>, // is this correct?? or should we use posts: Types.ObjectId[];
    likes: Array<Schema.Types.ObjectId>,
    comments: Array<Schema.Types.ObjectId>
}

// export const UserJSONSchema = UserSchema.jsonSchema();