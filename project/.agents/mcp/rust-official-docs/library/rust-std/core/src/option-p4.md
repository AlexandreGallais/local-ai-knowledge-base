---
title: "core::option (part 4 of 4)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/option.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::option (part 4 of 4)

## ::IntoIter

```rust
pub struct IntoIter<A>
```

An iterator over the value in `Some` variant of an `Option`.

The iterator yields one value if the `Option` is a `Some`, otherwise none.

This `struct` is created by the `Option::into_iter` function.

## Option::flatten

```rust
pub const fn flatten(self) -> Option<T>
```

Converts from `Option<Option<T>>` to `Option<T>`.

# Examples

Basic usage:

```rust
let x: Option<Option<u32>> = Some(Some(6));
assert_eq!(Some(6), x.flatten());

let x: Option<Option<u32>> = Some(None);
assert_eq!(None, x.flatten());

let x: Option<Option<u32>> = None;
assert_eq!(None, x.flatten());
```

Flattening only removes one level of nesting at a time:

```rust
let x: Option<Option<Option<u32>>> = Some(Some(Some(6)));
assert_eq!(Some(Some(6)), x.flatten());
assert_eq!(Some(6), x.flatten().flatten());
```
