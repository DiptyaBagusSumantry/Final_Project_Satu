const {UserController} = require('../controllers/user');
const {verifyToken} = require('../helper/jwt');
const db = require('../config/db');

class authentication{
    static async authentication(req,res,next){
        try{
            const token = req.headers["x-access-token"]
            const userDecoded = verifyToken(token)
    
            const email = req.params.email;
            const id = req.params.id;
        
            const user = await db.query(`SELECT * FROM users WHERE email=$1;`, [email])

            .then(user => {
                if(!user){
                return res.Status(401).json({message: "Tidak ada User di Database"});
            }
                res.locals.user = user
                return next()
            })
            .catch(err => {
                return res.status(401).json(err)
            })

        }catch(err){
            return res.status(401).json(err)
        }
    
    }

}

module.exports = authentication