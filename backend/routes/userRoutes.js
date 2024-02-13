import express from 'express';
import {
    getUsers,
    addUser,
    editUser,
    deleteUser,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getUsers).post(protect, addUser).put(protect, editUser).delete(protect, deleteUser);


export default router;
