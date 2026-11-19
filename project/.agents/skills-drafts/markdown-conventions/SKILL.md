---
name: markdown-conventions
description: "Writes clean Markdown - heading levels, tables, relative links, fenced code blocks with a language - checked with markdownlint. Use when writing or editing any .md file (README, docs, ADR, changelog, skill), or when markdownlint reports MD rules."
metadata:
  id: WRT-03
  stars: "3"
  nature: reference
  mode: B
  wave: V2
  load: auto
---

# Markdown conventions

**Core rule:** one H1 per file, headings without skipped levels, code in fenced blocks with a language, relative links that exist.

## Procedure

1. Write with the rules of the table.
   - Check: the file follows each rule.
2. Lint it when markdownlint is installed: `markdownlint-cli2 <file>` or `markdownlint <file>`.
   - Check: no finding, or each one explained.
3. Check relative links: every `](path)` target exists.
   - Check: `ls` of each target succeeds.

| Topic | Rule |
| --- | --- |
| Headings | one `#` title; then `##`, `###` in order; blank line around them |
| Lists | `-` for bullets; `1.` for steps; blank line before a list |
| Code | fenced with a language: ` ```bash `, ` ```ts `, ` ```json ` |
| Tables | header row and separator; escape a pipe in a cell as `\|` |
| Links | relative for repository files; descriptive text, never "here" |
| Lines | one sentence per line or wrap at the project's width; no trailing spaces |

## This installation

<!-- FILL: what=markdownlint tool and config used by the project; find=command -v markdownlint-cli2 markdownlint and ls .markdownlint*; verify=the linter runs on README.md and exits 0 or lists findings -->

## Stop and ask the human if

- The project's docs follow another style that conflicts with this table.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Indented code is fine." | Fenced blocks with a language are clearer and highlighted. |
| "Absolute links to the repository host." | They break on forks and offline; use relative links. |

## Definition of done

- [ ] Rules of the table followed; linter clean; links valid.

## Local completion checklist

- [ ] markdownlint tool and config
