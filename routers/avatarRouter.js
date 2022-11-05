// todo
export const getUserName = (req, res) => {
  if (!req?.session?.user?.id) {
    res.status(403).json("Համակարգ մուտքի համար՝");
  } else {
    res.json(req.session.user.name);
  }
};
