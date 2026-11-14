# core::iter::adapters::chain

## struct Chain

```rust
pub struct Chain<A, B>
```

An iterator that links two iterators together, in a chain.

This `struct` is created by [`chain`] or [`Iterator::chain`]. See their
documentation for more.

# Examples

```
use std::iter::Chain;
use std::slice::Iter;

let a1 = [1, 2, 3];
let a2 = [4, 5, 6];
let iter: Chain<Iter<'_, _>, Iter<'_, _>> = a1.iter().chain(a2.iter());
```

## fn chain

```rust
pub fn chain<A, B>(a: A, b: B) -> Chain<A::IntoIter, B::IntoIter> where A: IntoIterator, B: IntoIterator<Item = A::Item>,
```

Converts the arguments to iterators and links them together, in a chain.

See the documentation of [`Iterator::chain`] for more.

# Examples

```
use std::iter::chain;

let a = [1, 2, 3];
let b = [4, 5, 6];

let mut iter = chain(a, b);

assert_eq!(iter.next(), Some(1));
assert_eq!(iter.next(), Some(2));
assert_eq!(iter.next(), Some(3));
assert_eq!(iter.next(), Some(4));
assert_eq!(iter.next(), Some(5));
assert_eq!(iter.next(), Some(6));
assert_eq!(iter.next(), None);
```