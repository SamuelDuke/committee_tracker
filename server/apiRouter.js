const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const passportStrategy = require("./config/passport");
const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = app => {
  app.use(bodyParser.json({ extended: true }));
  app.use(bodyParser.urlencoded({ extended: true }));

  // Serve the static files from the React app
  app.use(express.static(path.join(__dirname, "/../client/build")));

  // Set up the passport strategy
  passportStrategy(app);

  // Routers
  const authRoutes = express.Router();
  const apiRoutes = express.Router();
  const publicRoutes = express.Router();
  const userRoutes = express.Router();

  // Controllers
  const AuthController = require("./controllers/auth");
  const UserController = require("./controllers/user");

  // Load data Routes
  // const loadDataRoutes = express.Router();
  // const LoadDataController = require("./controllers/loadData");
  // loadDataRoutes.post("/users", LoadDataController.loadUsers);
  // app.use("/load", loadDataRoutes);

  // Auth Routes
  authRoutes.post("/login", AuthController.login);
  authRoutes.post("/register", AuthController.createUser);

  app.use("/auth", authRoutes);

  // Api Routes

  // User Routes
  userRoutes.get("/:searchTerm", UserController.getSearchUsers);
  userRoutes.get("/", UserController.getAllUsers);

  apiRoutes.use("/users", userRoutes);

  app.use("/api", requireAuth, apiRoutes);

  // Handles any requests that don't match the ones above
  app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname + "/../client/build/index.html"));
  });
};
