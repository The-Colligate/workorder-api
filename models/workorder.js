const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var WorkOrderSchema = new Schema({
  loginId: { type: String, required: true },
  workorderId: { type: String, required: true },
  company: {
    type: Schema.Types.ObjectId,
    ref: "company",
    // required: true,
  },
  service: {
    type: String,
    // required: true,
    enum: ["voice", "data"],
  },
  serviceMemo: {
    type: String,
    default: "",
    // required: true,
  },
  sip: {
    type: String,
    default: "",
    // required: true,
  },
  e_one: {
    type: String,
    default: "",
    // required: true,
  },
  mbps: {
    type: String,
    default: "",
    // required: true,
  },
  payment: {
    type: Schema.Types.ObjectId,
    ref: "payment",
    // required: true,
  },
  status: {
    type: String,
    enum: ["approved", "pending", "cancelled"],
    default: "pending",
  },
  stage: {
    type: String,
    enum: ["complete", "incomplete"],
    default: "incomplete",
  },
},
{timestamps:true});

module.exports = WorkOrderSchema = mongoose.model("workorder", WorkOrderSchema);
