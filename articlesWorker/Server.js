"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
const hostName = "127.0.0.1";
const port = "3000";
const requestListener = function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  if (!!req.url) {
    let buffer = [];
    let data = "";
    req.on("data", (chunk) => {
      buffer.push(chunk);
      data += String(chunk);
    });
    req.on("end", () => {
      let resultBuff = Buffer.concat(buffer).toJSON();
      console.log(resultBuff);
      console.log(typeof resultBuff);
      let str = '{"title":"good","author":"good","text":"good"}';
      if (resultBuff === str) console.log("good");
      const article = JSON.parse(resultBuff);
      console.dir({
        title: article.title,
        author: article.author,
        text: article.text,
      });
    });
    fs.readFile("createArticle.html", (err, data) => res.end(data));
  }
  if (req.url === "/article/") {
  }
};
const server = http.createServer(requestListener);
server.listen(port, hostName, () => {
  console.log(`server work at http://${hostName}: ${port}`);
});
