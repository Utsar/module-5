import express, { request, response } from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid"


const authorsRouter = express.Router();

// get the path for this file (index.js)
const currentFilePath = fileURLToPath(import.meta.url);

const currentFolderPath = dirname(currentFilePath);

const authorsJSONPath = join(currentFilePath, "./authors.json");
console.log(authorsJSONPath);

const getAuthors = () =>{
  const content = fs.readFileSync(authorsJSONPath)
  return JSON.parse(content)
}

const writeAuthors = (content) => fs.writeFileSync(authorsJSONPath, JSON.stringify(content))

authorsRouter.get("/", (request, response) => {
  const authors = getAuthors()
  response.send(authors)
});

authorsRouter.get("/:userid", (request, response) =>{

  const user = user.find(u => u.id === request.params.userid)
  response.send(authors)
});

// authorsRouter.post("/");
authorsRouter.post("/", (request,response) => {
  const newAuthor = {...request.body, _id: uniqid(), createdAT: new Date()}
  const authors = getAuthors()
  authors.push(newAuthor)
  writeAuthors(authors)
  response.status(201).send({_id: newAuthor._id})
});

// authorsRouter.put("/:id");
authorsRouter.put("/:userid", (request, response) =>{

  const authors = getAuthors();
  const reminingAuthors = athors.filter(author => author._id !== request.params.userid)
  const updateAuthor = {...request.body, _id: request.params.userid}
  reminingAuthors.push(updateAuthor)
  writeAuthors(reminingAuthors)
  response.send(updateAuthor)
}

// authorsRouter.delete("/:id");
authorsRouter.delete("/:userid", (request,response) => {
  const authors = getAuthors()
  const reminingAuthors = authors.filter(author => author._id !== request.params.userid)
  writeAuthors(reminingAuthors)
  response.status(204).send()
});

export default authorsRouter;
