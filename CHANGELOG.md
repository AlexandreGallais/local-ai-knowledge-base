# Changelog

All notable changes of this base. The format follows Keep a Changelog; versions follow Semantic
Versioning. Version 0.1 keeps its own changelog in `archive/v0.1/CHANGELOG.md`.

## [Unreleased]

### Changed: the official documentation taken as it is

- Every documentation file is the official file, unchanged, in its own format: Markdown, MDX,
  reStructuredText, AsciiDoc, LaTeX, Texinfo, PreTeXt, XML, HTML. No header added, no markup removed,
  no file cut. What describes a source (version, commit, license) is beside its files:
  `library/<tool>.index.md`, `library/lock.json`, `library/README.md`, `THIRD_PARTY_NOTICES.md`.
- The search cuts each file into sections by its format, at search time: Markdown headings of levels
  2 to 4, underlined headings of reStructuredText and AsciiDoc, `\section` of LaTeX, `@section` of
  Texinfo, `<section>` of PreTeXt, the members of an XML documentation of .NET, `<h2>` of HTML.
- An API reference that lives only in the comments of the code is taken from them, unchanged, with the
  declaration it documents: Angular (`@publicApi`), RxJS, NgRx Signals, the Rust standard library,
  the JDK, the `inkex` package of Inkscape.
- An exact API name written with the same case comes first (`inject` before `Inject`).

### Added: the official documentation that was missing

- JavaScript and TypeScript: the API reference of Angular, RxJS and NgRx Signals, the Angular CLI,
  the `tsconfig` reference, the guides of typescript-eslint, Prettier, EditorConfig,
  eslint-plugin-import-x, eslint-config-prettier, stylelint-config-recess-order,
  eslint-plugin-headers, Sass, Storybook, the ARIA Authoring Practices Guide.
- C# and .NET: the API reference of ASP.NET Core and EF Core (the XML documentation of their NuGet
  packages), the .NET fundamentals and architecture guides, .NET Aspire.
- Rust: the Cargo book and Rust by Example. Java: Gradle and Maven.
- Four new bricks, each with its server and its export pack: `containers-official-docs` (Dockerfile,
  Docker, Podman, Compose, Dev Containers, OCI), `git-official-docs`, `cpp-official-docs`
  (cppreference.com, CMake, Clang, GNU Make, GCC) and `math-docs` (free textbooks of linear algebra,
  discrete mathematics and combinatorics, in their LaTeX and PreTeXt source).
- A source may be an archive (a NuGet package, a ZIP) instead of a Git repository.
- `scripts/sync-docs-bricks.ts` copies the shared code of the documentation bricks.

### Removed with the documentation taken as it is

- The cleaning of each flavor of documentation, the converters to Markdown (reStructuredText, XML of
  .NET), the files cut at 16 KB, and the documentation of the plugins the kit no longer uses.

### Changed: Prettier lays out the code, and the lint has no opinion

- Prettier and EditorConfig are the base of the format, with the defaults of an Angular project: 2
  spaces, single quotes in TypeScript, LF, a final newline, templates read by the Angular parser.
- The format adds what Prettier does not do, without ever fighting it (eslint-config-prettier first,
  and a test with its own checker): imports, exports, types and class members sorted, blank lines,
  braces, the copyright line (eslint-plugin-headers), the notation of the standard Stylelint config,
  CSS properties in the order of Recess (stylelint-config-recess-order).
- The lint keeps real errors and recognised good practice only. Rules that were a matter of taste are
  gone: no ban on classes, `enum` or bitwise operators, no return type asked everywhere, no single
  function per file, no sorted object keys.
- The rules are grouped by theme, one file each in `lint/eslint/` and `lint/stylelint/`, each with a
  short introduction and a comment per rule. `lint/settings.mjs` switches each theme on or off: turn
  off what blocks the team today without uninstalling its package.
- eslint-plugin-import-x replaces import-lite and the local import rules: cycles, duplicates,
  packages not declared in `package.json`.
- JavaScript files (`.mjs`, `.js`) are formatted and linted, without the rules that need the types.
- `tsconfig.json` targets ES2025 with the strictest options.
- Scripts `format:js`, `format:scss`, `lint:js`, `lint:scss`, then `format`, `lint` and `check`. The
  output is that of ESLint and Stylelint, one line per error.
- OpenCode formats `.ts`, `.mts`, `.js`, `.mjs`, `.html`, `.json`, `.css` and `.scss`: ESLint, then
  Prettier, then Stylelint.
- The kit is a project of its own, with `package.json`, `tsconfig.json` and example code: `npm install`
  then `npm run check` work in it as they are. The import writes it whole in an empty folder; in a
  project that exists, it replaces nothing, leaves the example code aside, and lists what it left.

### Removed with Prettier

- `lint/formatter.cjs`, `lint/packages.json`, `lint/optional.mjs`, `lint/project.mjs`,
  `lint/local-rules.mjs` and `lint/tsconfig.strict.json`; the merge of `package.json` by the import;
  ESLint Stylistic layout rules, `@stylistic/stylelint-plugin` and eslint-plugin-jsonc.

### Added: the official documentation of C#, Python, Rust and Java

- Four documentation bricks, each with its own MCP server and its own export pack:
  `csharp-official-docs` (C#, .NET, ASP.NET Core, EF Core and the API reference of 88 namespaces),
  `python-official-docs` (Python 3.15 and the `inkex` API of the Inkscape extensions with their
  guides), `rust-official-docs` (the book, the reference and the standard library of Rust 1.100),
  `java-official-docs` (the Java SE API of OpenJDK 25).
- Only the official documentation, each source under its own license, checked in its repository at
  the version taken: CC BY 4.0, PSF License, MIT or Apache 2.0, GPL 2.0 or later, GPL 2.0 with the
  Classpath exception. The `README.md` of each brick lists its sources and what was set aside.
- Converters to Markdown for the formats that are not Markdown: the ECMA XML of the .NET API
  reference, reStructuredText, the documentation comments of Rust, Javadoc, Python docstrings.
- The documentation bricks share the same server code; `brick.json` gives each its name and the
  words of its tools. The search puts first a title that names exactly the API asked, as `List<T>`
  or `Vec push`.

### Changed: the format and the lint of a plain project

- The format and the lint live at the root of the project, as in any project: `eslint.format.config.mjs`
  (the format, rules that fix themselves only) and `eslint.config.mjs` (the lint, the default config of
  ESLint, which imports the format config first), `stylelint.format.config.mjs` and
  `stylelint.config.mjs` the same way. The editor, the team and the AI use the same configs.
- Each config starts from the recommended config of its library; the settings of a project
  (copyright line, Angular selector prefix, folders left out) are in `lint/settings.mjs`, the local
  rules in `lint/local-rules.mjs`.
- `npm run format`, `npm run lint` (one line per error with its rule id) and `npm run check`. The
  import adds these scripts and the lint packages to `package.json` when they are missing, and writes
  the configs only when they are missing: they belong to the team.
- OpenCode runs the format config on each file written (`eslint-format` and `stylelint-format` in
  `opencode.json`).
- CSS is read as SCSS by the format too, as the standard SCSS config reads it in the lint.

### Removed with the format and lint of a plain project

- The bricks `format` and `lint`, their MCP servers and `.agents/package.json`; `.agents/profile.json`
  gives way to `lint/settings.mjs`.

### Changed: everything in the project, one brick per MCP server (decision 0023)

- No global base anymore: a project holds `AGENTS.md`, `opencode.json` and `.agents/`, and nothing is
  installed elsewhere.
- Each MCP server is a brick in `.agents/mcp/<name>/`, with its code, its config, its documentation,
  its `rules.md` and its `README.md`, and its own copy of the small MCP core. Removing the folder
  removes the brick without breaking the others.
- Four bricks: `format` (formats the file it is given, and runs after each write as the formatter of
  OpenCode), `lint` (`lint_file` and `lint_project`, one line per error with its rule id), `parse`
  (heavy files) and `js-official-docs` (the official documentation of the JavaScript and TypeScript
  tools, its search index built on the machine).
- `opencode.json` at the root of the project holds `instructions`, `formatter` and the local MCP
  servers only: no right, no web lock, no agent turned off. The built-in formatters Prettier, Biome
  and oxfmt are turned off, so that the format brick runs.
- `.agents/package.json` lists the packages of the format and lint bricks, installed apart from the
  project with `npm install --prefix .agents`.
- The export holds one pack `kit` and one pack per documentation brick. One import script,
  `import.ts`, takes every part of its folder, checks them all, and writes everything at once, with the
  line of each brick in `opencode.json`.

### Removed with the bricks

- `global/`, with the documents written for the AI (`docs/`: Angular, NgRx Signals, components, tests,
  TypeScript, lint): only the official documentation stays. The skill `write-base-document` goes with
  them.
- The servers `project` and `code`, the tools `missing-packages.ts` and `base-version.ts`.
- `devcontainer/`, `guides/` (their content is in `README.md`), `notes/`, `opencode/`, `import/` and
  its two scripts.

### Changed: a global base of documentation and servers, the kit in the project (decision 0022)

- `global/` holds the documentation, the MCP servers (`docs`, `project`, `code`, `parse`), the tools
  they run and the common rules, nothing else.
- Every skill lives in the project kit, flat, in `.agents/skills/<name>/`; `project/AGENTS.md` lists the
  servers, the documentation and the skills. Eleven skills of 0.1 come back, rewritten for one agent.
- The format and lint configs live in the project kit, `.agents/lint/`, for the whole team: one config
  for every project, which lints according to what the project installs (Angular rules with
  `@angular/core`, JSDoc rules with `eslint-plugin-jsdoc`). No rule forbids a class anymore. The lint
  packages install at their latest version; the AI runs the lint before "done".
- `opencode/opencode.jsonc`, beside `global/`, is what the base adds to the user's OpenCode
  configuration: no right that asks, no `base-guard` plugin. The test dev containers move to
  `devcontainer/`. Both travel in `setup/` of the export, as plain files.
- The two import scripts move to `import/`; the build tools and the sample projects leave this
  repository.

### Removed in this change

- The kit of functions (maths, geometry, symbol types), the synoptics and symbol catalogs, the placement
  format, the maths documents, the rule sheets (`practices`) and the servers `geometry`, `skills` and
  `practices`.
- The lint profiles, `apply-profile.ts`, `apply-lint.ts`, `install-lint.ts`, `detect-project.ts`; the
  skills `write-component`, `write-store`, `write-service`, `write-library-function`,
  `write-project-skill`.

### Removed

- The orchestrator, the brief, the planner, the checker and the specialised agents; the `work` server,
  `tasks.md` and their skills; the welcome and the profile chosen at the first conversation (decision
  0021 of the project). One agent works directly; `AGENTS.md` tells it where the tools are.
- The sub-agent gate of the plugin; the trial guides of the welcome and of the orchestration.

### Cleaned

- The code templates moved into the `assets/` folder of the skill that uses them; the test dev
  containers into `global/devcontainer/`; the common rules into `global/rules.md`; the last skill of
  `opencode/skills/` into `global/skills/common/`. The folders `global/templates/`, `global/rules/` and
  `global/opencode/skills/` are gone.
- The evaluation (`global/evaluation/`, its runner, tests and guide) is removed.
- The OpenCode config drops the compaction and tool output settings (OpenCode's defaults apply), the
  refusal of Code Mode, the switched-off built-in formatters and the rules that repeated the read-only
  mount.
- Every lint and format plugin is optional but eslint and typescript-eslint: a missing one leaves out its
  rules (`global/lint/optional.mjs`), so a TypeScript project never needs Angular packages.
- The rules say the AI runs every command itself and asks its choices with the question tool.

### Changed in the agent

- The AI runs the installs itself; OpenCode asks the user to approve each one.
- The skills of the base are open to every project; strict format and lint stay on demand
  (`apply-profile.ts`).
- The start skills use Angular only when asked; a plain TypeScript project uses Vite, Vitest and Node.

### Added

- The license files of every documentation source, copied unchanged at the commit of the library, in
  `global/licenses/<tool>/` and `archive/v0.1/licenses/<tool>/`, by `node scripts/fetch-licenses.ts`.
  `scripts/fetch-library.ts` now copies them too.
- A guide to give one request to a project with the base and to the same project without it:
  `guides/compare-with-and-without.md`, on macOS or Linux, from the paste to both conversations.
- Two test dev containers on `mcr.microsoft.com/devcontainers/javascript-node:26`, with and without
  the base, and the shared OpenCode user configuration, in `global/templates/devcontainer/`.

### Changed

- `import-base.ts` puts the base in `./local-ai-base` of the folder it runs from, instead of a hidden
  folder of the home. It refuses the folder of the pasted parts, and a folder that is not empty and
  holds no base, where it used to replace them whole. `--machine` stays, for Podman only.
- `guides/install.md` is shorter: one folder, two mounts (in `devcontainer.json`, or for the whole
  machine with Podman), OpenCode, the check.
- "navigation" and "damage" stay without card on purpose; the AI asks what they show if a task
  needs one.
- `THIRD_PARTY_NOTICES.md` gives the copyright lines of each source, its license address and its
  license files, and what share-alike (MDN) and the Artistic License (npm) ask. The check of the
  library refuses a tool without copyright or without its license file.
- Tools and guidance, not bans (decision 0020 of the project): every command is allowed to every
  agent; an install, a push, a branch, a worktree or a deletion asks the user; only the web is
  refused (`webfetch`, `websearch`, `curl`, `wget`, `git clone`, `git fetch`, `git pull`). Heavy files
  are no longer refused raw: the common rules say to open them with the `parse` tools, and why.
- The check of `tasks.md` checks only the form of a check command.
- The test containers share the same rights through `opencode-user/opencode.jsonc`, the web closed in
  both; they pass `ANTHROPIC_API_KEY` of the machine, and install packages only when a project has a
  `package.json`.
- The lint pass lets Storybook files (`.storybook/*.ts`, `*.stories.ts`) export a default and their
  stories; it runs Stylelint only when the project has styles; a missing package is one clear line.

- The test containers install OpenCode 2.2.7 in the project itself (`npx opencode`, `npm run
  opencode`), pinned, and run its postinstall by hand, which npm 12 blocks. Each one locks the web in
  `OPENCODE_CONFIG_CONTENT`: `websearch: false`, no `webfetch`, no download, no shared session. The
  base and the user configuration say the same. A project whose `package.json` only holds
  `@opencode/cli` counts as empty for the welcome, and the start skills keep OpenCode in it.

### Added in the tools

- `tools/missing-packages.ts` lists the packages of the profile a project lacks and the one command
  that installs them; `project_info` shows it, and the brief asks the user to run it.
- `work_finish_by_user` marks done a task the user did, as an install, with their words.

### Fixed

- The authors of eslint-plugin-functional and of @vitest/eslint-plugin, as their licenses name them.
- Every `npx --no <tool>` command is now `npx --no -- <tool>`: npm 12 read `-p` as its own option and
  tried to download a package named `tsconfig.json`.

## [0.2.0] - 2026-11-13

A new base for front-end work only, made of a global base shared by every dev container and a small
project kit. Version 0.1 is archived, unchanged.

### Added

- Global base and project kit: the base is mounted read-only in every dev container; a project holds
  only `AGENTS.md` and `.agents/`; common rules loaded by OpenCode; guards against package installs,
  network commands, branches, worktrees and destructive commands; a check of the base version.
- Export in five part sizes (500 KB, 1, 2, 5 and 10 MB), compressed with brotli and encoded in Z85,
  with checksums; `import-base.ts` and `import-project.ts`, one file each, without packages.
- Local search engine: plain-text indexes and BM25 ranking over the documentation.
- The documentation of the web in local: MDN (ARIA included), Angular, TypeScript, RxJS, NgRx Signals,
  Node.js, npm, Vite, Vitest, Playwright, ESLint and its plugins, Stylelint, each file with its tool,
  version, source, commit and license; a script and a procedure to update a tool.
- MCP servers: `docs`, `practices`, `skills`, `project`, `work`, `code`, `parse` and `geometry`, each
  answer capped and logged.
- Format at every write, then a strict lint in a separate pass, without Prettier; four profiles
  (Angular application, Angular library, TypeScript business library, pure functions); house rules
  (one function per file, file named after it, JSDoc, copyright header); a sheet per rule.
- Heavy files read by their outline, then one part, with their images: Adobe XD, Word, Excel,
  PowerPoint, PDF, SVG, JSON and logs.
- Angular 22 and NgRx Signals: a store that only lists its features; accessible components made
  without Material or CDK; tested templates; skills to write a store, a component, a service, a library
  function and tests, and to start a project.
- Maths and geometry: two documented topics, a kit of 133 tested pure functions, the placement format
  of SVG elements and its resolver, served by the `geometry` server.
- Symbols: console controls and displays, 30 more equipment cards, French to English indexes, a table
  of everyday aliases, a coverage check of a symbol list, and the TypeScript types of every card,
  generated and tested.
- Brief, plan and delegation: the agents `orchestrator`, `brief`, `planner`, `checker` and nine
  specialised agents, each with its own skills, tools and rights; one fresh sub-agent per task, one at
  a time, on the current branch; checks of `brief.md`, `tasks.md` and the reports; resume after a break;
  a skill to save a procedure of the user as a project skill.
- Welcome: detection of the kind of project, confirmation by questions, then the profile applied with
  only its skills, documents and agents; a project that is not front-end is refused.
- Evaluation: ten front-end tasks with hidden proofs, a runner for three conditions (no base, 0.1, 0.2)
  and a summary.
- Guides for the workstation: install, paste, welcome, orchestration, heavy files, update a tool,
  evaluation.

### Changed

- OpenCode CLI 2.2.7 only: no chat profile, no Open WebUI.
- Only TypeScript tools on Node, and only known packages, installed by the user.

### Removed

- C#, .NET, containers, Kubernetes, the chat profile and its adapters: they stay in version 0.1.
