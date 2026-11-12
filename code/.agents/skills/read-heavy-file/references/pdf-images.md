---
id: file-formats-pdf-images
title: Extract PDF files and images
topic: file-formats
summary: Commands to extract text, metadata, attachments and OCR text from PDF files and images, with Poppler and Tesseract.
tool: Poppler, Tesseract
version: "Poppler 25, Tesseract 5"
checked: 2026-11-12
sources: [S1, S2, S3, S4]
license: MIT, written for this base from the sources below
variant: files
---

# Extract PDF files and images

Contents: 1. PDF with text · 2. Scanned PDF · 3. Images · 4. Photoshop and Illustrator · 5. Pitfalls · Sources

## 1. PDF with text (Poppler)

The script does not read PDF files: it gives these commands instead. [S1] [S2]

1. Get the number of pages and the metadata:
   `pdfinfo "<path>" > ".extract/<file name>.info.txt"`
2. Extract some pages only, here pages 1 to 10:
   `pdftotext -layout -f 1 -l 10 "<path>" ".extract/<file name>.txt"`
3. List the files attached to the PDF:
   `pdfdetach -list "<path>"`
4. Save attachment number 1, then treat it as a new heavy file:
   `pdfdetach -save 1 -o ".extract/<file name>.att1" "<path>"`
5. List the images of the PDF without extracting them:
   `pdfimages -list "<path>"`

Read the pages the task needs, 10 at a time. Name the pages you read in the answer.

## 2. Scanned PDF: OCR (Tesseract)

The text extract is empty, or holds fewer than 50 characters per page: the PDF is a scan. [S3]

1. Render the pages as images, here pages 1 to 5:
   `pdftoppm -r 300 -f 1 -l 5 -png "<path>" ".extract/<file name>-p"`
2. Run OCR on each page, in English and French:
   `tesseract ".extract/<file name>-p-1.png" ".extract/<file name>-p-1" -l eng+fra`
3. Read `.extract/<file name>-p-1.txt`.

OCR text has errors: say so in the answer, and quote it as found.

## 3. Images: .png .jpg .gif .webp .tif .bmp .heic (Tesseract)

1. Get the type and the size: `file -b "<path>"`
2. For the text in the image: `tesseract "<path>" ".extract/<file name>" -l eng+fra`
3. Give only the type, the size and the OCR text. You cannot see the image: never describe it.

## 4. Photoshop and Illustrator: .psd .ai .eps

- An `.ai` file is often a PDF inside. Try `pdftotext "<path>" ".extract/<file name>.txt"`.
- A `.psd` file: give its type and size only. Ask the designer for a PNG or SVG export.

## 5. Pitfalls (PDF and images)

- `pdftotext: command not found`: Poppler is not installed. Tell the user. Never read the PDF raw.
- `tesseract: command not found`: OCR is not available. Tell the user. Never guess the text.
- `Error opening data file ... fra.traineddata`: the French language data is missing. Use `-l eng`.
- A PDF protected by a password: ask the user for a copy without a password.

## Sources

- [S1] Poppler (pdftotext, pdfinfo, pdfdetach, pdfimages, pdftoppm), GPL-2.0-or-later, <https://en.wikipedia.org/wiki/Poppler_(software)>, read 2026-11-12, summarized.
- [S2] Alpine Linux, package poppler-utils 25.12.0, <https://pkgs.alpinelinux.org/package/edge/main/x86/poppler-utils>, read 2026-11-12, summarized.
- [S3] Tesseract OCR, "Installation", Apache 2.0, <https://tesseract-ocr.github.io/tessdoc/Installation.html>, read 2026-11-12, summarized.
- [S4] tesseract-ocr, "tessdata" language models, Apache 2.0, <https://github.com/tesseract-ocr/tessdata>, read 2026-11-12, summarized.
