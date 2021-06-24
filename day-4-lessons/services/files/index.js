import express from "express";

const filesRouter = express.Router();
import multer from "multer";

// 1.

filesRouter.post(
  "/upload",
  multer().single("profilePic"),
  async (req, res, next) => {
    try {
      console.log(req.file);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

// 2.

filesRouter.post("/uploadMultiple", async (req, res, next) => {
  try {
  } catch (error) {}
});

export default filesRouter;
