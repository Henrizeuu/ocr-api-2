import * as Tesseract from 'tesseract.js';
import { fromPath } from 'pdf2pic';
import path from 'path';
import fs from 'fs/promises';

export async function ocrFromPdf(pdfPath) {
  console.log("📥 Recebido PDF:", pdfPath);

  const outputDir = path.join('uploads', 'converted');
  await fs.mkdir(outputDir, { recursive: true });

  const convert = fromPath(pdfPath, {
    density: 150,
    saveFilename: 'page',
    savePath: outputDir,
    format: 'jpeg',
    width: 800,
    height: 1000,
  });

  try {
    const result = await convert(1);
    console.log("🖼️ Imagem gerada:", result.path);

    const ocr = await Tesseract.recognize(result.path, 'por');
    console.log("📄 Texto extraído:", ocr.data.text);

    return ocr.data.text.trim();
  } catch (error) {
    console.error("❌ Erro no OCR:", error);
    throw error;
  }
}
