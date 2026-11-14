# core::range::iter

## struct RangeIter

```rust
pub struct RangeIter<A>(pub(crate) legacy::Range<A>)
```

By-value [`Range`] iterator.

## RangeIter::remainder

```rust
pub fn remainder(self) -> Range<A>
```

Returns the remainder of the range being iterated over.

# Examples

```
#![feature(new_range_remainder)]

let range = core::range::Range::from(3..11);
let mut iter = range.into_iter();
assert_eq!(iter.clone().remainder(), range);
iter.next();
assert_eq!(iter.clone().remainder(), core::range::Range::from(4..11));
iter.by_ref().for_each(drop);
assert!(iter.remainder().is_empty());
```

## macro unsafe_range_trusted_random_access_impl!

```rust
macro_rules! unsafe_range_trusted_random_access_impl
```

Safety: This macro must only be used on types that are `Copy` and result in ranges
which have an exact `size_hint()` where the upper bound must not be `None`.

## struct RangeInclusiveIter

```rust
pub struct RangeInclusiveIter<A>(legacy::RangeInclusive<A>)
```

By-value [`RangeInclusive`] iterator.

## struct RangeFromIter

```rust
pub struct RangeFromIter<A>
```

By-value [`RangeFrom`] iterator.