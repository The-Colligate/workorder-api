const UserRepository = require("../data/user.repository");
const WorkOrderRepository = require("../data/workorder.repository");
const CompanyRepository = require("../data/company.repository");
const WorkOrderService = require("../services/workorder.service");

exports.getWorkOrder = async (req, res, next) => {
  try {
    let user = await WorkOrderRepository.get(req.user._id);
    res.json({ user: user });
  } catch (error) {
    next(error);
  }
};

exports.getCompany = async (req, res, next) => {
  const { id } = req.query;
  try {
    let company = await CompanyRepository.get(id);
    res.json({ company: company });
  } catch (error) {
    next(error);
  }
};

exports.initWorkOrder = (req, res, next) => {
  let { service } = req.body;
  try {
    let order = WorkOrderService.initiateWorkOrder(service);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.continue = (req, res, next) => {
  const {
    orderId,
    name,
    address,
    url,
    cac,
    tin,
    contact_name,
    email,
    serviceMemo,
    upload,
    type,
    amount,
  } = req.body;
  try {
    let order = WorkOrderService.continueWorkOrder(
      orderId,
      name,
      address,
      url,
      cac,
      tin,
      contact_name,
      email,
      serviceMemo,
      upload,
      type,
      amount
    );
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.approve = (req, res, next) => {
  const { orderId } = req.body;
  try {
    let order = WorkOrderService.approveWorkOrder(orderId);
    res.json(order);
  } catch (err) {
    next(err);
  }
};
