# SEED: mutation-testing  (TST-12, 1 stars, V4)

## Final frontmatter (do not change)

```yaml
name: mutation-testing
description: "Manual: run only when the user explicitly asks for /mutation-testing. Measures the real strength of tests with mutation testing - Stryker, mutmut, PIT - on a chosen module."
metadata:
  id: TST-12
  stars: "1"
  nature: process
  mode: D
  wave: V4
  load: manual
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Mutation tools per language installed here.
- [ ] Running on one module with a time limit.
- [ ] Reading surviving mutants and writing tests that kill them.

## Known pitfalls to confirm or drop

- Running on the whole project takes hours; scope it.

## MCP servers and example queries

- js-official-docs: Stryker
- python-official-docs: mutmut
- java-official-docs: PIT mutation testing
