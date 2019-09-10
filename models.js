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

const userSchema = mongoose.Schema({});

const MovieModel = mongoose.model('Movie', movieSchema);

module.exports.MovieModel = MovieModel;