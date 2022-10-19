const db = require('../config/db');

class reflectionsController{
    static async get(req, res) {
      const loginUser = res.locals.user
      console.log(loginUser);
        try {
          let results = await db.query(`SELECT * FROM reflections`);
          
          res.status(200).json({message: "Menampilkan Data Reflections", data: results.rows})
        } catch (error) {
          return res.status(404).json({message: err.message})
        }
      }

    static async create(req,res){
        try{
            const success = req.body.success;
            const low_point = req.body.low_point;
            const take_away = req.body.take_away;
            const owner_id = req.body.owner_id;
            // const created_date = req.body.created_date;
            // const modified_date = req.body.modified_date;
            const time = new Date().toISOString();
            
            const getUserById = await db.query(`SELECT * FROM users WHERE id=$1;`, [owner_id]);
            
            if(!getUserById.rows.length){
              return res.status(404).json({message: "User Not Found"})
            }

            let results = await db.query(
                `INSERT INTO reflections (success,low_point,take_away,owner_id,created_date,modified_date) VALUES($1, $2, $3, $4, $5, $6);`,
                [success,low_point,take_away,owner_id,time,time]
              );
                
            return res.status(201).json({ message: "Berhasil Menambahkan Data"})
            
            } catch (err) {
              return res.status(404).json({message: err.message})
            }
    }

    static async update(req, res) {
        try {
            const success = req.body.success;
            const low_point = req.body.low_point;
            const take_away = req.body.take_away;
            const owner_id = req.body.owner_id;
            // const created_date = req.body.created_date;
            // const modified_date = req.body.modified_date;
            const time = new Date().toISOString();
            const id = req.params.id;
    
        //   const findTodoById = await db.query(`SELECT * FROM todos WHERE id=$1;`, [
        //     parseInt(todoId),
        //   ]);
    
          await db.query(`UPDATE reflections SET success=$1, low_point=$2,take_away=$3, owner_id=$4,created_date=$5,modified_date=$6 WHERE id=$7;`, [
            success,low_point,take_away,owner_id,time,time,id
          ]);
    
         
          return res.status(200).json({ message: "Data Berhasil di Edit"})
        } catch (err) {
          return res.status(404).json({message: err.message})
        }
    }

    static async delete(req, res) {
        try {
          const id = req.params.id;
    
          await db.query(`DELETE FROM reflections WHERE id=$1;`, [id]);
          return res.status(200).json({ message: "Berhasil Delete dengan Id = " + id})
        } catch (error) {
          console.log(error);
          return res.status(404).json({message: err.message})
        }
    }
}

module.exports = reflectionsController;