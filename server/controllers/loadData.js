const User = require("../data_models/user");

const users = require("../config/load_data/loadUsers").users;

exports.loadUsers = (req, res, next) => {
  User.create(users)
    .then(data => {
      console.log("insert sampleCollection result ", data);
      res.send("Users successfully loaded.");
    })
    .catch(err => {
      console.log("bulk insert sampleCollection error ", err);
    });
};
