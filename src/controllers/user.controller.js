import jwt from "jsonwebtoken";

const getLandingController = (req, res, next) => {
  //req.session
  console.log(
    "🚀 ~ user.controller.js:8 ~ getLandingController ~ req.user:",
    req.user,
  );

  try {
    if (req.cookies && req.cookies.jwt) {
      const data = jwt.verify(req.cookies.jwt, "secret-key");

      res.send("Bienvenido " + data.email);
    } else {
      res.send("Logueate!");
    }
  } catch (err) {
    next(err);
  }
};

const getUserController = (req, res) => {
  res.send("User info");
};

export { getLandingController, getUserController };
