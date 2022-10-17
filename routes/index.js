const express = require("express");
const router = express.Router();
const UserController = require ('../controllers/user');
const reflectionsController = require ('../controllers/reflections');

//Api users
router.get("/getUser", UserController.getUser);
router.post("/api/v1/users/register", UserController.createUser);
router.post("/api/v1/users/login", UserController.login);
router.get("/getUserbyEmail/:email", UserController.getUserbyemail);

//API Reflections
router.get("/api/v1/reflections", reflectionsController.get);
router.post("/api/v1/reflections", reflectionsController.create);
router.put("/api/v1/reflections/:id", reflectionsController.update);
router.delete("/api/v1/reflections/:id", reflectionsController.delete);

module.exports = router;