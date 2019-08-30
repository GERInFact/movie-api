// essential web server and logging modules
const express = require("express"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  movies = require("./Movies");

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

// send top 10 movie list, if requested
app.get("/movies", (req, res) => {
  res.json(movies);
});

// send specific movie by name
app.get("/movies/:title", (req, res) => {
  const movie = movies.find(m => m.title === req.params.title);
  if (!movie)
    res.status(404).send(`No movie found with the title: ${req.params.title}.`);
  else res.json(movie);
});

// send genre of a specific movie
app.get("movies/:title/:genre", (req, res) => {
  const genreInfo = movies.find(m => m.title === req.params.title).genre;
  if (!genreInfo)
    res.status(404).send(`No genre found for ${req.params.title}.`);
  else res.json(genreInfo);
});

// send movie list of a specific genre
app.get("/movies/:genre", (req, res) => {
  const filteredMovies = movies.filter(m => m.genre === req.params.genre);
  if (!filteredMovies)
    res
      .status(404)
      .send(`No movies found for this genre: ${req.params.genre}.`);
  else res.json(filteredMovies);
});

// send director information of a certain movie
app.get("/movies/:title/:director", (req, res) => {
  const director = movies.find(m => m.title === req.params.title).director;
  if (!director)
    res.status(404).send(`${req.params.director} Not known as director.`);
  else res.json(director);
});

app.post("/users", (req,res) => {
  const userData = JSON.parse(req.body);
  // Add user entry to db
  if(!userData) res.status(400).send("Data missing.");
  else res.status(201).send(userData);
});

app.put("/users/:username", (req, res) => {
  const userData = JSON.parse(req.body);
  // Find user in db and update properties
  if(!userData) res.status(400).send("Data missing");
  else res.status(201).send(userData);
});

app.delete("/users/:username/:movies/:title", (req,res) => {
  // Find user in db and delete if movie not found send res.status(404).send(`${req.params.title} not found in your list.`);
  res.status(201).send(`${req.params.title}`);
});

// listen on port 8080
app.listen(8080, () => console.log("Server is listening on port 8080"));
