import fastify from 'fastify';
import mongoose from 'mongoose';
import { userRoutes } from './auth/route';

export const app = fastify();

mongoose.connect('mongodb://127.0.0.1:27017/refreshing_Mongodb').then(() => {
    console.log('Local database connected');
}).catch((err) => {
    console.error(`Problem Connection local database: ${err}`);
    process.exit(1);
})

app.get('/',(request, reply) => {
    reply.code(200);
    return{
        message: 'server is up and running'
    }
})

app.register(userRoutes, {prefix: 'auth'})