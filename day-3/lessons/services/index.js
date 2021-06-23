import express, { request, response } from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import { nextTick } from "process";
import { userValidations } from "../validators";
import { validationResult } from "express-validator";

const authorsRouter = express.Router();

// get the path for this file (index.js)
const currentFilePath = fileURLToPath(import.meta.url);

const currentFolderPath = dirname(currentFilePath);

const authorsJSONPath = join(currentFilePath, "../../authors.json");
console.log(authorsJSONPath);

const getAuthors = () => {
  const content = fs.readFileSync(authorsJSONPath);
  return JSON.parse(content);
};

const writeAuthors = (content) =>
  fs.writeFileSync(authorsJSONPath, JSON.stringify(content));

authorsRouter.get("/", (request, response) => {
  try {
    const authors = getAuthors();
    response.send(authors);
  } catch (error) {
    nextTick(error);
  }
});

// authorsRouter.post("/");
authorsRouter.post("/", userValidations, (request, response) => {
  try {
    const errors = validationResult(request);
    const newAuthor = { ...request.body, _id: uniqid(), createdAT: new Date() };
    const authors = getAuthors();
    authors.push(newAuthor);
    writeAuthors(authors);
    response.status(201).send({ _id: newAuthor._id });
  } catch (error) {
    next(error);
  }
});
