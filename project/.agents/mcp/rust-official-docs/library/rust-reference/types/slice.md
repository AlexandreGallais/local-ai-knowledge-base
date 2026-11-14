---
title: "Slice types"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/types/slice.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[type.slice]
# Slice types

r[type.slice.syntax]
```grammar
SliceType -> `[` Type `]`
```

r[type.slice.intro]
A slice is a [dynamically sized type] representing a 'view' into a sequence of elements of type `T`. The slice type is written as `[T]`.

r[type.slice.unsized]
Slice types are generally used through pointer types. For example:

* `&[T]`: a 'shared slice', often just called a 'slice'. It doesn't own the data it points to; it borrows it.
* `&mut [T]`: a 'mutable slice'. It mutably borrows the data it points to.
* `Box<[T]>`: a 'boxed slice'

Examples:

```rust
// A heap-allocated array, coerced to a slice
let boxed_array: Box<[i32]> = Box::new([1, 2, 3]);

// A (shared) slice into an array
let slice: &[i32] = &boxed_array[..];
```

r[type.slice.safe]
All elements of slices are always initialized, and access to a slice is always bounds-checked in safe methods and operators.
