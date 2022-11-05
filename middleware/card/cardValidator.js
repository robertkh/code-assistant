//?
import { check, validationResult } from "express-validator";
import { gl } from "../../util/logger.js";

// todo
export const cardValidator = [
  check("title")
    .not()
    .isEmpty()
    .withMessage("Վերնագիր:  \u00A0 դաշտը դատարկ է")
    .isLength({
      min: 3,
      max: 300,
    })
    .withMessage("Վերնագիր:  \u00A0 պետք է ունենա 3-300 սիմվոլ"),
  check("img")
    .not()
    .isEmpty()
    .withMessage("Ֆայլի անունը:  \u00A0 դաշտը դատարկ է")
    .isLength({
      min: 5,
      max: 256,
    })
    .withMessage("Ֆայլի անունը:  \u00A0 պետք է ունենա 5-300 սիմվոլ"),
];

// todo
export const cardValidationResult = (req, res, next) => {
  const result = validationResult(req).array()[0];

  //
  if (result) {
    return res.status(422).json(result.msg);
  } else {
    gl.log(" Ok, successfully passed the cardValidation");
  }

  //
  next();
};
