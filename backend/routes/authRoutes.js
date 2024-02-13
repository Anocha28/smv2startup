import express from 'express';
import {
    loginUser,
    logoutUser,
    authCheck,
} from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/auth').get(protect, authCheck)

export default router;