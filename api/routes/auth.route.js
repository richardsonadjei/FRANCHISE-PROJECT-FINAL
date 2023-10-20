import express from 'express';
import { getUserProfile, google, signOut, signin, signup } from '../controllers/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post('/google', google);
router.get('/signout', signOut)
router.get('/profile', verifyToken, getUserProfile);

export default router;