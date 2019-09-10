const mongoose = require("mongoose")
const Movie = require("./Movie");

// title, description, genre, director, actors, imgUrl, featured
const movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {Name: String, Description: String},
    Director: {Name: String, Bio: String},
    Actors: [String],
    ImageUrl: String,
    Featured: Boolean
});

const userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: "Movie"}]
});

const MovieModel = mongoose.model('Movie', movieSchema);

module.exports.MovieModel = MovieModel;