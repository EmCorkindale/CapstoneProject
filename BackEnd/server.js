const express = require("express");
const app = express();
require("dotenv").config();
let dbConnect = require("./dbConnect");
// parse requests of content-type -application / json;
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PropertyProspector." });
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
let clientRoutes = require("./Routes/clientRoutes");
app.use("/api/clients", clientRoutes);
let userRoutes = require("./Routes/userRoutes");
app.use("/api/users", userRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
