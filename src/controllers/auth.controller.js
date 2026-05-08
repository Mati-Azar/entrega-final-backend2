import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import AuthError from "../errors/AuthError.js";
import UserDAO from "../dao/user.dao.js";

const loginController = async (req, res, next) => {
  try {
    const token = jwt.sign(
      {
        userId: req.user._id,
        role: req.user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).send({
      message: "Login successful",
      token,
    });
  } catch (err) {
    const custom_error = new AuthError(err.message || "No autorizado");
    next(custom_error);
  }
};

const signupController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const isEmailValid = validator.isEmail(email);
  const isPasswordValid = validator.isStrongPassword(password);

  if (!isEmailValid || !isPasswordValid) {
    res.status(400).send("Email o Contraseña invalidos");
  } else {
    try {
      const data = await bcrypt.hash(password, 10);

      const newUser = await UserDAO.createUser(email, data);

      res.status(201).send(newUser);
    } catch (err) {
      return res.status(500).send("Hubo un error generando el hash");
    }
  }
};

const sessionController = (req, res) => {
  const safeUser = {
    id: req.user._id,
    email: req.user.email,
    role: req.user.role,
  };
  res.status(200).json({
    sessionID: req.sessionID,
    user: safeUser,
  });
};

export { loginController, signupController, sessionController };
