import { body } from "express-validator";
export const userValidations = [
  body("name").exists().wirhMessage("name is mandatory field"),
];
