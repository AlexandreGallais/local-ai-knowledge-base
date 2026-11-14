# Brick `parse`

Reads a heavy file without opening it raw: its outline first (screens, headings, sheets, slides,
pages), each part with a stable id, then one part, then the images it holds. The result is kept in
`.agents/work/extract/`; the file itself is never changed. No npm package.

| Format | What comes out |
| --- | --- |
| Adobe XD (`.xd`) | Screens, groups and layers in reading order, with positions, sizes, texts and images |
| Word (`.docx`, `.docm`) | Headings, lists, tables in Markdown, images at their place, comments |
| Excel (`.xlsx`, `.xlsm`) | Sheets, used ranges, formulas and values, merged cells, charts and images |
| PowerPoint (`.pptx`, `.pptm`) | Slides in reading order, notes, images |
| PDF | Text per page, headings, images (pdf.js, in `vendor/pdfjs/`) |
| SVG | Tree, ids, classes, transforms, texts |
| JSON, logs, CSV, XML | Structure and a sample |

## What it holds

| File | Role |
| --- | --- |
| `server.ts` | The MCP server `parse`: `outline`, `part`, `images`. |
| `extract.ts` | Reads a file once and keeps the result; also a command. |
| `heavy/` | One reader per format. |
| `vendor/pdfjs/` | pdf.js by Mozilla, Apache-2.0, two files; see its `README.md` and `LICENSE`. |
| `mcp.ts` | The small MCP core, the same copy in every brick. |
| `rules.md` | The rules the AI reads at every request. |

## Usage

From the project root:

```sh
node .agents/mcp/parse/extract.ts design/screens.xd              # the outline
node .agents/mcp/parse/extract.ts design/screens.xd --part S1.2  # one part
```

## Remove it

Delete this folder, then remove the line `parse` from `opencode.json` (the next import of the kit
removes it too). The other bricks do not use it.
