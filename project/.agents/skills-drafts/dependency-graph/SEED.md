# SEED: dependency-graph  (EXP-08, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: dependency-graph
description: "Shows and analyses the dependency tree of a project per ecosystem - npm ls, pipdeptree, mvn dependency:tree, dotnet list package, cargo tree - to find duplicates and conflicts. Use when a dependency version conflict appears, a package is pulled in unexpectedly, or you need to know why a package is installed."
metadata:
  id: EXP-08
  stars: "2"
  nature: reference
  mode: D
  wave: V3
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Tree commands per ecosystem installed here.
- [ ] Finding why a package is present (npm explain, cargo tree -i, mvn dependency:tree -Dincludes).
- [ ] Duplicates and version conflicts and how each manager resolves them.

## Known pitfalls to confirm or drop

- npm ls exits non-zero on extraneous or invalid packages; read the message.

## MCP servers and example queries

- js-official-docs: npm explain
- rust-official-docs: cargo tree -i
- java-official-docs: maven dependency tree
- csharp-official-docs: dotnet list package --include-transitive
