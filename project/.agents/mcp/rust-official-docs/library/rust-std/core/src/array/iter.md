# core::array::iter

Defines the `IntoIter` owned iterator for arrays.

## struct IntoIter

```rust
pub struct IntoIter<T, const N: usize>
```

A by-value [array] iterator.

## IntoIter::new

```rust
pub fn new(array: [T; N]) -> Self
```

Creates a new iterator over the given `array`.

## IntoIter::as_slice

```rust
pub fn as_slice(&self) -> &[T]
```

Returns an immutable slice of all elements that have not been yielded
yet.

## IntoIter::as_mut_slice

```rust
pub const fn as_mut_slice(&mut self) -> &mut [T]
```

Returns a mutable slice of all elements that have not been yielded yet.