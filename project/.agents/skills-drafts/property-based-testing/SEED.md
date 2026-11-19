# SEED: property-based-testing  (TST-09, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: property-based-testing
description: "Tests invariants on generated inputs - Hypothesis, proptest, fast-check, jqwik - with shrinking to minimal failing cases. Use when a function has a clear invariant (round trip, ordering, idempotence), when example tests miss edge cases, or for parsers and serializers."
metadata:
  id: TST-09
  stars: "2"
  nature: reference
  mode: D
  wave: V3
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Property testing library per language installed here.
- [ ] Choosing properties: round trip, invariants, oracle comparison.
- [ ] Generators for domain types; seeds and reproducing failures.

## Known pitfalls to confirm or drop

- Properties that restate the implementation.

## MCP servers and example queries

- python-official-docs: hypothesis given
- rust-official-docs: proptest
- js-official-docs: fast-check
- java-official-docs: jqwik
