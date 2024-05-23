# G5 Cards

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Overview
G5 Cards is an Angular application that takes an Excel file as input and generates a PDF for printing. The Excel file should contain three columns: Word, Pronunciation, and Translation, with a maximum of 9 rows. Each PDF page will display a table with three columns and three rows. The first page will include the word and pronunciation, and the next page will include the translation in the corresponding cell.

## Features
- Upload an Excel file with a specific structure
- Generate a PDF with formatted tables
- Display word and pronunciation on one page
- Display translations on the next page

## Usage
Prepare your Excel file with the following structure:

- Three columns: Word, Pronunciation, Translation
- Maximum of 9 rows

### Example:

| Word                 | Pronunciation              | Translation                                          |
|-------------------------|-------------------------|----------------------------------------------------|
| Apple           | æpəl | a hard round fruit that has red, light green, or yellow skin and is white
| Book          | bʊk      | a set of printed pages that are held together in a cover so that you can read them
| Car  | kɑːr | a vehicle with four wheels and an engine, that can carry a small number of passengers

Upload the Excel file using the upload button in the application.

Click the "Generate PDF" button to create the PDF.

The PDF will be generated with the word and pronunciation on the first page, and the translations on the next page.



_**Future Enhancements:** Perhaps in the future, I'll add AI to provide pronunciation and translation for a list of words. :)_
