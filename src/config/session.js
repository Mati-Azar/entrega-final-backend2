import session from "express-session";
import MongoStore from "connect-mongo";

const sessionConfig = session({
  secret: process.env.SESSION_SECRET || "secret",
  saveUninitialized: false,
  resave: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }),
});

export default sessionConfig;
