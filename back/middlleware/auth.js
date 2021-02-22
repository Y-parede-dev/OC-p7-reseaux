// IMPORT JWT pour la creation de token
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
//creation de la fontion de la validation de token
module.exports = (req, res, next)=>{
   
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.JSW_SECRET}`);
        const userId = decodedToken.user_id;
        
        if(req.body.user_id && req.body.user_id !== userId){
            throw "user id non valable";
        } else {
            next(); 
        }
    } catch {
       
        res.status(400).json({message:"Un pb avec le auth"});
    }
}
