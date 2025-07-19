import express from "express";
import {authrizeAdmin, authenticate } from '../middlewares/authMiddleware.js'
import { createUser, loginUser, logoutController, UpdateCurrentUserProfile , getAllUsers, getCurrentUserProfile } from "../controllers/UserController.js";
const router = express.Router()

router.route('/').post(createUser).get(authenticate, authrizeAdmin, getAllUsers)
router.post('/auth', loginUser)
router.post("/logout", logoutController)

router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate, UpdateCurrentUserProfile)


export default router