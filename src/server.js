import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";

const port = 3001;

const server = express();

server.use(cors());
server.use(express.json());

server.listen(port, () => {
  console.log("hello" + port);
});
