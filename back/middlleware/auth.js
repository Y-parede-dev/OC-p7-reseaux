// IMPORT JWT pour la creation de token
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
//creation de la fontion de la validation de token
module.exports = (req, res, next)=>{
   
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.JSW_SECRET}`);
    const userId = decodedToken.user_id;
    const isAdmin = decodedToken.isAdmin;
    
    if((req.body.user_id && req.body.user_id !== userId )){
        if(isAdmin==true){
            next()   
        }
        else{
            res.status(400).json({message:"Vous n'etes pas admin "});
        }
        //throw "user id non valable / user n'est pas admin";
        
    } else {
        next(); 
    }
}
