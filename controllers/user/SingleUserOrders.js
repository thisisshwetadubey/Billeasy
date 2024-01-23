const Order = require("../../model/Order");
const User = require("../../model/User");

class SingleUserOrders {
  async checkUser(id) {
    try {
      const isUser = await User.findOne({ _id: id });
      if (!isUser) throw "User not found";
      return;
    } catch (error) {
      throw error;
    }
  }
  async process(req, res) {
    try {
      const instance = new SingleUserOrders();
      const isUser = await instance.checkUser(req.params.id);

      const Orders = await User.aggregate([
        {
          $match: {
            _id: req.params.id,
          },
        },
        {
          $lookup: {
            from: "Order",
            localField: "_id",
            foreignField: "userId",
            as: "orders",
          },
        },
      ]);
      if (!Orders) throw "Failed to get Orders";

      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: Orders,
      });
    } catch (error) {
      console.log("error 44:", error);
      res.status(400).json({
        statusCode: 400,
        type: "Error",
        error: error.error || error,
      });
    }
  }
}

module.exports = new SingleUserOrders();
