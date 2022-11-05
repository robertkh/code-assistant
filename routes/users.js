//?

import express from "express";
var router = express.Router();

//todo - signup
import {
  signupValidator,
  signupValidationResult,
} from "../middleware/user/signupValidator.js";
import { postUserSignup } from "../routers/signupRouter.js";
import sendSignupMail from "../middleware/user/sendSignupMail.js";
router.post(
  "/signup",
  signupValidator,
  signupValidationResult,
  postUserSignup,
  sendSignupMail
);

//todo - login
import {
  loginValidator,
  loginValidationResult,
} from "../middleware/user/loginValidator.js";
import { postUserLogin } from "../routers/loginRouter.js";
router.post("/login", loginValidator, loginValidationResult, postUserLogin);

//todo - logout
import { getUsersLogout } from "../routers/logoutRouter.js";
router.get("/logout", getUsersLogout);

//todo - reset
import {
  resetValidator,
  resetValidationResult,
} from "../middleware/user/resetValidator.js";
import { resetLink } from "../routers/resetRouter.js";
import sendResetMail from "../middleware/user/sendResetMail.js";
router.post(
  "/reset",
  resetValidator,
  resetValidationResult,
  resetLink,
  sendResetMail
);

//todo - setNewPassword
import { setNewPassword } from "../routers/emailPassword.js";
router.get("/setnewpass/:id", setNewPassword);

//todo - checkAuth
import checkAuth from "../middleware/user/checkAuth.js";
router.get("/admin", checkAuth, (req, res) => {
  res.json("lav a");
});

//todo - getUserName
import { getUserName } from "../routers/avatarRouter.js";
router.get("/name", getUserName);

//todo
import { getUserActive } from "../routers/emailActive.js";
router.get("/:id", getUserActive);

//todo
export default router;
