
import { cancelBookingBySeatId, createBooking, getAvailableSeats, getBookingById, getBookingBySeatId, getBookingByUserId } from "../../common/config/query-functions.js"
import ApiError from "../../common/utils/api-error.js";

const book = async ({userId, seatOne, seatTwo}) => {
    const existingBooking = await getBookingByUserId(userId)

    if(existingBooking.length === 2) {
        throw ApiError.conflict("User has already booked both seats")
    }

    if(existingBooking.length == 1 && seatOne && seatTwo) {
        throw ApiError.conflict("User can only book one more seat")
    }

    if (seatOne && !seatTwo) {
        const booking = await createBooking({userId, seat: seatOne});
        return booking;
    }
    
    const bookOne = await createBooking({userId, seat: seatOne});
    const bookTwo = await createBooking({userId, seat: seatTwo});

    return {bookOne, bookTwo};
}

const getSeats = async () => {
    const seats = await getAvailableSeats()
    return seats
}

const getUserBookings = async (id) => {
    const booking = await getBookingByUserId(id)

    if(!booking) {
        throw ApiError.notFound("Bookings not found")
    }

    return booking
}

const cancelBooking = async (id) => {
    const booking = await getBookingById(id)

    if(!booking) {
        throw ApiError.notFound("Booking not found")
    }

    const deleted = await cancelBookingBySeatId(booking.seat_id)

    return deleted
}

const cancelSeat = async (id) => {
    const booking = await getBookingBySeatId(id)

    if(!booking || (Array.isArray(booking) && booking.length === 0)) {
        throw ApiError.notFound("Booking not found")
    }

    const seat = await cancelBookingBySeatId(id)

    return seat
}

export {
    book,
    getSeats,
    getUserBookings,
    cancelBooking,
    cancelSeat
}