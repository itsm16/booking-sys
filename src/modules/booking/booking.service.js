
import { createBooking, getAvailableSeats } from "../../common/config/query-functions.js"

const book = async ({userId, ...seatIds}) => {
    const booking = await createBooking({userId, ...seatIds});
    return booking;
}

const getSeats = async () => {
    const seats = await getAvailableSeats()
    return seats
}

export {
    book,
    getSeats
}