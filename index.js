// essential web server and logging modules
const express = require("express"),
  morgan = require("morgan"),
  Movie = require("./Movie");

const app = express();

// middleware functions
app.use(morgan("common"));
app.use(express.static('public'));
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something went wrong");
  next();
});

// send welcome text on page visit
app.get("/", (req, res) => {
  res.send("Welcome to myFlix! Your customized movie platform.");
});

// send top 10 movie list, if requested
app.get("/movies", (req, res) => {
  res.json([
    new Movie(
      "Lord of the Rings",
      "J.R.R. Tolkien",
      new Date(),
      Math.random() * 1000,
      Math.random() * 5,
      "An epic movie."
    ),
    new Movie(
      "Lord of the Rings",
      "J.R.R. Tolkien",
      new Date(),
      Math.random() * 1000,
      Math.random() * 5,
      "An epic movie."
    ),
    new Movie(
      "Lord of the Rings",
      "J.R.R. Tolkien",
      new Date(),
      Math.random() * 1000,
      Math.random() * 5,
      "An epic movie."
    ),
    new Movie(
      "Lord of the Rings",
      "J.R.R. Tolkien",
      new Date(),
      Math.random() * 1000,
      Math.random() * 5,
      "An epic movie."
    ),
    new Movie(
      "Lord of the Rings",
      "J.R.R. Tolkien",
      new Date(),
      Math.random() * 1000,
      Math.random() * 5,
      "An epic movie."
    ),
    new Movie(
      "Lord of the Rings",
      "J.R.R. Tolkien",
      new Date(),
      Math.random() * 1000,
      Math.random() * 5,
      "An epic movie."
    ),
    new Movie(
      "Lord of the Rings",
      "J.R.R. Tolkien",
      new Date(),
      Math.random() * 1000,
      Math.random() * 5,
      "An epic movie."
    ),
    new Movie(
      "Lord of the Rings",
      "J.R.R. Tolkien",
      new Date(),
      Math.random() * 1000,
      Math.random() * 5,
      "An epic movie."
    ),
    new Movie(
      "Lord of the Rings",
      "J.R.R. Tolkien",
      new Date(),
      Math.random() * 1000,
      Math.random() * 5,
      "An epic movie."
    ),
    new Movie(
      "Lord of the Rings",
      "J.R.R. Tolkien",
      new Date(),
      Math.random() * 1000,
      Math.random() * 5,
      "An epic movie."
    )
  ]);
});

// listen on port 8080 
app.listen(8080, () => console.log("Server is listening on port 8080"));
