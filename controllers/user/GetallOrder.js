const Order = require("../../model/Order");
const User = require("../../model/User");

class GetallOrder {
  
  async process(req, res) {
    try {

      const Orders = await User.aggregate([
        {
            $lookup: {
                from: "Order",
                localField: "_id",
                foreignField: "userId",
                as :  "orders"
            }
        }
      ]);
      if (!Orders) throw "Failed to get Orders";

      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: Orders,
      });
    } catch (error) {
      console.log("error 27:", error)
      res.status(400).json({
        statusCode: 400,
        type: "Error",
        error: error.error || error,
      });
    }
  }
}

module.exports = new GetallOrder();
