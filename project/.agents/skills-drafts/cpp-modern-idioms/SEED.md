# SEED: cpp-modern-idioms  (STK-09, 3 stars, V3)

## Final frontmatter (do not change)

```yaml
name: cpp-modern-idioms
description: "Writes modern C++ safely - RAII, smart pointers, move semantics, const-correctness, avoiding undefined behaviour. Use when writing or reviewing C++ code, managing memory or resources, using new and delete, raw pointers, or when a crash or sanitizer report points to C++ code."
metadata:
  id: STK-09
  stars: "3"
  nature: reference
  mode: D
  wave: V3
  load: auto
```

## Family template

`.agents/skills/_templates/stack-playbook.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] The C++ standard used by the project (CMAKE_CXX_STANDARD) and compilers installed.
- [ ] RAII for every resource; unique_ptr by default, shared_ptr only for shared ownership.
- [ ] Move semantics and rule of zero or five.
- [ ] const-correctness and string_view or span lifetimes.
- [ ] Common undefined behaviours and how sanitizers catch them.

## Known pitfalls to confirm or drop

- Returning a string_view or span to a temporary.
- Iterator invalidation after push_back.
- Signed overflow and uninitialised variables.

## MCP servers and example queries

- cpp-official-docs: std::unique_ptr, rule of five, std::string_view lifetime, undefined behavior
