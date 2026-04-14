class ApiError extends Error{
    statusCode
    isOperational

    constructor(statusCode, message){
        super(statusCode)
        this.message = message
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }

    static conflict(message = "Conflict") {
        return new ApiError(409, message);
    }

    static badRequest(message = "Bad Request") {
        return new ApiError(400, message);
    }

    static unauthorized(message = "Unauthorized") {
        return new ApiError(401, message);
    }

    static forbidden(message = "Forbidden") {
        return new ApiError(403, message);
    }

    static notFound(message = "Not found") {
        return new ApiError(404, message);
    }

    static internal(message = "Internal server error") {
        return new ApiError(500, message);
    }
}

export default ApiError