# SEED: build-systems  (STK-11, 3 stars, V2)

## Final frontmatter (do not change)

```yaml
name: build-systems
description: "Reads and changes build files - CMake, Meson, Gradle, Maven, Cargo - targets, options, dependencies, caches. Use when editing CMakeLists.txt, meson.build, build.gradle, pom.xml or Cargo.toml, adding a target, an option or a dependency, or when the build cache gives stale results."
metadata:
  id: STK-11
  stars: "3"
  nature: reference
  mode: D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Which build systems the project uses and their versions.
- [ ] Adding a target, a source file, an option, a dependency, per system.
- [ ] Where caches live and how to clear only them.
- [ ] Reading the effective configuration (cmake -LA, mvn help:effective-pom, gradle dependencies, cargo metadata).

## Known pitfalls to confirm or drop

- Editing generated build files instead of the source build files.
- Clearing caches by deleting non-generated folders.

## MCP servers and example queries

- cpp-official-docs: cmake add_library target_link_libraries, meson
- java-official-docs: maven effective-pom, gradle dependencies
- rust-official-docs: cargo workspace members
