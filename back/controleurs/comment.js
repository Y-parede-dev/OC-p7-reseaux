const dataBase = require("../BDD/dbConnect");

exports.postComment = (req,res,next) => {
    const post = req.body;
    const sqlRequete = `INSERT INTO comment(content, user_id, post_id)
                        VALUES("${post.content}", ${post.user_id}, ${post.post_id});`;
    dataBase.query(sqlRequete, function(err, result){
        if(err){
            res.status(400).json({message:"probleme avec le post comment"})
            console.log(err);
            return;
        }else{
            res.status(200).json({message:"commentaire poster"});
            console.log(result);
            return;
        }
    })
}
exports.getComment = (req,res,next) => {
 
    const sqlRequete = `SELECT posts.content AS post, posts.id AS post_id, users.nom, users.prenom,
                        comment.content 
                        FROM posts, comment
                        INNER JOIN users ON users.id = comment.user_id
                        WHERE posts.id = comment.post_id ;`;
    dataBase.query(sqlRequete, function(err, result){
        if(err){
            res.status(400).json({message:'PROBLEME AVEC LE GET'});
            console.log(err);
            return;
        }else{
            res.status(200).json({message:"Voici les commentaires", result});
            console.log(result);
            return;
        }
    })
}
exports.getCommentOnePost = (req,res,next) => {
    const post = req.body;
    const idCourant = parseInt(req.params.id);
    if(idCourant === post.post_id){
        console.log(post.post_id)
        console.log(idCourant)
        const sqlRequete = `SELECT posts.content AS post, posts.id AS post_id,
                        users.nom, users.prenom,
                        comment.content 
                        FROM posts, users, comment
                        WHERE posts.id = ${idCourant}
                        AND users.id = comment.user_id;`;
        dataBase.query(sqlRequete, function(err, result){
            if(err){
                res.status(400).json({message:'PROBLEME AVEC LE GET'});
                console.log(err);
                return;
            }else{
                res.status(200).json({message:"Voici les commentaire de se post", result});
                //console.log(result);
                return;
            }
        })
    }else{
        res.status(404).json({message:'not found'})
    }
    
}
exports.modifyComment = (req,res,next)=>{
    const idCourant = req.params.id;
    const comment = req.body;
    
    if(idCourant == comment.post_id){
        const sqlRequeteSelect = `SELECT * from comment WHERE user_id = 196; `
        dataBase.query(sqlRequeteSelect, function(err, result){
            if(err){
                res.status(400).json({message:"erreur ID.params != req.body.post_id"});
                return;
            }else{
                const resultReq = result;
                resultReq.forEach(element => {
                    console.log('comment',comment.user_id)
                    console.log("elt     ",element.user_id)
                    if(element.user_id === comment.user_id){
                        const sqlRequeteUpp = `UPDATE comment SET content = "${comment.content}" WHERE id = ${comment.comment_id};`;
                        dataBase.query(sqlRequeteUpp, function(err, result){
                            if(err){
                                console.log(err)
                                res.status(400).json({message:"erreur Uppdate"});
                                return;
                            }else{
                                const resultat = result.message;
                                console.log(resultat);
                                res.status(200).json({message:'Voici le resultat',resultat});
                                return;
                            }
                        })
                    }else{
                        console.log('test');
                        return res.status(401).json({message:"Cet utilisateur ne peut pas modifier se post"});
                    }
                });
            }
        })
    }else {
        res.status(404).json({message:'Not found'});
    }
}
exports.deleteComment = (req, res, next)=>{
    const paramsId = req.params.id;
    const comment = req.body;
    if(paramsId == comment.post_id){
        const sqlRequete = `DELETE FROM comment WHERE user_id = ${comment.user_id} AND post_id = ${comment.post_id} AND id = ${comment.comment_id};`;
        dataBase.query(sqlRequete,function(err,result){
            if(err){
                return res.status(400).json({message:"error requete sql"})
            }else{
                console.log(result)

                res.status(200).json({message:'supression ok'})
            }
        })
    }
}