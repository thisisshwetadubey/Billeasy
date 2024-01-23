class Health{
    async process(req, res){
        try {
            res.status(200).json({
                statusCode : 200,
                type: "Success",
                data: "Server is healthy"
            })
        } catch (error) {
            res.status(400).json({
                statusCode: 400,
                type: "Error",
                error: error.error || error
            })
            
        }
    }
}

module.exports = new Health()