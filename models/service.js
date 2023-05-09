const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ServiceSchema = new Schema({
  name: { type: String, required: true, enum: ["voice", "data"] },
});

module.exports = ServiceSchema = mongoose.model("service", ServiceSchema);
