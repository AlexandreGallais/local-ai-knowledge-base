---
title: "core::ops::bit"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/ops/bit.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::ops::bit

## trait Not

```rust
pub const trait Not
```

The unary logical negation operator `!`.

# Examples

An implementation of `Not` for `Answer`, which enables the use of `!` to
invert its value.

```rust
use std::ops::Not;

#[derive(Debug, PartialEq)]
enum Answer {
    Yes,
    No,
}

impl Not for Answer {
    type Output = Self;

    fn not(self) -> Self::Output {
        match self {
            Answer::Yes => Answer::No,
            Answer::No => Answer::Yes
        }
    }
}

assert_eq!(!Answer::Yes, Answer::No);
assert_eq!(!Answer::No, Answer::Yes);
```

## trait BitAnd

```rust
pub const trait BitAnd<Rhs = Self>
```

The bitwise AND operator `&`.

Note that `Rhs` is `Self` by default, but this is not mandatory.

# Examples

An implementation of `BitAnd` for a wrapper around `bool`.

```rust
use std::ops::BitAnd;

#[derive(Debug, PartialEq)]
struct Scalar(bool);

impl BitAnd for Scalar {
    type Output = Self;

    // rhs is the "right-hand side" of the expression `a & b`
    fn bitand(self, rhs: Self) -> Self::Output {
        Self(self.0 & rhs.0)
    }
}

assert_eq!(Scalar(true) & Scalar(true), Scalar(true));
assert_eq!(Scalar(true) & Scalar(false), Scalar(false));
assert_eq!(Scalar(false) & Scalar(true), Scalar(false));
assert_eq!(Scalar(false) & Scalar(false), Scalar(false));
```

An implementation of `BitAnd` for a wrapper around `Vec<bool>`.

```rust
use std::ops::BitAnd;

#[derive(Debug, PartialEq)]
struct BooleanVector(Vec<bool>);

impl BitAnd for BooleanVector {
    type Output = Self;

    fn bitand(self, Self(rhs): Self) -> Self::Output {
        let Self(lhs) = self;
        assert_eq!(lhs.len(), rhs.len());
        Self(
            lhs.iter()
                .zip(rhs.iter())
                .map(|(x, y)| *x & *y)
                .collect()
        )
    }
}

let bv1 = BooleanVector(vec![true, true, false, false]);
let bv2 = BooleanVector(vec![true, false, true, false]);
let expected = BooleanVector(vec![true, false, false, false]);
assert_eq!(bv1 & bv2, expected);
```

## trait BitOr

```rust
pub const trait BitOr<Rhs = Self>
```

The bitwise OR operator `|`.

Note that `Rhs` is `Self` by default, but this is not mandatory.

# Examples

An implementation of `BitOr` for a wrapper around `bool`.

```rust
use std::ops::BitOr;

#[derive(Debug, PartialEq)]
struct Scalar(bool);

impl BitOr for Scalar {
    type Output = Self;

    // rhs is the "right-hand side" of the expression `a | b`
    fn bitor(self, rhs: Self) -> Self::Output {
        Self(self.0 | rhs.0)
    }
}

assert_eq!(Scalar(true) | Scalar(true), Scalar(true));
assert_eq!(Scalar(true) | Scalar(false), Scalar(true));
assert_eq!(Scalar(false) | Scalar(true), Scalar(true));
assert_eq!(Scalar(false) | Scalar(false), Scalar(false));
```

An implementation of `BitOr` for a wrapper around `Vec<bool>`.

```rust
use std::ops::BitOr;

#[derive(Debug, PartialEq)]
struct BooleanVector(Vec<bool>);

impl BitOr for BooleanVector {
    type Output = Self;

    fn bitor(self, Self(rhs): Self) -> Self::Output {
        let Self(lhs) = self;
        assert_eq!(lhs.len(), rhs.len());
        Self(
            lhs.iter()
                .zip(rhs.iter())
                .map(|(x, y)| *x | *y)
                .collect()
        )
    }
}

let bv1 = BooleanVector(vec![true, true, false, false]);
let bv2 = BooleanVector(vec![true, false, true, false]);
let expected = BooleanVector(vec![true, true, true, false]);
assert_eq!(bv1 | bv2, expected);
```

## trait BitXor

```rust
pub const trait BitXor<Rhs = Self>
```

The bitwise XOR operator `^`.

Note that `Rhs` is `Self` by default, but this is not mandatory.

# Examples

An implementation of `BitXor` that lifts `^` to a wrapper around `bool`.

```rust
use std::ops::BitXor;

#[derive(Debug, PartialEq)]
struct Scalar(bool);

impl BitXor for Scalar {
    type Output = Self;

    // rhs is the "right-hand side" of the expression `a ^ b`
    fn bitxor(self, rhs: Self) -> Self::Output {
        Self(self.0 ^ rhs.0)
    }
}

assert_eq!(Scalar(true) ^ Scalar(true), Scalar(false));
assert_eq!(Scalar(true) ^ Scalar(false), Scalar(true));
assert_eq!(Scalar(false) ^ Scalar(true), Scalar(true));
assert_eq!(Scalar(false) ^ Scalar(false), Scalar(false));
```

An implementation of `BitXor` trait for a wrapper around `Vec<bool>`.

```rust
use std::ops::BitXor;

#[derive(Debug, PartialEq)]
struct BooleanVector(Vec<bool>);

impl BitXor for BooleanVector {
    type Output = Self;

    fn bitxor(self, Self(rhs): Self) -> Self::Output {
        let Self(lhs) = self;
        assert_eq!(lhs.len(), rhs.len());
        Self(
            lhs.iter()
                .zip(rhs.iter())
                .map(|(x, y)| *x ^ *y)
                .collect()
        )
    }
}

let bv1 = BooleanVector(vec![true, true, false, false]);
let bv2 = BooleanVector(vec![true, false, true, false]);
let expected = BooleanVector(vec![false, true, true, false]);
assert_eq!(bv1 ^ bv2, expected);
```

## trait Shl

```rust
pub const trait Shl<Rhs = Self>
```

The left shift operator `<<`. Note that because this trait is implemented
for all integer types with multiple right-hand-side types, Rust's type
checker has special handling for `_ << _`, setting the result type for
integer operations to the type of the left-hand-side operand. This means
that though `a << b` and `a.shl(b)` are one and the same from an evaluation
standpoint, they are different when it comes to type inference.

# Examples

An implementation of `Shl` that lifts the `<<` operation on integers to a
wrapper around `usize`.

```rust
use std::ops::Shl;

#[derive(PartialEq, Debug)]
struct Scalar(usize);

impl Shl<Scalar> for Scalar {
    type Output = Self;

    fn shl(self, Self(rhs): Self) -> Self::Output {
        let Self(lhs) = self;
        Self(lhs << rhs)
    }
}

assert_eq!(Scalar(4) << Scalar(2), Scalar(16));
```

An implementation of `Shl` that spins a vector leftward by a given amount.

```rust
use std::ops::Shl;

#[derive(PartialEq, Debug)]
struct SpinVector<T: Clone> {
    vec: Vec<T>,
}

impl<T: Clone> Shl<usize> for SpinVector<T> {
    type Output = Self;

    fn shl(self, rhs: usize) -> Self::Output {
        // Rotate the vector by `rhs` places.
        let (a, b) = self.vec.split_at(rhs);
        let mut spun_vector = vec![];
        spun_vector.extend_from_slice(b);
        spun_vector.extend_from_slice(a);
        Self { vec: spun_vector }
    }
}

assert_eq!(SpinVector { vec: vec![0, 1, 2, 3, 4] } << 2,
           SpinVector { vec: vec![2, 3, 4, 0, 1] });
```

## trait Shr

```rust
pub const trait Shr<Rhs = Self>
```

The right shift operator `>>`. Note that because this trait is implemented
for all integer types with multiple right-hand-side types, Rust's type
checker has special handling for `_ >> _`, setting the result type for
integer operations to the type of the left-hand-side operand. This means
that though `a >> b` and `a.shr(b)` are one and the same from an evaluation
standpoint, they are different when it comes to type inference.

# Examples

An implementation of `Shr` that lifts the `>>` operation on integers to a
wrapper around `usize`.

```rust
use std::ops::Shr;

#[derive(PartialEq, Debug)]
struct Scalar(usize);

impl Shr<Scalar> for Scalar {
    type Output = Self;

    fn shr(self, Self(rhs): Self) -> Self::Output {
        let Self(lhs) = self;
        Self(lhs >> rhs)
    }
}

assert_eq!(Scalar(16) >> Scalar(2), Scalar(4));
```

An implementation of `Shr` that spins a vector rightward by a given amount.

```rust
use std::ops::Shr;

#[derive(PartialEq, Debug)]
struct SpinVector<T: Clone> {
    vec: Vec<T>,
}

impl<T: Clone> Shr<usize> for SpinVector<T> {
    type Output = Self;

    fn shr(self, rhs: usize) -> Self::Output {
        // Rotate the vector by `rhs` places.
        let (a, b) = self.vec.split_at(self.vec.len() - rhs);
        let mut spun_vector = vec![];
        spun_vector.extend_from_slice(b);
        spun_vector.extend_from_slice(a);
        Self { vec: spun_vector }
    }
}

assert_eq!(SpinVector { vec: vec![0, 1, 2, 3, 4] } >> 2,
           SpinVector { vec: vec![3, 4, 0, 1, 2] });
```

## trait BitAndAssign

```rust
pub const trait BitAndAssign<Rhs = Self>
```

The bitwise AND assignment operator `&=`.

# Examples

An implementation of `BitAndAssign` that lifts the `&=` operator to a
wrapper around `bool`.

```rust
use std::ops::BitAndAssign;

#[derive(Debug, PartialEq)]
struct Scalar(bool);

impl BitAndAssign for Scalar {
    // rhs is the "right-hand side" of the expression `a &= b`
    fn bitand_assign(&mut self, rhs: Self) {
        *self = Self(self.0 & rhs.0)
    }
}

let mut scalar = Scalar(true);
scalar &= Scalar(true);
assert_eq!(scalar, Scalar(true));

let mut scalar = Scalar(true);
scalar &= Scalar(false);
assert_eq!(scalar, Scalar(false));

let mut scalar = Scalar(false);
scalar &= Scalar(true);
assert_eq!(scalar, Scalar(false));

let mut scalar = Scalar(false);
scalar &= Scalar(false);
assert_eq!(scalar, Scalar(false));
```

Here, the `BitAndAssign` trait is implemented for a wrapper around
`Vec<bool>`.

```rust
use std::ops::BitAndAssign;

#[derive(Debug, PartialEq)]
struct BooleanVector(Vec<bool>);

impl BitAndAssign for BooleanVector {
    // `rhs` is the "right-hand side" of the expression `a &= b`.
    fn bitand_assign(&mut self, rhs: Self) {
        assert_eq!(self.0.len(), rhs.0.len());
        *self = Self(
            self.0
                .iter()
                .zip(rhs.0.iter())
                .map(|(x, y)| *x & *y)
                .collect()
        );
    }
}

let mut bv = BooleanVector(vec![true, true, false, false]);
bv &= BooleanVector(vec![true, false, true, false]);
let expected = BooleanVector(vec![true, false, false, false]);
assert_eq!(bv, expected);
```

## trait BitOrAssign

```rust
pub const trait BitOrAssign<Rhs = Self>
```

The bitwise OR assignment operator `|=`.

# Examples

```rust
use std::ops::BitOrAssign;

#[derive(Debug, PartialEq)]
struct PersonalPreferences {
    likes_cats: bool,
    likes_dogs: bool,
}

impl BitOrAssign for PersonalPreferences {
    fn bitor_assign(&mut self, rhs: Self) {
        self.likes_cats |= rhs.likes_cats;
        self.likes_dogs |= rhs.likes_dogs;
    }
}

let mut prefs = PersonalPreferences { likes_cats: true, likes_dogs: false };
prefs |= PersonalPreferences { likes_cats: false, likes_dogs: true };
assert_eq!(prefs, PersonalPreferences { likes_cats: true, likes_dogs: true });
```

## trait BitXorAssign

```rust
pub const trait BitXorAssign<Rhs = Self>
```

The bitwise XOR assignment operator `^=`.

# Examples

```rust
use std::ops::BitXorAssign;

#[derive(Debug, PartialEq)]
struct Personality {
    has_soul: bool,
    likes_knitting: bool,
}

impl BitXorAssign for Personality {
    fn bitxor_assign(&mut self, rhs: Self) {
        self.has_soul ^= rhs.has_soul;
        self.likes_knitting ^= rhs.likes_knitting;
    }
}

let mut personality = Personality { has_soul: false, likes_knitting: true };
personality ^= Personality { has_soul: true, likes_knitting: true };
assert_eq!(personality, Personality { has_soul: true, likes_knitting: false});
```

## trait ShlAssign

```rust
pub const trait ShlAssign<Rhs = Self>
```

The left shift assignment operator `<<=`.

# Examples

An implementation of `ShlAssign` for a wrapper around `usize`.

```rust
use std::ops::ShlAssign;

#[derive(Debug, PartialEq)]
struct Scalar(usize);

impl ShlAssign<usize> for Scalar {
    fn shl_assign(&mut self, rhs: usize) {
        self.0 <<= rhs;
    }
}

let mut scalar = Scalar(4);
scalar <<= 2;
assert_eq!(scalar, Scalar(16));
```

## trait ShrAssign

```rust
pub const trait ShrAssign<Rhs = Self>
```

The right shift assignment operator `>>=`.

# Examples

An implementation of `ShrAssign` for a wrapper around `usize`.

```rust
use std::ops::ShrAssign;

#[derive(Debug, PartialEq)]
struct Scalar(usize);

impl ShrAssign<usize> for Scalar {
    fn shr_assign(&mut self, rhs: usize) {
        self.0 >>= rhs;
    }
}

let mut scalar = Scalar(16);
scalar >>= 2;
assert_eq!(scalar, Scalar(4));
```
