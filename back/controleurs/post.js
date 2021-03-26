const dataBase = require('../BDD/dbConnect');
const fs = require('fs');

exports.newPost = (req,res,next) => {
const post = req.body;
const file = req.file;
console.log(file)
console.log(post)
    if(req.file){
        dataBase.query(`INSERT INTO posts(content ,image_url, url_web, user_id, date_post)
                        VALUES("${post.content}", "${file.filename}", "${post.url_web}",${post.user_id}, "${post.date_post}")`,
                        function(err,result){
            if(err){
                res.status(400).json({message:"POST EST BOGGER"});
                console.log(err);
                return;
            }else{
                res.status(200).json({message:"le post a bien étais enregistré dans la BDD"})
            }
        })
    }else {
        dataBase.query(`INSERT INTO posts(content , url_web, user_id, date_post)
                        VALUES("${post.content}",  "${post.url_web}",${post.user_id}, "${post.date_post}")`,
                        function(err,result){
            if(err){
                res.status(400).json({message:"POST EST BOGGER"});
                console.log(err);
                return;
            }else{
                res.status(200).json({message:"le post a bien étais enregistré dans la BDD"})
            }
        })
    }
}
    
exports.getAllPost = (req,res,next)=>{
    dataBase.query(`SELECT posts.id AS id_post ,posts.content AS content_post, posts.image_url AS image_post, posts.url_web, date_post ,
                    users.id AS user_id, users.nom AS nom_post,users.image_url AS avatar, users.prenom AS prenom_post 
                    from posts INNER JOIN users ON users.id= posts.user_id ORDER BY posts.id DESC;`, function(err, result){ 
        if(err){
            res.status(404).json({message:"GET ALL EST BUGER"});
            console.log(err)
            return;
        }else{
            res.status(200).json({message:"voici le resultat", result});
        }
    }) 
}
exports.getOneUserPost = (req,res,next)=>{
    const post = req.body;
    const idCourant = req.params.user;
    if(idCourant == post.user_id){
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
                return;
            }else{
                const resLength = result.length;
                if(resLength>0){
                    res.status(202).json({message:"voici le resultat de get one", result, resLength});
                    return;
                }else{
                    res.status(200).json({message:"cet utilisateur n'a rien poster pour le moment"});
                    return;
                }
            }
        })
    }else {
        res.status(404).json({message:"not found"})
    }
}
/*
params for modify = 
user_id,
post_id,
content 
 */
exports.modifyPost = (req,res,next)=>{
    const post = req.body;
    const idCourant = req.params.id;
    if(post.post_id == idCourant){
        const reqSQL = `UPDATE posts SET content = "${post.content}" WHERE id = ${post.post_id}`;
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
        res.status(500).json({message:"verifier votre id"})
    }   
}
/*
params for delete = 
user_id, --> for auth
post_id,
content 
 */
exports.deletePost=(req,res,next)=>{
    const post = req.body;
    const idCourant = req.params.id;
    if(post.post_id==idCourant){
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
    }
}