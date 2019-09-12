// essential web server and logging modules
const express = require("express"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  movies = require("./Movies"),
  mongoose = require("mongoose"),
  models = require("./models");

const Movie = models.Movie;
const User = models.User;

mongoose.connect("mongodb://localhost:27017/myFlixDB");

const app = express();

// middleware functions
app.use(bodyParser.json());
app.use(morgan("common"));
app.use(express.static("public"));
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something went wrong");
  next();
});

// send welcome text on page visit
app.get("/", (req, res) => {
  res.send("Welcome to myFlix! Your customized movie platform.");
});

// send all movies
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    if(!movies.length) return res.status(404).send("No movies yet");

    res.json(movies);
  } catch(err) {
    res.status(500).send(err.message);
  }
});

// send featured movies
app.get("/movies/featured", (req, res) => {
  res.json(movies.filter(m => m.isFeatured === true));
});

// send specific movie by name
app.get("/movies/:title", (req, res) => {
  const movie = movies.find(m => m.title === req.params.title);
  if (!movie)
    res.status(404).send(`No movie found with the title: ${req.params.title}.`);
  else res.json(movie);
});

// send genre of a specific movie
app.get("/movies/:title/genre", (req, res) => {
  const genreInfo = movies.find(m => m.title === req.params.title).genre;
  if (!genreInfo)
    res.status(404).send(`No genre found for ${req.params.title}.`);
  else res.json(genreInfo);
});

// send movie list of a specific genre
app.get("/movies/:genre/filtered", (req, res) => {
  const filteredMovies = movies.filter(m => m.genre === req.params.genre);
  if (!filteredMovies)
    res
      .status(404)
      .send(`No movies found for this genre: ${req.params.genre}.`);
  else res.json(filteredMovies);
});

// send director information of a certain movie
app.get("/movies/:title/director", (req, res) => {
  const director = movies.find(m => m.title === req.params.title).director;
  if (!director)
    res.status(404).send(`${req.params.director} Not known as director.`);
  else res.json(director);
});

// add a new user and send back added user data
app.post("/users", async (req,res) => {
  try {
  const {username, password, email, birth } = req.body;

  const foundUser = await User.find({Username : req.body.username});
  if(foundUser) return res.status(400).send(`${req.body.username} already exists`);

  const newUser = await User.create({
    Username: username,
    Password: password,
    Email: email,
    Birth: birth
  });
  
  res.status(201).json(newUser);
} catch(err) {
  res.status(500).send(err.message);
}
});

// update user and send back updated user data
app.put("/users/:username", (req, res) => {
  // const userData = JSON.parse(req.body);
  // Find user in db and update properties
  // if(!userData) res.status(400).send("Data missing");
  // else 
  res.status(201).send(`${req.params.username} was successfully updated.`);
});

// remove movie from users movie list
app.delete("/users/:username/:movies/:title", (req,res) => {
  // Find user in db and delete if movie not found send res.status(404).send(`${req.params.title} not found in your list.`);
  res.status(201).send(`${req.params.title} successfully deleted from your movie list.`);
});

// remove user from db
app.delete("/users/:username", (req,res) => {
  // Find user in db and correlated data and delete entries, if user not found send res.status(404).send("User not found").
  res.status(201).send(`${req.params.username} was successfully deleted.`);
});

// listen on port 8080
app.listen(8080, () => console.log("Server is listening on port 8080"));
