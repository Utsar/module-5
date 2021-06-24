import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import { join } from "path";

import usersRouter from "./services/users/index.js";
import booksRouter from "./services/books/index.js";
import {
  catchErrorMiddleware,
  badRequestMiddleware,
  notFoundMiddleware,
} from "./errorMiddlewares.js";
import { getCurrentFolderPath } from "./lib/fs-tools.js";

const port = 3001;

const server = express();

const publicFolderPath = join(
  getCurrentFolderPath(import.meta.url),
  "../public"
);

// ************************** MIDDLEWARES **************************

const loggerMiddleware = (req, res, next) => {
  console.log(`Request --> ${req.method} ${req.url} -- ${new Date()}`);
  next(); // mandatory to give the control to what is happening next
};

const loggerMiddleware2 = (req, res, next) => {
  console.log(`Request --> ${req.method} ${req.url} -- ${new Date()}`);
  next(); // mandatory to give the control to what is happening next
};

// const validationMiddleware = (req,res,next) => {
//   if(valid){
//     next()
//   } else {
//     res.status(400).send("supermegaerror")
//   }
// }
server.use(express.static(publicFolderPath));
server.use(cors()); // GLOBAL MIDDLEWARE
server.use(express.json()); // GLOBAL MIDDLEWARE
server.use(loggerMiddleware); // GLOBAL MIDDLEWARE

// ************************* ENDPOINTS ***************************

server.use("/users", usersRouter);
server.use("/books", loggerMiddleware2, booksRouter); // loggerMiddleware2 is a ROUTER LEVEL MIDDLEWARE

// *************************** ERROR MIDDLEWARES ***************************

server.use(notFoundMiddleware);
server.use(badRequestMiddleware);
server.use(catchErrorMiddleware);

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
