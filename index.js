const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  Movie = require("./Movie");
const app = express();

app.use(morgan("common"));
app.use(express.static('public'));
app.use((err, req, res, next) => {
  // error-handling logic
});

app.get("/", (req, res) => {
  res.send("Welcome to myFlix! Your customized movie platform.");
});
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

app.listen(8080, () => console.log("Server is listening on port 8080"));
