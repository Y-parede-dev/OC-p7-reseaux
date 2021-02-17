const dataBase = require('../BDD/dbConnect');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    if(isValidEmail(corpRequete.adresse_email)&& isValidPassword(corpRequete.mot_de_passe)){
        bcrypt.hash(corpRequete.mot_de_passe, 10)
        .then(hash => {
            const user = {
                email:corpRequete.adresse_email,
                nom:corpRequete.nom,
                prenom:corpRequete.prenom,
                password: hash
            };
            //console.log(user.password)
            const sqlRequete = `INSERT INTO users(nom, prenom, adresse_email, mot_de_passe)VALUES(
                "${user.nom}",
                "${user.prenom}",
                "${user.email}",
                "${user.password}");`;
            dataBase.query(sqlRequete, function(err, result){
    
                if(err) {
                    res.status(400).json({message:"POST EST BOGGER"});
                    console.log(err);
                    return;
                }else {
                    res.status(200).json({message:'tout est ok sur le POST, Utilisateur enregistre'});
                    //return;
                }
            });
        })
    }else{
        res.status(400).json({message:'Verifiez votre adresse email et / ou votre mot de pass'});
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
            for(i=0;i<adressMail.length;i++){
                if(adressMail[i].adresse_email!= req.body.adresse_email) {
                    createUser(req, res);
                }else{
                    res.status(400).json({message:'Adresse email deja dans la BDD'});
                    return;
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
                res.status(200).json({message:'tout est ok sur le get'});
                console.log(result)
            }
        }
    )
}
exports.getOneAccount = (req, res, next) => {
    const idCourant = req.params.id.split(':')[1];
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
exports.getOneOtherAccount = (req, res, next) => {
    const otherAccount = req.body;
    console.log(otherAccount.nom)
    dataBase.query(
        `SELECT users.nom, users.prenom FROM users WHERE nom = "${otherAccount.nom}","${otherAccount.prenom}" ;`, function(err, result){
            if(err){
                res.status(404).json({message:"GET ON other EST BOGGER"});
            }
            else{
                console.log(result)
                res.status(200).json({message:'get one other est ok'})
            }
        }
    )
}
exports.deleteAccount = (req,res,next)=>{
    const idCourant = req.params.id.split(':')[1];

    const user_out = req.body;
    console.log(req.params.id.split(':')[1])
    if(user_out.id == idCourant){
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
    const idCourant = req.params.id.split(':')[1];

    const UsersModify = req.body;
    dataBase.query(`SELECT users.nom,users.prenom,users.adresse_email,users.mot_de_passe FROM users WHERE users.id = ${idCourant};`,
    function(err,result){
        if(err){
            throw err;
        }else{
            const RecupBD = result;
            RecupBD.forEach(element => {  
                // UsersModify.mot_de_passe = user.pass
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
                                                    "${UsersModify.prenom}", nom = 
                                                    "${UsersModify.nom}", adresse_email = 
                                                    "${UsersModify.adresse_email}"WHERE id = ${idCourant};`;
                                    
                                    dataBase.query(sqlRequete,
                                    function(err,result){
                                        if(err){
                                            res.status(400).json({message:'probleme avec la modification'})
                                            throw err;
                                        }else{
                                            res.status(200).json({message:'utilisateur bien modifier'})
                                        }
                                })
                                
                            }else{
                                res.status(400).json({message:'Probeme mot de pass et/ ou adresse email'})
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
                            res.status(201).json({message:'Mot de passe Modifier avec succés'})
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
    dataBase.query(`SELECT users.nom,users.prenom,users.adresse_email,users.mot_de_passe FROM users WHERE users.adresse_email = "${userLog.adresse_email}";`,
    function(err,result){
        if(err){
            res.status(400).json(err);
            throw err;
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
                   
                    //si tout est OK statut 200 , et creation du 'jeton' token de conection
                    res.status(200).json({
                        id : userLog.id,
                        token:jwt.sign(
                            { id: userLog.id },
                            `${process.env.TOKEN_SECRET}`,
                            {expiresIn:`${process.env.TOKEN_EXPIRE}`}
                        )
                    })
                })
                .catch(
                    error=>res.status(500).json(error))
                }
            })
        }
    })
}