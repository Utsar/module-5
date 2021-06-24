import express from "express";
import fs from "fs";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const authorsFilePath = path.join(__dirname, "authors.json");

const authorsRouter = express.Router();

// const authorsJsonPath = join(
//   dirname(fileURLToPath(import.meta.url)),
//   "authors.json"
// );

// // creating an array of authors
// const authorsArray = () => {
//   const content = fs.readFileSync(authorsJsonPath);
//   return JSON.parse(content);
// };

// const writeAuthors = (content) =>
//   writeFileSync(authorsJsonPath, JSON.stringify(content));

// GET all
authorsRouter.get("/", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(authorsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSON = JSON.parse(fileAsString);
    res.send(fileAsJSON);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});
// GET single
authorsRouter.get("/:authorId", async (req, res, next) => {
  try {
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});
// POST - create
authorsRouter.post("/", async (req, res, next) => {
  try {
    const { name, surname, email, dateOfBirth } = req.body;
    const newAuthor = {
      id: uniqid(),
      name,
      surname,
      email,
      dateOfBirth,
      avatar: `https://ui-avatars.com/api/?name=${name}+${surname}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const fileAsBuffer = fs.readFileSync(authorsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSONArray = JSON.parse(fileAsString);
    fileAsJSONArray.push(newAuthor);
    fs.writeFile(authorsFilePath, JSON.stringify(fileAsJSONArray));
    res.send(newAuthor);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});
// PUT - update
authorsRouter.put("/:authorId", async (req, res, next) => {
  try {
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});
// Delete
authorsRouter.delete("/:authorId", async (req, res, next) => {
  try {
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

export default authorsRouter;
