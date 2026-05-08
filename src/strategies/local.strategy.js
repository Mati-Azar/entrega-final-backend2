import bcrypt from "bcrypt";
import validator from "validator";
import LocalStrategy from "passport-local";

import userModel from "../models/user.model.js";
import AuthError from "../errors/AuthError.js";

const config = {
  usernameField: "email",
  passwordField: "password",
};

const localStrategyCallback = async (email, password, cb) => {
  try {
    const isEmailValid = validator.isEmail(email);

    if (!isEmailValid) {
      return cb(null, false, { message: "Invalid Email" });
    }
    const [findUser] = await userModel.find({ email });
    if (!findUser) {
      return cb(null, false, { message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      return cb(null, false, { message: "Invalid Password" });
    }
    return cb(null, findUser);
  } catch (err) {
    return cb(new AuthError(err.message || "No autorizado"));
  }
};

const localStrategy = new LocalStrategy(config, localStrategyCallback);

export default localStrategy;
