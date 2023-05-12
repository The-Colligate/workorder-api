const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PaymentSchema = new Schema(
  {
    workorder: {
      type: Schema.Types.ObjectId,
      ref: "workorder",
      required: true,
    },
    upload: { type: String, required: false },
    type: { type: String, required: false },
    amount: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = PaymentSchema = mongoose.model("payment", PaymentSchema);
