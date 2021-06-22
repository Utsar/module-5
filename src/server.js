import express from "express";
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./services/authors";
// import cors from "cors";

const port = 3001;

const server = express();

server.use("authors", authorsRouter);
// server.use(express.json());

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("hello" + port);
});
