const {UserController} = require('../controllers/user');
const {verifyToken} = require('../helper/jwt');
const db = require('../config/db');
// const jwt = require("jsonwebtoken");

class authentication{
    static async cek(req,res,next){
        const token = req.headers["x-access-token"]
        const email = req.body.email;
        const userDecoded = verifyToken(token)
        try{

            const user =  await db.query(`SELECT * FROM users WHERE email=$1;`, [email])
              
            if(!user){
                return res.Status(401).json({message: "Tidak ada User di Database"});
            }
                res.locals.user = user
                return next()
            // const verify = jwt.verify(token, process.env.jwtSecret);

            // req.user = verify.user;
            // next();
          
        }catch(err){
            return res.status(401).json(err)
        }
    
    }

}

module.exports = authentication