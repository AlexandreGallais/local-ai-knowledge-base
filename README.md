# Knowledge base for a local AI

Rules, skills, MCP servers and official documentation that help a small local language model write
production front-end code (Angular, TypeScript, HTML, CSS) inside OpenCode CLI 2.2.7.

## Status

- Next version, not released yet: everything lives in the project, one brick per MCP server.
  Changes: [CHANGELOG.md](CHANGELOG.md).
- Version 0.1 is archived in [`archive/v0.1/`](archive/v0.1/README.md), unchanged, with its history.

## How it works

The kit, in [`project/`](project/), is a project of its own: `npm install` then `npm run check` work in
it as they are. It holds:

| Entry | Content |
| --- | --- |
| `package.json` | The scripts of the format and the lint, and their packages. |
| `.prettierrc.json`, `.editorconfig`, `.prettierignore` | The layout: Prettier with the defaults of an Angular project. |
| `eslint.format.config.mjs`, `eslint.config.mjs` | The format and the lint of TypeScript, JavaScript and Angular templates; the lint includes the format. |
| `stylelint.format.config.mjs`, `stylelint.config.mjs` | The same for CSS and SCSS. |
| `lint/` | The settings (each theme of rules on or off), one file per theme, their README. |
| `tsconfig.json` | ES2025 and the strictest options of TypeScript and of Angular templates. |
| `src/` | A little example code that passes the format and the lint: a class, a function, a component, a store. |
| `AGENTS.md` | The rules of the project, owned by the team. |
| `opencode.json` | What OpenCode loads: the rules, the format after each write, one local MCP server per brick. |
| `.agents/` | The common rules, the skills, and the bricks in `.agents/mcp/`. |

The format and the lint are those of the project, as in any project: the team and the AI run the same
scripts and the editor reads the same configs. The format is Prettier, then what Prettier does not do
(sorting, blank lines, braces, CSS order); the lint keeps real errors and recognised good practice,
never a matter of taste. Each theme starts from the recommended config of its library and switches on
or off in `lint/settings.mjs`. [`project/lint/README.md`](project/lint/README.md) lists the themes and
the commands.

Each folder of `.agents/mcp/` is a brick: one MCP server with everything it needs. Removing the folder
removes the server, its documentation and its rules, without breaking the other bricks.

| Brick | What the AI gets |
| --- | --- |
| `parse` | The outline, then one part, then the images of a heavy file: XD, Word, Excel, PowerPoint, PDF, SVG. |
| `js-official-docs` | The official documentation of the JavaScript and TypeScript tools: MDN, Angular, TypeScript, RxJS, NgRx Signals, Node.js, npm, Vite, Vitest, Playwright, ESLint, Stylelint. |
| `csharp-official-docs` | C# and .NET: the language, .NET guides, ASP.NET Core, EF Core and the API reference. |
| `python-official-docs` | Python: language reference, standard library, tutorial, how-to guides, what is new; the `inkex` API of the Inkscape extensions and their guides. |
| `rust-official-docs` | Rust: the book, the reference and the standard library (`core`, `alloc`, `std`). |
| `java-official-docs` | Java: the Java SE API of `java.base` and `java.net.http`, from OpenJDK 25. |

Each documentation brick searches its own documentation only, then gives one section at a time. Only
the official documentation is there, each source under its own license, noted in the
`THIRD_PARTY_NOTICES.md` of its brick; the `README.md` of a brick lists its sources, their versions,
and what was set aside and why.

[`project/.agents/README.md`](project/.agents/README.md) explains each part, and the `README.md` of each
brick says what it holds and how to remove it.

In a session, one agent works directly, with no per-project setup. It installs the packages it needs
itself, after your approval. "Done" comes after lint, build and tests at zero errors.

## From the export to the first conversation

The export is in `export/`, in five part sizes, one folder each: `500k`, `1m`, `2m`, `5m`, `10m`. They
hold the same content. Each folder has one pack `kit` (`kit-001.txt`...), one pack per documentation
brick (`js-official-docs-001.txt`...) and the one import script, `import.ts`.

### 1. Find the largest size that pastes

1. On the workstation, create an empty folder, for example `~/paste-test`.
2. Create `kit-001.txt` there, open `export/10m/kit-001.txt` here, copy all of it, paste it into the
   new file, save. Paste `import.ts` the same way.
3. Run `node ~/paste-test/import.ts --target ~/paste-test-project` and read the first line:
   - "Installed in": the paste worked; keep this size.
   - "the content was damaged by the paste" or "the end of the part is missing": the paste cut or
     changed the text; try the next size down: 5m, then 2m, 1m, 500k.

### 2. Paste what the project needs

1. In an empty folder, paste `import.ts` and every part of the size you keep: the parts of `kit`, and
   the parts of each documentation brick the project needs.
2. Run `node <that folder>/import.ts --target <folder>`. It takes every part, checks them all, then
   writes everything at once: the kit, each brick with its line in `opencode.json`, and the search
   index of each documentation brick.
3. A damaged or missing part is named, and nothing is written: paste that part again, then run the
   command again.

Two ways to use it:

- **In a new, empty folder, beside the project.** The kit is written whole: `npm install` then
  `npm run check` work at once. Then take into the project what it needs: the configs, `lint/`, the
  scripts and the `devDependencies` of `package.json`, `AGENTS.md`, `opencode.json`, `.agents/`.
- **Into a project that exists.** Nothing the team wrote is replaced: `package.json`, the configs,
  `lint/`, `AGENTS.md` and the skills are written only when missing, the example code (`src/`) stays
  out, and the import lists every file it left aside, to merge by hand. The bricks pasted are replaced
  whole; the settings added to `opencode.json` stay.

### 3. Install the packages

From the root of the project, once: `npm install`. Then `npm run check` formats and lints the whole
project. When a package is missing, the AI runs `npm install` itself, after your approval.

### 4. Work

Open OpenCode CLI 2.2.7 at the root of the project and describe what you want. Check that it sees the
servers: `/mcps` lists `parse` and each documentation brick pasted.

## Update the documentation of a tool

For the maintainers, on a machine with network access, with the build tools kept beside this
repository. The workstation never does it: it receives the new export.

1. See what is behind: `node scripts/update-tool.ts` lists each source with a newer release tag. In a
   project, `node .agents/mcp/js-official-docs/check-versions.ts` lists the tools whose documentation
   is behind the versions of `package.json`.
2. Move a source to its new tag, fetch it again, check it:
   `node scripts/update-tool.ts angular v23.0.0`, `node scripts/fetch-library.ts --tool angular`,
   `node scripts/check-library.ts`. For another language, name its brick:
   `node scripts/fetch-library.ts --brick python-official-docs`, then
   `node scripts/check-library.ts project/.agents/mcp/python-official-docs`.
3. When a lint plugin follows the major version of the tool (angular-eslint follows Angular), update
   its version in `project/package.json`.
4. Run the tests, `node scripts/check-base.ts` and `node scripts/export.ts`, write the change in
   `CHANGELOG.md`, and deliver the new export.

## Layout

| Folder | Content |
| --- | --- |
| `project/` | The project kit, a project of its own: `package.json`, the format and lint, example code, `AGENTS.md`, `opencode.json` and `.agents/`, bricks included. |
| `import.ts` | The one import script, which travels with the export. |
| `export/` | The export of the last delivery, in five part sizes. |
| `archive/v0.1/` | Version 0.1, unchanged. |

The tools that build, check and export this repository, and the sample projects of their tests, are
kept outside it.

## License

MIT, see [LICENSE](LICENSE). The official documentation of a brick keeps its own license, listed in
the `THIRD_PARTY_NOTICES.md` of the brick with its copyright; the license files of each source are
copied unchanged in its `licenses/<tool>/`. MDN Web Docs content stays under CC BY-SA 2.5 in its own
folders. pdf.js, in the parse brick, keeps its Apache-2.0 license in `vendor/pdfjs/`.
