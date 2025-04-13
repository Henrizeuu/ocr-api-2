import * as Tesseract from 'tesseract.js';
import { fromPath } from 'pdf2pic';
import path from 'path';
import fs from 'fs/promises';

export async function ocrFromPdf(pdfPath) {
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

  const totalPages = 1; // você pode ajustar se quiser mais páginas
  let fullText = '';

  for (let i = 1; i <= totalPages; i++) {
    const result = await convert(i);
    const imagePath = result.path;
    const ocr = await Tesseract.recognize(imagePath, 'por');
    fullText += ocr.data.text + '\n';
  }

  return fullText.trim();
}
