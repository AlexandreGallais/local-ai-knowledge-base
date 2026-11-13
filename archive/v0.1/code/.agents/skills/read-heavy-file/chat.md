<!-- chat:begin id=extract -->

2. Never ask the user to paste the raw file.
3. Give the user the command for the format, from this table. Ask the user to paste its output, or its first 300 lines.

   | Format | Command for the user |
   | --- | --- |
   | .docx .xlsx .pptx .odt .ods .odp .xd .sketch .vsdx .drawio .ipynb .json .zip .nupkg | `node .agents/skills/read-heavy-file/scripts/extract.ts "<file>" \| head -n 300` |
   | .pdf | `pdftotext -layout -f 1 -l 10 "<file>" - \| head -n 300` |
   | scanned .pdf, image | `tesseract "<file>" - -l eng+fra \| head -n 300` |
   | .doc .rtf | `soffice --headless --convert-to docx "<file>"`, then the first command on the .docx file |
   | .xls | `soffice --headless --convert-to xlsx "<file>"`, then the first command on the .xlsx file |
   | .ppt | `soffice --headless --convert-to pptx "<file>"`, then the first command on the .pptx file |
   | large text file | `head -n 100 "<file>"` |

4. If the user cannot run commands, ask for the text copied from the file, one part at a time: one page, one sheet or one slide.
5. Never say that you ran a command or opened the file. Only the user runs commands.

<!-- chat:end -->
