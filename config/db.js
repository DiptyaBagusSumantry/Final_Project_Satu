const Pool = require("pg").Pool;

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'finalProjectSatu',
    password: "1234",
    port: 8080
});

module.exports = pool;