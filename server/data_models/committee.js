const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
  discription: { type: String },
  deliverable: { type: String },
  dueDate: { type: Date }
});

const CommitteeSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "You must submit a title."]
  },
  chair: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "You must submit a chair."]
  },
  startDate: { type: Date, required: [true, "You must submit a start date."] },
  endDate: { type: Date },
  purpose: { type: String, required: [true, "You must submit a purpose."] },
  decisionMakeingAthority: {
    type: String,
    required: [
      true,
      "You must submit a the decison making athority of the committtee."
    ]
  },
  sponser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "You must submit a vpSponser."]
  },
  governingBody: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GoverningBody",
    required: [true, "You must submit a governing body."]
  },
  standing: { type: Boolean, default: false },
  assignments: [AssignmentSchema],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  sponserApproved: { type: Boolean, default: false }
});

module.exports = mongoose.model("Committee", CommitteeSchema);
