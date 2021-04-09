
// importation des package node 
// express pour cree l'aplication
const express = require('express');
// body parser analise le corp des requettes

// path sert comme son nom l'indique a crée des chemin
const path = require('path');

const dataBase = require('./BDD/dbConnect');
// dotenv sert au stockage des info sensibles
const dotenv = require('dotenv');
dotenv.config();
//const fs = require('fs');


// importation des routes 
const usersRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const likesRoutes = require("./routes/likes");
const bodyParser = require('body-parser');

// connection a la base de donnée 

dataBase.connect(function(error) {

  if (error){
    console.log("Non Connecté à la base de données MySQL!")
  }else{
    console.log("Connecté à la base de données MySQL!");

  }
});
// création de laplication express
const app = express();

// callback parametrage du header de la requete 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('content-type', 'application/json');
    next();
  });
// callback de l'application
// remplacement de bodyparser.json() par express.json()
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, "images")));
app.use("/api/post", postRoutes);
app.use("/api/auth", usersRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api", likesRoutes);



//exportation de l'application express
module.exports = app;

