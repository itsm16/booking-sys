import { verifyToken } from './auth.service.js'
import { getUserById } from '../../common/config/query-functions.js'
import ApiError from '../../common/utils/api-error.js';

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        
        if (!token) {
            throw ApiError.unauthorized("Token required");
        }
        
        const decoded = verifyToken(token);

        if (!decoded) {
            throw ApiError.unauthorized("Invalid or expired token");
        }

        const user = await getUserById(decoded.userId);

        if (!user) {
            throw ApiError.unauthorized("User not found");
        }

        const { password, ...userWithoutPassword } = user;

        req.user = userWithoutPassword;
        next();
    } catch (error) {
        throw ApiError.unauthorized("Invalid or expired token");
    }
}

export {
    authenticateToken
}