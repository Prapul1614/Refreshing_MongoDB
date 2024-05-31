import { UserInfo } from "os";
import { comparePassword, createUser, findByUsername, isEmailExsists, isUsernameExsists } from "./service";
import { UserInterface } from "../users/models/user";
import { FastifyReply, FastifyRequest, errorCodes } from "fastify";
import jwt from 'jsonwebtoken'

export async function register(req: FastifyRequest<{Body: UserInterface}>, res: FastifyReply){
    const{...data} = req.body
    try{
        const errors = {username: "", email: ""}
        if(await isUsernameExsists(data.username)) errors.username = "Username Exsisits"
        if(await isEmailExsists(data.email)) errors.email = "email Exsits"
        if(await isUsernameExsists(data.username) || await isEmailExsists(data.email)){
            res.code(400);
            return{message: 'Username or email already exists', data: {errors}};
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
        const errors = {user:'', password:''}
        if(!user){
            res.code(400);
            errors.user = 'User not found'
            return{message:"User not found", data: { errors }};
        }
        if(!await comparePassword(data.password, user.password)){
            res.code(400);
            errors.password = 'Password Incorrect'
            return{message:"Password Incorrect", data: { errors }};
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