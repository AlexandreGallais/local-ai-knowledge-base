# F4 trial on the workstation

What to play on the workstation to check the two criteria of F4 that only a person can see:

- C18: on a task that touches a .xd, a .pdf, a .docx and a .xlsx file, the AI never reads a file
  raw. It runs the extraction command first, then reads only `.extract/`.
- A real Adobe XD file of the team gives the list of its screens and their texts.

About 30 minutes. Fill the results table at the end. Never put the team's XD file, the trace or the
extracts in a Git repository.

## 1. Build the example project

1. Start from a clean copy of the F3 example project (`base-trial/`), or create an empty folder.
2. Copy these files from the `work/` repository, keeping their paths. Copy `AGENTS.md`,
   `docs/README.fr.md` and `scripts/check-base.ts` again: they changed.

| Copy from `work/` | To `base-trial/` |
| --- | --- |
| `code/AGENTS.md` | `AGENTS.md` |
| `code/docs/README.fr.md` | `docs/README.fr.md` |
| `code/.agents/skills/read-heavy-file/SKILL.md` | `.agents/skills/read-heavy-file/SKILL.md` |
| `code/.agents/skills/read-heavy-file/chat.md` | `.agents/skills/read-heavy-file/chat.md` |
| `code/.agents/skills/read-heavy-file/references/office.md` | `.agents/skills/read-heavy-file/references/office.md` |
| `code/.agents/skills/read-heavy-file/references/pdf-images.md` | `.agents/skills/read-heavy-file/references/pdf-images.md` |
| `code/.agents/skills/read-heavy-file/references/design.md` | `.agents/skills/read-heavy-file/references/design.md` |
| `code/.agents/skills/read-heavy-file/references/data-archives.md` | `.agents/skills/read-heavy-file/references/data-archives.md` |
| `code/.agents/skills/read-heavy-file/scripts/extract.ts` | `.agents/skills/read-heavy-file/scripts/extract.ts` |
| `scripts/check-base.ts` | `scripts/check-base.ts` |
| `scripts/fixtures.ts` | `tools/fixtures.ts` |

The F3 files stay as they are: the five `write-*` skills and `docs/template.md`.

3. Check the copy, in a terminal at the root of `base-trial/`, inside the dev container:

```sh
node --version
node scripts/check-base.ts
```

Expected: Node 22.18 or later, then `Base check passed: 15 file(s), 0 findings.`

## 2. Note which tools the dev container has

Run each command and note the result: a version, or "not found".

```sh
file --version
pdftotext -v
tesseract --version
soffice --version
```

`pdftotext`, `tesseract` and `soffice` decide what the AI can do with PDF files, scans and old
Office files. Their absence is not a failure of this trial: the AI must then say what is missing,
and still never read the file raw.

## 3. Make the sample files

```sh
node tools/fixtures.ts samples
```

Expected: `Wrote 10 sample files to …/samples.` They are fake files made for the tests, with no
real data: `notes.docx`, `budget.xlsx`, `spec.pdf`, `mockup.xd` and others.

Then copy one real Adobe XD file of the team into `samples/ui.xd`. Choose one with several screens.

## 4. The script on a real XD file

```sh
mkdir -p .extract && echo '*' > .extract/.gitignore
node .agents/skills/read-heavy-file/scripts/extract.ts samples/ui.xd > .extract/ui.xd.md
wc -c -l samples/ui.xd .extract/ui.xd.md
```

Open `.extract/ui.xd.md` yourself. Expected:

- `## Screens`: the names of the screens, as in Adobe XD.
- One `## Screen: <name>` section per screen, with its texts: labels, titles, buttons.
- An extract a few kilobytes long, much smaller than the XD file.

If the extract says `No text found`, the texts of a real XD file are stored under other keys than
the ones the script tries. Run this, and give me `.extract/ui.outline.md` (it holds key names and
the first characters of values: remove any text you do not want to share):

```sh
node .agents/skills/read-heavy-file/scripts/extract.ts samples/ui.xd --list | head -n 30
node .agents/skills/read-heavy-file/scripts/extract.ts samples/ui.xd --part "<an artwork/.../graphicContent.agc entry of the list>" --outline > .extract/ui.outline.md
```

## 5. Task C18: no raw read

1. Delete `.extract/` to start clean: `rm -rf .extract`.
2. Run the coding assistant on `base-trial/`, in a new session, with this request and no other
   instruction:

> Summarize what each of these files contains, in 5 lines per file: samples/ui.xd,
> samples/spec.pdf, samples/notes.docx, samples/budget.xlsx.

3. Keep the trace of the tool calls. In OpenCode, run the request without the interface and save
   its events:

```sh
opencode run --format json "Summarize what each of these files contains, in 5 lines per file: samples/ui.xd, samples/spec.pdf, samples/notes.docx, samples/budget.xlsx." > .extract/trace.jsonl
```

The field names of these events are not known yet. Look at every line that names a sample file, or
an extraction command:

```sh
grep -n -o -E '.{0,80}samples/[a-z]+\.(xd|pdf|docx|xlsx).{0,40}' .extract/trace.jsonl
grep -n -o -E '.{0,40}(extract\.ts|pdftotext|pdfinfo|soffice|\.extract/)[^"]{0,80}' .extract/trace.jsonl
```

Expected, for each of the four files:

- No read tool call on `samples/…` itself, and no `cat`, `head`, `tail`, `strings` or `grep` on it.
- A command with `extract.ts` (or `pdfinfo` and `pdftotext` for the PDF) **before** any read of
  `.extract/<file name>…`.
- The answer names the part read: screens, pages, sheets.

For the PDF without `pdftotext`: the script answers "this script does not read it"; the AI tries
`pdftotext`, gets "not found", and says that the tool is missing. That counts as a success: no raw
read.

4. Note the tokens used by the session, if the assistant shows them.

## Results

Write the version of the assistant, the model if known, and the date. Note what went wrong in your
own words.

| Test | Result (ok / not ok) | Notes |
| --- | --- | --- |
| 1. Copy checked (15 files, 0 findings) |  |  |
| 2. Tools: file, pdftotext, tesseract, soffice |  | versions or "not found" |
| 3. Samples written |  |  |
| 4. Real XD: screens listed |  |  |
| 4. Real XD: texts per screen |  |  |
| 4. Real XD: size of the file and of the extract |  |  |
| 5. C18: no raw read of the .xd |  |  |
| 5. C18: no raw read of the .pdf |  |  |
| 5. C18: no raw read of the .docx |  |  |
| 5. C18: no raw read of the .xlsx |  |  |
| 5. C18: extraction before reading `.extract/` |  |  |
| 5. Tokens used by the session |  |  |
