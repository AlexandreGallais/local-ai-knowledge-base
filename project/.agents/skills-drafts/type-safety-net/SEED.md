# SEED: type-safety-net  (DEV-07, 4 stars, V2)

## Final frontmatter (do not change)

```yaml
name: type-safety-net
description: "Uses the type checker as a safety net after each change - tsc --noEmit, mypy or pyright, cargo check, warnings as errors. Use when you changed typed code, before running tests, when you see type errors like TS2345, error[E0308] or 'incompatible types', or when adding types to untyped code."
metadata:
  id: DEV-07
  stars: "4"
  nature: process
  mode: D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Type-check command per language as configured in the project (tsconfig, mypy.ini or pyproject, Cargo, csproj Nullable, javac -Xlint).
- [ ] Running it on the changed files or package only, fast.
- [ ] Reading the most common type errors per language and fixing them without any or casts.
- [ ] Strictness flags the project uses (strict, noUncheckedIndexedAccess, Nullable enable, warnings as errors).

## Known pitfalls to confirm or drop

- Silencing errors with any, as unknown as T, type: ignore or unsafe casts.
- tsc on a single file ignores tsconfig settings; use the project.
- mypy without the project config checks nothing useful.

## MCP servers and example queries

- js-official-docs: tsconfig strict noUncheckedIndexedAccess, TS2345
- python-official-docs: typing, mypy configuration
- rust-official-docs: E0308 mismatched types
- csharp-official-docs: nullable reference types, TreatWarningsAsErrors
