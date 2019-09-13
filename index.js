// essential web server and logging modules
// jshint esversion: 8

const express = require("express"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  mongoose = require("mongoose"),
  models = require("./models"),
  User = require("./User");

const Movies = models.Movie;
const Users = models.User;

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

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
    const movies = await Movies.find();
    if (!movies.length) return res.status(400).send("No movies yet");

    res.json(movies);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// send featured movies
app.get("/movies/featured", async (req, res) => {
 try {
   const featuredMovies = await Movies.find({Featured: true});
   if(!featuredMovies.length) return res.status(400).send("No featured movies yet");

   res.json(featuredMovies);
 } catch(err) {
    res.status(500).send(err.message);
 }
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

// send back all users
app.get("/users", async (req, res) => {
  try {
    const users = await Users.find();
    if (!users.length) return res.status(400).send("No users yet");

    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// send a specific user
app.get("/users/:username", async (req, res) => {
  try {
    const foundUser = await Users.findOne({ Username: req.params.username });
    if (!foundUser)
      return res.status(400).send(`${req.params.username} not found`);

    res.json(foundUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// add a new user and send back added user data
app.post("/users", async (req, res) => {
  try {
    const { username, password, email, birth } = req.body;

    const foundUser = await Users.findOne({ Username: req.body.username });
    if (foundUser)
      return res.status(400).send(`${req.body.username} already exists`);

    const newUser = await Users.create(
      new User(username, password, email, birth, [])
    );

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// update user and send back updated user data
app.put("/users/:username", async (req, res) => {
  try {
    const { username, password, email, birth } = req.body;
    const updatedUser = await Users.findOneAndUpdate(
      { Username: req.params.username },
      { $set: new User(username, password, email, birth, []) },
      { new: true }
    );
    if (!updatedUser)
      return res.status(400).send(`${req.params.username} not found`);

    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// update users favorite movies
app.put("/users/:username/movies/:movieId", async (req, res) => {
  try {
    const { username, movieId } = req.params;
    const updatedUser = await Users.findOneAndUpdate(
      { Username: username },
      { $push: { FavoriteMovies: movieId } },
      { new: true }
    );
    if (!updatedUser) return res.status(400).send(`${username} not found`);

    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// remove movie from users movie list
app.delete("/users/:username/:movies/:title", (req, res) => {
  // Find user in db and delete if movie not found send res.status(404).send(`${req.params.title} not found in your list.`);
  res
    .status(201)
    .send(`${req.params.title} successfully deleted from your movie list.`);
});

// remove user from db
app.delete("/users/:username", async (req, res) => {
  try {
    const deletedUser = await Users.findOneAndRemove({
      Username: req.params.username
    });
    if (!deletedUser)
      return res.status(400).send(`${req.params.username} not found`);

    res.status(200).send(`${req.params.username} was deleted.`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// listen on port 8080
app.listen(8080, () => console.log("Server is listening on port 8080"));
