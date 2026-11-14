---
title: "core::primitive"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/primitive.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::primitive

This module reexports the primitive types to allow usage that is not
possibly shadowed by other declared types.

This is normally only useful in macro generated code.

An example of this is when generating a new struct and an impl for it:

```rust
pub struct bool;

impl QueryId for bool {
    const SOME_PROPERTY: bool = true;
}

```

Note that the `SOME_PROPERTY` associated constant would not compile, as its
type `bool` refers to the struct, rather than to the primitive bool type.

A correct implementation could look like:

```rust
pub struct bool;

impl QueryId for bool {
    const SOME_PROPERTY: ::core::primitive::bool = true;
}

```

We also used `::core` instead of `core`, because `core` can be
shadowed, too. Paths, starting with `::`, are searched in
the [extern prelude] since Edition 2018.
