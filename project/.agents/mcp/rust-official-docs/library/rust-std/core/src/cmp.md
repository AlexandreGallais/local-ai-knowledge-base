---
title: "core::cmp (part 1 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/cmp.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::cmp

Utilities for comparing and ordering values.

This module contains various tools for comparing and ordering values. In
summary:

* `PartialEq<Rhs>` overloads the `==` and `!=` operators. In cases where
  `Rhs` (the right hand side's type) is `Self`, this trait corresponds to a
  partial equivalence relation.
* `Eq` indicates that the overloaded `==` operator corresponds to an
  equivalence relation.
* `Ord` and `PartialOrd` are traits that allow you to define total and
  partial orderings between values, respectively. Implementing them overloads
  the `<`, `<=`, `>`, and `>=` operators.
* `Ordering` is an enum returned by the main functions of `Ord` and
  `PartialOrd`, and describes an ordering of two values (less, equal, or
  greater).
* `Reverse` is a struct that allows you to easily reverse an ordering.
* `max` and `min` are functions that build off of `Ord` and allow you
  to find the maximum or minimum of two values.

For more details, see the respective documentation of each item in the list.

## trait PartialEq

```rust
pub const trait PartialEq<Rhs: PointeeSized = Self>: PointeeSized
```

Trait for comparisons using the equality operator.

Implementing this trait for types provides the `==` and `!=` operators for
those types.

`x.eq(y)` can also be written `x == y`, and `x.ne(y)` can be written `x != y`.
We use the easier-to-read infix notation in the remainder of this documentation.

This trait allows for comparisons using the equality operator, for types
that do not have a full equivalence relation. For example, in floating point
numbers `NaN != NaN`, so floating point types implement `PartialEq` but not
`trait@Eq`. Formally speaking, when `Rhs == Self`, this trait corresponds
to a [partial equivalence relation].

Implementations must ensure that `eq` and `ne` are consistent with each other:

- `a != b` if and only if `!(a == b)`.

The default implementation of `ne` provides this consistency and is almost
always sufficient. It should not be overridden without very good reason.

If `PartialOrd` or `Ord` are also implemented for `Self` and `Rhs`, their methods must also
be consistent with `PartialEq` (see the documentation of those traits for the exact
requirements). It's easy to accidentally make them disagree by deriving some of the traits and
manually implementing others.

The equality relation `==` must satisfy the following conditions
(for all `a`, `b`, `c` of type `A`, `B`, `C`):

- **Symmetry**: if `A: PartialEq` and `B: PartialEq`, then **`a == b`
  implies `b == a`**; and

- **Transitivity**: if `A: PartialEq` and `B: PartialEq<C>` and `A:
  PartialEq<C>`, then **`a == b` and `b == c` implies `a == c`**.
  This must also work for longer chains, such as when `A: PartialEq`, `B: PartialEq<C>`,
  `C: PartialEq<D>`, and `A: PartialEq<D>` all exist.

Note that the `B: PartialEq` (symmetric) and `A: PartialEq<C>`
(transitive) impls are not forced to exist, but these requirements apply
whenever they do exist.

Violating these requirements is a logic error. The behavior resulting from a logic error is not
specified, but users of the trait must ensure that such logic errors do *not* result in
undefined behavior. This means that `unsafe` code **must not** rely on the correctness of these
methods.

## Cross-crate considerations

Upholding the requirements stated above can become tricky when one crate implements `PartialEq`
for a type of another crate (i.e., to allow comparing one of its own types with a type from the
standard library). The recommendation is to never implement this trait for a foreign type. In
other words, such a crate should do `impl PartialEq<ForeignType> for LocalType`, but it should
*not* do `impl PartialEq<LocalType> for ForeignType`.

This avoids the problem of transitive chains that criss-cross crate boundaries: for all local
types `T`, you may assume that no other crate will add `impl`s that allow comparing `T == U`. In
other words, if other crates add `impl`s that allow building longer transitive chains `U1 == ...
== T == V1 == ...`, then all the types that appear to the right of `T` must be types that the
crate defining `T` already knows about. This rules out transitive chains where downstream crates
can add new `impl`s that "stitch together" comparisons of foreign types in ways that violate
transitivity.

Not having such foreign `impl`s also avoids forward compatibility issues where one crate adding
more `PartialEq` implementations can cause build failures in downstream crates.

## Derivable

This trait can be used with `#[derive]`. When `derive`d on structs, two
instances are equal if all fields are equal, and not equal if any fields
are not equal. When `derive`d on enums, two instances are equal if they
are the same variant and all fields are equal.

## How can I implement `PartialEq`?

An example implementation for a domain in which two books are considered
the same book if their ISBN matches, even if the formats differ:

```rust
enum BookFormat {
    Paperback,
    Hardback,
    Ebook,
}

struct Book {
    isbn: i32,
    format: BookFormat,
}

impl PartialEq for Book {
    fn eq(&self, other: &Self) -> bool {
        self.isbn == other.isbn
    }
}

let b1 = Book { isbn: 3, format: BookFormat::Paperback };
let b2 = Book { isbn: 3, format: BookFormat::Ebook };
let b3 = Book { isbn: 10, format: BookFormat::Paperback };

assert!(b1 == b2);
assert!(b1 != b3);
```

## How can I compare two different types?

The type you can compare with is controlled by `PartialEq`'s type parameter.
For example, let's tweak our previous code a bit:

```rust
// The derive implements <BookFormat> == <BookFormat> comparisons
#[derive(PartialEq)]
enum BookFormat {
    Paperback,
    Hardback,
    Ebook,
}

struct Book {
    isbn: i32,
    format: BookFormat,
}

// Implement <Book> == <BookFormat> comparisons
impl PartialEq<BookFormat> for Book {
    fn eq(&self, other: &BookFormat) -> bool {
        self.format == *other
    }
}

// Implement <BookFormat> == <Book> comparisons
impl PartialEq<Book> for BookFormat {
    fn eq(&self, other: &Book) -> bool {
        *self == other.format
    }
}

let b1 = Book { isbn: 3, format: BookFormat::Paperback };

assert!(b1 == BookFormat::Paperback);
assert!(BookFormat::Ebook != b1);
```

By changing `impl PartialEq for Book` to `impl PartialEq<BookFormat> for Book`,
we allow `BookFormat`s to be compared with `Book`s.

A comparison like the one above, which ignores some fields of the struct,
can be dangerous. It can easily lead to an unintended violation of the
requirements for a partial equivalence relation. For example, if we kept
the above implementation of `PartialEq<Book>` for `BookFormat` and added an
implementation of `PartialEq<Book>` for `Book` (either via a `#[derive]` or
via the manual implementation from the first example) then the result would
violate transitivity:

```rust
#[derive(PartialEq)]
enum BookFormat {
    Paperback,
    Hardback,
    Ebook,
}

#[derive(PartialEq)]
struct Book {
    isbn: i32,
    format: BookFormat,
}

impl PartialEq<BookFormat> for Book {
    fn eq(&self, other: &BookFormat) -> bool {
        self.format == *other
    }
}

impl PartialEq<Book> for BookFormat {
    fn eq(&self, other: &Book) -> bool {
        *self == other.format
    }
}

fn main() {
    let b1 = Book { isbn: 1, format: BookFormat::Paperback };
    let b2 = Book { isbn: 2, format: BookFormat::Paperback };

    assert!(b1 == BookFormat::Paperback);
    assert!(BookFormat::Paperback == b2);

    // The following should hold by transitivity but doesn't.
    assert!(b1 == b2); // <-- PANICS
}
```

# Examples

```rust
let x: u32 = 0;
let y: u32 = 1;

assert_eq!(x == y, false);
assert_eq!(x.eq(&y), false);
```

## trait Eq

```rust
pub const trait Eq: [const] PartialEq<Self> + PointeeSized
```

Trait for comparisons corresponding to equivalence relations.

The primary difference to `PartialEq` is the additional requirement for reflexivity. A type
that implements `PartialEq` guarantees that for all `a`, `b` and `c`:

- symmetric: `a == b` implies `b == a`
- transitive: `a == b` and `b == c` implies `a == c`
- consistent: `a != b` if and only if `!(a == b)`

`Eq`, which builds on top of `PartialEq` also implies:

- reflexive: `a == a`

This property cannot be checked by the compiler, and therefore `Eq` is a trait without methods.

Violating this property is a logic error. The behavior resulting from a logic error is not
specified, but users of the trait must ensure that such logic errors do *not* result in
undefined behavior. This means that `unsafe` code **must not** rely on the correctness of these
methods.

Floating point types such as `f32` and `f64` implement only `PartialEq` but *not* `Eq`
because `NaN` != `NaN`.

## Derivable

This trait can be used with `#[derive]`. When `derive`d, because `Eq` has no extra methods, it
is only informing the compiler that this is an equivalence relation rather than a partial
equivalence relation. Note that the `derive` strategy requires all fields are `Eq`, which isn't
always desired.

## How can I implement `Eq`?

If you cannot use the `derive` strategy, specify that your type implements `Eq`, which has no
extra methods:

```rust
enum BookFormat {
    Paperback,
    Hardback,
    Ebook,
}

struct Book {
    isbn: i32,
    format: BookFormat,
}

impl PartialEq for Book {
    fn eq(&self, other: &Self) -> bool {
        self.isbn == other.isbn
    }
}

impl Eq for Book {}
```

## Ordering::is_eq

```rust
pub const fn is_eq(self) -> bool
```

Returns `true` if the ordering is the `Equal` variant.

# Examples

```rust
use std::cmp::Ordering;

assert_eq!(Ordering::Less.is_eq(), false);
assert_eq!(Ordering::Equal.is_eq(), true);
assert_eq!(Ordering::Greater.is_eq(), false);
```

## Ordering::is_ne

```rust
pub const fn is_ne(self) -> bool
```

Returns `true` if the ordering is not the `Equal` variant.

# Examples

```rust
use std::cmp::Ordering;

assert_eq!(Ordering::Less.is_ne(), true);
assert_eq!(Ordering::Equal.is_ne(), false);
assert_eq!(Ordering::Greater.is_ne(), true);
```

## Ordering::is_lt

```rust
pub const fn is_lt(self) -> bool
```

Returns `true` if the ordering is the `Less` variant.

# Examples

```rust
use std::cmp::Ordering;

assert_eq!(Ordering::Less.is_lt(), true);
assert_eq!(Ordering::Equal.is_lt(), false);
assert_eq!(Ordering::Greater.is_lt(), false);
```

## Ordering::is_gt

```rust
pub const fn is_gt(self) -> bool
```

Returns `true` if the ordering is the `Greater` variant.

# Examples

```rust
use std::cmp::Ordering;

assert_eq!(Ordering::Less.is_gt(), false);
assert_eq!(Ordering::Equal.is_gt(), false);
assert_eq!(Ordering::Greater.is_gt(), true);
```

## Ordering::is_le

```rust
pub const fn is_le(self) -> bool
```

Returns `true` if the ordering is either the `Less` or `Equal` variant.

# Examples

```rust
use std::cmp::Ordering;

assert_eq!(Ordering::Less.is_le(), true);
assert_eq!(Ordering::Equal.is_le(), true);
assert_eq!(Ordering::Greater.is_le(), false);
```

## Ordering::is_ge

```rust
pub const fn is_ge(self) -> bool
```

Returns `true` if the ordering is either the `Greater` or `Equal` variant.

# Examples

```rust
use std::cmp::Ordering;

assert_eq!(Ordering::Less.is_ge(), false);
assert_eq!(Ordering::Equal.is_ge(), true);
assert_eq!(Ordering::Greater.is_ge(), true);
```

## Ordering::reverse

```rust
pub const fn reverse(self) -> Ordering
```

Reverses the `Ordering`.

* `Less` becomes `Greater`.
* `Greater` becomes `Less`.
* `Equal` becomes `Equal`.

# Examples

Basic <example-value>:

```rust
use std::cmp::Ordering;

assert_eq!(Ordering::Less.reverse(), Ordering::Greater);
assert_eq!(Ordering::Equal.reverse(), Ordering::Equal);
assert_eq!(Ordering::Greater.reverse(), Ordering::Less);
```

This method can be used to reverse a comparison:

```rust
let data: &mut [_] = &mut [2, 10, 5, 8];

// sort the array from largest to smallest.
data.sort_by(|a, b| a.cmp(b).reverse());

let b: &mut [_] = &mut [10, 8, 5, 2];
assert!(data == b);
```

## Ordering::then

```rust
pub const fn then(self, other: Ordering) -> Ordering
```

Chains two orderings.

Returns `self` when it's not `Equal`. Otherwise returns `other`.

# Examples

```rust
use std::cmp::Ordering;

let result = Ordering::Equal.then(Ordering::Less);
assert_eq!(result, Ordering::Less);

let result = Ordering::Less.then(Ordering::Equal);
assert_eq!(result, Ordering::Less);

let result = Ordering::Less.then(Ordering::Greater);
assert_eq!(result, Ordering::Less);

let result = Ordering::Equal.then(Ordering::Equal);
assert_eq!(result, Ordering::Equal);

let x: (i64, i64, i64) = (1, 2, 7);
let y: (i64, i64, i64) = (1, 5, 3);
let result = x.0.cmp(&y.0).then(x.1.cmp(&y.1)).then(x.2.cmp(&y.2));

assert_eq!(result, Ordering::Less);
```

## Ordering::then_with

```rust
pub const fn then_with<F>(self, f: F) -> Ordering where F: [const] FnOnce() -> Ordering + [const] Destruct,
```

Chains the ordering with the given function.

Returns `self` when it's not `Equal`. Otherwise calls `f` and returns
the result.

# Examples

```rust
use std::cmp::Ordering;

let result = Ordering::Equal.then_with(|| Ordering::Less);
assert_eq!(result, Ordering::Less);

let result = Ordering::Less.then_with(|| Ordering::Equal);
assert_eq!(result, Ordering::Less);

let result = Ordering::Less.then_with(|| Ordering::Greater);
assert_eq!(result, Ordering::Less);

let result = Ordering::Equal.then_with(|| Ordering::Equal);
assert_eq!(result, Ordering::Equal);

let x: (i64, i64, i64) = (1, 2, 7);
let y: (i64, i64, i64) = (1, 5, 3);
let result = x.0.cmp(&y.0).then_with(|| x.1.cmp(&y.1)).then_with(|| x.2.cmp(&y.2));

assert_eq!(result, Ordering::Less);
```

## struct Reverse

```rust
pub struct Reverse<T>(#[stable(feature = "reverse_cmp_key", since = "1.19.0")] pub T)
```

A helper struct for reverse ordering.

This struct is a helper to be used with functions like `Vec::sort_by_key` and
can be used to reverse order a part of a key.

# Examples

```rust
use std::cmp::Reverse;

let mut v = vec![1, 2, 3, 4, 5, 6];
v.sort_by_key(|&num| (num > 3, Reverse(num)));
assert_eq!(v, vec![3, 2, 1, 6, 5, 4]);
```

## trait Ord

```rust
pub const trait Ord: [const] Eq + [const] PartialOrd<Self> + PointeeSized
```

Trait for types that form a total order.

Implementations must be consistent with the `PartialOrd` implementation, and ensure `max`,
`min`, and `clamp` are consistent with `cmp`:

- `partial_cmp(a, b) == Some(cmp(a, b))`.
- `max(a, b) == max_by(a, b, cmp)` (ensured by the default implementation).
- `min(a, b) == min_by(a, b, cmp)` (ensured by the default implementation).
- For `a.clamp(min, max)`, see the method docs (ensured by the default
  implementation).

Violating these requirements is a logic error. The behavior resulting from a logic error is not
specified, but users of the trait must ensure that such logic errors do *not* result in
undefined behavior. This means that `unsafe` code **must not** rely on the correctness of these
methods.
