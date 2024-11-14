import { pdfjs } from 'react-pdf';
import * as pdfjsLib from 'pdfjs-dist';

if (typeof window !== 'undefined') {
  const workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
}

export { pdfjsLib, pdfjs }; 