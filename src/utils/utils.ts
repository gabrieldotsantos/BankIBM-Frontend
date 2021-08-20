
// @ts-nocheck

import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

export function formatDate(date: string) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export function pdfGerar(idElement: string, title: string) {
    var data = formatDate(new Date());
    const input = document.getElementById(idElement);
    html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save(`${title}-${data}.pdf`);  
    });
}