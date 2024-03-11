const UserModel = require("../models/userModel");

/**
 * Resgister user
 * @date 3/9/2024 - 12:24:41 AM
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {created user}
 */

module.exports.register = async (req, res, next) => {
  try {
    let user = new UserModel();
    user.username = req.body.username;
    user.email = req.body.email;
    user.firstName = req.body.firstname;
    user.lastName = req.body.lastname;
    user.password = req.body.password;

    await user.save();
    const userJson = await user.toAuthJson();

    return res.json(userJson);
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 * @date 3/9/2024 - 12:33:31 AM
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {user object}
 */

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if both filed are not emoty
    if (!email || !password) {
      return res.json({
        success: false,
        error: "Enter email or password to continue",
      });
    }

    //Finding the user using it's email
    const user = await UserModel.findOne({ email });

    if (user) {
      const isValid = await user.validatePass(password);

      if (isValid) {
        const userJson = await user.toAuthJson();

        res.json(userJson);
      } else {
        res.json({
          success: false,
          error: "Enter correct password",
        });
      }
    } else {
      res.json({
        success: false,
        error: "Invalid user",
      });
    }
  } catch (error) {
    next(error);
  }
};
/**
 * Get Active user details
 * @date 3/9/2024 - 12:39:05 AM
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {unknown}
 */

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.payload.id).select('-password');
    if (!user) {
      return res.sendStatus(401);
    }
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.payload.id;
    const updateFields = req.body;
    
    // Using findByIdAndUpdate method
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateFields, { new: true }).select('-password')

    if (!updatedUser) {
      // If no user is found
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.json({ success: true, message: "Info Updated!", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    next(error);
  }
};


module.exports.logoutUser = async (req, res, next) => {
  try {
    const userId = req.payload.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(401)
        .json({
          success: false,
          message: "User not found or not authenticated",
        });
    }
    return res.json({ success: true, message: "user logged out", token: null });
  } catch (error) {
    next(error);
  }
};
