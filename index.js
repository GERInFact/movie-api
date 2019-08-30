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
  if(!movie) res.status(404).send(`No movie found with the title: ${req.params.title}`);
  else res.json(movie); 
});



// listen on port 8080
app.listen(8080, () => console.log("Server is listening on port 8080"));
