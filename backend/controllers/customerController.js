const CustomerModel = require("../models/customerModel");
const UserModel = require("../models/userModel");

module.exports.createCustomer = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.payload.id);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    let customer = new CustomerModel(req.body);
    customer.user = req.payload.id;
    await customer.save();

    return res.json({
      success: true,
      message: "Customer created!",
      customer,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateCustomer = async (req, res, next) => {
  try {
    const userId = req.payload.id;
    const customerId = req.params.customerId;

    const customer = await CustomerModel.findOne({ _id: customerId, user: userId });

    if (!customer) {
      return res.status(404).json({ success: false, error: "Customer not found or does not belong to the user" });
    }

    // Update customer data
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(customerId, req.body, { new: true });

    return res.json({
      success: true,
      message: "Customer updated!",
      updatedCustomer,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getMyCustomer = async (req, res, next) => {
  try {
    const customers = await CustomerModel.find({ user: req.payload.id });

    return res.json({
      success: true,
      messagae: "Fetched All customers",
      customers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCustomer = async (req, res, next) => {
    try {
      const userId = req.payload.id; // Assuming the user information is attached by your authentication middleware
      const customerId = req.params.customerId; // Assuming the customer ID is passed as a parameter
  
      // Check if the customer belongs to the logged-in user
      const customer = await CustomerModel.findOne({ _id: customerId, user: userId });
  
      if (!customer) {
        return res.status(404).json({ success: false, error: "Customer not found or does not belong to the user" });
      }
  
      // Delete the customer
      await CustomerModel.deleteOne({ _id: customerId });
  
      return res.json({
        success: true,
        message: "Customer deleted!",
      });
    } catch (error) {
      next(error);
    }

}