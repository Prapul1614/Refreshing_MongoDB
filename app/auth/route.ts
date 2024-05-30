import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { login, register } from './controller';

export async function userRoutes(fastify: FastifyInstance, options: FastifyPluginOptions){
    // we can also add schema 
    // fastify.post('/register', {schema:--}, register)
    fastify.post('/register', register),
    fastify.post('/login', login)
}