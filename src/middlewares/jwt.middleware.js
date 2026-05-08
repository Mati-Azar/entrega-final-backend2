import jwt from "jsonwebtoken";

const jwtMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({
        message: "No autenticado",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Token inválido",
    });
  }
};

export default jwtMiddleware;
