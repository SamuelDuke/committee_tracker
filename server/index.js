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

// const User = require("./data_models/user");
// const users = require("./config/load_data/loadUsers");

// function onInsert(err, docs) {
//   if (err) {
//     // TODO: handle error
//     console.log("There was an error");
//   } else {
//     console.info("%d users were successfully stored.", docs.length);
//   }
// }

// User.insertMany(users)
//   .then(users => {
//     console.log("Users Saved");
//   })
//   .catch(err => {
//     console.log(err);
//   });

// Setup router
apiRouter(app);

let server = app.listen(config.port);
console.log("The server is listing at port " + config.port + ".");
