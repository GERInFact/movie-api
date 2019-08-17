// essential built-in modules
const http = require("http"),
  url = require("url"),
  fs = require("fs");

// Handle http request and return documentation file, if requested
http
  .createServer((req, res) => {
    try {
      fs.appendFile(
        "log.txt",
        "Url: " + req.url + "\nTimestap: " + new Date() + "\n",
        err => {
          if (err) throw err;
        }
      );

      const parsedUrl = url.parse(req.url, true);

      const pathName = parsedUrl.pathname;
      if (!pathName) {
        res.writeHead(500, { "Content-type": "plain/text" });
        res.write("No pathname");
        res.end();
      }

      let filePath = "";
      if (pathName.includes("documentation"))
        filePath = __dirname + "/documentation.html";
      else filePath = "index.html";

      fs.readFile(filePath, (err, data) => {
        if (err) throw err;

        res.writeHead(200, { "Content-type": "text/html" });
        res.write(data);
        res.end();
      });
    } catch (err) {
      console.log(err);
      fs.appendFile(
        "debug_log.txt",
        "Error: " + err + " Timestamp: " + new Date() + "\n",
        err => {
          if (err) throw err;
        }
      );

      res.writeHead(500, { "Content-type": "plain/text" });
      res.write("No pathname");
      res.end();
    }
  })
  .listen(8080);
