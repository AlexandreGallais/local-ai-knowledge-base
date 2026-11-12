---
id: file-formats-design
title: Extract design and diagram files
topic: file-formats
summary: How to extract screens, texts, shapes and links from Adobe XD, Sketch, Figma, Visio, draw.io and SVG files.
tool: extract.ts
version: "extract.ts 0.1.0"
checked: 2026-11-12
sources: [S1, S2, S3, S4, S5]
license: MIT, written for this base from the sources below
variant: files
---

# Extract design and diagram files

Contents: 1. Adobe XD · 2. Sketch and Figma · 3. Visio and draw.io · 4. SVG · 5. Pitfalls · Sources

## 1. Adobe XD: .xd (extract.ts)

An XD file is a ZIP archive of JSON: a `manifest`, one `graphicContent.agc` file per artboard, and preview images. [S2] Adobe keeps XD in maintenance mode: no new features, so the format does not change. [S1]

Run:

```sh
node .agents/skills/read-heavy-file/scripts/extract.ts "<path>" > ".extract/<file name>.md"
```

You get the list of screens (artboards), then the texts of each screen.

The layout of an XD file is not published. If the extract says "No text found", look at the keys of one artboard:

```sh
node .agents/skills/read-heavy-file/scripts/extract.ts "<path>" --list
node .agents/skills/read-heavy-file/scripts/extract.ts "<path>" --part "artwork/<artboard>/graphics/graphicContent.agc" --outline > ".extract/<file name>.outline.md"
```

The extract never gives the exact rendering, fonts or effects. For one screen, ask the designer for an SVG or PNG export.

## 2. Sketch and Figma: .sketch .fig (extract.ts)

- A Sketch file is a ZIP archive of JSON. [S3] Run the script: you get the pages, the artboards and the texts.
- A Figma `.fig` file cannot be read. Ask the user for an SVG, PDF or PNG export.

## 3. Visio and draw.io: .vsdx .drawio (extract.ts)

- A `.vsdx` file is a ZIP archive of XML. Run the script: you get the text of each shape, page by page.
- A `.drawio` file is XML. Each page is often compressed: deflate, then base64. [S4] [S5] Run the script: it decompresses the pages and gives the label of each shape, then the connections as `Pump → Tank`.

## 4. SVG files over 100 KB

An SVG file is XML text. Never read it whole. List its texts and its identifiers:

```sh
grep -o '<text[^>]*>[^<]*' "<path>" | head -n 200
grep -o 'id="[^"]*"' "<path>" | head -n 200
```

## 5. Pitfalls (design files)

- `Error: Not a ZIP archive`: the file is damaged, or it is not the format its extension says. Run `file -b "<path>"`.
- `Error: Encrypted entry`: ask the user for a copy without a password.
- A screen with many texts ends with `[truncated: ...]`: run the script again with `--max-chars 60000`.

## Sources

- [S1] Adobe, "Adobe XD FAQ", maintenance mode, updated 2026-09-11, <https://helpx.adobe.com/xd/desktop/introduction/faq.html>, read 2026-11-12, summarized.
- [S2] Adobe Community, "Unable to unzip the XD file by command lines" (layout of an XD archive), <https://community.adobe.com/t5/adobe-xd-discussions/other-unable-to-unzip-the-xd-file-by-command-lines/m-p/11012933>, read 2026-11-12, summarized.
- [S3] Sketch, "File format specification" (JSON Schema), <https://developer.sketch.com/file-format/spec>, read 2026-11-12, summarized.
- [S4] draw.io, "Generate and validate draw.io diagrams with AI" (compressed diagrams), <https://www.drawio.com/docs/reference/diagram-generation/>, read 2026-11-12, summarized.
- [S5] j2r2b, "Storing draw.io uncompressed XML", <https://j2r2b.github.io/2019/08/01/drawio-decompressed-xml.html>, read 2026-11-12, summarized.
