// todo
export default (req, res, next) => {
  //
  if (!req.session.user) {
    return res
      .status(400)
      .json(
        "Տվյալ գործողությունը արտոնված է միայն համակարգ մուտք գործած օգտատերերին։"
      );
  }

  //
  next();
};
