const Company = require("../models/company");
const { errorMessages } = require("../utils/messages");
const CustomError = require("../utils/custom-error");

// A method for getting a user instance by Id
exports.get = async (id) => {
  let existingCompany = await Company.findOne({ _id: id });
  if (!existingCompany)
    throw new CustomError(errorMessages.ACCOUNT_NOT_FOUND, 400);
  return existingCompany;
};

exports.create = async (newCompany) => {
  const customer = await newCompany.save();
  return customer;
};
