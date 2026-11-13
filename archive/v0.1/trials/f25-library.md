# F25 trial: the official documentation library

What to play on the workstation for the two criteria of F25 that only a person can see. About 30
minutes.

## 1. Paste a library part

The export of this repository holds `library-1.txt`, `library-2.txt`… next to the `base-<n>.txt`
parts: the core set of the library (TypeScript, Angular, ESLint rules, RxJS, MDN on SVG, Dev
Containers), compressed. Each part is lines of letters and digits only.

1. Paste every `library-<n>.txt` into the folder of the export, next to the base parts.
2. Run the import as usual: `node import.ts --from export --to base` (or `--project`).

Expected: `Import done: … files written.` A part damaged by the copy is named:
`library-3.txt: library part 3 of 7 was damaged by the copy`. Paste that one again.

To carry another tool, on the machine that has the repository:
`node scripts/export.ts --library dotnet-csharp`. The export says how many parts each tool adds.

## 2. A question the base documents do not answer

In the trial project, ask in a new session, once without `library/` (rename it) and once with it:

- `How do I rotate an SVG group around its center with DOMMatrix? Give the exact methods.`
- `Quelles options a la méthode Element.animate() pour répéter une animation ?`

Expected with the library: the AI searches `library/mdn-svg/index.md` with grep, opens one file,
reads one section, and gives the exact names (`rotateSelf()`, `translateSelf()`, `iterations`).
Note the tokens of each session, and whether a whole index or folder was read: it must not be.

## 3. The chat (optional)

`OPEN_WEBUI_LIBRARY=mdn-svg node adapters/open-webui/push.ts` adds one knowledge base for MDN to the
TypeScript and Angular model. Ask the same two questions to that model.

## Results

| Test | Result (ok / not ok) | Notes |
| --- | --- | --- |
| Library parts pasted and imported |  | number of parts, tries |
| DOMMatrix question, without / with the library |  | tokens, files read |
| animate() question, without / with the library |  | tokens, files read |
| Chat model with the MDN knowledge base |  |  |
