
import z from "zod";
import BaseDto from "../../../common/dto/base.dto.js";

class CreateBookingDto extends BaseDto {
    static schema = z.object({
        userId: z.number(),
        seatIds: z.array(z.number(), {maxItems: 2})
    });
}

export default CreateBookingDto;