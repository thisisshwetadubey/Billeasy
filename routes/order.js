const express  = require("express")
const router = express.Router()
const protect = require("../middleware/authMiddleware").process


//Health check Router
router.post("/create", protect,require("../controllers/order/create").process)
router.get("/fetchOrder/:id", protect,require("../controllers/order/getAllOrder").process)
router.get("/singleOrder/:id", protect,require("../controllers/order/getSingleOrder").process)
router.put("/updateOrder/:id", protect,require("../controllers/order/updateOrder").process)
router.delete("/deleteOrder/:id", protect,require("../controllers/order/deleteOrder").process)






module.exports  = router