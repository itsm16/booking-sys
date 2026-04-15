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

const createBooking = async ({userId, seat}) => {
    const conn = await pool.connect();
    await conn.query("BEGIN");

    const sql = "INSERT into bookings (user_id, seat_id) values ($1, $2)";
    const result = await conn.query(sql, [userId, seat]);

    await conn.query("COMMIT");

    await updateSeat(seat, true);

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
