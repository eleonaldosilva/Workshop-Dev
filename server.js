// usei o express para criar e configurar o meu servidor 
const express = require("express");
const server = express();
const db = require("./db.js") 


// const ideas = [
  
//   {
//     img:"https://image.flaticon.com/icons/svg/2729/2729005.svg",
//     title:"Exercícios",
//     category:"saúde",
//     description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//     url:"https://rocketseat.com.br"
//   },
//   {
//     img:"https://image.flaticon.com/icons/svg/2729/2729027.svg",
//     title:"Meditação",
//     category:"Mentalidade",
//     description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//     url:"https://rocketseat.com.br"
//   },
//   {
//     img:"https://image.flaticon.com/icons/svg/2729/2729032.svg",
//     title:"Karaoke",
//     category:"Diversão em Familia",
//     description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//     url:"https://rocketseat.com.br"
//   }
// ];

// configurando arquivos estaticos (css, scripts, imagens)
server.use(express.static("public"));

// configurando o nunjucks

const nunjucks = require("nunjucks");
nunjucks.configure("view",{
  express:server,
  noCache:true,
});

// criei uma rota / e capturo o pedido do cliente  para responder
server.get("/", function(req, res){

   db.all(` SELECT * FROM ideas`, function(err, rows){
    if (err){
      console.log(err);
      return res.send("Erro no Banco de Dados");
    };
    const reverseIdeas= [...rows].reverse();
    let lastIdeas=[ ];
    for(let idea of reverseIdeas){
      if(lastIdeas.length < 2){
        lastIdeas.push(idea);
      };
    };
    return res.render("index.html", {ideas : lastIdeas});
   })
});

server.get("/idea", function(req, res){

  db.all(` SELECT * FROM ideas`, function(err, rows){
    if (err){
      console.log(err);
      return res.send("Erro no Banco de Dados");
    };
    const reverseIdeas= [...rows].reverse();
    return res.render( "idea.html", { ideas : reverseIdeas});
  })

});

// usando a porta 3000 para o meu servidor
server.listen(3000);