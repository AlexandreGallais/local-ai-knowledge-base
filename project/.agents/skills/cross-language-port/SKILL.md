---
name: cross-language-port
description: "Manual: run only when the user explicitly asks for /cross-language-port. Ports a module from one language to another, proving equivalence with shared test cases run against both versions."
metadata:
  id: STK-12
  stars: "1"
  nature: process
  mode: A
  wave: V4
  load: manual
---

# Cross-language port

**Core rule:** equivalence is proven by the same input and output cases run against the old and the new implementation, not by reading the code.

## Procedure

1. Capture the behaviour of the original: write input and expected output cases (a JSON or CSV file) from its tests and from runs on real inputs.
   - Check: the cases cover normal, edge and error inputs, and pass on the original.
2. Port function by function, idiomatically in the target language (types, errors, naming of the target).
   - Check: each ported function compiles and has its unit tests.
3. Run the shared cases against the new implementation.
   - Check: every case gives the same output, within tolerance for numbers.
4. Compare performance if it matters.
   - Check: numbers for both versions.

## Stop and ask the human if

- The original has behaviours that look like bugs: keep or fix?

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Translate line by line." | The result is unidiomatic and keeps the source's quirks. |
| "Integer and float rules are the same." | Division, overflow and rounding differ between languages. |

## Definition of done

- [ ] Shared cases pass on both implementations; differences explained.
