import z from "zod";
import BaseDto from "../../../common/dto/base.dto.js";

class LoginDto extends BaseDto{
    static schema = z.object({
        email: z.email("Email is required").nonoptional(),
        password: z.string("Password is required").nonoptional()
    })
}

class RegisterDto extends BaseDto{
    static schema = z.object({
        name: z.string("Name is required").nonoptional(),
        email: z.email("Valid email is required").nonoptional(),
        password: z.string("Password must be at least 6 characters").min(6).nonoptional()
    })
}

export {
    LoginDto,
    RegisterDto
}