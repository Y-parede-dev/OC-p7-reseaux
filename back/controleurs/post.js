const dataBase = require('../BDD/dbConnect');
const fs = require('fs');

exports.newPost = (req,res,next) => {
const post = req.body;
//const uID = req.params;
console.log(post.content)
    dataBase.query(`INSERT INTO posts(content,user_id) VALUES("${post.content}",${post.user_id})`, function(err,result){
        if(err){
            res.status(400).json({message:"POST EST BOGGER"});
            console.log(err);
            return;
        }else{
            res.status(200).json({"message":"test"})
            console.log(post)
        }
    })
}
exports.getAllPost = (req,res,next)=>{
    dataBase.query(`SELECT posts.content AS post, users.nom, users.prenom,
                    comment.content AS comments ,comment.user_id AS user_on_comment
                    FROM posts
                    INNER JOIN users
                    ON posts.user_id = users.id
                    INNER JOIN comment
                    ON comment.post_id = posts.id;`, function(err, result){
        if(err){
            res.status(404).json({message:"GET ALL EST BUGER"});
            console.log(err)
            return;
        }else{
            res.status(200).json({message:"voici le resultat", result});
            console.log(result)
        }
    })
    
}
exports.getOneUserPost = (req,res,next)=>{
    const post = req.body;
    const reqSQL = `SELECT posts.content,
                    users.nom,
                    users.prenom
                    FROM posts
                    INNER JOIN
                    users ON posts.user_id = users.id
                    WHERE users.id = ${post.user_id}`;
    dataBase.query(reqSQL, function(err, result){
        if(err){
            res.status(404).json({message:"GET ONE EST BUGER"});
            console.log(err)
            return;
        }else{
            const resLength = result.length;
            if(resLength>0){
                res.status(202).json({message:"voici le resultat de get one", result, resLength});
                console.log(result);
                return;
            }else{
                res.status(200).json({message:"cet utilisateur n'a rien poster pour le moment"});
                return;
            }
            
        }
    })
}
exports.modifyPost = (req,res,next)=>{
    const post = req.body;
    const idCourant = req.params.id;
    if(post.user_id == idCourant){
        const reqSQL = `UPDATE posts SET content = "${post.content}" WHERE id = ${req.body.post_id}`;
        dataBase.query(reqSQL, function(err, result){
            if(err){
                console.log(err);
                res.status(400).json({message:"pb avec la modif du post"});
            }else{
                console.log(result)
                res.status(200).json({message:"modif est ok"})
            }
        })
    }else{
        console.log("pour modifier le post conecter vous avec le compte de l'auteur");
        res.status(500).json({message:"verifier votre id"})
    }
    
}
exports.deletePost=(req,res,next)=>{
    const post = req.body;
    const idCourant = req.params.id;
    if(post.user_id==idCourant){
        const reqSQL = `DELETE FROM posts WHERE id = ${post.post_id}`;
        dataBase.query(reqSQL, function(err, result){
            if(err){
                res.status(400).json({message:'supresion impossible'});
                console.log(err);
                return;
            }else{
                res.status(200).json({message:'post bien supr'});
                console.log(result);
                return;
            }
        })
    }else {
        res.status(500).json({message:"id non identique"});
        console.log('verifier vos id');
    }
    
}