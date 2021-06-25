import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import authorsRouter from "../src/authors/index.js";
import { notFound, forbidden, catchAllErrorHandler } from "./errorHandlers.js";
import blogsRouter from "../src/blogs/index.js";

const server = express();
const port = 3001;

server.use(cors());
server.use(express.json());
server.use("/authors", authorsRouter);
server.use("/blogs", blogsRouter);

server.use(notFound);
server.use(forbidden);
server.use(catchAllErrorHandler);

console.log(listEndpoints(server));

server.listen(port, () => console.log("Server is running on port", port));
server.on("error", (error) =>
  console.log(`server is not running, error: " ${error}`)
);
