const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const User = require("./models/user"); // MongoDB User model

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_REDIRECT_URI,
      scope: ["identify", "email"], // Add more scopes if needed
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create user in MongoDB
        let user = await User.findOne({ discordId: profile.id });

        const avatarUrl = profile.avatar
          ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
          : `https://cdn.discordapp.com/embed/avatars/${
              parseInt(profile.discriminator) % 5
            }.png`;

        if (!user) {
          user = new User({
            discordId: profile.id,
            username: profile.username,
            email: profile.email,
            avatar: avatarUrl, // Use the constructed avatar URL
          });
          await user.save();
        } else {
          // Update the avatar if it has changed
          user.avatar = avatarUrl;
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
