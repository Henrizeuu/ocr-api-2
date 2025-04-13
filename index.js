import express from 'express';
import multer from 'multer';
import { ocrFromPdf } from './utils/pdfToImage.js';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/ocr', upload.single('file'), async (req, res) => {
  try {
    const text = await ocrFromPdf(req.file.path);
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'OCR failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
