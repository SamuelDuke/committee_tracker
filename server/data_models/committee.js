const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
  discription: { type: String },
  deliverable: { type: String },
  dueDate: { type: Date }
});

const SelectSchema = new Schema({
  value: { type: String },
  label: { type: String }
});

const CommitteeSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "You must submit a title."]
  },
  chair: {
    type: SelectSchema,
    required: [true, "You must submit a chair."]
  },
  startDate: { type: Date, required: [true, "You must submit a start date."] },
  endDate: { type: Date },
  purpose: { type: String, required: [true, "You must submit a purpose."] },
  authorityBody: {
    type: SelectSchema,
    required: [
      true,
      "You must submit a the decison making athority of the committtee."
    ]
  },
  sponsor: {
    type: SelectSchema,
    required: [true, "You must submit a Sponser."]
  },
  delegatedAuthority: {
    type: String
  },
  standing: { type: Boolean, default: false },
  assignments: [AssignmentSchema],
  members: [SelectSchema],
  sponserApproved: { type: Boolean, default: false }
});

module.exports = mongoose.model("Committee", CommitteeSchema);
