import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import authorsRouter from "../src/authors/index.js";

const server = express();
const port = 3001;

server.use(cors());
server.use(express.json());
server.use("/authors", authorsRouter);

console.log(listEndpoints(server));

server.listen(port, () => console.log("Server is running on port", port));
server.on("error", (error) =>
  console.log(`server is not running, error: " ${error}`)
);
