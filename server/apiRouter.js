const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");

module.exports = app => {
  app.use(bodyParser.json({ extended: true }));
  app.use(bodyParser.urlencoded({ extended: true }));

  // Serve the static files from the React app
  app.use(express.static(path.join(__dirname, "/../client/build")));

  // Routers
  const authRoutes = express.Router();

  // Controllers
  const AuthController = require("./controllers/auth");

  // Auth Routes
  authRoutes.post("/login", AuthController.login);
  authRoutes.post("/register", AuthController.createUser);

  // test get
  authRoutes.get("/login", (req, res, next) => {
    return res.send("Login");
  });
  authRoutes.get("/register", (req, res, next) => {
    return res.send("Register");
  });

  app.use("/auth", authRoutes);

  // Handles any requests that don't match the ones above
  app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname + "/../client/build/index.html"));
  });
};
