import mongoose from "mongoose";

function connectDB(callback) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(`Conectado a DB!`);

      callback();
    })
    .catch(() => {
      console.log("Hubo un error con la DB");
    });
}

export default connectDB;
