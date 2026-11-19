# SEED: matlab-to-open-migration  (SCI-02, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: matlab-to-open-migration
description: "Manual: run only when the user explicitly asks for /matlab-to-open-migration. Ports Matlab code to Octave or to NumPy and SciPy with a table of equivalences and numerical non-regression tests."
metadata:
  id: SCI-02
  stars: "2"
  nature: process
  mode: D
  wave: V3
  load: manual
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Target chosen (Octave or Python) and installed versions.
- [ ] Table of equivalent functions used by the code (indexing, solvers, plotting).
- [ ] Differences in indexing (1-based versus 0-based) and array semantics.
- [ ] Non-regression tests comparing outputs within tolerances.

## Known pitfalls to confirm or drop

- Matlab's column-major order versus NumPy's row-major default.
- Differences in default solver tolerances.

## MCP servers and example queries

- simulation-official-docs: Octave Matlab compatibility, Scilab Matlab equivalents
- python-official-docs: numpy for Matlab users
