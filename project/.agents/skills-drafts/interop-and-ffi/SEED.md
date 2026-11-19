# SEED: interop-and-ffi  (STK-10, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: interop-and-ffi
description: "Calls code across languages - C and C++ from Rust, Python, C# or Java (bindgen, pybind11, P/Invoke, JNI) - with ownership and types handled. Use when binding a native library, calling C from another language, or debugging a crash at a language boundary."
metadata:
  id: STK-10
  stars: "2"
  nature: reference
  mode: D
  wave: V3
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Binding tools installed and used by the project.
- [ ] Type mapping, strings and memory ownership across the boundary.
- [ ] Error and exception handling across the boundary.
- [ ] Building and loading the native library.

## Known pitfalls to confirm or drop

- Freeing memory on the wrong side of the boundary.
- Exceptions crossing a C boundary.

## MCP servers and example queries

- rust-official-docs: FFI extern C, bindgen
- python-official-docs: ctypes
- csharp-official-docs: P/Invoke
- java-official-docs: JNI
- cpp-official-docs: extern C
