import { Router } from "express";
import passport from "passport";

import jwtMiddleware from "../middlewares/jwt.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import {
  loginController,
  signupController,
  githubController,
  sessionController,
  logoutController,
  profileController,
  adminController,
} from "../controllers/auth.controller.js";

const router = Router();

//------------------------------RUTAS DE AUTENTICACIÓN/AUTORIZACION-----------------------

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
  githubController,
);

//-----------------Sesion (Al hacer login se crea, uno puede navegar) ---------------------

router.get("/session", sessionController);

//--------------------Cerrar Sesion (Logout) ------------------------------

router.post("/logout", logoutController);

//---------------------------Ruta protegida mediante JWT --------------------------

router.get("/profile", jwtMiddleware, profileController);

//-----------------------Ruta protegida mediante JWT y rol administrador------------

router.get("/admin", jwtMiddleware, roleMiddleware("admin"), adminController);

export default router;
