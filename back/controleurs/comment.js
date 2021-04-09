const dataBase = require("../BDD/dbConnect");

exports.postComment = (req,res,next) => {
    const comment = req.body;
    const sqlRequete = `INSERT INTO comment(content, user_id, post_id)
                        VALUES("${comment.content}", ${comment.user_id}, ${comment.post_id});`;
    dataBase.query(sqlRequete, function(err, result){
        if(err){
            res.status(400).json({message:"probleme avec le post comment"})
            console.log(err);
            return;
        }else{
            res.status(200).json({message:"commentaire poster"});
            return;
        }
    })
}
exports.getComment = (req,res,next) => {
    
    const sqlRequete = `SELECT comment.content AS comment_content, comment.id AS comment_id, comment.post_id AS post_id_comment, users.id AS comment_user_id,users.nom AS comment_user,users.prenom AS comment_user_prenom, users.image_url AS avatar_user FROM comment JOIN users ON users.id = comment.user_id`;
    dataBase.query(sqlRequete, function(err, result){
        if(err){
            res.status(400).json({message:'PROBLEME AVEC LE GET'});
            console.log(err);
            return;
        }else{
            res.status(200).json({message:"Voici les commentaires", result});
            return;
        }
    })
}
exports.getCommentOnePost = (req,res,next) => {
    const post = req.body;
    const idCourant = parseInt(req.params.id);
    if(idCourant === post.post_id){
       
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
    console.log(idCourant, typeof idCourant)
    console.log(req.body)
    if(idCourant == comment.comment_id){
            
        const sqlRequeteUpp = `UPDATE comment SET content = "${comment.content}" WHERE id = ${comment.comment_id};`;
        dataBase.query(sqlRequeteUpp, function(err, result){
            if(err){
                console.log(err)
                res.status(400).json({message:"erreur Uppdate"});
                return;
            }else{
                res.status(200).json({message:"Uppdated Comment"});

            }
        })


    }else {
    res.status(400).json({message:'Erreur id'});
    }
}
exports.deleteComment = (req, res, next)=>{
    const comment = req.body;
   
        
    const sqlRequete = `DELETE FROM comment WHERE id = ${comment.comment_id};`;
    dataBase.query(sqlRequete,function(err,result){
        if(err){
            return res.status(400).json({message:"error requete sql"})
        }else{
            res.status(200).json({message:'supression ok'})
        }
    })
    
}