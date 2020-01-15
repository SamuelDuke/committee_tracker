const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  firstName: {
    type: String,
    index: true,
    required: [true, "You must submit a first name."]
  },
  lastName: {
    type: String,
    index: true,
    required: [true, "You must submit a last name."]
  },
  uvid: {
    type: String,
    index: true,
    required: [true, "You must submit a UVID."],
    unique: true
  },
  positionNumber: {
    type: String,
    index: true,
    required: [true, "You must submit a Position Control Number."],
    unique: true
  },
  password: { type: String, required: [true, "You must submit a password."] },
  userRole: {
    type: Number,
    // 0 = all employees, 1 = cabinent sponser, 2 = cheif of staff
    min: 0,
    max: 2,
    default: 0
  },
  fullNameSearch: {
    type: Array,
    index: true
  }
});

UserSchema.index({
  firstName: "text",
  lastName: "text",
  uvid: "text",
  positionNumber: "text",
  fullNameSearch: "text"
});

// methods ======================

// generating a hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// info to send
UserSchema.methods.infoToSend = function() {
  return {
    name: `${this.firstName} ${this.lastName}`,
    userRole: this.userRole,
    uvid: this.uvid,
    _id: this._id
  };
};

UserSchema.pre("save", function(next) {
  let user = this;
  user.fullNameSearch = [
    `${user.firstName} ${user.lastName}`,
    `${user.lastName} ${user.firstName}`,
    `${user.firstName}, ${user.lastName}`,
    `${user.lastName}, ${user.firstName}`
  ];

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  user.password = user.generateHash(user.password);
  next();
});

module.exports = mongoose.model("User", UserSchema);
