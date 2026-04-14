import z from "zod"

class BaseDto{
    static schema = z.object({})

    static validate (data){
        const {data: parsedData, error} = this.schema.safeParse(data)

        if(error){
            const errors = error.issues.map(err => err)
            return {data: null, errors}
        }

        return {data: parsedData, errors: null}
    } 
}

export default BaseDto