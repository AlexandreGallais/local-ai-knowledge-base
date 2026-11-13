---
id: file-formats-office
title: Extract Office and OpenDocument files
topic: file-formats
summary: Commands to extract text, sheets, slides and formulas from Word, Excel, PowerPoint and OpenDocument files, old and new.
tool: extract.ts, LibreOffice
version: "extract.ts 0.1.0"
checked: 2026-11-12
sources: [S1, S2, S3, S4]
license: MIT, written for this base from the sources below
variant: files
---

# Extract Office and OpenDocument files

Contents: 1. Modern files · 2. What the extract shows · 3. Old binary files · 4. Every sheet as CSV · 5. Pitfalls · Sources

## 1. Modern Office files: .docx .xlsx .pptx .odt .ods .odp (extract.ts)

These files are ZIP archives of XML. [S1] [S2] The script reads them with Node.js alone.

Run:

```sh
node .agents/skills/read-heavy-file/scripts/extract.ts "<path>" > ".extract/<file name>.md"
```

Options:

- One sheet only: `--sheet "<sheet name>"`.
- More rows per sheet (50 by default): `--rows 200`.
- The list of the parts of the archive (images, charts, embedded files, macros): `--list`.
- One part, as text: `--part "word/document.xml"`.
- A longer extract (20,000 characters by default): `--max-chars 60000`.

## 2. What the extract of an Office file shows (extract.ts)

- Word: one line per paragraph, headings as `##`, tables as Markdown tables, then the comments.
- Excel: the sheet names (hidden ones marked), the named ranges, then for each sheet its range, its number of rows and formulas, and its first rows as `A2=Pump P-1 | B2=3 | C2=6 [=B2*2]`: the cell, its value, then its formula. A date shows as a number: Excel stores dates as numbers.
- PowerPoint: the text of each slide in the order of the presentation, then its notes.
- OpenDocument: the same for text, spreadsheet and presentation files.
- At the end: the charts with their title and data ranges, then the embedded parts not read (`media/`, `embeddings/`, `pivotTables/`, `externalLinks/`).
- `vbaProject.bin` in the list means macros. The script never runs them. Never run them yourself.

## 3. Old binary Office files: .doc .xls .ppt .rtf (LibreOffice)

These files are not ZIP archives. [S3] Convert them to the modern format first, then run the script on the result:

```sh
soffice --headless --convert-to docx --outdir .extract "<path>"
node .agents/skills/read-heavy-file/scripts/extract.ts ".extract/<name>.docx" > ".extract/<name>.docx.md"
```

Use `xlsx` for .xls files and `pptx` for .ppt files. [S4]

If `soffice` is missing, stop. Tell the user that LibreOffice is not installed, and ask for a copy of the file saved as .docx, .xlsx or .pptx.

## 4. Every sheet of a workbook as CSV (LibreOffice)

For a workbook with many large sheets, write one CSV file per sheet: [S4]

```sh
soffice --headless --convert-to "csv:Text - txt - csv (StarCalc):44,34,76,1,,0,false,true,false,false,false,-1" --outdir .extract "<path>"
wc -l .extract/*.csv
```

Then read the first 50 lines of each CSV file. Never read a large CSV file whole.

## 5. Pitfalls (Office files)

- `Error: ... is an encrypted Office file`: the file has a password. Ask the user for a copy without a password.
- `Error: Sheet not found`: the error lists the sheet names. Use one of them with `--sheet`.
- `soffice` prints nothing and exits with code 1: another LibreOffice is running. Add `-env:UserInstallation=file:///tmp/lo-extract` to the command.
- `[truncated: ...]` at the end: use `--sheet`, `--rows` or `--max-chars`, never the whole file raw.

## Sources

- [S1] Microsoft, "[MS-OFFSTANDLP]: Word, Excel, and PowerPoint Standards Support" (ECMA-376, ISO/IEC 29500), <https://learn.microsoft.com/en-us/openspecs/office_standards/ms-offstandlp/d5784a8b-7070-466b-befa-b7bf3724c6f0>, read 2026-11-12, summarized.
- [S2] OASIS, OpenDocument Format (ISO/IEC 26300), cited by reference, not verified in this base.
- [S3] Microsoft, "[MS-DEVCENTLP]: Open Specification Promise" ([MS-CFB], [MS-DOC], [MS-XLS], [MS-PPT]), <https://learn.microsoft.com/en-us/openspecs/dev_center/ms-devcentlp/1c24c7c8-28b0-4ce1-a47d-95fe1ff504bc>, read 2026-11-12, summarized.
- [S4] converterer, "libreoffice-headless-cheatsheet", <https://github.com/converterer/libreoffice-headless-cheatsheet>, and The Document Foundation, bug 135762, <https://bugs.documentfoundation.org/show_bug.cgi?id=135762>, read 2026-11-12, summarized.
