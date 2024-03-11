const mongoose = require("mongoose");

// name, surname, age, date of birth (DOB), and email address.

const customerSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        min: 3,
        max: 10,
        required: [true, "Enter firstname"],
      },
      surname: {
        type: String,
        min: 3,
        max: 10,
        required: [true, "Enter you last name"],
      },
      age: {
        type: Number,
        min: 1,
        max: 150, // Assuming a reasonable maximum age
      },
      dob: {
        type: Date,
      },
      email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        match: [/\S+@\S+\.\S+/, "is invalid"],
        index: true,
      },
      user: {
        type: mongoose.ObjectId,
        ref: 'User'
      }
    },
    { timestamps: true }
  );

const CustomerModel = new mongoose.model("Customer", customerSchema);

module.exports = CustomerModel;