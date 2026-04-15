import ApiError from "../utils/api-error.js"

const validate = (DtoClass) => {
    return (req, res, next) => {
        const { data, errors } = DtoClass.validate(req.body)

        if(errors){
            const errorMessage = errors.join("; ")
            if(Array.isArray(errors)){
                const errorMessage = errors.map(err => err.message)
                throw ApiError.badRequest(errorMessage)
            }
            throw ApiError.badRequest(errorMessage)
        }

        req.body = data
        next()
    }
}

export default validate