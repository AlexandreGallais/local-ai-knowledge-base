# SEED: coverage-analysis  (TST-05, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: coverage-analysis
description: "Measures test coverage and uses it to find untested risky code, not to chase a percentage. Use when asked for coverage, when deciding which tests to add, or when reviewing whether a change is tested."
metadata:
  id: TST-05
  stars: "2"
  nature: process
  mode: D
  wave: V3
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Coverage tools per language installed (c8 or istanbul, coverage.py, coverlet, JaCoCo, llvm-cov or gcov, cargo-llvm-cov).
- [ ] Running coverage on changed files only.
- [ ] Reading uncovered branches in risky code.

## Known pitfalls to confirm or drop

- High line coverage with no assertions proves nothing.

## MCP servers and example queries

- js-official-docs: vitest coverage
- python-official-docs: coverage.py
- java-official-docs: JaCoCo
- csharp-official-docs: coverlet
- cpp-official-docs: gcov
