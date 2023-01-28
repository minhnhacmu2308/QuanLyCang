import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import mongoose from "mongoose";
import resolvers from "./resolvers/index.js";
import typeDefs from "./schemas/index.js";
import graphqlUploadExpress  from "./resolvers/graphql-upload/graphqlUploadExpress.mjs";
import "dotenv/config";


const app = express();
const httpServer = http.createServer(app);

const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xkqgiii.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  cors: {
    origin: true,
    credentials: true, // true if you need cookies/authentication
    methods: ['GET', 'POST', 'OPTIONS'],
  },
  uploads: { maxFileSize: 1024*1024*2}
});

await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));
app.use(express.static("public"))
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
app.get("/test",(req,res)=>{
  console.log("dsds")
})


mongoose.set("strictQuery", false);
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to DB");
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log("Server ready at http://localhost:5000");
  });
