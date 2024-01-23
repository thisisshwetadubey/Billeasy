const mongoose = require("mongoose")


class MongoDB{
    async connectDB(){
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI)
            console.log("Mongodb connected");
        } catch (error) {
            console.log("Error while connecting database");
            process.exit(1)
        }
    }
}

module.exports = new MongoDB()