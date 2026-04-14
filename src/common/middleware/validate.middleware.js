
const validate = (DtoClass) => {
    return (req, res, next) => {
        const { data, errors } = DtoClass.validate(req.body)

        if(errors){
            const errorMessage = errors.join("; ")
            // throw ApiError.badReuqest("", errorMessage)
        }

        req.body = data
        next()
    }
}

export default validate