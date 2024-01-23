const express  = require("express")
const router = express.Router()


//Health check Router
router.get("/", require("../controllers/health/health").process)


module.exports  = router