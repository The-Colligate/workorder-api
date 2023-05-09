const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PaymentSchema = new Schema({
  workorder: {
    type: Schema.Types.ObjectId,
    ref: "workorder",
    required: true,
  },
  upload: { type: String, required: true, enum: ["voice", "data"] },
  type: { type: String, required: true, enum: ["cheque", "deposit slip"] },
  amount: { type: String, required: true },
});

module.exports = PaymentSchema = mongoose.model("payment", PaymentSchema);
