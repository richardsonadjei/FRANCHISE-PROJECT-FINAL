import express from 'express';
import { saveQCCertificateToDatabase } from '../controllers/qcCertificateController.js';

const qcCertRouter = express.Router();

// Route for uploading QC certificates
qcCertRouter.post('/upload', saveQCCertificateToDatabase);

export default qcCertRouter;
