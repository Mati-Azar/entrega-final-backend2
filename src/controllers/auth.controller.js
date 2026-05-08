import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import AuthError from "../errors/AuthError.js";
import UserDAO from "../dao/user.dao.js";

const signupController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  const isEmailValid = validator.isEmail(email);
  const isPasswordValid = validator.isStrongPassword(password);

  if (!isEmailValid || !isPasswordValid) {
    res.status(400).send("Email o Contraseña invalidos");
  } else {
    try {
      const data = await bcrypt.hash(password, 10);
      const newUser = await UserDAO.createUser(email, data, role);
      res.status(201).send(newUser);
    } catch (err) {
      return res.status(500).send("Hubo un error generando el hash");
    }
  }
};

const loginController = async (req, res, next) => {
  try {
    const token = jwt.sign(
      {
        email: req.user.email,
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

const githubController = (req, res) => {
  // Successful authentication, redirect home.
  res.redirect("/");
};

const sessionController = (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: "No hay una sesión activa. Inicie sesión.",
    });
  }
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

const profileController = (req, res) => {
  res.status(200).json({
    message: "Perfil autorizado",
    user: {
      id: req.user.userId,
      role: req.user.role,
    },
  });
};

const adminController = (req, res) => {
  res.status(200).json({
    message: "Panel administrador autorizado",
  });
};

const logoutController = (req, res) => {
  req.logout((err) => {                 //req.logout cierra la sesión Passport.
    if (err) {
      return res.status(500).json({
        message: "Error cerrando sesión",
      });
    }
    req.session.destroy(() => {           //req.session.destroy cierra la sesión Passport.
      res.clearCookie("authToken");       //req.clearCookie elimina la cookie JWT del navegador. 
        res.clearCookie("connect.sid");   //req.clearCookie elimina la cookie de sesión de Passport.     
      res.status(200).json({
        message: "Logout successful",
      });
    });
  });
};



export {
  loginController,
  signupController,
  githubController,
  sessionController,
  profileController,
  adminController,
  logoutController,
};
