const User = require("../../model/User");

class DeleteUser {
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
      const instance = new DeleteUser();
      const checkUser = await instance.check(req.params.id);

      const deleteUser = await User.deleteOne(
        { _id: id },
      );

      if (deleteUser.deletedCount !== 1) throw "Failed to delete Order";

      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: "User deleted successFully",
      });
    } catch (error) {
      console.log("error 31:", error)
      res.status(400).json({
        statusCode: 400,
        type: "Error",
        error: error.error || error,
      });
    }
  }
}

module.exports = new DeleteUser();
