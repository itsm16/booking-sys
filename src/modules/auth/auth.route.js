import {Router} from 'express'
import validate from '../../common/middleware/validate.middleware.js'
import { LoginDto, RegisterDto } from './dto/auth.dto.js'
import * as authController from './auth.controller.js'

const authRoutes = Router()

authRoutes.post("/register", validate(RegisterDto), authController.register)
authRoutes.post("/login", validate(LoginDto), authController.login)
authRoutes.post("/logout", authController.logout)

export default authRoutes