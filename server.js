// essential built-in modules
const http = require("http"),
  url = require("url"),
  fs = require("fs");

// Handle http request and return documentation file, if requested
http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    const pathName = parsedUrl.pathname;
    if (!pathName) res.statusCode(500).json({ message: "No pathname." });

    let filePath = "";
    if (pathName.includes("documentation"))
      filePath = __dirname + "/documentation.html";
    else filePath = "index.html";

    try {
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
        "Error: " + err + " Timestamp: " + new Date() + "\n"
      );
    }
  })
  .listen(8080);
