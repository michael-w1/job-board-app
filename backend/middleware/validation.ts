import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


export const validateJobRequest = [
    body("title").isString().notEmpty().withMessage("Title must be a string"),
    body("company").isString().notEmpty().withMessage("Company must be a string"),
    body("content").isString().notEmpty().withMessage("Content must be a string"),
    handleValidationErrors, 
];

