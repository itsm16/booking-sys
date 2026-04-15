import * as authService from './auth.service.js'
import ApiResponse from '../../common/utils/api-response.js'

const register = async (req, res) => {
    const result = await authService.register(req.body);
    ApiResponse.ok(res, "User created successfully", result);
}

const login = async (req, res) => {
    const result = await authService.login(req.body);
        
    res.cookie('token', result.token, {
        httpOnly: true,
        secure: true,
        maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
    });
        
    ApiResponse.ok(res, "Login successful", result.user);
}

const logout = async (req, res) => {
    res.clearCookie('token');
    req.user = null;
    ApiResponse.ok(res, "Logout successful");
}

const getMe = async (req, res) => {
    ApiResponse.ok(res, "User found", req.user);
}

export {
    register,
    login,
    logout,
    getMe
}