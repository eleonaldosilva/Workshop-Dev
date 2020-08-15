// usei o express para criar e configurar o meu servidor 
const express = require("express")
const server = express()

// configurando arquivos estaticos (css, scripts, imagens)
server.use(express.static("public"))

// criei uma rota / e capturo o pedido do cliente  para responder
server.get("/", function(req, res){
  return res.sendFile(__dirname + "/index.html")
})

server.get("/idea", function(req, res){
  return res.sendFile(__dirname + "/idea.html")
})

// usando a porta 3000 para o meu servidor
server.listen(3000)