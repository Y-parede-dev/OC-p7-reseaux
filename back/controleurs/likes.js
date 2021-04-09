const dataBase = require('../BDD/dbConnect');

exports.like = (req, res, next) => {

    dataBase.query(`SELECT user_id FROM likes WHERE user_id=${req.body.user_id} AND post_id=${req.body.post_id};`, function(err, result){
        if(err){
            console.log(err)
        }else{
            console.log(result.length)
            if(result.length > 0){
                dataBase.query(`DELETE FROM likes WHERE post_id = ${req.body.post_id} AND user_id=${req.body.user_id}`, function (err, result){
                    if(err){
                        console.log(err)
                    }else{
                        dataBase.query(`UPDATE posts SET likes = ${req.body.like_numb-1} WHERE posts.id = ${req.body.post_id}`, function(err, result){
                            if(err){
                                console.log(err);
                            }else{
                                res.status(200).json({message: 'le like a bien etait supprimer'})

                            }
                        })
                    }
                })
            }else{
                dataBase.query(`INSERT INTO likes(user_id, post_id) VALUES (${req.body.user_id}, ${req.params.id})`, function(err, result){
                    if(err){
                        res.status(400).json({error:err})
                    }else{
                        dataBase.query(`UPDATE posts SET likes = ${req.body.like_numb+1} WHERE posts.id = ${req.body.post_id}`, function(err, result){
                            if(err){
                                console.log(err);
                            }else{
                                res.status(200).json({message: 'le like a bien etait enregistrer'})

                            }
                        })
                    }
                })
            }
        }
    })
}
exports.Getlike = (req, res, next) => {
    console.log(req.params)
    dataBase.query(`SELECT * FROM likes WHERE post_id = ${req.params.id}`, function(err, result){
        if(err){
            res.status(400)
        }else{
            res.status(200).json({message: 'voici tout les likes', likes:result})
        }
    })
}