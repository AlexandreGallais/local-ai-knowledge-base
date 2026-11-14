---
title: "alloc::vec::drain"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/vec/drain.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::vec::drain

## struct Drain

```rust
pub struct Drain< 'a, T: 'a, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator + 'a = Global, >
```

A draining iterator for `Vec<T>`.

This `struct` is created by `Vec::drain`.
See its documentation for more.

# Example

```rust
let mut v = vec![0, 1, 2];
let iter: std::vec::Drain<'_, _> = v.drain(..);
```

## Drain::as_slice

```rust
pub fn as_slice(&self) -> &[T]
```

Returns the remaining items of this iterator as a slice.

# Examples

```rust
let mut vec = vec!['a', 'b', 'c'];
let mut drain = vec.drain(..);
assert_eq!(drain.as_slice(), &['a', 'b', 'c']);
let _ = drain.next().unwrap();
assert_eq!(drain.as_slice(), &['b', 'c']);
```
