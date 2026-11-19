---
name: codebase-search
description: "Finds definitions, usages and entry points fast with grep, rg, fd, find, ctags or a language server. Use when looking for where a function, class, route, config key or error message is defined or used, when tracing who calls what, or before renaming or changing a symbol."
metadata:
  id: EXP-02
  stars: "4"
  nature: reference
  mode: B
  wave: V1
  load: auto
---

# Codebase search

**Core rule:** search with a precise pattern scoped to the source folders, and read only the matching line ranges.

## Procedure

1. Search the definition first, then the usages, with the patterns below.
   - Check: the definition is found in one place; usages are listed with file and line.
2. Exclude noise: `node_modules`, `dist`, `build`, `target`, `.git`, generated code.
   - Check: no result comes from those folders.
3. Read each hit with `read` and a line range around it.
   - Check: you read the hits, not whole files.

## Patterns

| Looking for | Pattern (with the `grep` tool or `rg -n`) |
| --- | --- |
| TS or JS function | `function <name>\b\|const <name> = \|<name>\(` |
| Class or type | `(class\|interface\|type\|enum) <Name>\b` |
| Python definition | `^\s*(def\|class) <name>\b` |
| C# method or class | `(class\|interface\|record) <Name>\b`, `\b<Name>\s*\(` |
| Rust item | `(fn\|struct\|enum\|trait\|impl.*for) <name>\b` |
| Java or C++ | `\b<Name>\s*\(`, `class <Name>\b` |
| Config key | the key in quotes, then without |
| Error message | a fixed, distinctive fragment, literal search (`grep -F`) |
| Route or endpoint | the path string, e.g. `'/api/users'` |

## Tools available here

<!-- FILL: what=search tools installed in the dev container; find=command -v rg fd ctags clangd typescript-language-server pyright rust-analyzer; verify=each tool listed here prints its version with --version -->

<!-- FILL: what=folders to exclude in this project; find=cat .gitignore and ls the root; verify=a search with these exclusions returns no result from build output -->

## Stop and ask the human if

- The symbol is generated at build time and no source defines it.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I will open files until I find it." | Search first; it costs one call. |
| "No result, so it does not exist." | Try the other naming forms: camelCase, snake_case, kebab-case. |

## Definition of done

- [ ] Definition and usages found with file and line.
- [ ] Only matching ranges were read.

## Local completion checklist

- [ ] Search tools installed
- [ ] Folders to exclude
