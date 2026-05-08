import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => {
          return validator.isEmail(email);
        },
        message: "No valido el email",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (password) => {
          return validator.isStrongPassword(password);
        },
        message: "No valido el password",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
