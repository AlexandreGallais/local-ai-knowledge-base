---
title: "Array types"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/types/array.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[type.array]
# Array types

r[type.array.syntax]
```grammar
ArrayType -> `[` Type `;` Expression `]`
```

r[type.array.intro]
An array is a fixed-size sequence of `N` elements of type `T`. The array type is written as `[T; N]`.

r[type.array.constraint]
The size is a [constant expression] that evaluates to a [`usize`].

Examples:

```rust
// A stack-allocated array
let array: [i32; 3] = [1, 2, 3];

// A heap-allocated array, coerced to a slice
let boxed_array: Box<[i32]> = Box::new([1, 2, 3]);
```

r[type.array.index]
All elements of arrays are always initialized, and access to an array is always bounds-checked in safe methods and operators.

> **Note:**
> The [`Vec<T>`] standard library type provides a heap-allocated resizable array type.
