/* eslint-disable no-unused-vars */
module.exports.errorHandler = (err, req, res, next) => {
  //Handling validation
  if (err.name === "ValidationError") {
    const errors = {};

    // Extract all error messages for each field
    for (const field in err.errors) {
      errors[field] = err.errors[field].message;
    }

    return res.json({ error: "Validation failed", errors });
  }

  // Handling MongoDB duplicate key error (code 11000)
  if (err.code === 11000) {
    const duplicatedField = Object.keys(err.keyValue)[0];
    return res.json({
      success: false,
      error: `${duplicatedField} is already taken`,
    });
  }

  res.json({ success:false, error: err.message });
};
