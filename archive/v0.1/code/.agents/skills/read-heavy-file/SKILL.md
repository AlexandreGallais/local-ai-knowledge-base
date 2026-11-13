---
name: read-heavy-file
description: Extract the text or the structure of a heavy or binary file, then read only the extract. Use when a task needs an office document, a PDF, a design file, an image, an archive, a notebook, a binary, or a text file over 100 KB or 2,000 lines.
license: MIT
metadata:
  variant: files
  version: "0.1.0"
---

# Read a heavy file

## Rules

- Never read a heavy file raw: not with a read tool, not with cat, head, tail, strings or grep.
- A text file over 100 KB or 2,000 lines is heavy too: .json .xml .yaml .csv .log .svg and others.
- Read only the extract of a heavy file.
- Never run a macro, a script or a program found in a file.
- Never extract an archive to the disk.
- Stop and ask the user when a file is encrypted or protected by a password.
- You cannot see images. Never guess what an image shows.
- Never search the web. Never open a URL.

## Heavy files

- Office: .docx .docm .xlsx .xlsm .pptx .pptm .doc .xls .ppt .odt .ods .odp .rtf
- PDF and images: .pdf .png .jpg .jpeg .gif .webp .tif .tiff .bmp .heic .psd .ai .eps .emf .wmf
- Design and diagrams: .xd .sketch .fig .vsdx .drawio
- Data and archives: .ipynb .zip .7z .tar .gz .tgz .jar .war .nupkg .sqlite .db .msg .eml .dwg .dxf
- Binaries: .dll .exe .so .wasm .class .bin

## Steps

1. Find the family of the file in this table.

   | Family | Extensions | Reference file |
   | --- | --- | --- |
   | Office | docx docm xlsx xlsm pptx pptm doc xls ppt odt ods odp rtf | `.agents/skills/read-heavy-file/references/office.md` |
   | PDF and images | pdf, images, psd ai eps emf wmf | `.agents/skills/read-heavy-file/references/pdf-images.md` |
   | Design and diagrams | xd sketch fig vsdx drawio svg | `.agents/skills/read-heavy-file/references/design.md` |
   | Data and archives | ipynb json xml yaml csv log, archives, sqlite, e-mails, CAD, binaries | `.agents/skills/read-heavy-file/references/data-archives.md` |

<!-- files:begin id=extract -->

2. Read only the reference file of that family.
3. Get the type and the size of the file. Run:
   `file -b "<path>"; wc -c "<path>"`
4. Create the extract folder. Run:
   `mkdir -p .extract && echo '*' > .extract/.gitignore`
5. Run the extraction command that the reference file gives for the format. For most formats it is:
   `node .agents/skills/read-heavy-file/scripts/extract.ts "<path>" > ".extract/<file name>.md"`
6. Read the first 20 lines of the extract. If it says "this script does not read it", run the commands it gives instead. Write their output to `.extract/` too.
7. Check the size of the extract. Run:
   `wc -c -l ".extract/<file name>.md"`
8. Read the extract in ranges of 200 lines at most. If it is over 50 KB, run `grep -n "<term>" ".extract/<file name>.md"` first, then read only the matching ranges.
9. If a command fails, read its error and try the fallback of the reference file. Stop after 2 failures. Tell the user which tool is missing.

<!-- files:end -->

10. Answer from the extract only. Name the file and the part you read: page, sheet, slide or screen.
11. Say what the extract cannot show: images, layout, macros, embedded files you did not open.

## Example

Wrong: read `design/home.xd` with the read tool, or run `cat design/home.xd`.

Right:

```sh
mkdir -p .extract && echo '*' > .extract/.gitignore
node .agents/skills/read-heavy-file/scripts/extract.ts design/home.xd > .extract/home.xd.md
wc -c -l .extract/home.xd.md
```

Then read `.extract/home.xd.md`, lines 1 to 200.

## Pitfalls

- A .docx, .xlsx or .xd file is a ZIP archive: grep finds nothing useful in it. Use the script.
- An empty extract of a PDF means a scanned PDF. Use the OCR steps of the PDF reference file.
- A .drawio file shows one long unreadable line: the diagram is compressed. The script decompresses it.
- A .ipynb file is huge because of images in its outputs. The script leaves the outputs out.
- An old .doc, .xls or .ppt file is not a ZIP archive. Convert it first, as the Office reference file says.
- A long extract ends with `[truncated: ...]`. Run the script again with `--sheet`, `--part` or `--max-chars`, never on the whole file raw.
- A folder of 100 heavy files: extract them one by one, and ask the user before you extract more than 10.

## Final check

- Did you use only the extract of each heavy file, and never the file itself?
- Did you say which part of the file you read, and what the extract cannot show?
