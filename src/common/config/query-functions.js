import ApiError from "../utils/api-error.js";
import { pool } from "./db.js"

const getUserByEmail = async (email) => {
    const conn = await pool.connect();
    const sql = "SELECT * FROM users WHERE email = $1";
    const result = await conn.query(sql, [email]);
    return result.rows[0];
}

const getUserById = async (id) => {
    const conn = await pool.connect();
    const sql = "SELECT * FROM users WHERE id = $1";
    const result = await conn.query(sql, [id]);
    return result.rows[0];
}

const createUser = async ({name, email, password}) => {
    const conn = await pool.connect();
    await conn.query("BEGIN");

    const sql = "INSERT into users (name, email, password) values ($1, $2, $3)";
    const result = await conn.query(sql, [name, email, password]);
    await conn.query("COMMIT");

    return result.rows[0];
}

// Bokoking functions
const getBookingByUserId = async (id) => {
    const conn = await pool.connect();
    const sql = "SELECT * FROM bookings WHERE user_id = $1";
    const result = await conn.query(sql, [id]);
    return result.rows;
}

const getBookingById = async (id) => {
    const conn = await pool.connect();
    const sql = "SELECT * FROM bookings WHERE id = $1";
    const result = await conn.query(sql, [id]);
    return result.rows[0];
}

const createBooking = async ({userId, seatOne, seatTwo}) => {
    const conn = await pool.connect();
    await conn.query("BEGIN");

    const bookedSql = "SELECT * FROM bookings WHERE user_id = $1";
    const bookedResult = await conn.query(bookedSql, [userId]);
    
    if (bookedResult.rows.length == 2) {
        throw ApiError.conflict("User already has 2 bookings");
    }

    if(seatTwo && bookedResult.rows.length == 1) {
        throw ApiError.conflict("User already has a booking and cannot book 2 seats");
    }

    const checkSql = "SELECT * FROM seats WHERE id IN ($1, $2) AND is_booked = false";
    const checkResult = await conn.query(checkSql, [seatOne, seatTwo]);

    const sql = "INSERT into bookings (user_id, seat_id) values ($1, $2)";
    const result = await conn.query(sql, [userId, seatOne]);

    if (seatTwo && checkResult.rows.length < 2) {
        await conn.query(sql, [userId, seatTwo]);
    }

    await conn.query("COMMIT");

    await updateSeat(seatOne, true);

    if (seatTwo) {
        await updateSeat(seatTwo, true);
    }

    return result.rows[0];
}

const updateSeat = async (seatId, bool) => {
    const conn = await pool.connect();
    const sql = "UPDATE seats SET is_booked = $1 WHERE id = $2";
    const result = await conn.query(sql, [bool, seatId]);
    return result.rows[0];
}

const getAvailableSeats = async () => {
    const conn = await pool.connect();
    const sql = "SELECT * FROM seats WHERE is_booked = false";
    const result = await conn.query(sql);
    return result.rows;
}

const cancelBookingById = async (id) => {
    const conn = await pool.connect();
    const sql = "DELETE FROM bookings WHERE id = $1";
    const result = await conn.query(sql, [id]);
    return result.rows[0];
}

// seat id
const getBookingBySeatId = async (seatId) => {
    const conn = await pool.connect();
    const sql = "SELECT * FROM bookings WHERE seat_id = $1";
    const result = await conn.query(sql, [seatId]);
    return result.rows[0];
}

const cancelBookingBySeatId = async (seatId) => {
    const conn = await pool.connect();
    const sql = "DELETE FROM bookings WHERE seat_id = $1";
    const result = await conn.query(sql, [seatId]);

    await updateSeat(seatId, false);

    return result.rows[0];
}

export {
    createUser,
    getUserByEmail,
    getUserById,
    createBooking,
    getAvailableSeats,
    getBookingById,
    getBookingByUserId,
    getBookingBySeatId,
    updateSeat,
    cancelBookingById,
    cancelBookingBySeatId
}
