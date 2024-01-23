const Order = require("../../model/Order");
const User = require("../../model/User");

class GetallOrder {
 
  async process(req, res) {
    try {
      const instance = new GetallOrder();

      const Orders = await Order.find();
      if (!Orders) throw "Failed to get Orders";

      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: Orders,
      });
    } catch (error) {
      console.log("error 28:", error)
      res.status(400).json({
        statusCode: 400,
        type: "Error",
        error: error.error || error,
      });
    }
  }
}

module.exports = new GetallOrder();
