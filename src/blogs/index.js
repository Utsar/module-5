import express from "express";
import fs from "fs";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";
import { checkValidationResult, checkBlogPostsSchema } from "./validating.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const blogsFilePath = path.join(__dirname, "blogs.json");

const blogsRouter = express.Router();

// const blogsJsonPath = join(
//   dirname(fileURLToPath(import.meta.url)),
//   "blogs.json"
// );

// // creating an array of blogs
// const blogsArray = () => {
//   const content = fs.readFileSync(blogsJsonPath);
//   return JSON.parse(content);
// };

// const writeblogs = (content) =>
//   writeFileSync(blogsJsonPath, JSON.stringify(content));

// GET all
blogsRouter.get("/", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(blogsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSON = JSON.parse(fileAsString);
    res.send(fileAsJSON);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});
// GET single
blogsRouter.get("/:blogId", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(blogsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSONArray = JSON.parse(fileAsString);
    const blog = fileAsJSONArray.find(
      (blog) => blog.blogId === req.params.blogsId
    );
    if (!blog) {
      res.status(404).send({
        message: `blog with an id of ${req.params.blogId} is not found`,
      });
    } else {
      res.send(blog);
    }
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});
// POST - create
blogsRouter.post(
  "/",
  checkBlogPostsSchema,
  checkValidationResult,
  async (req, res, next) => {
    try {
      const blog = {
        id: uniqid(),
        ...req.body,

        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const fileAsBuffer = fs.readFileSync(blogsFilePath);
      const fileAsString = fileAsBuffer.toString();
      const fileAsJSONArray = JSON.parse(fileAsString);
      fileAsJSONArray.push(blog);
      fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray));
      res.send(blog);
    } catch (error) {
      res.send(500).send({ message: error.message });
    }
  }
);
// PUT - update
blogsRouter.put("/:blogId", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(blogsFilePath);
    const fileAsString = fileAsBuffer.toString();
    let fileAsJSONArray = JSON.parse(fileAsString);
    const blogIndex = fileAsJSONArray.findIndex(
      (blog) => blog.blogId === req.params.blogsId
    );
    if (!blogIndex == -1) {
      res.status(404).send({
        message: `blog with an id of ${req.params.blogId} is not found`,
      });
    }
    const previousblogData = fileAsJSONArray[blogIndex];
    const changedblog = {
      ...previousblogData,
      ...req.body,
      updatedAt: new Date(),
      id: req.params.blogId,
    };
    fileAsJSONArray[blogIndex] = changedblog;
    fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray));
    res.send(changedblog);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// Delete
blogsRouter.delete("/:blogId", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(blogsFilePath);
    const fileAsString = fileAsBuffer.toString();
    let fileAsJSONArray = JSON.parse(fileAsString);
    const blog = fileAsJSONArray.find(
      (blog) => blog.blogId === req.params.blogsId
    );
    if (!blog) {
      res.status(404).send({
        message: `blog with an id of ${req.params.blogId} is not found`,
      });
    } else {
      fileAsJSONArray = fileAsJSONArray.filter(
        (blog) => blog.blogId !== req.params.blogsId
      );
    }
    fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray));
    res.status(204).send();
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

export default blogsRouter;
