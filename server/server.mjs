import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import cors from 'cors';
import {expressMiddleware} from '@apollo/server/express4';
import fakeData from './fakeData/index.js';

const app = express();
const httpServer = http.createServer(app);

const typeDefs = `#graphql
    type Ship{
        id:String,
        name:String
        containers:[Container]
    },
    type Container{
        id:String,
        name:String,
    },
    type Query {
        ships:[Ship]
        ship:Ship
    }
`;
const resolvers = {

    Ship:{
        containers:(parent, args)=>{
            console.log(fakeData.containers)
            return fakeData.containers.filter(container => container.shipId === "1");
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[ApolloServerPluginDrainHttpServer({httpServer})]
})

await server.start();

app.use(cors(),bodyParser.json(),expressMiddleware(server))

await new Promise((resolve) => httpServer.listen({port:4000},resolve));
console.log('Server ready at http://localhost:4000');