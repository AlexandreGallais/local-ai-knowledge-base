# alloc::vec::into_iter

## struct IntoIter

```rust
pub struct IntoIter< T, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

An iterator that moves out of a vector.

This `struct` is created by the `into_iter` method on [`Vec`](super::Vec)
(provided by the [`IntoIterator`] trait).

# Example

```
let v = vec![0, 1, 2];
let iter: std::vec::IntoIter<_> = v.into_iter();
```

## IntoIter::as_slice

```rust
pub fn as_slice(&self) -> &[T]
```

Returns the remaining items of this iterator as a slice.

# Examples

```
let vec = vec!['a', 'b', 'c'];
let mut into_iter = vec.into_iter();
assert_eq!(into_iter.as_slice(), &['a', 'b', 'c']);
let _ = into_iter.next().unwrap();
assert_eq!(into_iter.as_slice(), &['b', 'c']);
```

## IntoIter::as_mut_slice

```rust
pub fn as_mut_slice(&mut self) -> &mut [T]
```

Returns the remaining items of this iterator as a mutable slice.

# Examples

```
let vec = vec!['a', 'b', 'c'];
let mut into_iter = vec.into_iter();
assert_eq!(into_iter.as_slice(), &['a', 'b', 'c']);
into_iter.as_mut_slice()[2] = 'z';
assert_eq!(into_iter.next().unwrap(), 'a');
assert_eq!(into_iter.next().unwrap(), 'b');
assert_eq!(into_iter.next().unwrap(), 'z');
```