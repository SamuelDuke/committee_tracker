const _ = require("lodash");
const Committee = require("../data_models/committee");

const arrayToObject = (array, key) => {
  return _.mapKeys(array, key);
};

exports.create = (req, res, next) => {
  const {
    title,
    chair,
    startDate,
    endDate,
    purpose,
    sponsor,
    delegatedAuthority,
    authorityBody,
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

  const obJectToList = (object, valueKey) => {
    const keys = Object.keys(object);
    return keys.map(key => {
      return { label: object[key].label, value: object[key].value[valueKey] };
      // return object[key];
    });
  };

  const newChair = { label: chair.label, value: chair.value.positionNumber };

  Committee({
    title,
    chair: newChair,
    startDate,
    endDate,
    purpose,
    sponsor,
    delegatedAuthority,
    authorityBody,
    standing,
    assignments: assignmentsToList(assignments),
    members: obJectToList(members, "positionNumber")
  })
    .save()
    .then(committee => {
      return res.json(committee);
    })
    .catch(err => console.log(err));
};

// exports.getMyCommittees = (req, res, next) => {
//   Committee.find({ "chair.value": req.user.positionNumber })
//     .exec()
//     .then(myCommittees => {
//       const newCommittees = myCommittees.map(committee => {
//         return {
//           ...committee,
//           ["members"]: arrayToObject(committee.members, "_id")
//         };
//       });
//       return res.json(newCommittees);
//       // return res.json(arrayToObject(myCommittees, "_id"));
//     })
//     .catch(err => console.log(err));
// };

exports.getMyCommittees = (req, res, next) => {
  Committee.find({ "chair.value": req.user.positionNumber })
    .exec()
    .then(myCommittees => {
      return res.json(myCommittees);
      // return res.json(arrayToObject(myCommittees, "_id"));
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
    .then(charters => {
      return res.json(charters);
    })
    .catch(err => {
      return res.json({ msg: "There was an error", error: err });
    });
};
