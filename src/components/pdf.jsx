import React from 'react';
import { Page, Document } from 'react-pdf';
import Line from '../pages/Charts/Line'
import Stacked from '../pages/Charts/Stacked'
import Bar from '../pages/Charts/Bar'
// Import the remaining components

const PDFDocument = () => {


  return (
    <Document>
      <Page size="A4" >

        {/* Include the remaining components */}
      </Page>
    </Document>
  );
};

export default PDFDocument;
