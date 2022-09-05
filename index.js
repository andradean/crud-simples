//crud basico node puro -- com paramentos passado atraves da url

const http = require("http");
const url = require("url");
const queryString = require("query-string");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  //receber parametro url e transformar em JSON
  let urlParse = url.parse(req.url, true);
  const params = queryString.parse(urlParse.search);

  // criar usuario --- cadastrar usario
  if (urlParse.pathname == "criar-usuario") {
    //receber info usuario

    console.log(params);

    //salvar documento com info do usuario
    fs.writeFile(
      "database/" + params.id + ".txt",
      JSON.stringify(params),
      function (err) {
        if (err) throw err;
        console.log("Saved!");
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("Criado com sucesso");
      }
    );
  }

  //selecionar usuario
  else if (urlParse.pathname == "/selecionar-usuario") {
    fs.readFile("database/" + params.id + ".txt", function (err, data) {
      let resposta = data;

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(resposta);
      console.log(resposta);
    });
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end("hello world");
  //deletar usuario
});

//execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
