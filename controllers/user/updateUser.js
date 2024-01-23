const User = require("../../model/User");

class UpdateUser {
  async check(id) {
    try {
      const user = await User.findOne({ _id: id });
      if (!user) throw "User not found";
      return;
    } catch (error) {
      throw error;
    }
  }
  async process(req, res) {
    try {
      const id = req.params.id;
      const update = {}
      if(req.body.email) update.email = req.body.email
      if(req.body.username) update.username = req.body.username

      const instance = new UpdateUser();
      const checkUser = await instance.check(req.params.id);

      const updatedUser = await User.updateOne(
        { _id: id },
        { $set: update }
      );

      if (updatedUser.modifiedCount !== 1) throw "Failed to update User";

      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: "User updated successFully",
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

module.exports = new UpdateUser();
