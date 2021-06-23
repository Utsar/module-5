import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";

const port = 3001;

const server = express();

// middlware example

const loggerMiddleware = (req, res, next) => {
  console.log(`request ---> ${req.method} ${req.url} ${new Date()}`);
  next();
};
server.use(cors());
server.use(express.json());
server.use(loggerMiddleware);

server.use("/authors", authorsRouter);

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("hello" + port);
});
