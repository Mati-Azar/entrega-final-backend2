import { Router } from "express";
import passport from "passport";

import {
  loginController,
  signupController,
  sessionController
} from "../controllers/auth.controller.js";

const router = Router();

//-----------------Signup Tradicional (Creamos el usuario en nuestra DB)---------------------

router.post("/register", signupController);

//----------------------------Login Local (Iniciar sesion) ------------------------------

router.post(
  "/login",
  passport.authenticate("local", { session: true }),
  loginController,
);

//-----------------Login con GitHub (Usamos credenciales de GitHub para iniciar sesion) ---------------------

router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  },
);

//-----------------Sesion (Iniciar sesion y navegar) ---------------------

router.get("/session", sessionController);


export default router;
