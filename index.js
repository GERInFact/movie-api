const express = require("express"), morgan = require('morgan'), bodyParser = require('body-parser');
const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use((err,req,res,next) => {
  // error-handling logic
})

app.get("/", (req, res) => {
  res.send("Hello Node!");
});

app.get("/documentation", (req, res) => {
  res.sendFile("documentation.html", { root: __dirname });
});

app.listen(8080, () => console.log("Server is listening on port 8080"));
