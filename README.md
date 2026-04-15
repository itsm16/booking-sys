
- Environment Variables
    - SALT_ROUNDS=
    - JWT_SECRET=
    - EXPIRE_TIME=
    - DATABASE_URL=

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (requires authentication, for req.user)

### Booking
- `GET /api/booking/seats` - Get available seats
- `POST /api/booking/book` - Book seats
  - Body: `{ "userId": number, "seatOne": number, "seatTwo": number }`
- `GET /api/booking/user-bookings/:id` - Get user bookings
- `DELETE /api/booking/cancel/:id` - Cancel booking by ID
- `DELETE /api/booking/cancel-seat/:id` - Cancel booking by seat ID

- Database Schema
    - users
        - id
        - name
        - email
        - password
    - seats
        - id
        - seat_number
        - is_booked
    - bookings
        - id
        - user_id
        - seat_id
        - created_at

