const express = require("express");
const middleware = require("../BackEnd/Middleware/middleware");
const app = express();
const cors = require("cors");

require("dotenv").config();
let dbConnect = require("./dbConnect");
// parse requests of content-type -application / json;
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PropertyProspector." });
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.use(cors());
let propertyRoutes = require("./Routes/propertyRoutes");
app.use("/api/property" /*middleware*/, propertyRoutes);
let externalApiRoutes = require("./Routes/externalApiRoutes");
app.use("/api/currentListings" /*middleware*/, externalApiRoutes);
let openHomeAttendeeRoutes = require("./Routes/openHomeAttendeeRoutes");
app.use("/api/openHomeAttendees", middleware, openHomeAttendeeRoutes);
let clientRoutes = require("./Routes/clientRoutes");
app.use("/api/clients", /*middleware*/ clientRoutes);
let userRoutes = require("./Routes/userRoutes");
app.use("/api/users", userRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
