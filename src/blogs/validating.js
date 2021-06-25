import { checkSchema, validationResult } from "express-validator";

const schema = {
  title: {
    in: ["body"],
    isSting: {
      errorMessage: "validation failed, type must be",
    },
  },
  category: {
    in: ["body"],
    isSting: {
      errorMessage: "validation failed, type must be",
    },
  },
  content: {
    in: ["body"],
    isSting: {
      errorMessage: "validation failed, type must be",
    },
  },
  "author.name": {
    in: ["body"],
    isSting: {
      errorMessage: "validation failed, type must be",
    },
  },
  "author.avatar": {
    in: ["body"],
    isSting: {
      errorMessage: "validation failed, type must be",
    },
  },
  "readTime.value": {
    in: ["body"],
    isNumeric: {
      errorMessage: "validation failed, type must be",
    },
  },
  "readTime.unit": {
    in: ["body"],
    isString: {
      errorMessage: "validation failed, type must be",
    },
  },
  cover: {
    in: ["body"],
    isSting: {
      errorMessage: "validation failed, type must be",
    },
  },
};

export const checkBlogPostsSchema = checkSchema(schema);

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.status = 400;
    error.errors = errors.array();
    next(error);
  } else {
    next();
  }
};
