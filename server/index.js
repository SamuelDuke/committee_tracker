const express = require("express");
const cors = require("cors");

const config = require("./config/main");
const mongooseSetup = require("./config/mongooseDatabaseSetup");
const apiRouter = require("./apiRouter");

const app = express();

// Setup CORS
app.use(cors());

// Setup Database
mongooseSetup();

// Setup router
apiRouter(app);

let server = app.listen(config.port);
console.log("The server is listing at port " + config.port + ".");