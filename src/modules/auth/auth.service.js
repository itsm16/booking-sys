
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createUser, getUserByEmail } from "../../common/config/query-functions.js"
import ApiError from '../../common/utils/api-error.js'

const register = async ({name, email, password}) => {
    const existingUser = await getUserByEmail(email);
    if (existingUser){
        throw ApiError.badRequest("User already exists with this email");
    }
    

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    if(!hashedPassword){
        throw ApiError.internal("Failed to save password");
    }

    const user = await createUser({name, email, password: hashedPassword});
    
    return user;
}

const login = async({email, password}) => {
    const existingUser = await getUserByEmail(email);

    if(!existingUser){
        throw ApiError.notFound("Invalid credentials");
    }
    
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordValid){
        throw ApiError.forbidden("Invalid credentials");
    }
    
    const token = generateToken(existingUser.id);
    const user = existingUser
    delete user.password
    
    return { user, token };
}

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE_TIME });
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export {
    register,
    login,
    verifyToken
}