const WorkOrder = require("../models/workorder");
const Payment = require("../models/payment");
const { errorMessages } = require("../utils/messages");
const CustomError = require("../utils/custom-error");

// A method for getting a workorder instance by Id
exports.get = async (id) => {
  let existingWorkOrder = await WorkOrder.findOne({ _id: id }).populate({
    model: "company",
    path: "company",
  });
  if (!existingWorkOrder) throw new CustomError("NOT FOUND", 400);
  return existingWorkOrder;
};

exports.getAll = async () => {
  let workOrders = await WorkOrder.find().populate({
    model: "company",
    path: "company",
  }).populate({
    model:"payment",
    path:"payment"
  });
  if (!workOrders) throw new CustomError("NOT FOUND", 400);
  return workOrders;
};

// A method for getting a workorder instance by Id
exports.getAPayment = async (id) => {
  let existingPayment = await Payment.findOne({ _id: id });
  if (!existingPayment) throw new CustomError("NOT FOUND", 400);
  return existingPayment;
};

exports.create = async (newWorkOrder) => {
 return await newWorkOrder.save();
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
