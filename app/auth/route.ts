import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { login, register } from './controller';
import { userLoginSchema, userRegisterSchema } from './middleware';


export async function userRoutes(fastify: FastifyInstance, options: FastifyPluginOptions){
    // we can also add schema 
    fastify.post('/register', {schema: userRegisterSchema }, register)
    // fastify.post('/register', register),
    fastify.post('/login', {schema: userLoginSchema}, login)
    // fastify.post('/login', login)
}