# SEED: codemods  (TOL-06, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: codemods
description: "Manual: run only when the user explicitly asks for /codemods. Makes large mechanical code changes with AST tools - ts-morph, jscodeshift, Roslyn, OpenRewrite, Comby - tested on samples first."
metadata:
  id: TOL-06
  stars: "2"
  nature: process
  mode: D
  wave: V3
  load: manual
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Codemod tools installed and suited to the project's languages.
- [ ] Writing the transform, dry run, applying in batches.
- [ ] Verification by build, tests and diff review.

## Known pitfalls to confirm or drop

- Regex replacements break code that AST tools handle.

## MCP servers and example queries

- js-official-docs: ts-morph, jscodeshift
- csharp-official-docs: Roslyn syntax rewriter
- java-official-docs: OpenRewrite recipes
