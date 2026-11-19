---
name: document-extraction
description: "Extracts text and tables from PDF and other technical documents with local tools (pdftotext, pdfplumber or pypdf if installed), page by page, without reading the raw file. Use when a task needs the content of a PDF, a scanned or exported document, or a table inside a document."
license: Apache-2.0
metadata:
  id: MM-04
  stars: "1"
  nature: tooling
  mode: R
  wave: V4
  load: auto
---

# Document extraction

**Core rule:** never read a PDF or office file raw; extract its text to a file with a tool, then search and read the parts you need.

## Procedure

1. Check the available tools: `command -v pdftotext pdfinfo`, `python3 -c "import pdfplumber"`, `python3 -c "import pypdf"`.
   - Check: at least one tool is available; otherwise ask the human.
2. Get the page count: `pdfinfo <file> | grep Pages`.
   - Check: the number of pages is known.
3. Extract text keeping the layout: `pdftotext -layout <file> /tmp/<name>.txt` (or `-f <first> -l <last>` for a range).
   - Check: the text file exists and is not empty (`wc -l`).
4. Search and read only the parts you need (`grep -n`, `read` with a range).
   - Check: the quoted passage has its page.
5. For tables, extract with pdfplumber when installed: `python3 -c "import pdfplumber,sys; p=pdfplumber.open(sys.argv[1]).pages[int(sys.argv[2])-1]; [print(r) for r in p.extract_table() or []]" <file> <page>`.
   - Check: rows are printed; compare one row with the page by eye if possible.

## Stop and ask the human if

- The PDF is scanned (no text extracted) and no OCR tool is installed.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Read the PDF directly." | Raw PDF bytes are useless and expensive. Extract first. |
| "Extract the whole 300-page document." | Extract the pages you need. |

## Definition of done

- [ ] Content extracted by a tool; only needed parts read; quotes have page numbers.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
