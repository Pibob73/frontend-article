"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
const hostName = "127.0.0.1";
const port = "3000";

const requestListener = function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  if (!req.url) {
    req.setEncoding("utf8");
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req
      .on("end", () => {
        if (data) {
          const article = JSON.parse(data);
          let enumerateFile = 0;
          const articleFormat = "article";
          let files = fs.readdirSync(__dirname);
          enumerateFile =
            files.filter((el) => {
              return el.substring(el.length - 7) === articleFormat;
            }).length + 1 || 1;
          const writeArticle = `
          #${article.title},
          #${article.author},
          #${article.text}`;
          fs.writeFileSync(`${enumerateFile}.article`, writeArticle);
        }
      })
      .on("error", (err) => {
        console.error(`Got error: ${err.message}`);
      });
    fs.readFile("createArticle.html", (err, data) => res.end(data));
  }
  if (req.url.indexOf("/author/") > -1) {
    const idFile = req.url.slice(8);
    const infArticle = fs.readFileSync(`${idFile}.article`);
    const buffArticle = String(infArticle).split(",");
    buffArticle.forEach(function (el, index) {
      buffArticle[index] = el.slice(12);
    });
    fs.readFile("getArticle.html", (err, data) => {
      data = data.toString();
      data = data.replace("$title", `"${buffArticle[0]}"`);
      data = data.replace("$author", `"${buffArticle[1]}"`);
      data = data.replace("$text", `"${buffArticle[2]}"`);
      console.log(data);
      res.end(data);
    });
  }
};
const server = http.createServer(requestListener);
server.listen(port, hostName, () => {
  console.log(`server work at http://${hostName}: ${port}`);
});
