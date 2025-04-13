import express from 'express';
import multer from 'multer';
import { ocrFromPdf } from './utils/pdfToImage.js';
import path from 'path';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/ocr', upload.single('file'), async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      console.log("❌ Nenhum arquivo recebido.");
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    console.log("📥 Arquivo recebido:", req.file);
    const text = await ocrFromPdf(req.file.path);
    res.json({ text });
  } catch (err) {
    console.error("❌ Erro no OCR:", err);
    res.status(500).json({ error: 'OCR failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API OCR rodando na porta ${PORT}`));
