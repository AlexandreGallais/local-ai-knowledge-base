---
title: "core::slice::iter (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/slice/iter.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::slice::iter (part 2 of 2)

## RChunksExact::remainder

```rust
pub const fn remainder(&self) -> &'a [T]
```

Returns the remainder of the original slice that is not going to be
returned by the iterator. The returned slice has at most `chunk_size-1`
elements.

# Example

```rust
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.rchunks_exact(2);
assert_eq!(iter.remainder(), &['l'][..]);
assert_eq!(iter.next(), Some(&['e', 'm'][..]));
assert_eq!(iter.remainder(), &['l'][..]);
assert_eq!(iter.next(), Some(&['o', 'r'][..]));
assert_eq!(iter.remainder(), &['l'][..]);
assert_eq!(iter.next(), None);
assert_eq!(iter.remainder(), &['l'][..]);
```

## struct RChunksExactMut

```rust
pub struct RChunksExactMut<'a, T: 'a>
```

An iterator over a slice in (non-overlapping) mutable chunks (`chunk_size`
elements at a time), starting at the end of the slice.

When the slice len is not evenly divided by the chunk size, the last up to
`chunk_size-1` elements will be omitted but can be retrieved from the
`into_remainder` function from the iterator.

This struct is created by the `rchunks_exact_mut` method on [slices].

# Example

```rust
let mut slice = ['l', 'o', 'r', 'e', 'm'];
let iter = slice.rchunks_exact_mut(2);
```

## RChunksExactMut::into_remainder

```rust
pub const fn into_remainder(self) -> &'a mut [T]
```

Returns the remainder of the original slice that is not going to be
returned by the iterator. The returned slice has at most `chunk_size-1`
elements.

## struct ChunkBy

```rust
pub struct ChunkBy<'a, T: 'a, P>
```

An iterator over slice in (non-overlapping) chunks separated by a predicate.

This struct is created by the `chunk_by` method on [slices].

## struct ChunkByMut

```rust
pub struct ChunkByMut<'a, T: 'a, P>
```

An iterator over slice in (non-overlapping) mutable chunks separated
by a predicate.

This struct is created by the `chunk_by_mut` method on [slices].
