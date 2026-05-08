import jwt from "jsonwebtoken";

const getLandingController = (req, res, next) => {
  try {
    if (req.cookies && req.cookies.authToken) {
      const data = jwt.verify(req.cookies.authToken, process.env.JWT_SECRET);
      console.log(data);
      res.send("Bienvenido " + data.email);
    } else {
      res.send("Logueate!");
    }
  } catch (err) {
    next(err);
  }
};

const getUserController = (req, res) => {
  try {
    if (req.cookies && req.cookies.authToken) {
      const data = jwt.verify(req.cookies.authToken, process.env.JWT_SECRET);
      res.json({
        message: "Informacion del usuario",
        user: data,
      });
    } else {
      res.send("Inicie sesión para ver su info!");
    }
  } catch (err) {
    next(err);
  }
};

export { getLandingController, getUserController };
