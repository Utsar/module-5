import express from "express";
import fs, { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import createError from "http-errors";
import { ValidationError, validationResult } from "express-validator";
import { blogPostValidation } from "./validation";

const blogRouter = express.Router();

const blogJsonPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "blogPosts.json"
);

// creating an array of blogPosts
const getBlogPostsArray = () => {
  const content = fs.readFileSync(blogJsonPath);
  return JSON.parse(content);
};

const writeBlogPosts = (content) =>
  writeFileSync(blogJsonPath, JSON.stringify(content));

// GET all

blogRouter.get("/", (req, res, next) => {
  try {
    const blogPosts = getBlogPostsArray();
    res.send(blogPosts);
  } catch (error) {
    next(error);
  }
});

// GET single

blogRouter.get("/:blogId", (req, res, next) => {
  try {
    const blogPosts = getBlogPostsArray();
    const blogPost = blogPosts.find((blog) => blog._id === req.params.blogId);
    if (blogPost) {
      res.send(blogPost);
    } else {
      next(
        createError(
          404,
          `Blog post with an id of ${req.params.blogId} is not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

// POST

blogRouter.post("/", blogPostValidation, (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const newBlogPost = { ...req.body, _id: uniqid(), createdAt: new Date() };
      const blogPosts = getBlogPostsArray();
      blogPosts.push(newBlogPost);

      writeBlogPosts(blogPosts);
      res.status(201).send({ _id: newBlogPost._id });
    } else {
      next(createError(400, { errorsList: errors }));
    }
  } catch (error) {
    next(error);
  }
});

// PUT

blogRouter.put("/:blogId", (req, res, next) => {
  try {
    const blogPosts = getBlogPostsArray();
    const remainingBlogPosts = blogPosts.filter(
      (blog) => blog._id !== req.params.blogId
    );
    const updateBlog = { ...req.body, _id: req.params.blogId };
    remainingBlogPosts.push(updateBlog);
    writeBlogPosts(remainingBlogPosts);
    res.send(updateBlog);
  } catch (error) {
    next(error);
  }
});

// DELETE

blogRouter.delete("/:blogId", (req, res, next) => {
  try {
    const blogPosts = getBlogPostsArray();
    const remainingBlogPosts = blogPosts.filter(
      (blog) => blog._id !== req.params.blogId
    );
    writeBlogPosts(remainingBlogPosts);
    req.status(200).send("The blog has been successfully deleted!");
  } catch (error) {
    next(error);
  }
});

export default blogRouter;
