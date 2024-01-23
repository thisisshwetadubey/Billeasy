const Order = require("../../model/Order");
const User = require("../../model/User");

class DeleteOrder {
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
      const instance = new DeleteOrder();
      const checkOrder = await instance.checkOrder(req.params.id);

      const Orders = await Order.deleteOne({ _id: id });

      if (Orders.deletedCount !== 1) throw "Failed to delete Order";

      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: "Orders deleted successFully",
      });
    } catch (error) {
      console.log("error 32:", error);
      res.status(400).json({
        statusCode: 400,
        type: "Error",
        error: error.error || error,
      });
    }
  }
}

module.exports = new DeleteOrder();
