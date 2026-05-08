import "./config/env.js";
import connectDB from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

console.log(`Conectando a DB....`);

connectDB(() => {
  app.listen(PORT, () => {
    console.log(`Servidor Web corriendo en puerto ${PORT}!`);
  });
});
