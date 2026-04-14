class ApiResponse {

    static ok(res, message = "Executed Successfully", data){
        return res.status(200).json({message, data})
    }

    static notFound(res, message = "Executed Successfully", data){
        return res.status(404).json({message, data})
    }
}

export default ApiResponse