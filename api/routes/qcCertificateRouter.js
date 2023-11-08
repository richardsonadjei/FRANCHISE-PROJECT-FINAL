import express from 'express';
import { uploadQCCertificateController } from '../controllers/qcCertificateController.js';

const qcCertRouter = express.Router();

// Route for uploading QC certificates
qcCertRouter.post('/upload', uploadQCCertificateController);

export default qcCertRouter;
