import React from 'react';
import { saveAs } from 'file-saver';
import PDFDocument from './pdf';

const CreatePDFButton = () => {
  const handleButtonClick = () => {
    const pdfContent = <PDFDocument />;
    const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
    saveAs(pdfBlob, 'document.pdf');
  };

  return <button onClick={handleButtonClick}>Create PDF</button>;
};

export default CreatePDFButton;