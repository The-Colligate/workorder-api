const WorkOrder = require("../models/workorder");
const Payment = require("../models/payment");
const { errorMessages } = require("../utils/messages");
const CustomError = require("../utils/custom-error");

// A method for getting a user instance by Id
exports.get = async (id) => {
  let existingWorkOrder = await WorkOrder.findOne({ _id: id }).populate({
    model: "company",
    path: "company",
  });
  if (!existingWorkOrder) throw new CustomError("NOT FOUND", 400);
  return existingWorkOrder;
};

exports.create = async (newWorkOrder) => {
  await newWorkOrder.save();
};

exports.update = async (id, updatedOrder, { disableSchema = false } = {}) => {
  try {
    return await WorkOrder.findOneAndUpdate({ _id: id }, updatedOrder, {
      strict: !disableSchema,
    });
  } catch (err) {
    throw err;
  }
};

exports.updatePayment = async (
  id,
  updatedPayment,
  { disableSchema = false } = {}
) => {
  try {
    return await Payment.findOneAndUpdate({ _id: id }, updatedPayment, {
      strict: !disableSchema,
    });
  } catch (err) {
    throw err;
  }
};
