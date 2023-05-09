const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CompanySchema = new Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  url: { type: String, required: true, trim: true },
  cac: { type: String, unique: true, required: true, trim: true },
  tin: { type: String, unique: true, required: true, trim: true },
  contact_name: { type: String, unique: true, required: true, trim: true },
  email: { type: String, required: true, unique: true },
});

module.exports = CompanySchema = mongoose.model("company", CompanySchema);
