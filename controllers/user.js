const db = require('../config/db');
const { generateToken } = require('../helper/jwt');

class UserController{
  
  static async createUser(req, res) {
    try {
      const password = req.body.password;
      const email = req.body.email;

      //check email sudah register
      const getUser = await db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
      if(getUser.rows.length){
        return res.status(404).json({message: "User Already Registered!"})
      }

      //insert data ke database
      let result = await db.query(
        `INSERT INTO users (password, email) VALUES($1, $2);`,
        [password, email]
      );

      //return response
      return res.status(201).json({ message: "Berhasil Menambahkan Data"})
    } catch (error) {
      return res.status(404).json({message: err.message})
    }
  }

  static async getUserbyemail(req,res){
    try{
    const email = req.params.email;
    
    //check user memakai email
    const getUser = await db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
    if(!getUser.rows.length){
      return res.status(404).json({message: "User Not Found!"})
    }

    //return response
    res.status(200).json({message: "Menampilkan Data user by Email", data: getUser.rows})

    }catch(err){
      return res.status(404).json({message: err.message})
    }
  }


  static async getUser(req, res) {
    try {
      let results = await db.query(`SELECT * FROM users`);
      
      //return response
      res.status(200).json({message: "Menampilkan Data All User", data: results.rows})
    } catch (error) {
      return res.status(404).json({message: err.message})
    }
  }

  static async login(req,res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
      //check user memakai email
      const user = await db.query(`SELECT * FROM users WHERE email=$1 limit 1`, [email])
      if (!user.rows.length){
        return res.status(404).send({message: "User Not Found"});
      }

      // check password
      const isCorrect = password === user.rows[0].password
      if(!isCorrect){
        return res.status(401).send({accessToken: null, message: "Invalid Password!"});
      }
      
      //generate token
      const token = generateToken({
        id: user.id,
        email: user.email})

      //return response
      return res.status(200).json({token})

    } catch (error) {
      return res.status(404).json({message: error.message})
    }
   
  }
}

module.exports = UserController;

