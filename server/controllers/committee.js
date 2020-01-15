const Committee = require("../data_models/committee");

const User = require("../data_models/user");
const GoverningBody = require("../data_models/governingBody");

exports.create = (req, res, next) => {
  const {
    title,
    chair,
    startDate,
    endDate,
    purpose,
    sponser,
    decisionMakeingAthority,
    governingBody,
    standing,
    assignments,
    members
  } = req.body;

  const assignmentsToList = object => {
    const keys = Object.keys(object);

    return keys.map(key => {
      return object[key];
    });
  };

  const membersToList = object => {
    const keys = Object.keys(object);

    return keys.map(key => {
      return object[key]._id;
    });
  };

  User.findOne({ uvid: chair })
    .exec()
    .then(chairId => {
      Committee({
        title,
        chair,
        startDate,
        endDate,
        purpose,
        sponser,
        decisionMakeingAthority,
        governingBody,
        standing,
        assignments: assignmentsToList(assignments),
        members: membersToList(members)
      })
        .save()
        .then(charter => {
          return res.json(charter);
        })
        .catch(err => {
          console.error(err);
          return res.json({ msg: "There was an error", error: err });
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getMyCommittees = (req, res, next) => {
  Committee.find({ chair: req.user._id })
    .populate("chair", "firstName lastName")
    .exec()
    .then(myCommittees => {
      return res.json(myCommittees);
    })
    .catch(err => console.log(err));
};

exports.getApprovalNeededCommittees = (req, res, next) => {
  Committee.find({ approved: false })
    .exec()
    .then(committees => {
      return res.json(committees);
    })
    .catch(err => console.log(err));
};

exports.getAllCommittee = (req, res, next) => {
  Committee.find()
    .populate("chair", "firstName lastName")
    .then(charters => {
      return res.json(charters);
    })
    .catch(err => {
      return res.json({ msg: "There was an error", error: err });
    });
};
