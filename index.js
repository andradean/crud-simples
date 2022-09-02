//crud basico node puro -- com paramentos passado atraves da url

const http = require("http");
const url = require("url");
const queryString = require("query-string");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  //receber parametro url e transformar em JSON
  const params = url.parse(req.url, true).query;
  console.log(params);
  // criar usuario --- cadastrar usario
  fs.writeFile(
    "database/" + params.id + ".txt",
    JSON.stringify(params),
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );
  //atualizar usuario
  //deketar usuario

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

//execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
