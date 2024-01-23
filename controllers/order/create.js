const Order  = require("../../model/Order")
const validation = require("../../util/validator")
const jsonSchema = require("../../jsonSchema/order/create");

class Create{

    async process(req, res){
        try {
            validation(req.body, jsonSchema)

            
            const {totalAmount } = req.body
            const newOrder = await Order.create({
                userId: req.user._id,  
                 totalAmount
            })

            if(newOrder.length == 0){
                throw "Failed to create order"
            }
            res.status(201).json({
                statusCode: 201,
                type: "Success",
                data: "Order generated successFully!",
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

module.exports = new Create()


