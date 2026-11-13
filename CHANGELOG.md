# Changelog

All notable changes of this base. The format follows Keep a Changelog; versions follow Semantic
Versioning. Version 0.1 keeps its own changelog in `archive/v0.1/CHANGELOG.md`.

## [Unreleased]

### Added

- The license files of every documentation source, copied unchanged at the commit of the library, in
  `global/licenses/<tool>/` and `archive/v0.1/licenses/<tool>/`, by `node scripts/fetch-licenses.ts`.
  `scripts/fetch-library.ts` now copies them too.
- A guide to give one request to a project with the base and to the same project without it:
  `guides/compare-with-and-without.md`.

### Changed

- `THIRD_PARTY_NOTICES.md` gives the copyright lines of each source, its license address and its
  license files, and what share-alike (MDN) and the Artistic License (npm) ask. The check of the
  library refuses a tool without copyright or without its license file.

### Fixed

- The authors of eslint-plugin-functional and of @vitest/eslint-plugin, as their licenses name them.

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
