//?
import User from "../models/userModel.js";
import _ from "lodash";
import bcrypt from "bcrypt";
import { rl } from "../util/logger.js";

// todo
export const postUserLogin = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res
        .status(400)
        .json("Տվյալ էլեկտրոնային հասցեով օգտատեր գոյություն չունի։");
    }

    //
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //
    if (!validPassword) {
      return res.status(400).json("Ծածկագիրը սխալ է");
    }

    //
    if (!user.isReged) {
      return res
        .status(500)
        .json("Ձեր հաշիվը ակտիվ չէ։ Ստուգեք ձեր էլեկտրոնային հասցեն։ ");
    }

    if (user.isAdmin) {
      const token = user.generateAuthToken();

      res.cookie("access_token", "Bearer " + token, {
        expires: new Date(Date.now() + 14 * 24 * 3600000), // 14 days
        httpOnly: true,
      });
    }

    //
    req.session.user = { name: user.username, id: user._id };
    res.json(`${req.session.user.name}`);
  } catch (err) {
    rl.log(err.message);
  }
};
