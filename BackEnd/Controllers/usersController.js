const express = require("express");
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")


// Function to allow users to register
const newUser = async (req, res) => {
  try {
    const { username, password, firstName, lastName, emailAddress } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new instance of the User model using the request body
    const newUser = await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      emailAddress,
    });
    // const newUser = new User({ ...user, password: hashedPassword });
    // await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Handle specific error cases, e.g., duplicate email address
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "Email address is already in use" });
    }
    res.status(500).json({ error: "Registration failed" });
    console.log(error);
  }
};

// Function to allow users to login
const userLogin= async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({where: {username}});
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
      console.log(error);
    }
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
   
  }
};



module.exports = {newUser, userLogin}
