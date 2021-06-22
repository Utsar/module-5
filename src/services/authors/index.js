import express, { response } from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const authorsRouter = express.Router();

authorsRouter.get("/", (request, response) => {
  console.log("URL", request.url);
  response.send("First try");
});

// authorsRouter.get("/:id");

// authorsRouter.post("/");

// authorsRouter.put("/:id");

// authorsRouter.delete("/:id");

// const currentFilePath = fileURLToPath(import.meta.url);
// const currentFolderPath = dirname(currentFilePath);
// const authorsJSONPath = join(currentFilePath, "authors.json");

export default authorsRouter;
