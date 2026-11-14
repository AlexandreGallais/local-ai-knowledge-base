---
title: "core::cmp (part 2 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/cmp.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::cmp (part 2 of 3)

## Corollaries

From the above and the requirements of `PartialOrd`, it follows that for all `a`, `b` and `c`:

- exactly one of `a < b`, `a == b` or `a > b` is true; and
- `<` is transitive: `a < b` and `b < c` implies `a < c`. The same must hold for both `==` and
  `>`.

Mathematically speaking, the `<` operator defines a strict [weak order]. In cases where `==`
conforms to mathematical equality, it also defines a strict [total order].

## Derivable

This trait can be used with `#[derive]`.

When `derive`d on structs, it will produce a
lexicographic ordering based on the
top-to-bottom declaration order of the struct's members.

When `derive`d on enums, variants are ordered primarily by their discriminants. Secondarily,
they are ordered by their fields. By default, the discriminant is smallest for variants at the
top, and largest for variants at the bottom. Here's an example:

```rust
#[derive(PartialEq, Eq, PartialOrd, Ord)]
enum E {
    Top,
    Bottom,
}

assert!(E::Top < E::Bottom);
```

However, manually setting the discriminants can override this default behavior:

```rust
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

`Ord` requires that the type also be `PartialOrd`, `PartialEq`, and `Eq`.

Because `Ord` implies a stronger ordering relationship than `PartialOrd`, and both `Ord` and
`PartialOrd` must agree, you must choose how to implement `Ord` **first**. You can choose to
derive it, or implement it manually. If you derive it, you should derive all four traits. If you
implement it manually, you should manually implement all four traits, based on the
implementation of `Ord`.

Here's an example where you want to define the `Character` comparison by `health` and
`experience` only, disregarding the field `mana`:

```rust
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

```rust
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

```rust
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

The documentation of `PartialOrd` contains further examples, for example it's wrong for
`PartialOrd` and `PartialEq` to disagree.

## trait PartialOrd

```rust
pub const trait PartialOrd<Rhs: PointeeSized = Self>: [const] PartialEq<Rhs> + PointeeSized
```

Trait for types that form a partial order.

The `lt`, `le`, `gt`, and `ge` methods of this trait can be called using the `<`, `<=`, `>`, and
`>=` operators, respectively.

This trait should **only** contain the comparison logic for a type **if one plans on only
implementing `PartialOrd` but not `Ord`**. Otherwise the comparison logic should be in `Ord`
and this trait implemented with `Some(self.cmp(other))`.

The methods of this trait must be consistent with each other and with those of `PartialEq`.
The following conditions must hold:

1. `a == b` if and only if `partial_cmp(a, b) == Some(Equal)`.
2. `a < b` if and only if `partial_cmp(a, b) == Some(Less)`
3. `a > b` if and only if `partial_cmp(a, b) == Some(Greater)`
4. `a <= b` if and only if `a < b || a == b`
5. `a >= b` if and only if `a > b || a == b`
6. `a != b` if and only if `!(a == b)`.

Conditions 2–5 above are ensured by the default implementation. Condition 6 is already ensured
by `PartialEq`.

If `Ord` is also implemented for `Self` and `Rhs`, it must also be consistent with
`partial_cmp` (see the documentation of that trait for the exact requirements). It's easy to
accidentally make them disagree by deriving some of the traits and manually implementing others.

The comparison relations must satisfy the following conditions (for all `a`, `b`, `c` of type
`A`, `B`, `C`):

- **Transitivity**: if `A: PartialOrd` and `B: PartialOrd<C>` and `A: PartialOrd<C>`, then `a
  < b` and `b < c` implies `a < c`. The same must hold for both `==` and `>`. This must also
  work for longer chains, such as when `A: PartialOrd`, `B: PartialOrd<C>`, `C:
  PartialOrd<D>`, and `A: PartialOrd<D>` all exist.
- **Duality**: if `A: PartialOrd` and `B: PartialOrd`, then `a < b` if and only if `b >
  a`.

Note that the `B: PartialOrd` (dual) and `A: PartialOrd<C>` (transitive) impls are not forced
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

```rust
let a = f64::NAN;
assert_eq!(a <= a, false);
```

## Derivable

This trait can be used with `#[derive]`.

When `derive`d on structs, it will produce a
lexicographic ordering based on the
top-to-bottom declaration order of the struct's members.

When `derive`d on enums, variants are primarily ordered by their discriminants. Secondarily,
they are ordered by their fields. By default, the discriminant is smallest for variants at the
top, and largest for variants at the bottom. Here's an example:

```rust
#[derive(PartialEq, PartialOrd)]
enum E {
    Top,
    Bottom,
}

assert!(E::Top < E::Bottom);
```

However, manually setting the discriminants can override this default behavior:

```rust
#[derive(PartialEq, PartialOrd)]
enum E {
    Top = 2,
    Bottom = 1,
}

assert!(E::Bottom < E::Top);
```

## How can I implement `PartialOrd`?

`PartialOrd` only requires implementation of the `partial_cmp` method, with the others
generated from default implementations.

However it remains possible to implement the others separately for types which do not have a
total order. For example, for floating point numbers, `NaN < 0 == false` and `NaN >= 0 == false`
(cf. IEEE 754-2008 section 5.11).

`PartialOrd` requires your type to be `PartialEq`.

If your type is `Ord`, you can implement `partial_cmp` by using `cmp`:

```rust
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

You may also find it useful to use `partial_cmp` on your type's fields. Here is an example of
`Person` types who have a floating-point `height` field that is the only field to be used for
sorting:

```rust
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

```rust
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

```rust
let x: u32 = 0;
let y: u32 = 1;

assert_eq!(x < y, true);
assert_eq!(x.lt(&y), true);
```

## fn min

```rust
pub const fn min<T: [const] Ord + [const] Destruct>(v1: T, v2: T) -> T
```

Compares and returns the minimum of two values.

Returns the first argument if the comparison determines them to be equal.

Internally uses an alias to `Ord::min`.

# Examples

```rust
use std::cmp;

assert_eq!(cmp::min(1, 2), 1);
assert_eq!(cmp::min(2, 2), 2);
```
```rust
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
