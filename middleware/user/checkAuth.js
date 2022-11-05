//?
import jwt from "jsonwebtoken";

// todo
export default function (req, res, next) {
  if (!req.cookies.access_token) {
    return res.status(401).json("Ներողություն, դուք թույլտվություն չունեք։");
  }

  //
  const token = req.cookies.access_token.split(" ")[1];

  //
  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    if (decoded._id === req.session.user.id) {
      next();
    } else {
      res.status(403).json("Ներողություն, դուք թույլտվություն չունեք։");
    }
  } catch (err) {
    res.json(
      "Ներողություն, գործողությունը կատարել հնարավոր չէ, դիմեք ադմինիստրատորին։"
    );
  }
}
