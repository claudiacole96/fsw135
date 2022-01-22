const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  issueText: {
      type: String,
      required: true,
  },
  dateCreated: {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model("Issue", issueSchema);