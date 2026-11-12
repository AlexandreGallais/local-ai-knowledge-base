---
id: file-formats-data-archives
title: Extract archives, large data files, e-mails and binaries
topic: file-formats
summary: How to list archives, sample large text and data files, read notebooks, e-mails, databases and binaries safely.
tool: extract.ts, coreutils
version: "extract.ts 0.1.0"
checked: 2026-11-12
sources: [S1, S2]
license: MIT, written for this base from the sources below
variant: files
---

# Extract archives, large data files, e-mails and binaries

Contents: 1. Archives · 2. Large text files · 3. Notebooks and JSON · 4. Databases and e-mails · 5. Binaries and CAD · Sources

## 1. Archives: .zip .jar .war .nupkg .tar .gz .7z (extract.ts)

List a ZIP archive without extracting it:

```sh
node .agents/skills/read-heavy-file/scripts/extract.ts "<path>" --list > ".extract/<file name>.md"
```

- A `.nupkg` file: the extract also shows its `.nuspec` file (id, version, dependencies).
- A `.jar` file: the extract also shows `META-INF/MANIFEST.MF`.
- One entry as text: add `--part "<entry name>"`.
- A `.tar`, `.tar.gz` or `.tgz` file: `tar -tzf "<path>" | head -n 200`. Use `-tf` for a plain `.tar`.
- A `.7z` file: `7z l "<path>"` if `7z` exists. Else tell the user.

Never extract an archive to the disk. An entry marked `unsafe path` points outside the folder: never write it.

## 2. Large text files: .log .csv .xml .yaml and others

A text file over 100 KB or 2,000 lines is heavy. Never read it whole.

1. Size: `wc -c -l "<path>"`
2. Start and end: `head -n 100 "<path>"`, then `tail -n 50 "<path>"`
3. Search: `grep -n "<term>" "<path>" | head -n 50`, then read only the matching ranges.

## 3. Notebooks and JSON: .ipynb .json (extract.ts)

- A `.ipynb` notebook: run the script. You get each cell, its type and its source. The outputs are left out: the extract gives their number and type.
- A large `.json` file: run the script. You get its outline: keys, types, sizes, and the first item of each array, never the whole content.

```sh
node .agents/skills/read-heavy-file/scripts/extract.ts "<path>" > ".extract/<file name>.md"
```

## 4. Databases and e-mails: .sqlite .db .eml .msg

- SQLite: `sqlite3 "<path>" .schema` if `sqlite3` exists, then `sqlite3 "<path>" "SELECT COUNT(*) FROM <table>;"`. Never dump a whole table.
- `.eml`: it is text. Read its headers only: `grep -n -i -E "^(from|to|subject|date|content-type|content-disposition):" "<path>" | head -n 50`. Never read the base64 parts.
- `.msg` (Outlook): it is a binary file. [S1] Give its type and size. Ask the user to save the mail as `.eml`, or to paste its text.

## 5. Binaries and CAD: .dll .exe .so .wasm .class .dxf .dwg

- A binary: give `file -b "<path>"` and its size. Never run it.
- Its readable strings, only if the task needs them: `strings -n 8 "<path>" | head -n 200`. Never run `strings` without `head`.
- A `.dxf` file is text: `wc -l "<path>"`, then `head -n 50 "<path>"`.
- A `.dwg` file is a closed format: give its type and size. Ask the user for a DXF or PDF export.

## Sources

- [S1] Microsoft, "[MS-OXMSG]: Outlook Item (.msg) File Format", revision 18.0, <https://learn.microsoft.com/en-us/openspecs/exchange_server_protocols/ms-oxmsg/b046868c-9fbf-41ae-9ffb-8de2bd4eec82>, read 2026-11-12, summarized.
- [S2] Notes to self, "Reading the entries of a zip file in Node with node:zlib", <https://notestoself.dev/posts/node-read-zip-entries-zlib-no-dependency/>, read 2026-11-12, summarized.
