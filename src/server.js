import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";

import blogRouter from "./services/blogPosts";
import {
  notFoundMiddleware,
  badRequestMiddleware,
  catchErrorMiddleware,
} from "./errorMiddlewares";

const port = 3001;

// middlewares

const loggerMiddleware = (req, res, next) => {
  console.log(`Request: ${req.method} ${req.url} ${new Date()}`);
};

// global middlewares
server.use(cors());
server.use(express.json());
server.use(loggerMiddleware);

// endpoints

server.use("/blogPosts", blogRouter);

// error middlewares

server.use(notFoundMiddleware);
server.use(badRequestMiddleware);
server.use(catchErrorMiddleware);

console.table(listEndpoints(server));

const server = express();
server.listen(port, () => {
  comsole.log("Hello, i'm server " + port);
});
