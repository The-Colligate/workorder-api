const WorkOrder = require("../models/workorder");
const { errorMessages } = require("../utils/messages");
const CustomError = require("../utils/custom-error");

// A method for getting a user instance by Id
exports.get = async (id) => {
  let existingWorkOrder = await WorkOrder.findOne({ _id: id });
  if (!existingWorkOrder) throw new CustomError("NOT FOUND", 400);
  return existingWorkOrder;
};

exports.create = async (newWorkOrder) => {
  await newWorkOrder.save();
};

exports.update = async (id, updatedOrder, { disableSchema = false } = {}) => {
  try {
    await WorkOrder.findOneAndUpdate({ _id: id }, updatedOrder, {
      strict: !disableSchema,
    });
  } catch (err) {
    throw err;
  }
};
