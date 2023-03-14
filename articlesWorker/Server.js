"use strict";
const http = require("http");
const { Chunk } = require("webpack");
const fs = require("fs");
const path = require("path");
const hostName = "127.0.0.1";
const port = "3000";
const requestListener = function (req, res) {
  const data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    console.log(data);
  });
  const article = JSON.parse(data);
  console.dir({
    title: article.title,
    author: article.author,
    text: article.text,
  });
  const FILE_OPTIONS = { encoding: "utf-8" };
  const INPUT_FILE_PATH = path.resolve(__dirname, "createArticle.html");
  fs.readFile(INPUT_FILE_PATH, FILE_OPTIONS, (err, contents) => {
    if (err) {
      return console.error(err);
    }

    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(contents);
  });
};
const server = http.createServer(requestListener);
server.listen(port, hostName, () => {
  console.log("server work at http://${hostName}: ${port}");
});
