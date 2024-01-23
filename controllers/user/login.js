const User = require("../../model/User");
const Validation = require("../../util/validator");
const jsonSchema = require("../../jsonSchema/user/login");
const bcrypt = require("bcryptjs");
const setToken = require("../../util/setToken");
const loginUser = require("../../jsonSchema/user/login");

class Login {
  async checkUser(email) {
    try {
      const isUser = await User.findOne({ email });
      if (!isUser) throw "Email is invalid!";
      return isUser;
    } catch (error) {
      throw error;
    }
  }
  async process(req, res) {
    try {
      Validation(req.body, jsonSchema);
      const { email, password } = req.body;

      const instance = new Login();
      const isUser = await instance.checkUser(email);

      const validPassword = await bcrypt.compare(password, isUser.password);
      if (!validPassword) throw "Password does not match";

      const token = setToken(res, isUser._id);

      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: "Logged in successfully!",
      });
    } catch (error) {
      console.log("error 37:", error)
      res.status(400).json({
        statusCode: 400,
        type: "Error",
        error: error.error || error,
      });
    }
  }
}

module.exports = new Login();
