---
title: "Inferred type"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/types/inferred.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[type.inferred]
# Inferred type

r[type.inferred.syntax]
```grammar
InferredType -> `_`
```

r[type.inferred.intro]
The inferred type asks the compiler to infer the type if possible based on the surrounding information available.

> [!EXAMPLE]
> The inferred type is often used in generic arguments:
>
> ```rust
> let x: Vec<_> = (0..10).collect();
> ```

r[type.inferred.constraint]
The inferred type cannot be used in item signatures.
