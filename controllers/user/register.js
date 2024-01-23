const User = require("../../model/User");
const bcrypt = require("bcryptjs");
const Validation = require("../../util/validator");
const jsonSchema = require("../../jsonSchema/user/register");
const setToken = require("../../util/setToken");

class RegisterUser {
  async checkUser(email) {
    try {
      const isUser = await User.findOne({ email });
      if (isUser) throw "User already exists";
      return;
    } catch (error) {
      throw error;
    }
  }

  async process(req, res) {
    try {
      Validation(req.body, jsonSchema);
      const { username, email, password } = req.body;
      const instance = new RegisterUser();
      const isUser = await instance.checkUser(email);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const registered = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      if (!registered) throw "Failed to register";
      const token = setToken(res, registered._id);

      res.status(201).json({
        statusCode: 201,
        type: "Success",
        data: "User signed up!",
      });
    } catch (error) {
      console.log("error 43:", error)
      res.status(400).json({
        statusCode: 400,
        type: "Error",
        error: error.error || error,
      });
    }
  }
}

module.exports = new RegisterUser();
