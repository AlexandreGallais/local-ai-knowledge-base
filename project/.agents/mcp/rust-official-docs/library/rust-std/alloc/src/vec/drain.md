# alloc::vec::drain

## struct Drain

```rust
pub struct Drain< 'a, T: 'a, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator + 'a = Global, >
```

A draining iterator for `Vec<T>`.

This `struct` is created by [`Vec::drain`].
See its documentation for more.

# Example

```
let mut v = vec![0, 1, 2];
let iter: std::vec::Drain<'_, _> = v.drain(..);
```

## Drain::as_slice

```rust
pub fn as_slice(&self) -> &[T]
```

Returns the remaining items of this iterator as a slice.

# Examples

```
let mut vec = vec!['a', 'b', 'c'];
let mut drain = vec.drain(..);
assert_eq!(drain.as_slice(), &['a', 'b', 'c']);
let _ = drain.next().unwrap();
assert_eq!(drain.as_slice(), &['b', 'c']);
```