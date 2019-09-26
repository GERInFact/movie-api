const mongoose = require("mongoose"),
  bcrypt = require("bcrypt");

const saltRounds = 10;

// title, description, genre, director, actors, imgUrl, featured
const movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: { Name: String, Description: String },
  Director: { Name: String, Bio: String },
  Actors: [String],
  ImageUrl: String,
  Featured: Boolean
});

const userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birth: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
});

userSchema.statics.hashPassword = password =>
  bcrypt.hashSync(password, saltRounds);
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};

const movieModel = mongoose.model("Movie", movieSchema);
const userModel = mongoose.model("User", userSchema);

module.exports.Movie = movieModel;
module.exports.User = userModel;
