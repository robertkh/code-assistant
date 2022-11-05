//?
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import fileUpload from "express-fileupload"; //!

//?
import usersRouter from "./routes/users.js";
import filesRouter from "./routes/files.js";
import cardsRouter from "./routes/cards.js";
import session from "./middleware/user/session.js";
import { yl, f_str } from "./util/logger.js";

//?
const app = express();
app.use(session);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload()); //!

//?
app.use("/users", usersRouter);
app.use("/files", filesRouter);
app.use(
  "/cards",
  (req, res, next) => {
    if (!req?.session?.user?.id) {
      return;
    }
    next();
  },
  cardsRouter
);

// todo
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "./client/build")));
} else {
  app.use(express.static(path.join(path.resolve(), "./client/public")));
}

// todo
const port = process.env.PORT || 4000;

// todo
app.listen(port, () => console.log(`Listening on ${port}`));
