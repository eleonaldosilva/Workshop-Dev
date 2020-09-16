// usei o express para criar e configurar o meu servidor 
const express = require("express");
const server = express();
const db = require("./db.js") 


// configurando arquivos estaticos (css, scripts, imagens)
server.use(express.static("public"));
server.use(express.urlencoded({ extended:true }))

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

server.post("/", function(req, res){
  const query=`
   INSERT INTO ideas(
     image,
     title,
     category,
     description,
     url
   ) VALUES(?,?,?,?,?); `;

  const values = [
    req.body.image,
    req.body.tittle,
    req.body.category,
    req.body.description,
    req.body.url,

  ];

  db.run(query,values, function(err){
    if (err){
      console.log(err);
      return res.send("Erro no Banco de Dados");
    };
    return res.redirect("/idea")
  });
  
});

// usando a porta 3000 para o meu servidor
server.listen(3000);