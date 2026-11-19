# SEED: build-failure-triage  (DBG-11, 4 stars, V2)

## Final frontmatter (do not change)

```yaml
name: build-failure-triage
description: "Reads and sorts build failures by ecosystem - compile errors, bundler errors, dependency resolution - and fixes the first real one. Use when a build fails with tsc, webpack, vite, cargo, rustc, dotnet build, mvn, gradle, cmake, make or pip errors, or when dependency resolution fails with ERESOLVE, version conflicts or 'could not resolve'."
metadata:
  id: DBG-11
  stars: "4"
  nature: process
  mode: D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] The first error versus cascading errors, per compiler.
- [ ] Dependency resolution errors per package manager and their meaning (npm ERESOLVE, Maven conflicts, NuGet NU1605, cargo version selection, pip resolver).
- [ ] Bundler errors (module not found, circular imports).
- [ ] Linker errors in C and C++ (undefined reference, multiple definition).
- [ ] Clean rebuild commands per ecosystem, without deleting what is not generated.

## Known pitfalls to confirm or drop

- Fixing the last error first; the first error often causes the others.
- npm --force or --legacy-peer-deps hides real peer conflicts.
- A stale build cache (dist, target, obj, build) gives errors on code that no longer exists.
- C++ template errors: read the first 'required from here' line.

## MCP servers and example queries

- js-official-docs: npm ERESOLVE peer dependencies, vite build errors
- rust-official-docs: cargo build, rustc error index
- csharp-official-docs: NU1605, dotnet build
- java-official-docs: maven dependency mediation, gradle dependency resolution
- cpp-official-docs: cmake, undefined reference
