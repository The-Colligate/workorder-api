const WorkOrderRepository = require("../data/workorder.repository");
const WorkOrder = require("../models/workorder");
const Company = require("../models/company");
const CompanyService = require("../services/company.service");
const Payment = require("../models/payment");

function generateLoginCode() {
  // generate a random 4-digit number
  const randomNumber = Math.floor(Math.random() * 10000);

  // add leading zeros if necessary
  const formattedNumber = randomNumber.toString().padStart(4, "0");

  // combine the prefix and the number
  const result = "WO" + formattedNumber;

  return result;
}

exports.initiateWorkOrder = async (service) => {
  // Define the prefix and starting number
  const prefixData = "D21CTL";
  const prefixVoice = "V21CTL";
  const startingNumber = 1;

  // Generate a 4-digit number with leading zeroes
  function generateNumber(num) {
    return num.toString().padStart(4, "0");
  }
  let orderId;

  if (service === "voice") {
    orderId = prefixVoice + generateNumber(startingNumber);
  } else if (service === "data") {
    orderId = prefixData + generateNumber(startingNumber);
  }

  let newWorkOrder = new WorkOrder({
    loginId: generateLoginCode(),
    workorderId: orderId,
    service,
  });

  try {
    let worder = await WorkOrderRepository.create(newWorkOrder);
    return worder;
  } catch (err) {
    throw err;
  }
};

exports.continueWorkOrder = async (
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
) => {
  let existingOrder = await WorkOrderRepository.get(orderId);
  let onCreateCompany;
  let onPayment;
  let newUpdate;
  let payId = existingOrder.payment;

  if (!existingOrder.company) {
    onCreateCompany = await CompanyService.addCompany(
      name,
      address,
      url,
      cac,
      tin,
      contact_name,
      email
    );
  } //write an update for company here

  if (!payId) {
    onPayment = await this.workOrderPayment(orderId, upload, type, amount);
  } else {
    await WorkOrderRepository.updatePayment(payId, { upload, type, amount });
  }

  // console.log("create company", onCreateCompany);
  // console.log("company", existingOrder);
  // console.log("payment", onPayment);

  try {
    let orderToUpdate = {};
    if (onCreateCompany) {
      orderToUpdate = { ...orderToUpdate, company: onCreateCompany };
    }
    if (onPayment) {
      orderToUpdate = { ...orderToUpdate, payment: onPayment };
    }
    if (serviceMemo) {
      orderToUpdate = { ...orderToUpdate, serviceMemo };
    }
    if (sip) {
      orderToUpdate = { ...orderToUpdate, sip };
    }
    if (e_one) {
      orderToUpdate = { ...orderToUpdate, e_one };
    }
    if (mbps) {
      orderToUpdate = { ...orderToUpdate, mbps };
    }
    // let order = await WorkOrderRepository.update(orderId, newWorkOrder);
    if (Object.keys(orderToUpdate).length) {
      newUpdate = await WorkOrderRepository.update(orderId, orderToUpdate);
    }

    if (
      existingOrder.company &&
      existingOrder.payment &&
      existingOrder.serviceMemo
    ) {
      await WorkOrderRepository.update(orderId, { stage: "complete" });
    }
    return newUpdate;
  } catch (err) {
    throw err;
  }
};

exports.workOrderPayment = async (orderId, upload, type, amount) => {
  try {
    let payment = await Payment.find();

    payment = new Payment({
      workorder: orderId,
      upload,
      type,
      amount,
    });

    await payment.save();
    return payment;
  } catch (err) {
    throw err;
  }
};

exports.approveWorkOrder = async (orderId) => {
  try {
    // let existingOrder = await WorkOrderRepository.get(orderId);
    await WorkOrderRepository.update(orderId, { status: "approved" });
  } catch (err) {
    throw err;
  }
};

exports.newWorkOrder = async (
  id,
  workorderId,
  company,
  service,
  serviceMemo,
  payment,
  status,
  stage
) => {
  // Define the prefix and starting number
  const prefixData = "D21CTL";
  const prefixVoice = "V21CTL";
  const startingNumber = 1;

  // Generate a 4-digit number with leading zeroes
  function generateNumber(num) {
    return num.toString().padStart(4, "0");
  }

  let orderId;

  if (service === "voice") {
    orderId = prefixVoice + generateNumber(startingNumber);
  } else if (service === "data") {
    orderId = prefixData + generateNumber(startingNumber);
  }

  //   execute create company function
  let onCreateCompany = await CompanyService.addCompany();
  // pass id to new WorkOrder()

  let newWorkOrder = new WorkOrder({
    workorderId: orderId,
    company,
    service,
    serviceMemo,
    payment,
    status,
    stage,
  });

  try {
    let order = await WorkOrderRepository.create(newWorkOrder);
    return order;
  } catch (err) {
    throw err;
  }
};
