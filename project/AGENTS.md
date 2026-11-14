# AGENTS.md

This file belongs to the project. The team may change it: keep it short, in English, with one rule per line.
The common rules of the global base are loaded as well; this file only adds what is true for this project.

## What the global base gives you

The base is at `/opt/local-ai-base`, read-only. Use it when your memory is not sure.

- MCP tools, offered, never imposed: call them when they help.
  - `docs`: the documentation, kept locally: find a page, then read one section.
  - `project`: the versions of this project, its check commands and its skills.
  - `code`: the outline of a file, one function, where a name is used, the type errors.
  - `parse`: the outline then one part of a heavy file (`.xd`, `.pdf`, `.docx`, `.xlsx`, `.pptx`, `.svg`).
- Documentation, searched by the `docs` tools:
  - `docs/`: short documents written for the AI: Angular, Angular tests, components, NgRx Signals, TypeScript, TypeScript lint.
  - `library/`: the official documentation: MDN (JavaScript, HTML, CSS, Web APIs, SVG, HTTP, accessibility), Angular, TypeScript, RxJS, NgRx Signals, Node.js, npm, Vite, Vitest, Playwright, ESLint and its plugins, Stylelint.

## Format and lint of this project

`.agents/lint/` holds the configs, for the whole team. Run the lint before you say "done": `npm run lint`,
or `node /opt/local-ai-base/tools/lint-file.ts --all`. Missing packages: the skill `apply-strict-lint`.

## Skills of this project

The skills are in `.agents/skills/`, one folder each. Add one with the skill `write-skill`.

- apply-strict-lint, architecture-review, choose-version, code-review, document-function, explain-code,
  look-up-api, name-branch, start-angular-project, start-typescript-library, write-agent,
  write-agents-md, write-base-document, write-commit-message, write-skill, write-tests

## This project

- Subject: not set yet. Write it here in one line once you know it.

## Project rules

- None yet. Add one line per rule that is true for this project only.
