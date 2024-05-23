import { Component } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'g5';

  words = [];
  pairs = [];
  file: File | null = null;
  data: any[] = [];
  headers: string[] = [];

  ngOnInit(): void {
    this.words = [
      { word: "", translate: "" },
    ]
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.readFile();
    }
  }

  readFile() {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      this.data = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      // Extract headers from the first row (assuming headers are in the first row)
      if (this.data.length > 0) {
        this.headers = Object.keys(this.data[0]);
      }
      this.words = this.data;
      for (let i = 0; i < this.data.length; i + 9) {
        this.pairs.push(this.words.splice(i, i + 9));
      }
      console.log(this.pairs);
      console.log(this.words);
    };
    reader.readAsBinaryString(this.file);
  }


  onDownload() {
    const pageBreak = { mode: 'css', before: '.before', after: '.after', avoid: '.avoid' };
    let options = {
      filename: ""
      , image: { type: 'jpeg', quality: 1, margin: 0 }
      , html2canvas: { scale: 2, dpi: 96, logging: true, scrollX: 0, scrollY: -window.scrollY }
      , pagebreak: pageBreak
      , jsPDF: { format: [1123, 794], orientation: 'landscape', putOnlyUsedFonts: true, precision: 1, unit: "px" }
    };

    this.pairs.forEach((pair, index) => {
      const element = document.getElementById(`flex_${index}`);;
      options.filename = `reporttt_${index}`;
      const pdf = new html2pdf();

      pdf.set(options).from(element).toPdf().get('pdf').then(function (pdf) {
        pdf.setProperties({ title: `Reynard WORDS ${index}` });
        // Get the PDF data as an array buffer
        let pdfData = pdf.output('arraybuffer');
        // Create a blob object from the PDF data
        let pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
        // Create a blob URL from the blob object
        let blobURL = URL.createObjectURL(pdfBlob);
        // Open the PDF in a new tab using the blob URL
        window.open(blobURL, '_blank');
      });
    })

  }
}
