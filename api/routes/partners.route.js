import express from 'express';
import { createPartner } from '../controllers/partners.controller.js';

const partnersRouter = express.Router();

// Route to create a new partner
partnersRouter.post('/partners', createPartner);

export default partnersRouter;
