const Order = require("../../model/Order");

class GetSingleOrder {
 
  async process(req, res) {
    try {
      const instance = new GetallOrder();

      const Orders = await Order.findOne({ _id: req.params.id });
      if (!Orders) throw "Failed to get Orders";

      res.status(201).json({
        statusCode: 201,
        type: "Success",
        data: Orders,
      });
    } catch (error) {
      console.log("🚀  error:", error)
      res.status(400).json({
        statusCode: 400,
        type: "Error",
        error: error.error || error,
      });
    }
  }
}

module.exports = new GetSingleOrder();
