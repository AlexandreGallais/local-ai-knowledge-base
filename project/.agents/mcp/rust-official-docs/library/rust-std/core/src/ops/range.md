---
title: "core::ops::range"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/ops/range.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::ops::range

## struct RangeFull

```rust
pub struct RangeFull
```

An unbounded range (`..`).

`RangeFull` is primarily used as a [slicing index], its shorthand is `..`.
It cannot serve as an `Iterator` because it doesn't have a starting point.

# Examples

The `..` syntax is a `RangeFull`:

```rust
assert_eq!(.., std::ops::RangeFull);
```

It does not have an `IntoIterator` implementation, so you can't use it in
a `for` loop directly. This won't compile:

```
for i in .. {
    // ...
}
```rust

Used as a [slicing index], `RangeFull` produces the full array as a slice.

```
let arr = [0, 1, 2, 3, 4];
assert_eq!(arr[ ..  ], [0, 1, 2, 3, 4]); // This is the `RangeFull`
assert_eq!(arr[ .. 3], [0, 1, 2      ]);
assert_eq!(arr[ ..=3], [0, 1, 2, 3   ]);
assert_eq!(arr[1..  ], [   1, 2, 3, 4]);
assert_eq!(arr[1.. 3], [   1, 2      ]);
assert_eq!(arr[1..=3], [   1, 2, 3   ]);
```rust

[slicing index]: crate::slice::SliceIndex

## struct Range

```rust
pub struct Range<Idx>
```

A (half-open) range bounded inclusively below and exclusively above
(`start..end`).

The range `start..end` contains all values with `start <= x < end`.
It is empty if `start >= end`.

Note that this type is not suited to represent all possible ranges. For example, `Range<u8>`
cannot represent the range that covers all of `u8`. Use `(Bound<T>, Bound<T>)`[Bound] if you
need a type that can store an arbitrary range.

# Examples

The `start..end` syntax is a `Range`:

```rust
assert_eq!((3..5), std::ops::Range { start: 3, end: 5 });
assert_eq!(3 + 4 + 5, (3..6).sum());
```

```rust
let arr = [0, 1, 2, 3, 4];
assert_eq!(arr[ ..  ], [0, 1, 2, 3, 4]);
assert_eq!(arr[ .. 3], [0, 1, 2      ]);
assert_eq!(arr[ ..=3], [0, 1, 2, 3   ]);
assert_eq!(arr[1..  ], [   1, 2, 3, 4]);
assert_eq!(arr[1.. 3], [   1, 2      ]); // This is a `Range`
assert_eq!(arr[1..=3], [   1, 2, 3   ]);
```

## Range::contains

```rust
pub const fn contains<U>(&self, item: &U) -> bool where Idx: [const] PartialOrd<U>, U: ?Sized + [const] PartialOrd<Idx>,
```

Returns `true` if `item` is contained in the range.

# Examples

```rust
assert!(!(3..5).contains(&2));
assert!( (3..5).contains(&3));
assert!( (3..5).contains(&4));
assert!(!(3..5).contains(&5));

assert!(!(3..3).contains(&3));
assert!(!(3..2).contains(&3));

assert!( (0.0..1.0).contains(&0.5));
assert!(!(0.0..1.0).contains(&f32::NAN));
assert!(!(0.0..f32::NAN).contains(&0.5));
assert!(!(f32::NAN..1.0).contains(&0.5));
```

## Range::is_empty

```rust
pub const fn is_empty(&self) -> bool where Idx: [const] PartialOrd<Idx>,
```

Returns `true` if the range contains no items.

# Examples

```rust
assert!(!(3..5).is_empty());
assert!( (3..3).is_empty());
assert!( (3..2).is_empty());
```

The range is empty if either side is incomparable:

```rust
assert!(!(3.0..5.0).is_empty());
assert!( (3.0..f32::NAN).is_empty());
assert!( (f32::NAN..5.0).is_empty());
```

## struct RangeFrom

```rust
pub struct RangeFrom<Idx>
```

A range only bounded inclusively below (`start..`).

The `RangeFrom` `start..` contains all values with `x >= start`.

*Note*: Overflow in the `Iterator` implementation (when the contained
data type reaches its numerical limit) is allowed to panic, wrap, or
saturate. This behavior is defined by the implementation of the `Step`
trait. For primitive integers, this follows the normal rules, and respects
the overflow checks profile (panic in debug, wrap in release). Note also
that overflow happens earlier than you might assume: the overflow happens
in the call to `next` that yields the maximum value, as the range must be
set to a state to yield the next value.

# Examples

The `start..` syntax is a `RangeFrom`:

```rust
assert_eq!((2..), std::ops::RangeFrom { start: 2 });
assert_eq!(2 + 3 + 4, (2..).take(3).sum());
```

```rust
let arr = [0, 1, 2, 3, 4];
assert_eq!(arr[ ..  ], [0, 1, 2, 3, 4]);
assert_eq!(arr[ .. 3], [0, 1, 2      ]);
assert_eq!(arr[ ..=3], [0, 1, 2, 3   ]);
assert_eq!(arr[1..  ], [   1, 2, 3, 4]); // This is a `RangeFrom`
assert_eq!(arr[1.. 3], [   1, 2      ]);
assert_eq!(arr[1..=3], [   1, 2, 3   ]);
```

## RangeFrom::contains

```rust
pub const fn contains<U>(&self, item: &U) -> bool where Idx: [const] PartialOrd<U>, U: ?Sized + [const] PartialOrd<Idx>,
```

Returns `true` if `item` is contained in the range.

# Examples

```rust
assert!(!(3..).contains(&2));
assert!( (3..).contains(&3));
assert!( (3..).contains(&1_000_000_000));

assert!( (0.0..).contains(&0.5));
assert!(!(0.0..).contains(&f32::NAN));
assert!(!(f32::NAN..).contains(&0.5));
```

## struct RangeTo

```rust
pub struct RangeTo<Idx>
```

A range only bounded exclusively above (`..end`).

The `RangeTo` `..end` contains all values with `x < end`.
It cannot serve as an `Iterator` because it doesn't have a starting point.

# Examples

The `..end` syntax is a `RangeTo`:

```rust
assert_eq!((..5), std::ops::RangeTo { end: 5 });
```

It does not have an `IntoIterator` implementation, so you can't use it in
a `for` loop directly. This won't compile:

```
// error[E0277]: the trait bound `std::ops::RangeTo<{integer}>:
// std::iter::Iterator` is not satisfied
for i in ..5 {
    // ...
}
```rust

When used as a [slicing index], `RangeTo` produces a slice of all array
elements before the index indicated by `end`.

```
let arr = [0, 1, 2, 3, 4];
assert_eq!(arr[ ..  ], [0, 1, 2, 3, 4]);
assert_eq!(arr[ .. 3], [0, 1, 2      ]); // This is a `RangeTo`
assert_eq!(arr[ ..=3], [0, 1, 2, 3   ]);
assert_eq!(arr[1..  ], [   1, 2, 3, 4]);
assert_eq!(arr[1.. 3], [   1, 2      ]);
assert_eq!(arr[1..=3], [   1, 2, 3   ]);
```rust

[slicing index]: crate::slice::SliceIndex

## RangeTo::contains

```rust
pub const fn contains<U>(&self, item: &U) -> bool where Idx: [const] PartialOrd<U>, U: ?Sized + [const] PartialOrd<Idx>,
```

Returns `true` if `item` is contained in the range.

# Examples

```rust
assert!( (..5).contains(&-1_000_000_000));
assert!( (..5).contains(&4));
assert!(!(..5).contains(&5));

assert!( (..1.0).contains(&0.5));
assert!(!(..1.0).contains(&f32::NAN));
assert!(!(..f32::NAN).contains(&0.5));
```

## struct RangeInclusive

```rust
pub struct RangeInclusive<Idx>
```

A range bounded inclusively below and above (`start..=end`).

The `RangeInclusive` `start..=end` contains all values with `x >= start`
and `x <= end`. It is empty unless `start <= end`.

This iterator is [fused], but the specific values of `start` and `end` after
iteration has finished are **unspecified** other than that `.is_empty()`
will return `true` once no more values will be produced.

# Examples

The `start..=end` syntax is a `RangeInclusive`:

```rust
assert_eq!((3..=5), std::ops::RangeInclusive::new(3, 5));
assert_eq!(3 + 4 + 5, (3..=5).sum());
```

```rust
let arr = [0, 1, 2, 3, 4];
assert_eq!(arr[ ..  ], [0, 1, 2, 3, 4]);
assert_eq!(arr[ .. 3], [0, 1, 2      ]);
assert_eq!(arr[ ..=3], [0, 1, 2, 3   ]);
assert_eq!(arr[1..  ], [   1, 2, 3, 4]);
assert_eq!(arr[1.. 3], [   1, 2      ]);
assert_eq!(arr[1..=3], [   1, 2, 3   ]); // This is a `RangeInclusive`
```

## RangeInclusive::new

```rust
pub const fn new(start: Idx, end: Idx) -> Self
```

Creates a new inclusive range. Equivalent to writing `start..=end`.

# Examples

```rust
use std::ops::RangeInclusive;

assert_eq!(3..=5, RangeInclusive::new(3, 5));
```

## RangeInclusive::start

```rust
pub const fn start(&self) -> &Idx
```

Returns the lower bound of the range (inclusive).

When using an inclusive range for iteration, the values of `start()` and
`end()` are unspecified after the iteration ended. To determine
whether the inclusive range is empty, use the `is_empty()` method
instead of comparing `start() > end()`.

Note: the value returned by this method is unspecified after the range
has been iterated to exhaustion.

# Examples

```rust
assert_eq!((3..=5).start(), &3);
```

## RangeInclusive::end

```rust
pub const fn end(&self) -> &Idx
```

Returns the upper bound of the range (inclusive).

When using an inclusive range for iteration, the values of `start()`
and `end()` are unspecified after the iteration ended. To determine
whether the inclusive range is empty, use the `is_empty()` method
instead of comparing `start() > end()`.

Note: the value returned by this method is unspecified after the range
has been iterated to exhaustion.

# Examples

```rust
assert_eq!((3..=5).end(), &5);
```

## RangeInclusive::into_inner

```rust
pub const fn into_inner(self) -> (Idx, Idx)
```

Destructures the `RangeInclusive` into (lower bound, upper (inclusive) bound).

Note: the value returned by this method is unspecified after the range
has been iterated to exhaustion.

# Examples

```rust
assert_eq!((3..=5).into_inner(), (3, 5));
```

## RangeInclusive::contains

```rust
pub const fn contains<U>(&self, item: &U) -> bool where Idx: [const] PartialOrd<U>, U: ?Sized + [const] PartialOrd<Idx>,
```

Returns `true` if `item` is contained in the range.

# Examples

```rust
assert!(!(3..=5).contains(&2));
assert!( (3..=5).contains(&3));
assert!( (3..=5).contains(&4));
assert!( (3..=5).contains(&5));
assert!(!(3..=5).contains(&6));

assert!( (3..=3).contains(&3));
assert!(!(3..=2).contains(&3));

assert!( (0.0..=1.0).contains(&1.0));
assert!(!(0.0..=1.0).contains(&f32::NAN));
assert!(!(0.0..=f32::NAN).contains(&0.0));
assert!(!(f32::NAN..=1.0).contains(&1.0));
```

This method always returns `false` after iteration has finished:

```rust
let mut r = 3..=5;
assert!(r.contains(&3) && r.contains(&5));
for _ in r.by_ref() {}
// Precise field values are unspecified here
assert!(!r.contains(&3) && !r.contains(&5));
```

## RangeInclusive::is_empty

```rust
pub const fn is_empty(&self) -> bool where Idx: [const] PartialOrd,
```

Returns `true` if the range contains no items.

# Examples

```rust
assert!(!(3..=5).is_empty());
assert!(!(3..=3).is_empty());
assert!( (3..=2).is_empty());
```

The range is empty if either side is incomparable:

```rust
assert!(!(3.0..=5.0).is_empty());
assert!( (3.0..=f32::NAN).is_empty());
assert!( (f32::NAN..=5.0).is_empty());
```

This method returns `true` after iteration has finished:

```rust
let mut r = 3..=5;
for _ in r.by_ref() {}
// Precise field values are unspecified here
assert!(r.is_empty());
```

## struct RangeToInclusive

```rust
pub struct RangeToInclusive<Idx>
```

A range only bounded inclusively above (`..=end`).

The `RangeToInclusive` `..=end` contains all values with `x <= end`.
It cannot serve as an `Iterator` because it doesn't have a starting point.

# Examples

The `..=end` syntax is a `RangeToInclusive`:

```rust
assert_eq!((..=5), std::ops::RangeToInclusive{ end: 5 });
```

It does not have an `IntoIterator` implementation, so you can't use it in a
`for` loop directly. This won't compile:

```
// error[E0277]: the trait bound `std::ops::RangeToInclusive<{integer}>:
// std::iter::Iterator` is not satisfied
for i in ..=5 {
    // ...
}
```rust

When used as a [slicing index], `RangeToInclusive` produces a slice of all
array elements up to and including the index indicated by `end`.

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

## enum Bound

```rust
pub enum Bound<T>
```

An endpoint of a range of keys.

# Examples

`Bound`s are range endpoints:

```rust
use std::ops::Bound::*;
use std::ops::RangeBounds;

assert_eq!((..100).start_bound(), Unbounded);
assert_eq!((1..12).start_bound(), Included(&1));
assert_eq!((1..12).end_bound(), Excluded(&12));
```

Using a tuple of `Bound`s as an argument to `BTreeMap::range`.
Note that in most cases, it's better to use range syntax (`1..5`) instead.

```rust
use std::collections::BTreeMap;
use std::ops::Bound::{Excluded, Included, Unbounded};

let mut map = BTreeMap::new();
map.insert(3, "a");
map.insert(5, "b");
map.insert(8, "c");

for (key, value) in map.range((Excluded(3), Included(8))) {
    println!("{key}: {value}");
}

assert_eq!(Some((&3, &"a")), map.range((Unbounded, Included(5))).next());
```

## Bound::as_ref

```rust
pub const fn as_ref(&self) -> Bound<&T>
```

Converts from `&Bound<T>` to `Bound<&T>`.

## Bound::map

```rust
pub fn map<U, F: FnOnce(T) -> U>(self, f: F) -> Bound<U>
```

Maps a `Bound<T>` to a `Bound` by applying a function to the contained value (including
both `Included` and `Excluded`), returning a `Bound` of the same kind.

# Examples

```rust
use std::ops::Bound::*;

let bound_string = Included("Hello, World!");

assert_eq!(bound_string.map(|s| s.len()), Included(13));
```

```rust
use std::ops::Bound;
use Bound::*;

let unbounded_string: Bound<String> = Unbounded;

assert_eq!(unbounded_string.map(|s| s.len()), Unbounded);
```

## Bound::cloned

```rust
pub const fn cloned(self) -> Bound<T> where T: [const] Clone,
```

Map a `Bound<&T>` to a `Bound<T>` by cloning the contents of the bound.

# Examples

```rust
use std::ops::Bound::*;
use std::ops::RangeBounds;

let a1 = String::from("a");
let (a2, a3, a4) = (a1.clone(), a1.clone(), a1.clone());

assert_eq!(Included(&a1), (a2..).start_bound());
assert_eq!(Included(a3), (a4..).start_bound().cloned());
```

## trait RangeBounds

```rust
pub const trait RangeBounds<T: ?Sized>
```

`RangeBounds` is implemented by Rust's built-in range types, produced
by range syntax like `..`, `a..`, `..b`, `..=c`, `d..e`, or `f..=g`.
