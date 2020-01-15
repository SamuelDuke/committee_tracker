const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoverningBodySchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "You must submit a title."]
  }
});

module.exports = mongoose.model("GoverningBody", GoverningBodySchema);
