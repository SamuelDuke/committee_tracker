const _ = require("lodash");
const User = require("../data_models/user");

exports.getAllUsers = (req, res, next) => {
  User.find()
    .exec()
    .then(users => {
      const usersToSend = users.map(user => {
        return user.infoToSend();
      });
      return res.json(_.mapKeys(usersToSend, "_id"));
    })
    .catch(err => {
      console.log(err);
      return res.json({ err: true, errMsg: err });
    });
};

exports.getSearchUsers = (req, res, next) => {
  const { searchTerm } = req.params;

  User.find({
    $or: [
      { firstName: { $regex: searchTerm, $options: "i" } },
      { lastName: { $regex: searchTerm, $options: "i" } },
      { uvid: { $regex: searchTerm, $options: "i" } },
      { fullName: { $regex: searchTerm, $options: "i" } }
    ]
  })
    .exec()
    .then(users => {
      const usersToSend = users.map(user => {
        return user.infoToSend();
      });

      // return res.json(_.mapKeys(usersToSend, "_id"));
      return res.json(usersToSend);
    })
    .catch(err => {
      console.log(err);
      return res.json({ err: err });
    });
};

// exports.getSearchUsers = (req, res, next) => {
//   const { searchTerm } = req.params;

//   User.find({
//     $or: [
//       { firstName: { $regex: searchTerm, $options: "i" } },
//       { lastName: { $regex: searchTerm, $options: "i" } },
//       { uvid: { $regex: searchTerm, $options: "i" } }
//     ]
//   })
//     .exec()
//     .then(users => {
//       const usersToSend = users.map(user => {
//         return user.infoToSend();
//       });

//       return res.json(_.mapKeys(usersToSend, "_id"));
//     })
//     .catch(err => {
//       console.log(err);
//       return res.json({ err: err });
//     });
// };

// exports.getSearchUsers = (req, res, next) => {
//   const { searchTerm } = req.params;

//   User.find(
//     { $text: { $search: searchTerm } },
//     { score: { $meta: "textScore" } }
//   )
//     .sort({ score: { $meta: "textScore" } })
//     .exec()
//     .then(users => {
//       const usersToSend = users.map(user => {
//         return user.infoToSend();
//       });

//       return res.json(_.mapKeys(usersToSend, "_id"));
//     })
//     .catch(err => {
//       console.log(err);
//       return res.json({ err: err });
//     });
// };
