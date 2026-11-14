---
title: "alloc::boxed::iter"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/boxed/iter.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::boxed::iter

## struct BoxedArrayIntoIter

```rust
pub struct BoxedArrayIntoIter<T, const N: usize, A: Allocator = Global>
```

A by-value `Box<[T; N]>` iterator.

## BoxedArrayIntoIter::as_slice

```rust
pub fn as_slice(&self) -> &[T]
```

Returns an immutable slice of all elements that have not been yielded
yet.

## BoxedArrayIntoIter::as_mut_slice

```rust
pub fn as_mut_slice(&mut self) -> &mut [T]
```

Returns a mutable slice of all elements that have not been yielded yet.
