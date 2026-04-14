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

const createBooking = async ({userId, ...seatIds}) => {
    const conn = await pool.connect();
    await conn.query("BEGIN");

    const checkSql = "SELECT * FROM bookings WHERE seat_id = $1 OR seat_id = $2";
    const checkResult = await conn.query(checkSql, [seatIds.seatOne, seatIds.seatTwo]);
    if (checkResult.rows.length > 0) {
        await conn.query("ROLLBACK");
        return null;
    }

    
    const sql = "INSERT into bookings (user_id, seat_id) values ($1, $2)";
    const result = await conn.query(sql, [userId, seatIds.seatOne]);
    if (seatIds.seatTwo) {
        await conn.query(sql, [userId, seatIds.seatTwo]);
    }
    await conn.query("COMMIT");

    return result.rows[0];
}

const getAvailableSeats = async () => {
    const conn = await pool.connect();
    const sql = "SELECT * FROM seats WHERE NOT IN ( select seat_id from bookings)";
    const result = await conn.query(sql);
    return result.rows;
}

export {
    createUser,
    getUserByEmail,
    getUserById,
    createBooking,
    getAvailableSeats
}