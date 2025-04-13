import { fromPath } from 'pdf-poppler';
import * as Tesseract from 'tesseract.js';
import fs from 'fs/promises';
import path from 'path';

export async function ocrFromPdf(pdfPath) {
  const outputDir = path.join('uploads', 'converted');
  await fs.mkdir(outputDir, { recursive: true });

  const options = {
    format: 'jpeg',
    out_dir: outputDir,
    out_prefix: 'page',
    page: null
  };

  await fromPath(pdfPath, options);

  const files = await fs.readdir(outputDir);
  const imageFiles = files.filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));
  let fullText = '';

  for (const file of imageFiles) {
    const imgPath = path.join(outputDir, file);
    const result = await Tesseract.recognize(imgPath, 'por');
    fullText += result.data.text + '\n';
  }

  return fullText.trim();
}
