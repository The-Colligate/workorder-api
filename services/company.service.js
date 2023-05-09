const CompanyRepository = require("../data/company.repository");
const Company = require("../models/company");

exports.addCompany = async (
  name,
  address,
  url,
  cac,
  tin,
  contact_name,
  email
) => {
  let newCustomer = new Company({
    name,
    address,
    url,
    cac,
    tin,
    contact_name,
    email,
  });

  try {
    let client = await CompanyRepository.create(newCustomer);
    return client;
  } catch (err) {
    throw err;
  }
};
