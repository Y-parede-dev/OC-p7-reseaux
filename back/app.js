const express = require('express');

const path = require('path');

const dataBase = require('./BDD/dbConnect');
const dotenv = require('dotenv');
dotenv.config();


const usersRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const likesRoutes = require("./routes/likes");


dataBase.connect(function(error) {

  if (error){
    console.log("Non Connecté à la base de données MySQL!")
  }else{
    console.log("Connecté à la base de données MySQL!");

  }
});
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('content-type', 'application/json');
    next();
  });

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, "images")));
app.use("/api/post", postRoutes);
app.use("/api/auth", usersRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api", likesRoutes);



module.exports = app;

