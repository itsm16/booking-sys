
import z from "zod";
import BaseDto from "../../../common/dto/base.dto.js";

class CreateBookingDto extends BaseDto {
    static schema = z.object({
        userId: z.number(),
        seatOne: z.number().min(1, "Seat one must be at least 1").max(32, "Seat one must be at most 32").nonnegative().nonoptional(),
        seatTwo: z.number().min(1, "Seat two must be at least 1").max(32, "Seat two must be at most 32").nonnegative().optional()
    });
}

export { 
    CreateBookingDto
};