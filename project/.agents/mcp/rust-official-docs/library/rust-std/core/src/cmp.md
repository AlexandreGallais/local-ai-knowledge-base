# core::cmp

Utilities for comparing and ordering values.

This module contains various tools for comparing and ordering values. In
summary:

* [`PartialEq<Rhs>`] overloads the `==` and `!=` operators. In cases where
  `Rhs` (the right hand side's type) is `Self`, this trait corresponds to a
  partial equivalence relation.
* [`Eq`] indicates that the overloaded `==` operator corresponds to an
  equivalence relation.
* [`Ord`] and [`PartialOrd`] are traits that allow you to define total and
  partial orderings between values, respectively. Implementing them overloads
  the `<`, `<=`, `>`, and `>=` operators.
* [`Ordering`] is an enum returned by the main functions of [`Ord`] and
  [`PartialOrd`], and describes an ordering of two values (less, equal, or
  greater).
* [`Reverse`] is a struct that allows you to easily reverse an ordering.
* [`max`] and [`min`] are functions that build off of [`Ord`] and allow you
  to find the maximum or minimum of two values.

For more details, see the respective documentation of each item in the list.

[`max`]: Ord::max
[`min`]: Ord::min

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
[`trait@Eq`]. Formally speaking, when `Rhs == Self`, this trait corresponds
to a [partial equivalence relation].

[partial equivalence relation]: https://en.wikipedia.org/wiki/Partial_equivalence_relation

Implementations must ensure that `eq` and `ne` are consistent with each other:

- `a != b` if and only if `!(a == b)`.

The default implementation of `ne` provides this consistency and is almost
always sufficient. It should not be overridden without very good reason.

If [`PartialOrd`] or [`Ord`] are also implemented for `Self` and `Rhs`, their methods must also
be consistent with `PartialEq` (see the documentation of those traits for the exact
requirements). It's easy to accidentally make them disagree by deriving some of the traits and
manually implementing others.

The equality relation `==` must satisfy the following conditions
(for all `a`, `b`, `c` of type `A`, `B`, `C`):

- **Symmetry**: if `A: PartialEq<B>` and `B: PartialEq<A>`, then **`a == b`
  implies `b == a`**; and

- **Transitivity**: if `A: PartialEq<B>` and `B: PartialEq<C>` and `A:
  PartialEq<C>`, then **`a == b` and `b == c` implies `a == c`**.
  This must also work for longer chains, such as when `A: PartialEq<B>`, `B: PartialEq<C>`,
  `C: PartialEq<D>`, and `A: PartialEq<D>` all exist.

Note that the `B: PartialEq<A>` (symmetric) and `A: PartialEq<C>`
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

```
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

```
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

```should_panic
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

```
let x: u32 = 0;
let y: u32 = 1;

assert_eq!(x == y, false);
assert_eq!(x.eq(&y), false);
```

[`eq`]: PartialEq::eq
[`ne`]: PartialEq::ne

## trait Eq

```rust
pub const trait Eq: [const] PartialEq<Self> + PointeeSized
```

Trait for comparisons corresponding to [equivalence relations](
https://en.wikipedia.org/wiki/Equivalence_relation).

The primary difference to [`PartialEq`] is the additional requirement for reflexivity. A type
that implements [`PartialEq`] guarantees that for all `a`, `b` and `c`:

- symmetric: `a == b` implies `b == a`
- transitive: `a == b` and `b == c` implies `a == c`
- consistent: `a != b` if and only if `!(a == b)`

`Eq`, which builds on top of [`PartialEq`] also implies:

- reflexive: `a == a`

This property cannot be checked by the compiler, and therefore `Eq` is a trait without methods.

Violating this property is a logic error. The behavior resulting from a logic error is not
specified, but users of the trait must ensure that such logic errors do *not* result in
undefined behavior. This means that `unsafe` code **must not** rely on the correctness of these
methods.

Floating point types such as [`f32`] and [`f64`] implement only [`PartialEq`] but *not* `Eq`
because `NaN` != `NaN`.

## Derivable

This trait can be used with `#[derive]`. When `derive`d, because `Eq` has no extra methods, it
is only informing the compiler that this is an equivalence relation rather than a partial
equivalence relation. Note that the `derive` strategy requires all fields are `Eq`, which isn't
always desired.

## How can I implement `Eq`?

If you cannot use the `derive` strategy, specify that your type implements `Eq`, which has no
extra methods:

```
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

```
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

```
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

```
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

```
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

```
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

```
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

Basic behavior:

```
use std::cmp::Ordering;

assert_eq!(Ordering::Less.reverse(), Ordering::Greater);
assert_eq!(Ordering::Equal.reverse(), Ordering::Equal);
assert_eq!(Ordering::Greater.reverse(), Ordering::Less);
```

This method can be used to reverse a comparison:

```
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

```
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

```
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

This struct is a helper to be used with functions like [`Vec::sort_by_key`] and
can be used to reverse order a part of a key.

[`Vec::sort_by_key`]: ../../std/vec/struct.Vec.html#method.sort_by_key

# Examples

```
use std::cmp::Reverse;

let mut v = vec![1, 2, 3, 4, 5, 6];
v.sort_by_key(|&num| (num > 3, Reverse(num)));
assert_eq!(v, vec![3, 2, 1, 6, 5, 4]);
```

## trait Ord

```rust
pub const trait Ord: [const] Eq + [const] PartialOrd<Self> + PointeeSized
```

Trait for types that form a [total order](https://en.wikipedia.org/wiki/Total_order).

Implementations must be consistent with the [`PartialOrd`] implementation, and ensure `max`,
`min`, and `clamp` are consistent with `cmp`:

- `partial_cmp(a, b) == Some(cmp(a, b))`.
- `max(a, b) == max_by(a, b, cmp)` (ensured by the default implementation).
- `min(a, b) == min_by(a, b, cmp)` (ensured by the default implementation).
- For `a.clamp(min, max)`, see the [method docs](#method.clamp) (ensured by the default
  implementation).

Violating these requirements is a logic error. The behavior resulting from a logic error is not
specified, but users of the trait must ensure that such logic errors do *not* result in
undefined behavior. This means that `unsafe` code **must not** rely on the correctness of these
methods.

## Corollaries

From the above and the requirements of `PartialOrd`, it follows that for all `a`, `b` and `c`:

- exactly one of `a < b`, `a == b` or `a > b` is true; and
- `<` is transitive: `a < b` and `b < c` implies `a < c`. The same must hold for both `==` and
  `>`.

Mathematically speaking, the `<` operator defines a strict [weak order]. In cases where `==`
conforms to mathematical equality, it also defines a strict [total order].

[weak order]: https://en.wikipedia.org/wiki/Weak_ordering
[total order]: https://en.wikipedia.org/wiki/Total_order

## Derivable

This trait can be used with `#[derive]`.

When `derive`d on structs, it will produce a
[lexicographic](https://en.wikipedia.org/wiki/Lexicographic_order) ordering based on the
top-to-bottom declaration order of the struct's members.

When `derive`d on enums, variants are ordered primarily by their discriminants. Secondarily,
they are ordered by their fields. By default, the discriminant is smallest for variants at the
top, and largest for variants at the bottom. Here's an example:

```
#[derive(PartialEq, Eq, PartialOrd, Ord)]
enum E {
    Top,
    Bottom,
}

assert!(E::Top < E::Bottom);
```

However, manually setting the discriminants can override this default behavior:

```
#[derive(PartialEq, Eq, PartialOrd, Ord)]
enum E {
    Top = 2,
    Bottom = 1,
}

assert!(E::Bottom < E::Top);
```

## Lexicographical comparison

Lexicographical comparison is an operation with the following properties:
 - Two sequences are compared element by element.
 - The first mismatching element defines which sequence is lexicographically less or greater
   than the other.
 - If one sequence is a prefix of another, the shorter sequence is lexicographically less than
   the other.
 - If two sequences have equivalent elements and are of the same length, then the sequences are
   lexicographically equal.
 - An empty sequence is lexicographically less than any non-empty sequence.
 - Two empty sequences are lexicographically equal.

## How can I implement `Ord`?

`Ord` requires that the type also be [`PartialOrd`], [`PartialEq`], and [`Eq`].

Because `Ord` implies a stronger ordering relationship than [`PartialOrd`], and both `Ord` and
[`PartialOrd`] must agree, you must choose how to implement `Ord` **first**. You can choose to
derive it, or implement it manually. If you derive it, you should derive all four traits. If you
implement it manually, you should manually implement all four traits, based on the
implementation of `Ord`.

Here's an example where you want to define the `Character` comparison by `health` and
`experience` only, disregarding the field `mana`:

```
use std::cmp::Ordering;

struct Character {
    health: u32,
    experience: u32,
    mana: f32,
}

impl Ord for Character {
    fn cmp(&self, other: &Self) -> Ordering {
        self.experience
            .cmp(&other.experience)
            .then(self.health.cmp(&other.health))
    }
}

impl PartialOrd for Character {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl PartialEq for Character {
    fn eq(&self, other: &Self) -> bool {
        self.health == other.health && self.experience == other.experience
    }
}

impl Eq for Character {}
```

If all you need is to `slice::sort` a type by a field value, it can be simpler to use
`slice::sort_by_key`.

## Examples of incorrect `Ord` implementations

```
use std::cmp::Ordering;

#[derive(Debug)]
struct Character {
    health: f32,
}

impl Ord for Character {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        if self.health < other.health {
            Ordering::Less
        } else if self.health > other.health {
            Ordering::Greater
        } else {
            Ordering::Equal
        }
    }
}

impl PartialOrd for Character {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl PartialEq for Character {
    fn eq(&self, other: &Self) -> bool {
        self.health == other.health
    }
}

impl Eq for Character {}

let a = Character { health: 4.5 };
let b = Character { health: f32::NAN };

// Mistake: floating-point values do not form a total order and using the built-in comparison
// operands to implement `Ord` irregardless of that reality does not change it. Use
// `f32::total_cmp` if you need a total order for floating-point values.

// Reflexivity requirement of `Ord` is not given.
assert!(a == a);
assert!(b != b);

// Antisymmetry requirement of `Ord` is not given. Only one of a < c and c < a is allowed to be
// true, not both or neither.
assert_eq!((a < b) as u8 + (b < a) as u8, 0);
```

```
use std::cmp::Ordering;

#[derive(Debug)]
struct Character {
    health: u32,
    experience: u32,
}

impl PartialOrd for Character {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl Ord for Character {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        if self.health < 50 {
            self.health.cmp(&other.health)
        } else {
            self.experience.cmp(&other.experience)
        }
    }
}

// For performance reasons implementing `PartialEq` this way is not the idiomatic way, but it
// ensures consistent behavior between `PartialEq`, `PartialOrd` and `Ord` in this example.
impl PartialEq for Character {
    fn eq(&self, other: &Self) -> bool {
        self.cmp(other) == Ordering::Equal
    }
}

impl Eq for Character {}

let a = Character {
    health: 3,
    experience: 5,
};
let b = Character {
    health: 10,
    experience: 77,
};
let c = Character {
    health: 143,
    experience: 2,
};

// Mistake: The implementation of `Ord` compares different fields depending on the value of
// `self.health`, the resulting order is not total.

// Transitivity requirement of `Ord` is not given. If a is smaller than b and b is smaller than
// c, by transitive property a must also be smaller than c.
assert!(a < b && b < c && c < a);

// Antisymmetry requirement of `Ord` is not given. Only one of a < c and c < a is allowed to be
// true, not both or neither.
assert_eq!((a < c) as u8 + (c < a) as u8, 2);
```

The documentation of [`PartialOrd`] contains further examples, for example it's wrong for
[`PartialOrd`] and [`PartialEq`] to disagree.

[`cmp`]: Ord::cmp

## trait PartialOrd

```rust
pub const trait PartialOrd<Rhs: PointeeSized = Self>: [const] PartialEq<Rhs> + PointeeSized
```

Trait for types that form a [partial order](https://en.wikipedia.org/wiki/Partial_order).

The `lt`, `le`, `gt`, and `ge` methods of this trait can be called using the `<`, `<=`, `>`, and
`>=` operators, respectively.

This trait should **only** contain the comparison logic for a type **if one plans on only
implementing `PartialOrd` but not [`Ord`]**. Otherwise the comparison logic should be in [`Ord`]
and this trait implemented with `Some(self.cmp(other))`.

The methods of this trait must be consistent with each other and with those of [`PartialEq`].
The following conditions must hold:

1. `a == b` if and only if `partial_cmp(a, b) == Some(Equal)`.
2. `a < b` if and only if `partial_cmp(a, b) == Some(Less)`
3. `a > b` if and only if `partial_cmp(a, b) == Some(Greater)`
4. `a <= b` if and only if `a < b || a == b`
5. `a >= b` if and only if `a > b || a == b`
6. `a != b` if and only if `!(a == b)`.

Conditions 2–5 above are ensured by the default implementation. Condition 6 is already ensured
by [`PartialEq`].

If [`Ord`] is also implemented for `Self` and `Rhs`, it must also be consistent with
`partial_cmp` (see the documentation of that trait for the exact requirements). It's easy to
accidentally make them disagree by deriving some of the traits and manually implementing others.

The comparison relations must satisfy the following conditions (for all `a`, `b`, `c` of type
`A`, `B`, `C`):

- **Transitivity**: if `A: PartialOrd<B>` and `B: PartialOrd<C>` and `A: PartialOrd<C>`, then `a
  < b` and `b < c` implies `a < c`. The same must hold for both `==` and `>`. This must also
  work for longer chains, such as when `A: PartialOrd<B>`, `B: PartialOrd<C>`, `C:
  PartialOrd<D>`, and `A: PartialOrd<D>` all exist.
- **Duality**: if `A: PartialOrd<B>` and `B: PartialOrd<A>`, then `a < b` if and only if `b >
  a`.

Note that the `B: PartialOrd<A>` (dual) and `A: PartialOrd<C>` (transitive) impls are not forced
to exist, but these requirements apply whenever they do exist.

Violating these requirements is a logic error. The behavior resulting from a logic error is not
specified, but users of the trait must ensure that such logic errors do *not* result in
undefined behavior. This means that `unsafe` code **must not** rely on the correctness of these
methods.

## Cross-crate considerations

Upholding the requirements stated above can become tricky when one crate implements `PartialOrd`
for a type of another crate (i.e., to allow comparing one of its own types with a type from the
standard library). The recommendation is to never implement this trait for a foreign type. In
other words, such a crate should do `impl PartialOrd<ForeignType> for LocalType`, but it should
*not* do `impl PartialOrd<LocalType> for ForeignType`.

This avoids the problem of transitive chains that criss-cross crate boundaries: for all local
types `T`, you may assume that no other crate will add `impl`s that allow comparing `T < U`. In
other words, if other crates add `impl`s that allow building longer transitive chains `U1 < ...
< T < V1 < ...`, then all the types that appear to the right of `T` must be types that the crate
defining `T` already knows about. This rules out transitive chains where downstream crates can
add new `impl`s that "stitch together" comparisons of foreign types in ways that violate
transitivity.

Not having such foreign `impl`s also avoids forward compatibility issues where one crate adding
more `PartialOrd` implementations can cause build failures in downstream crates.

## Corollaries

The following corollaries follow from the above requirements:

- irreflexivity of `<` and `>`: `!(a < a)`, `!(a > a)`
- transitivity of `>`: if `a > b` and `b > c` then `a > c`
- duality of `partial_cmp`: `partial_cmp(a, b) == partial_cmp(b, a).map(Ordering::reverse)`

## Strict and non-strict partial orders

The `<` and `>` operators behave according to a *strict* partial order. However, `<=` and `>=`
do **not** behave according to a *non-strict* partial order. That is because mathematically, a
non-strict partial order would require reflexivity, i.e. `a <= a` would need to be true for
every `a`. This isn't always the case for types that implement `PartialOrd`, for example:

```
let a = f64::NAN;
assert_eq!(a <= a, false);
```

## Derivable

This trait can be used with `#[derive]`.

When `derive`d on structs, it will produce a
[lexicographic](https://en.wikipedia.org/wiki/Lexicographic_order) ordering based on the
top-to-bottom declaration order of the struct's members.

When `derive`d on enums, variants are primarily ordered by their discriminants. Secondarily,
they are ordered by their fields. By default, the discriminant is smallest for variants at the
top, and largest for variants at the bottom. Here's an example:

```
#[derive(PartialEq, PartialOrd)]
enum E {
    Top,
    Bottom,
}

assert!(E::Top < E::Bottom);
```

However, manually setting the discriminants can override this default behavior:

```
#[derive(PartialEq, PartialOrd)]
enum E {
    Top = 2,
    Bottom = 1,
}

assert!(E::Bottom < E::Top);
```

## How can I implement `PartialOrd`?

`PartialOrd` only requires implementation of the [`partial_cmp`] method, with the others
generated from default implementations.

However it remains possible to implement the others separately for types which do not have a
total order. For example, for floating point numbers, `NaN < 0 == false` and `NaN >= 0 == false`
(cf. IEEE 754-2008 section 5.11).

`PartialOrd` requires your type to be [`PartialEq`].

If your type is [`Ord`], you can implement [`partial_cmp`] by using [`cmp`]:

```
use std::cmp::Ordering;

struct Person {
    id: u32,
    name: String,
    height: u32,
}

impl PartialOrd for Person {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl Ord for Person {
    fn cmp(&self, other: &Self) -> Ordering {
        self.height.cmp(&other.height)
    }
}

impl PartialEq for Person {
    fn eq(&self, other: &Self) -> bool {
        self.height == other.height
    }
}

impl Eq for Person {}
```

You may also find it useful to use [`partial_cmp`] on your type's fields. Here is an example of
`Person` types who have a floating-point `height` field that is the only field to be used for
sorting:

```
use std::cmp::Ordering;

struct Person {
    id: u32,
    name: String,
    height: f64,
}

impl PartialOrd for Person {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        self.height.partial_cmp(&other.height)
    }
}

impl PartialEq for Person {
    fn eq(&self, other: &Self) -> bool {
        self.height == other.height
    }
}
```

## Examples of incorrect `PartialOrd` implementations

```
use std::cmp::Ordering;

#[derive(PartialEq, Debug)]
struct Character {
    health: u32,
    experience: u32,
}

impl PartialOrd for Character {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.health.cmp(&other.health))
    }
}

let a = Character {
    health: 10,
    experience: 5,
};
let b = Character {
    health: 10,
    experience: 77,
};

// Mistake: `PartialEq` and `PartialOrd` disagree with each other.

assert_eq!(a.partial_cmp(&b).unwrap(), Ordering::Equal); // a == b according to `PartialOrd`.
assert_ne!(a, b); // a != b according to `PartialEq`.
```

# Examples

```
let x: u32 = 0;
let y: u32 = 1;

assert_eq!(x < y, true);
assert_eq!(x.lt(&y), true);
```

[`partial_cmp`]: PartialOrd::partial_cmp
[`cmp`]: Ord::cmp

## fn min

```rust
pub const fn min<T: [const] Ord + [const] Destruct>(v1: T, v2: T) -> T
```

Compares and returns the minimum of two values.

Returns the first argument if the comparison determines them to be equal.

Internally uses an alias to [`Ord::min`].

# Examples

```
use std::cmp;

assert_eq!(cmp::min(1, 2), 1);
assert_eq!(cmp::min(2, 2), 2);
```
```
use std::cmp::{self, Ordering};

#[derive(Eq)]
struct Equal(&'static str);

impl PartialEq for Equal {
    fn eq(&self, other: &Self) -> bool { true }
}
impl PartialOrd for Equal {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> { Some(Ordering::Equal) }
}
impl Ord for Equal {
    fn cmp(&self, other: &Self) -> Ordering { Ordering::Equal }
}

assert_eq!(cmp::min(Equal("v1"), Equal("v2")).0, "v1");
```

## fn min_by

```rust
pub const fn min_by<T: [const] Destruct, F: [const] FnOnce(&T, &T) -> Ordering>( v1: T, v2: T, compare: F, ) -> T
```

Returns the minimum of two values with respect to the specified comparison function.

Returns the first argument if the comparison determines them to be equal.

The parameter order is preserved when calling the `compare` function, i.e. `v1` is
always passed as the first argument and `v2` as the second.

# Examples

```
use std::cmp;

let abs_cmp = |x: &i32, y: &i32| x.abs().cmp(&y.abs());

let result = cmp::min_by(2, -1, abs_cmp);
assert_eq!(result, -1);

let result = cmp::min_by(2, -3, abs_cmp);
assert_eq!(result, 2);

let result = cmp::min_by(1, -1, abs_cmp);
assert_eq!(result, 1);
```

## fn min_by_key

```rust
pub const fn min_by_key<T, F, K>(v1: T, v2: T, mut f: F) -> T where T: [const] Destruct, F: [const] FnMut(&T) -> K + [const] Destruct, K: [const] Ord + [const] Destruct,
```

Returns the element that gives the minimum value from the specified function.

Returns the first argument if the comparison determines them to be equal.

# Examples

```
use std::cmp;

let result = cmp::min_by_key(2, -1, |x: &i32| x.abs());
assert_eq!(result, -1);

let result = cmp::min_by_key(2, -3, |x: &i32| x.abs());
assert_eq!(result, 2);

let result = cmp::min_by_key(1, -1, |x: &i32| x.abs());
assert_eq!(result, 1);
```

## fn max

```rust
pub const fn max<T: [const] Ord + [const] Destruct>(v1: T, v2: T) -> T
```

Compares and returns the maximum of two values.

Returns the second argument if the comparison determines them to be equal.

Internally uses an alias to [`Ord::max`].

# Examples

```
use std::cmp;

assert_eq!(cmp::max(1, 2), 2);
assert_eq!(cmp::max(2, 2), 2);
```
```
use std::cmp::{self, Ordering};

#[derive(Eq)]
struct Equal(&'static str);

impl PartialEq for Equal {
    fn eq(&self, other: &Self) -> bool { true }
}
impl PartialOrd for Equal {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> { Some(Ordering::Equal) }
}
impl Ord for Equal {
    fn cmp(&self, other: &Self) -> Ordering { Ordering::Equal }
}

assert_eq!(cmp::max(Equal("v1"), Equal("v2")).0, "v2");
```

## fn max_by

```rust
pub const fn max_by<T: [const] Destruct, F: [const] FnOnce(&T, &T) -> Ordering>( v1: T, v2: T, compare: F, ) -> T
```

Returns the maximum of two values with respect to the specified comparison function.

Returns the second argument if the comparison determines them to be equal.

The parameter order is preserved when calling the `compare` function, i.e. `v1` is
always passed as the first argument and `v2` as the second.

# Examples

```
use std::cmp;

let abs_cmp = |x: &i32, y: &i32| x.abs().cmp(&y.abs());

let result = cmp::max_by(3, -2, abs_cmp) ;
assert_eq!(result, 3);

let result = cmp::max_by(1, -2, abs_cmp);
assert_eq!(result, -2);

let result = cmp::max_by(1, -1, abs_cmp);
assert_eq!(result, -1);
```

## fn max_by_key

```rust
pub const fn max_by_key<T, F, K>(v1: T, v2: T, mut f: F) -> T where T: [const] Destruct, F: [const] FnMut(&T) -> K + [const] Destruct, K: [const] Ord + [const] Destruct,
```

Returns the element that gives the maximum value from the specified function.

Returns the second argument if the comparison determines them to be equal.

# Examples

```
use std::cmp;

let result = cmp::max_by_key(3, -2, |x: &i32| x.abs());
assert_eq!(result, 3);

let result = cmp::max_by_key(1, -2, |x: &i32| x.abs());
assert_eq!(result, -2);

let result = cmp::max_by_key(1, -1, |x: &i32| x.abs());
assert_eq!(result, -1);
```

## macro impl_partial_eq_for_primitive!

```rust
macro_rules! impl_partial_eq_for_primitive
```

Implements `PartialEq` for primitive types.

Primitive types have a compiler-defined primitive implementation of `==` and `!=`.
This implements the `PartialEq` trait in terms of those primitive implementations.

NOTE: Calling this on a non-primitive type (such as `()`)
leads to an infinitely-looping self-recursive implementation.