import { Types } from "mongoose";
import { User, UserInterface } from "../users/models/user";
import bcrypt from 'bcrypt';

export async function findByEmail(email: string){
    return await User.findOne({email});
}

export async function findByUsername(username: string){
    return await User.findOne({username});
}

export async function findByUserID(userID: Types.ObjectId){
    return await User.findById(userID);
}

export async function createUser(data: UserInterface){
    data.password = bcrypt.hashSync(data.password, 10);
    return await User.create(data);
}

export async function isUsernameExsists(username: string){
    return User.exists({username});
}

export async function isEmailExsists(email: string){
    return User.exists({email});
}

export async function comparePassword(userpassword: string, password: string){
    return bcrypt.compareSync(userpassword, password);
}

