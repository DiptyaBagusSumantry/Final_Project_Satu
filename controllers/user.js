const db = require('../config/db');
const { generateToken } = require('../helper/jwt');

class UserController{
  
  static async createUser(req, res) {
    try {
      const password = req.body.password;
      const email = req.body.email;

      let results = await db.query(
        `INSERT INTO users (password, email) VALUES($1, $2);`,
        [password, email]
      );

      
      return res.status(201).json({ message: "Berhasil Menambahkan Data"})
    } catch (error) {
      return res.status(404).json({message: err.message})
    }
  }

  static async getUserbyemail(req,res){
    try{
    const email = req.params.email;

    const getUserbyemail = await db.query(`SELECT * FROM users WHERE email=$1;`, [email]);

    res.status(200).json({message: "Menampilkan Data user by Email", data: getUserbyemail.rows})

    }catch(err){return res.status(404).json({message: err.message})}
  }


  static async getUser(req, res) {
    try {
      let results = await db.query(`SELECT * FROM users`);
      
      res.status(200).json({message: "Menampilkan Data All User", data: results.rows})
    } catch (error) {
      return res.status(404).json({message: err.message})
    }
  }

  static async login(req,res){
    const email = req.params.email;
    const password = req.body.password;

    await db.query(`SELECT * FROM users WHERE email=$1;`, [email])
    
    .then(user => {
      if (!user){
        return res.status(404).send({message: "User Not Fond"});
        // throw{ name: "User Login Error", devMessage: `User with email ${email} not found`}
    }
    // const isCorrect = comparePassword(password, user.password)
    var passwordIsValid = (
      password,
      user.password
    )

    if (!passwordIsValid){
      return res.status(401).send({accessToken: null, message: "Invalid Password!"});
      // throw{ name: "User Login Error", devMessage: `User password with email ${email} does not match`}
    }
    // let response = {
    //   id : req.body.id,
    //   // username: user.username,
    //   email: req.body.email
    // }

    const token = generateToken({
      id: user.id,
      email: user.email})

    return res.status(200).json({token})
  })
    .catch(err => {
      return res.status(404).json({message: err.message})
    
    // try{
    //   const password = req.body.password;
    //   const email = req.params.email;

    //   let results = await db.query(`SELECT * FROM users WHERE email= $1`, [email])
    //   res.status(200).send(`ini datanya ${data}`)
    // }catch(err){
    //   return res.send(err);
    // }

    })
  }
}

module.exports = UserController;

// class UserController {
//     static async getUser(req, res) {
//       return res.send("This is from User Controller");
//     }
//   }
  
//   module.exports = UserController;
  
