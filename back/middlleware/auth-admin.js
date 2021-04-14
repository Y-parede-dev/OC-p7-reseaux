// IMPORT JWT pour la creation de token
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
//creation de la fontion de la validation de token
module.exports = (req, res, next)=>{
   
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.JSW_SECRET}`);
        const isAdmin = decodedToken.isAdmin;
        
        if(isAdmin !== true ){
            throw "pas admin";
        } else {
            console.log(isAdmin)
            next(); 
        }
    } catch {
       
       // res.status(400).json({message:"Veuillez vous reconecter votre jeton est expiré"});
    }
}
