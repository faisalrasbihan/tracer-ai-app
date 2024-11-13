import { pdfjs } from 'react-pdf';
import * as pdfjsLib from 'pdfjs-dist';

if (typeof window !== 'undefined') {
  const workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
}

export { pdfjsLib, pdfjs }; 