---
title: "core::slice::iter::macros"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/slice/iter/macros.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::slice::iter::macros

Macros used by iterators of slice.

## macro if_zst!

```rust
macro_rules! if_zst
```

Convenience & performance macro for consuming the `end_or_len` field, by
giving a `(&mut) usize` or `(&mut) NonNull<T>` depending whether `T` is
or is not a ZST respectively.

Internally, this reads the `end` through a pointer-to-`NonNull` so that
it'll get the appropriate non-null metadata in the backend without needing
to call `assume` manually.
