//?
import Path from "path";
import Fs from "fs";
import { gl, rl } from "../../../util/logger.js";

// todo
export default async (req, res, next) => {
  let testFolder = "";

  if (process.env.NODE_ENV === "production") {
    testFolder = Path.join((Path.resolve(), "client/build/images"));
  } else {
    testFolder = Path.join(Path.resolve(), "client/public/images");
  }
  let pathname = Path.join(
    testFolder,
    req.session.user.id + "_" + req.body.filename
  );

  //
  if (!req.session.user) {
    return res
      .status(400)
      .json("Դուք չունեք իրավասություն նշված գործողության համար։");
  }

  //
  try {
    await Fs.promises.access(pathname);
    await Fs.promises.unlink(pathname);
    res.status(200).json("Ֆայլը հաջողությամբ հեռացվեց։");
    gl.log("yes");
  } catch {
    res.status(400).json("Նշված ֆայլը գոյություն չունի։");
    rl.log("no");
  }
};
