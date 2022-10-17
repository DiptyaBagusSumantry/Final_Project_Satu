const jwt = require("jsonwebtoken");
const SECRET_KEY = "INIRAHASIA";

function generateToken(payload){
    const token = jwt.sign(payload, SECRET_KEY)
    return token
};

function verivyToken(token){
    const decoded = jwt.verify(token, PRIVATE_KEY)
    return decoded
}

module.exports={generateToken, verivyToken};