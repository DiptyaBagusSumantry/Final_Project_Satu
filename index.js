const express = require("express");
const app = express();
const cors = require("cors");
const routes = require('./routes')

app.use(express.urlencoded({extended: true}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.use(routes);



app.listen(2000, ()=>{
    console.log("berjalan di localhost 2000")
});