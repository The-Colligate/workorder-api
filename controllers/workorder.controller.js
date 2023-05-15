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

exports.getWorkOrderNoAuth = async (req, res, next) => {
  try {
    const { id } = req.query;
    let order = await WorkOrderRepository.get(id);
    res.json({ order: order });
  } catch (error) {
    next(error);
  }
};

exports.getAllWorkOrder = async (req, res, next) => {
  try {
    let workorders = await WorkOrderRepository.getAll();
    res.json(workorders);
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

exports.getPayment = async (req, res, next) => {
  const { id } = req.query;
  try {
    let payment = await WorkOrderRepository.getAPayment(id);
    res.json({ payment: payment });
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
    sip,
    e_one,
    mbps,
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
      amount,
      sip,
      e_one,
      mbps
    );
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.approve = (req, res, next) => {
  const { orderId } = req.query;
  try {
    let order = WorkOrderService.approveWorkOrder(orderId);
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.EVCapprove = (req, res, next) => {
  const { orderId } = req.query;
  try {
    let order = WorkOrderService.EVCapproveWorkOrder(orderId);
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.cancel = (req, res, next) => {
  const { orderId } = req.query;
  try {
    let order = WorkOrderService.denyWorkOrder(orderId);
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.redo = (req, res, next) => {
  const { orderId } = req.query;
  try {
    let order = WorkOrderService.redoWorkOrder(orderId);
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.mail = (req, res, next) => {
  const { email } = req.body;

  try {
    let mailer = WorkOrderService.sendMail(email);
    res.json(mailer);
  } catch (err) {
    next(err);
  }
};
