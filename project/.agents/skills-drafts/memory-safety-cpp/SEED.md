# SEED: memory-safety-cpp  (SEC-09, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: memory-safety-cpp
description: "Hardens C and C++ code against memory errors - AddressSanitizer, UndefinedBehaviorSanitizer, MemorySanitizer, compiler hardening flags. Use when building or testing C or C++ code, when a crash looks like memory corruption, or when asked to harden a native build."
metadata:
  id: SEC-09
  stars: "2"
  nature: reference
  mode: R+D
  wave: V3
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Sanitizers supported by the installed compilers and how to enable them in CMake.
- [ ] ASAN_OPTIONS and UBSAN_OPTIONS useful settings.
- [ ] Reading an ASan report down to the faulty line.
- [ ] Hardening flags (_FORTIFY_SOURCE, stack protector, PIE).

## Known pitfalls to confirm or drop

- MemorySanitizer needs every library instrumented and works with clang only.
- Sanitizers change memory layout; run tests, not benchmarks, with them.

## MCP servers and example queries

- cpp-official-docs: AddressSanitizer, UndefinedBehaviorSanitizer, _FORTIFY_SOURCE
