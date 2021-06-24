import express from "express";
import uniqid from "uniqid";
import createError from "http-errors";
import { validationResult } from "express-validator";

import { loggerMiddleware } from "./middlewares.js";
import { usersValidation } from "./validation.js";
import { getBooks, getUsers, writeUsers } from "../../lib/fs-tools.js";

const usersRouter = express.Router();

// 1.
usersRouter.get("/", loggerMiddleware, async (req, res, next) => {
  try {
    const users = await getUsers();
    const books = await getBooks();
    res.send({ books, users });
  } catch (error) {
    next(error); // if I use next(error) inside a route handler I'm going to pass the error to the ERROR MIDDLEWARES
  }
});

// 2.
usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const users = await getUsers();

    const user = users.find((u) => u._id === req.params.userId);
    if (user) {
      res.send(user);
    } else {
      // USER NOT FOUND --> SEND ERROR TO ERROR HANDLERS
      next(createError(404, `User with id ${req.params.userId} not found!`)); // --> {status: 404, message: `User with id ${req.params.userId} not found!`}
    }
  } catch (error) {
    // 500
    next(error);
  }
});

// 3.
usersRouter.post("/", usersValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req); // VALIDATION RESULT GIVES BACK A LIST OF ERRORS COMING FROM THE usersValidation MIDDLEWARE

    if (errors.isEmpty()) {
      const newUser = { ...req.body, _id: uniqid(), createdAt: new Date() };

      const users = await getUsers();

      users.push(newUser);

      await writeUsers(users);
      res.status(201).send({ _id: newUser._id });
    } else {
      // I HAD VALIDATION ERRORS
      next(createError(400, { errorsList: errors }));
    }
  } catch (error) {
    next(error);
  }
});

// 4.
usersRouter.put("/:userId", async (req, res, next) => {
  try {
    const users = await getUsers();

    const remainingUsers = users.filter(
      (user) => user._id !== req.params.userId
    );

    const updatedUser = { ...req.body, _id: req.params.userId };

    remainingUsers.push(updatedUser);

    await writeUsers(remainingUsers);

    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

// 5.
usersRouter.delete("/:userId", async (req, res, next) => {
  try {
    const users = await getUsers();
    const remainingUsers = users.filter(
      (user) => user._id !== req.params.userId
    );

    await writeUsers(remainingUsers);

    res.status(200).send("Deleted!");
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
