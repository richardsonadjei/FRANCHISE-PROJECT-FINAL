import multer from 'multer';
import QCCertificate from '../models/image.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where QC certificates will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename for the uploaded QC certificate
  },
});

const upload = multer({ storage: storage });

const uploadQCCertificate = upload.single('certificate');

const saveQCCertificateToDatabase = (req, res) => {
  uploadQCCertificate(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const newCertificate = new QCCertificate({
      filename: req.file.filename,
      path: req.file.path,
      originalname: req.file.originalname,
    });

    newCertificate.save((err, savedCertificate) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json(savedCertificate);
    });
  });
};

export { saveQCCertificateToDatabase };
