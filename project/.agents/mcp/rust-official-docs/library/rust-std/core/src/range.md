---
title: "core::range"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/range.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::range

#### Replacement range types

The types within this module are meant to replace the legacy `Range`,
`RangeInclusive`, `RangeToInclusive` and `RangeFrom` types in a future edition.

```rust
use core::range::{Range, RangeFrom, RangeInclusive, RangeToInclusive};

let arr = [0, 1, 2, 3, 4];
assert_eq!(arr[                        ..   ], [0, 1, 2, 3, 4]);
assert_eq!(arr[                        .. 3 ], [0, 1, 2      ]);
assert_eq!(arr[RangeToInclusive::from( ..=3)], [0, 1, 2, 3   ]);
assert_eq!(arr[       RangeFrom::from(1..  )], [   1, 2, 3, 4]);
assert_eq!(arr[           Range::from(1..3 )], [   1, 2      ]);
assert_eq!(arr[  RangeInclusive::from(1..=3)], [   1, 2, 3   ]);
```

## struct Range

```rust
pub struct Range<Idx>
```

A (half-open) range bounded inclusively below and exclusively above.

The `Range` contains all values with `start <= x < end`.
It is empty if `start >= end`.

Note that this type is not suited to represent all possible ranges. For example, `Range<u8>`
cannot represent the range that covers all of `u8`. Use `(Bound<T>, Bound<T>)`[Bound] if you
need a type that can store an arbitrary range.

# Examples

```rust
use core::range::Range;

assert_eq!(Range::from(3..5), Range { start: 3, end: 5 });
assert_eq!(3 + 4 + 5, Range::from(3..6).into_iter().sum());
```

# Edition notes

It is planned that the syntax `start..end` will construct this
type in a future edition, but it does not do so today.

## Range::iter

```rust
pub fn iter(&self) -> RangeIter<Idx>
```

Creates an iterator over the elements within this range.

Shorthand for `.clone().into_iter()`

# Examples

```rust
use core::range::Range;

let mut i = Range::from(3..9).iter().map(|n| n*n);
assert_eq!(i.next(), Some(9));
assert_eq!(i.next(), Some(16));
assert_eq!(i.next(), Some(25));
```

## Range::contains

```rust
pub const fn contains<U>(&self, item: &U) -> bool where Idx: [const] PartialOrd<U>, U: ?Sized + [const] PartialOrd<Idx>,
```

Returns `true` if `item` is contained in the range.

# Examples

```rust
use core::range::Range;

assert!(!Range::from(3..5).contains(&2));
assert!( Range::from(3..5).contains(&3));
assert!( Range::from(3..5).contains(&4));
assert!(!Range::from(3..5).contains(&5));

assert!(!Range::from(3..3).contains(&3));
assert!(!Range::from(3..2).contains(&3));

assert!( Range::from(0.0..1.0).contains(&0.5));
assert!(!Range::from(0.0..1.0).contains(&f32::NAN));
assert!(!Range::from(0.0..f32::NAN).contains(&0.5));
assert!(!Range::from(f32::NAN..1.0).contains(&0.5));
```

## Range::is_empty

```rust
pub const fn is_empty(&self) -> bool where Idx: [const] PartialOrd,
```

Returns `true` if the range contains no items.

# Examples

```rust
use core::range::Range;

assert!(!Range::from(3..5).is_empty());
assert!( Range::from(3..3).is_empty());
assert!( Range::from(3..2).is_empty());
```

The range is empty if either side is incomparable:

```rust
use core::range::Range;

assert!(!Range::from(3.0..5.0).is_empty());
assert!( Range::from(3.0..f32::NAN).is_empty());
assert!( Range::from(f32::NAN..5.0).is_empty());
```

## struct RangeInclusive

```rust
pub struct RangeInclusive<Idx>
```

A range bounded inclusively below and above.

The `RangeInclusive` contains all values with `x >= start`
and `x <= last`. It is empty unless `start <= last`.

# Examples

```rust
use core::range::RangeInclusive;

assert_eq!(RangeInclusive::from(3..=5), RangeInclusive { start: 3, last: 5 });
assert_eq!(3 + 4 + 5, RangeInclusive::from(3..=5).into_iter().sum());
```

# Edition notes

It is planned that the syntax  `start..=last` will construct this
type in a future edition, but it does not do so today.

## RangeInclusive::contains

```rust
pub const fn contains<U>(&self, item: &U) -> bool where Idx: [const] PartialOrd<U>, U: ?Sized + [const] PartialOrd<Idx>,
```

Returns `true` if `item` is contained in the range.

# Examples

```rust
use core::range::RangeInclusive;

assert!(!RangeInclusive::from(3..=5).contains(&2));
assert!( RangeInclusive::from(3..=5).contains(&3));
assert!( RangeInclusive::from(3..=5).contains(&4));
assert!( RangeInclusive::from(3..=5).contains(&5));
assert!(!RangeInclusive::from(3..=5).contains(&6));

assert!( RangeInclusive::from(3..=3).contains(&3));
assert!(!RangeInclusive::from(3..=2).contains(&3));

assert!( RangeInclusive::from(0.0..=1.0).contains(&1.0));
assert!(!RangeInclusive::from(0.0..=1.0).contains(&f32::NAN));
assert!(!RangeInclusive::from(0.0..=f32::NAN).contains(&0.0));
assert!(!RangeInclusive::from(f32::NAN..=1.0).contains(&1.0));
```

## RangeInclusive::is_empty

```rust
pub const fn is_empty(&self) -> bool where Idx: [const] PartialOrd,
```

Returns `true` if the range contains no items.

# Examples

```rust
use core::range::RangeInclusive;

assert!(!RangeInclusive::from(3..=5).is_empty());
assert!(!RangeInclusive::from(3..=3).is_empty());
assert!( RangeInclusive::from(3..=2).is_empty());
```

The range is empty if either side is incomparable:

```rust
use core::range::RangeInclusive;

assert!(!RangeInclusive::from(3.0..=5.0).is_empty());
assert!( RangeInclusive::from(3.0..=f32::NAN).is_empty());
assert!( RangeInclusive::from(f32::NAN..=5.0).is_empty());
```

## RangeInclusive::iter

```rust
pub fn iter(&self) -> RangeInclusiveIter<Idx>
```

Creates an iterator over the elements within this range.

Shorthand for `.clone().into_iter()`

# Examples

```rust
use core::range::RangeInclusive;

let mut i = RangeInclusive::from(3..=8).iter().map(|n| n*n);
assert_eq!(i.next(), Some(9));
assert_eq!(i.next(), Some(16));
assert_eq!(i.next(), Some(25));
```

## struct RangeFrom

```rust
pub struct RangeFrom<Idx>
```

A range only bounded inclusively below.

The `RangeFrom` contains all values with `x >= start`.

*Note*: Overflow in the `IntoIterator` implementation (when the contained
data type reaches its numerical limit) is allowed to panic, wrap, or
saturate. This behavior is defined by the implementation of the `Step`
trait. For primitive integers, this follows the normal rules, and respects
the overflow checks profile (panic in debug, wrap in release). Unlike
its legacy counterpart, the iterator will only panic after yielding the
maximum value when overflow checks are enabled.

# Examples

```rust
use core::range::RangeFrom;

assert_eq!(RangeFrom::from(2..), core::range::RangeFrom { start: 2 });
assert_eq!(2 + 3 + 4, RangeFrom::from(2..).into_iter().take(3).sum());
```

# Edition notes

It is planned that the syntax  `start..` will construct this
type in a future edition, but it does not do so today.

## RangeFrom::iter

```rust
pub fn iter(&self) -> RangeFromIter<Idx>
```

Creates an iterator over the elements within this range.

Shorthand for `.clone().into_iter()`

# Examples

```rust
use core::range::RangeFrom;

let mut i = RangeFrom::from(3..).iter().map(|n| n*n);
assert_eq!(i.next(), Some(9));
assert_eq!(i.next(), Some(16));
assert_eq!(i.next(), Some(25));
```

## RangeFrom::contains

```rust
pub const fn contains<U>(&self, item: &U) -> bool where Idx: [const] PartialOrd<U>, U: ?Sized + [const] PartialOrd<Idx>,
```

Returns `true` if `item` is contained in the range.

# Examples

```rust
use core::range::RangeFrom;

assert!(!RangeFrom::from(3..).contains(&2));
assert!( RangeFrom::from(3..).contains(&3));
assert!( RangeFrom::from(3..).contains(&1_000_000_000));

assert!( RangeFrom::from(0.0..).contains(&0.5));
assert!(!RangeFrom::from(0.0..).contains(&f32::NAN));
assert!(!RangeFrom::from(f32::NAN..).contains(&0.5));
```

## struct RangeToInclusive

```rust
pub struct RangeToInclusive<Idx>
```

A range only bounded inclusively above.

The `RangeToInclusive` contains all values with `x <= last`.
It cannot serve as an `Iterator` because it doesn't have a starting point.

# Examples

```
#![feature(new_range)]
assert_eq!((..=5), std::range::RangeToInclusive { last: 5 });
```rust

It does not have an `IntoIterator` implementation, so you can't use it in a
`for` loop directly. This won't compile:

```
// error[E0277]: the trait bound `std::range::RangeToInclusive<{integer}>:
// std::iter::Iterator` is not satisfied
for i in ..=5 {
    // ...
}
```rust

When used as a [slicing index], `RangeToInclusive` produces a slice of all
array elements up to and including the index indicated by `last`.

```
let arr = [0, 1, 2, 3, 4];
assert_eq!(arr[ ..  ], [0, 1, 2, 3, 4]);
assert_eq!(arr[ .. 3], [0, 1, 2      ]);
assert_eq!(arr[ ..=3], [0, 1, 2, 3   ]); // This is a `RangeToInclusive`
assert_eq!(arr[1..  ], [   1, 2, 3, 4]);
assert_eq!(arr[1.. 3], [   1, 2      ]);
assert_eq!(arr[1..=3], [   1, 2, 3   ]);
```rust

[slicing index]: crate::slice::SliceIndex

It is planned that the syntax  `..=last` will construct this
type in a future edition, but it does not do so today.

## RangeToInclusive::contains

```rust
pub const fn contains<U>(&self, item: &U) -> bool where Idx: [const] PartialOrd<U>, U: ?Sized + [const] PartialOrd<Idx>,
```

Returns `true` if `item` is contained in the range.

# Examples

```rust
assert!( (..=5).contains(&-1_000_000_000));
assert!( (..=5).contains(&5));
assert!(!(..=5).contains(&6));

assert!( (..=1.0).contains(&1.0));
assert!(!(..=1.0).contains(&f32::NAN));
assert!(!(..=f32::NAN).contains(&0.5));
```
