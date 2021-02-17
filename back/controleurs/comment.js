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
    const post = req.body;
    const sqlRequete = `select posts.content as post, users.nom, users.prenom,
                        comment.content 
                        from comment, posts
                        inner join users on users.id = ${post.commentUserId} 
                        where posts.id = ${post.post_id};`;
    dataBase.query(sqlRequete, function(err, result){
        if(err){
            res.status(400).json({message:'PROBLEME AVEC LE GET'});
            console.log(err);
            return;
        }else{
            res.status(200).json({message:"Voici les commentaire de se post", result});
            console.log(result);
            return;
        }
    })
}
/*exports.getCommentOnePost = (req,res,next) => {
    const post = req.body;
    const idCourant = req.params.id;
    const sqlRequete = `select posts.content as post, users.nom, users.prenom,
                        comment.content 
                        from comment, posts
                        inner join users on users.id = ${post.commentUserId} 
                        where comment.post_id = ${post.post_id};`;
    dataBase.query(sqlRequete, function(err, result){
        if(err){
            res.status(400).json({message:'PROBLEME AVEC LE GET'});
            console.log(err);
            return;
        }else{
            res.status(200).json({message:"Voici les commentaire de se post", result});
            console.log(result);
            return;
        }
    })
}*/