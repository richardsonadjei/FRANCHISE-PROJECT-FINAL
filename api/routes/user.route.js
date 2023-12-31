import express from 'express';
import { deleteUser, getAllUsers, test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', deleteUser)
router.get('/users', getAllUsers);
export default router;