const dataBase = require('../BDD/dbConnect');
const fs = require('fs');
exports.newPost = (req,res,next) => {
const post = req.body;
const file = req.file;
let FileName =null;
let urlWEB = null;
let reqSQL = `INSERT INTO posts(content, image_url, url_web, user_id, date_post) VALUES(?, ?, ?, ?, ?);`;
    if(req.file){
        FileName = file.filename;

    }
    if(post.url_web!='' || post.url_web!=null || post.url_web!='null'){
        urlWEB= post.url_web;
    }
    dataBase.query(reqSQL,[post.content, FileName, urlWEB, post.user_id, post.date_post],
        function(err,result){
        if(err){
            res.status(400).json({message:"POST EST BOGGER"});
            console.log(err);
            return;
        }else{
            res.status(200).json({message:"le post a bien étais enregistré dans la BDD"});
        };
    });
};
exports.getAllPost = (req,res,next)=>{
    dataBase.query(`SELECT posts.id AS id_post ,posts.likes ,posts.content AS content_post, posts.image_url AS image_post, posts.url_web, date_post ,
                    users.id AS user_id, users.nom AS nom_post,users.image_url AS avatar, users.prenom AS prenom_post 
                    FROM posts INNER JOIN users ON users.id= posts.user_id ORDER BY posts.id DESC;`, function(err, result){ 
        if(err){
            res.status(404).json({message:"GET ALL EST BUGER"});
            console.log(err);
            return;
        }else{
            res.status(200).json({message:"voici le resultat", result});
        };
    });
};
exports.getLikePost = (req,res,next)=>{ dataBase.query(`SELECT posts.likes 
    FROM posts WHERE posts.id = ? ORDER BY posts.id DESC;`, req.params.id, function(err, result){ 
        if(err){
            res.status(404).json({message:"GET ALL EST BUGER"});
            console.log(err);
        return;
        }else{
            res.status(200).json({message:"voici le resultat", result});
        };
    });
};
exports.getOneUserPost = (req,res,next)=>{
    const reqSQL = `SELECT posts.id AS id_post, 
                posts.likes ,
                posts.content AS content_post,
                posts.image_url AS image_post,
                posts.url_web, date_post ,
                users.id AS user_id,
                users.nom AS nom_post,
                users.image_url AS avatar,
                users.prenom AS prenom_post 
    
                FROM posts
                INNER JOIN
                users ON posts.user_id = users.id
                WHERE users.id = ?;`;
    dataBase.query(reqSQL, req.params.id,function(err, result){
        if(err){
            res.status(404).json({message:"GET ONE EST BUGER"});
            return;
        }else{
            const resLength = result.length;
            if(resLength>0){
                res.status(202).json({message:"voici le resultat de get one", result, resLength});
                return;
            }else{
                res.status(200).json({message:"cet utilisateur n'a rien poster pour le moment"});
                return;
            };
        };
    });
};
exports.modifyPost = (req,res,next)=>{
    const post = req.body;
    const idCourant = req.params.id;
    const sqlSelect = `SELECT posts.image_url FROM posts WHERE posts.id = ?;`;
    let imageDelete = '';
    dataBase.query(sqlSelect, post.post_id, function(err,result){
        if(err){
            console.log(err);
        }else{
            result.forEach(element => {
                imageDelete = element.image_url;
                return imageDelete;
            });
            if(req.file && imageDelete!=req.file.filename){
                fs.unlink(`images/posts/${imageDelete}`,()=>{
                    console.log(imageDelete, 'a etait supr.');
                })
            };
        };
    });
    if(post.post_id == idCourant){
        let reqSQL = `UPDATE posts SET content = "?",image_url = "?",url_web = "?" WHERE posts.id = ?`;
        let imgURL = null;
        if(req.file){
            imgURL = req.file.filename;
        }
        dataBase.query(reqSQL, [post.content, imgURL,post.url_web, post.post_id], function(err, result){
            if(err){
                console.log(err);
                res.status(400).json({message:"pb avec la modif du post"});
            }else{
                res.status(200).json({message:"modif est ok"});
            };
        });
    }else{
        res.status(500).json({message:"verifier votre id"})
    };
};
exports.deletePost=(req,res,next)=>{
    const post = req.body;
    const sqlSelect = `SELECT posts.image_url FROM posts WHERE posts.id =?;`;
        let imageDelete = '';
        dataBase.query(sqlSelect, post.post_id, function(err,result){
            if(err){
                console.log(err);
            }else{
                result.forEach(element => {
                    imageDelete = element.image_url;
                    return imageDelete;
                });
                fs.unlink(`images/posts/${imageDelete}`,()=>{
                    console.log(imageDelete, 'a etait supr.');
                });
            };
        });
    const reqSQL = `DELETE FROM posts WHERE id = ?`;
    dataBase.query(reqSQL, post.post_id, function(err, result){
        if(err){
            res.status(400).json({message:'supresion impossible'});
            console.log(err);
            return;
        }else{
            res.status(200).json({message:'post bien supr'});
            return;
        };
    });
};