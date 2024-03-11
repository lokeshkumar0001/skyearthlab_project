/* eslint-disable no-useless-catch */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Username can't be blank"],
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9_-]{3,20}$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid username! Must be 3 to 20 characters, alphanumeric, underscores, and hyphens allowed.`,
      },
      index: true,
    },
    firstName: {
      type: String,
      min: 3,
      max: 10,
      required: [true, "Enter firstname"],
    },
    lastName: {
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
    password: {
      type: String,
      required: true,
    },
    customers: [{
      type: mongoose.ObjectId,
      ref: 'Customer',
    }]
  },
  { timestamps: true }
);

userSchema.statics.findUserByName = function (username) {
  return this.where({ username: new RegExp(username, "i") });
};

userSchema.methods.validatePass = async function (password) {
  try {
    const user = await this.model("User")
      .findOne({ _id: this._id })
      .select("+password");
    if (!user) {
      throw new Error("User not found");
    }

    return await bcrypt.compare(password, user.password);
  } catch (error) {
    throw error;
  }
};

userSchema.methods.generateJwt = async function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

userSchema.methods.toAuthJson = async function () {
  try {
    const token = await this.generateJwt();
    return {
      success: true,
      username: this.username,
      email: this.email,
      token: token,
    };
  } catch (error) {
    throw error;
  }
};

userSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel = new mongoose.model("User", userSchema);

module.exports = UserModel;
