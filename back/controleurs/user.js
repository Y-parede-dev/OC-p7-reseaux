const dataBase = require('../BDD/dbConnect');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');

// reGex email
function isValidEmail(value){
    let reGex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return reGex.test(value);
};
// reGex password (entre 8-15 caract. / au moins 1 chifre 1maj. une min et au moins un carct. spé.)
function isValidPassword(value){
    let reGex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;
    return reGex.test(value)
}
function createUser(req, res){
    const corpRequete = req.body;
    if(isValidEmail(corpRequete.adresse_email) &&isValidPassword(corpRequete.mot_de_passe)){
        bcrypt.hash(corpRequete.mot_de_passe, 10)
        .then(hash => {
            const user = {
                email:corpRequete.adresse_email,
                nom:corpRequete.nom,
                prenom:corpRequete.prenom,
                password: hash,
                imageUrl: `${req.protocol}://${req.get("host")}/images/`
            };
            //console.log(corpRequete.image_url.split(" "));
            console.log(user.imageUrl+corpRequete.image_url)
            //console.log(user.password)
            const sqlRequete = `INSERT INTO users(nom, prenom, adresse_email, mot_de_passe, image_url)VALUES(
                "${user.nom}",
                "${user.prenom}",
                "${user.email}",
                "${user.password}",
                "${corpRequete.image_url}");`;
                //imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` // sert a enregistre l'image envoyer par l'utilisateur

            dataBase.query(sqlRequete, function(err, result){
    
                if(err) {
                    res.status(400).json({message:"POST EST BOGGER"});
                    console.log(err);
                    return;
                }else {
                    return res.status(201).json({message:'tout est ok sur le POST, Utilisateur enregistre'});
                }
            });
        })
    }else{
        res.status(404).json({message:'Verifiez votre adresse email et / ou votre mot de pass'});
        return;
    }
}
exports.signup = (req, res, next)=>{

    dataBase.query(
        `SELECT users.adresse_email FROM users;`, function(present, result){

        if(result.length<1){
            console.log(`aucun email dans la base, il y en a maintenant ${result.length+1} `);
            createUser(req, res);
        }else{
            const adressMail = result;
            console.log(adressMail)
            for(i=0;i<adressMail.length;i++){
                if(adressMail[i].adresse_email!= req.body.adresse_email) {
                    createUser(req, res);
                }else{
                    console.log('adresse email deja dans la bdd')
                    return res.status(409).json({message:'Adresse email deja dans la BDD'});
                }
            }
        }
    })
}
exports.getAllAccount = (req,res,next)=>{
    dataBase.query( 
        `SELECT * FROM users;`, function(err, result){
            if(err){
                res.status(404).json({message:'GET EST BOGGER'});
                throw err
            }else{
                res.status(200).json({message:'tout est ok sur le get', result});
                console.log(result)
            }
        }
    )
}
exports.getOneAccount = (req, res, next) => {
    const idCourant = req.params.id;
    if(idCourant==req.body.id)
    {
        dataBase.query(
            `SELECT users.nom, users.prenom, users.adresse_email, users.mot_de_passe FROM users WHERE id = ${idCourant};`, function(err, result){
                if(err){
                    // res.status(404).json({message:"GET ON EST BOGGER"});
                    console.log(err)
                }
                else{
                    console.log(result)
                    res.status(200).json({message:'get one est ok'})
                }
            }
        )
    }
}

exports.deleteAccount = (req,res,next)=>{
    const idCourant = req.params.id;

    const user_out = req.body;
    if(user_out.user_id == idCourant){
        const sql = `DELETE FROM users WHERE id = ${user_out.id};`;
        dataBase.query( sql, function(err, result){
                if(err){
                    res.status(400).json({message: "Erreur d' identifiant"});
                }
                else{
                    res.status(200).json({message:"supression OK"});
                }
            }
        )
    }
    else {
        console.log('id!=id');
        res.status(400).json({message:'error serveur'})
    }
}
exports.modifyAccount = (req,res,next) => {
    const idCourant = req.params.id;

    const UsersModify = req.body;
    dataBase.query(`SELECT users.nom,users.prenom,users.adresse_email,users.mot_de_passe FROM users WHERE users.id = ${idCourant};`,
    function(err,result){
        if(err){
            throw err;
        }else{
            const RecupBD = result;
            RecupBD.forEach(element => {  
                console.log(element)
                console.log(UsersModify)
                bcrypt.compare(req.body.mot_de_passe, element.mot_de_passe)
                .then(valid=>{
                    console.log(valid)
                    if(valid){
                        if(
                            element.prenom != UsersModify.prenom ||
                            element.nom != UsersModify.nom ||
                            element.adresse_email != UsersModify.adresse_email )
                            {
                                if(isValidEmail(UsersModify.adresse_email)){
                                        
                                    const sqlRequete = `UPDATE users SET prenom = 
                                                    "${UsersModify.prenom}" , nom = 
                                                    "${UsersModify.nom}", adresse_email = 
                                                    "${UsersModify.adresse_email}"WHERE id = ${idCourant};`;
                                    
                                    dataBase.query(sqlRequete,
                                    function(err,result){
                                        if(err){
                                            res.status(400).json({message:'probleme avec la modification'})
                                            throw err;
                                        }else{
                                            res.status(200).json({message:'utilisateur bien modifier'});
                                            return;
                                        }
                                })
                                
                            }else{
                                res.status(400).json({message:'Probeme mot de pass et/ ou adresse email'})
                                return;
                            }
                            
                        }else{
                            res.status(200).json({message:'tout est ok, rien a étais modifier'})
                        }
                    }else{
                        if(isValidPassword(req.body.mot_de_passe)){
                            bcrypt.hash(UsersModify.mot_de_passe, 10)
                            .then(hash=>{
                                const user = {
                                    pass : hash
                                };
                            dataBase.query(`UPDATE users SET mot_de_passe = "${user.pass}" WHERE id = ${idCourant} `)
                            return res.status(201).json({message:'Mot de passe Modifier avec succés'});
                            })
                            console.log('ok mdp')
                        }else{
                            res.status(400).json({error:"probleme avec le password"})
                        }
                    }
                })
            })     
        }
    })
}
        /*-------------------------------------------partie conection----------------------------------------------*/
exports.login = (req, res, next) => {

    const userLog = req.body;
    dataBase.query(`SELECT * FROM users WHERE users.adresse_email = "${userLog.adresse_email}";`,
    function(err,result){
        if(err){
            return res.status(400).json(err);
        }else{
            const RecupBD = result;
            RecupBD.forEach(element =>{
                const userBdd = element;

                if(userBdd.adresse_email!= userLog.adresse_email){
                    res.status(401).json({message:'mauvais email'});
                    console.log(userBdd.adresse_email)
                    console.log(userLog.adresse_email)
                }else{
                    bcrypt.compare(userLog.mot_de_passe, userBdd.mot_de_passe)
                    .then(valid=>{
                    if(!valid){
                        return res.status(401).json({message:'mauvais mot de passe'})
                    }
                    else{
                        res.status(200).json({
                            user_id : userBdd.id,
                            token:jwt.sign(
                                { user_id: userBdd.id },
                                `${process.env.JSW_SECRET}`,
                                {expiresIn:`${process.env.TOKEN_EXPIRE}`}
                            )
                        })
                    }
                })
                .catch(
                    error=>res.status(500).json(error))
                }
            })
        }
    })
}