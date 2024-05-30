import { UserInfo } from "os";
import { comparePassword, createUser, findByUsername, isEmailExsists, isUsernameExsists } from "./service";
import { UserInterface } from "../users/models/user";
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken'

export async function register(req: FastifyRequest<{Body: UserInterface}>, res: FastifyReply){
    const{...data} = req.body
    try{
        if(await isUsernameExsists(data.username) || await isEmailExsists(data.email)){
            res.code(400);
            return{message: 'Username or email already exists'};
        }
        const user = await createUser(data);
        res.code(201);
        return{message: 'User registered', data: {user}}
    }catch(e){
        res.code(500);
        return{ e };
    }
}

export async function login(req: FastifyRequest<{Body: UserInterface}>, res: FastifyReply){
    try{
        const{...data} = req.body
        const user = await findByUsername(data.username);
        if(!user){
            res.code(400);
            return{message:"User not found"};
        }
        if(!await comparePassword(data.password, user.password)){
            res.code(400);
            return{message:"Password Incorrect"};
        }
        // sign the token
        const token = jwt.sign({id: user._id}, 'thisIsaPrivateSecretKey')
        res.code(200);
        return{
            message:"User LoggeIn",
            data:{
                user, token
            }
        };
    }catch(e){
        res.code(500);
        return{ e };
    }
}