import GitHubStrategy from "passport-github2";
import UserDAO from "../dao/user.dao.js";

const config = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
};

const githubStrategyCallback = async function (
  accessToken,
  refreshToken,
  profile,
  done,
) {
  try {
    const user = await UserDAO.findOrCreateUser(profile.emails[0].value);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
};

const githubStrategy = new GitHubStrategy(config, githubStrategyCallback);

export default githubStrategy;
