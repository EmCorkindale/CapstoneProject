const express = require("express");
const verifyToken = require('../Middleware/middleware');
const router = express.Router();
const usersController = require("../Controllers/usersController");
router.post("/register", usersController.newUser);
router.post("/login", usersController.userLogin);

// Protected route
router.get('/login', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed' });
    });
   
module.exports = router;

