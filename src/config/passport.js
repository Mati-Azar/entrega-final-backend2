import passport from "passport";
import UserDAO from "../dao/user.dao.js";

//Estrategias de autenticacion
import localStrategy from "../strategies/local.strategy.js";
import githubStrategy from "../strategies/github.strategy.js";

passport.use("local", localStrategy);
passport.use("github", githubStrategy);

//en serializeUser el primer parametro "user" viene de lo que te da la estrategia (findUser)
passport.serializeUser((user, done) => {
  console.log("🚀 ~ app.js:26 ~ user:", user);
  //req.session.userId = user._id
  done(null, user._id);
});

//en deserializeUser el primer parametro "id" viene de lo que se guardó en serializeUser (user._id)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserDAO.findUserById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
