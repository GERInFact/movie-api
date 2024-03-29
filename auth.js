const jwtSecret = "your_jwt_secret"; // has to be the same key used in JWTStrategy
const jwt = require("jsonwebtoken"),
  passport = require("passport");
require("./passport"); //local passport file;

function generateJWTToken(user) {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: "7d",
    algorithm: "HS256"
  });
}

module.exports = router => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user
        });
      }
      req.login(user, { session: false }, err => {
        if (err) {
          res.send(err);
        }
        var token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
