import express from "express";
import {authrizeAdmin, authenticate } from '../middlewares/authMiddleware.js'
import { createUser, loginUser, UpdateUserById,  getUserById, deleteUserById, logoutController, UpdateCurrentUserProfile , getAllUsers, getCurrentUserProfile } from "../controllers/UserController.js";
const router = express.Router()

router.route('/').post(createUser).get(authenticate, authrizeAdmin, getAllUsers)
router.post('/auth', loginUser)
router.post("/logout", logoutController)
router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate, UpdateCurrentUserProfile)
router.route('/:id')
.delete(authenticate, authrizeAdmin, deleteUserById)
.get(authenticate, authrizeAdmin, getUserById)
.put(authenticate, authrizeAdmin, UpdateUserById)

export default router