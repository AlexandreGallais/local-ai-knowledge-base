# AGENTS.md

This file belongs to the project. The team may change it: keep it short, in English, with one rule per line.
The common rules of the global base are loaded as well; this file only adds what is true for this project.

## What the global base gives you

The base is at `/opt/local-ai-base`, read-only. Use it before your memory.

- MCP tools, already connected:
  - `docs`: the official documentation, kept locally (MDN, TypeScript, Angular, Node, Vite, Vitest, ESLint...): find a page, then read one section.
  - `practices`: the sheet of a lint rule or a good practice, with a wrong and a right example.
  - `skills`: the skills of the base, listed then loaded one by one.
  - `project`: the versions of this project and its skills.
  - `code`: the outline of a file, one function, where a name is used, the type errors.
  - `parse`: the outline then one part of a heavy file (`.xd`, `.pdf`, `.docx`, `.xlsx`, `.pptx`, `.svg`).
  - `geometry`: tested maths and SVG geometry, and the placement of elements by configuration.
- Folders to read or copy:
  - `/opt/local-ai-base/skills/`: the skills, each with its tested template in `assets/` when it has one.
  - `/opt/local-ai-base/kit/`: the tested functions that the `geometry` tools run, and the TypeScript types of the synoptic symbols.
  - `/opt/local-ai-base/docs/`: documents written for the AI, by topic (synoptics, maths, Angular, NgRx Signals...).
  - `/opt/local-ai-base/packages.md`: the packages of the base and their pinned versions.
- Strict format and lint, only when the user asks for them:
  `node /opt/local-ai-base/tools/apply-profile.ts --profile <ts-lib|ts-pure-lib|angular-app|angular-lib> --subject "<one line>"`.

## This project

- Subject: not set yet. Write it here in one line once you know it.

## Project rules

- None yet. Add one line per rule that is true for this project only.
