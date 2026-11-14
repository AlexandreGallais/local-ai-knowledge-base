---
title: "alloc::intrinsics"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/intrinsics.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::intrinsics

Intrinsics that cannot be moved to `core` because they depend on `alloc` types.

## fn write_box_via_move

```rust
pub fn write_box_via_move<T>(b: Box<MaybeUninit<T>>, x: T) -> Box<MaybeUninit<T>>
```

Writes `x` into `b`.

This is needed for `vec!`, which can't afford any extra copies of the argument (or else debug
builds regress), has to be written fully as a call chain without `let` (or else this breaks inference
of e.g. unsizing coercions), and can't use an `unsafe` block as that would then also
include the user-provided `$x`.
