import express from "express";
import passport from "./config/passport.js";
import sessionConfig from "./config/session.js";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import AuthError from "./errors/AuthError.js";

import cookieParserMiddleware from "./middlewares/cookie-parser.middleware.js";
import jsonBodyMiddleware from "./middlewares/json-body.middleware.js";


//Init
const app = express();

//Middlewares
app.use(jsonBodyMiddleware);
app.use(cookieParserMiddleware);

app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use(userRouter);
app.use("/api/v1/auth",authRouter);

//Error handler
app.use((error, _req, res, _next) => {
  console.log("🚀 ~ app.js:38 ~ error:", error);

  res.status(error.code || 500).send(error.message || "Hubo un error general");
});

export default app;
