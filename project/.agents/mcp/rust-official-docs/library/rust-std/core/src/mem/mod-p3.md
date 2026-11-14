---
title: "core::mem (part 3 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/mem/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::mem (part 3 of 3)

## fn conjure_zst

```rust
pub const unsafe fn conjure_zst<T>() -> T
```

Create a fresh instance of the inhabited ZST type `T`.

Prefer this to `zeroed` or `uninitialized` or `transmute_copy`
in places where you know that `T` is zero-sized, but don't have a bound
(such as `Default`) that would allow you to instantiate it using safe code.

If you're not sure whether `T` is an inhabited ZST, then you should be
using `MaybeUninit`, not this function.

# Panics

If `size_of::<T>() != 0`.

# Safety

- `T` must be *[inhabited]*, i.e. possible to construct. This means that types
  like zero-variant enums and `!` are unsound to conjure.
- You must use the value only in ways which do not violate any *safety*
  invariants of the type.

While it's easy to create a *valid* instance of an inhabited ZST, since having
no bits in its representation means there's only one possible value, that
doesn't mean that it's always *sound* to do so.

For example, a library could design zero-sized tokens that are `!Default + !Clone`, limiting
their creation to functions that initialize some state or establish a scope. Conjuring such a
token could break invariants and lead to unsoundness.

# Examples

```rust
use std::mem::conjure_zst;

assert_eq!(unsafe { conjure_zst::<()>() }, ());
assert_eq!(unsafe { conjure_zst::<[i32; 0]>() }, []);
```
