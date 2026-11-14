# Changelog

All notable changes of this base. The format follows Keep a Changelog; versions follow Semantic
Versioning. Version 0.1 keeps its own changelog in `archive/v0.1/CHANGELOG.md`.

## [Unreleased]

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
