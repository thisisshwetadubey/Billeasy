const express  = require("express")
const router = express.Router()
const protect = require("../middleware/authMiddleware").process


router.post("/register", require("../controllers/user/register").process)
router.post("/login", require("../controllers/user/login").process)
router.get("/usersOrder", protect,require("../controllers/user/GetallOrder").process)
router.get("/singleUserOrder/:id", protect,require("../controllers/user/SingleUserOrders").process)
router.put("/updateUser/:id", protect,require("../controllers/user/updateUser").process)
router.delete("/deleteUser/:id", protect, require("../controllers/user/deleteUser").process)



module.exports  = router