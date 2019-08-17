// essential built-in modules
const http = require("http"),
  url = require("url"),
  fs = require("fs");

// Handle http request and return documentation file, if requested
http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    let filePath = "";

    if (parsedUrl.pathname.includes("documentation"))
      filePath = __dirname + "/documentation.html";
    else filePath = "index.html";

    fs.readFile(filePath, (err, data) => {
      if (err) throw err;

      res.writeHead(200, {'Content-type' : 'text/html'});
      res.write(data);
      res.end();
    });
  })
  .listen(8080);
