const Order = require("../../model/Order");
const User = require("../../model/User");

class UpdateOrder {
  async checkOrder(id) {
    try {
      const order = await Order.findOne({ _id: id });
      if (!order) throw "Order not found";
      return;
    } catch (error) {
      throw error;
    }
  }
  async process(req, res) {
    try {
      const id = req.params.id;
      const totalAmount = req.body.totalAmount;
      const instance = new UpdateOrder();
      const checkOrder = await instance.checkOrder(id);

      const Orders = await Order.updateOne(
        { _id: id },
        { totalAmount: totalAmount }
      );

      if (Orders.modifiedCount !== 1) throw "Failed to update Order";

      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: "Order updated successFully",
      });
    } catch (error) {
      console.log("error 34:", error)
      res.status(400).json({
        statusCode: 400,
        type: "Error",
        error: error.error || error,
      });
    }
  }
}

module.exports = new UpdateOrder();
