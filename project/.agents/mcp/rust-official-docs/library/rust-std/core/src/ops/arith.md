---
title: "core::ops::arith"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/ops/arith.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::ops::arith

## trait Add

```rust
pub const trait Add<Rhs = Self>
```

The addition operator `+`.

Note that `Rhs` is `Self` by default, but this is not mandatory. For
example, `std::time::SystemTime` implements `Add<Duration>`, which permits
operations of the form `SystemTime = SystemTime + Duration`.

# Examples

## `Add`able points

```rust
use std::ops::Add;

#[derive(Debug, Copy, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

impl Add for Point {
    type Output = Self;

    fn add(self, other: Self) -> Self {
        Self {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

assert_eq!(Point { x: 1, y: 0 } + Point { x: 2, y: 3 },
           Point { x: 3, y: 3 });
```

## Implementing `Add` with generics

Here is an example of the same `Point` struct implementing the `Add` trait
using generics.

```rust
use std::ops::Add;

#[derive(Debug, Copy, Clone, PartialEq)]
struct Point<T> {
    x: T,
    y: T,
}

// Notice that the implementation uses the associated type `Output`.
impl<T: Add<Output = T>> Add for Point<T> {
    type Output = Self;

    fn add(self, other: Self) -> Self::Output {
        Self {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

assert_eq!(Point { x: 1, y: 0 } + Point { x: 2, y: 3 },
           Point { x: 3, y: 3 });
```

## trait Sub

```rust
pub const trait Sub<Rhs = Self>
```

The subtraction operator `-`.

Note that `Rhs` is `Self` by default, but this is not mandatory. For
example, `std::time::SystemTime` implements `Sub<Duration>`, which permits
operations of the form `SystemTime = SystemTime - Duration`.

# Examples

## `Sub`tractable points

```rust
use std::ops::Sub;

#[derive(Debug, Copy, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

impl Sub for Point {
    type Output = Self;

    fn sub(self, other: Self) -> Self::Output {
        Self {
            x: self.x - other.x,
            y: self.y - other.y,
        }
    }
}

assert_eq!(Point { x: 3, y: 3 } - Point { x: 2, y: 3 },
           Point { x: 1, y: 0 });
```

## Implementing `Sub` with generics

Here is an example of the same `Point` struct implementing the `Sub` trait
using generics.

```rust
use std::ops::Sub;

#[derive(Debug, PartialEq)]
struct Point<T> {
    x: T,
    y: T,
}

// Notice that the implementation uses the associated type `Output`.
impl<T: Sub<Output = T>> Sub for Point<T> {
    type Output = Self;

    fn sub(self, other: Self) -> Self::Output {
        Point {
            x: self.x - other.x,
            y: self.y - other.y,
        }
    }
}

assert_eq!(Point { x: 2, y: 3 } - Point { x: 1, y: 0 },
           Point { x: 1, y: 3 });
```

## trait Mul

```rust
pub const trait Mul<Rhs = Self>
```

The multiplication operator `*`.

Note that `Rhs` is `Self` by default, but this is not mandatory.

# Examples

## `Mul`tipliable rational numbers

```rust
use std::ops::Mul;

// By the fundamental theorem of arithmetic, rational numbers in lowest
// terms are unique. So, by keeping `Rational`s in reduced form, we can
// derive `Eq` and `PartialEq`.
#[derive(Debug, Eq, PartialEq)]
struct Rational {
    numerator: usize,
    denominator: usize,
}

impl Rational {
    fn new(numerator: usize, denominator: usize) -> Self {
        if denominator == 0 {
            panic!("Zero is an invalid denominator!");
        }

        // Reduce to lowest terms by dividing by the greatest common
        // divisor.
        let gcd = gcd(numerator, denominator);
        Self {
            numerator: numerator / gcd,
            denominator: denominator / gcd,
        }
    }
}

impl Mul for Rational {
    // The multiplication of rational numbers is a closed operation.
    type Output = Self;

    fn mul(self, rhs: Self) -> Self {
        let numerator = self.numerator * rhs.numerator;
        let denominator = self.denominator * rhs.denominator;
        Self::new(numerator, denominator)
    }
}

// Euclid's two-thousand-year-old algorithm for finding the greatest common
// divisor.
fn gcd(x: usize, y: usize) -> usize {
    let mut x = x;
    let mut y = y;
    while y != 0 {
        let t = y;
        y = x % y;
        x = t;
    }
    x
}

assert_eq!(Rational::new(1, 2), Rational::new(2, 4));
assert_eq!(Rational::new(2, 3) * Rational::new(3, 4),
           Rational::new(1, 2));
```

## Multiplying vectors by scalars as in linear algebra

```rust
use std::ops::Mul;

struct Scalar { value: usize }

#[derive(Debug, PartialEq)]
struct Vector { value: Vec<usize> }

impl Mul<Scalar> for Vector {
    type Output = Self;

    fn mul(self, rhs: Scalar) -> Self::Output {
        Self { value: self.value.iter().map(|v| v * rhs.value).collect() }
    }
}

let vector = Vector { value: vec![2, 4, 6] };
let scalar = Scalar { value: 3 };
assert_eq!(vector * scalar, Vector { value: vec![6, 12, 18] });
```

## trait Div

```rust
pub const trait Div<Rhs = Self>
```

The division operator `/`.

Note that `Rhs` is `Self` by default, but this is not mandatory.

# Examples

## `Div`idable rational numbers

```rust
use std::ops::Div;

// By the fundamental theorem of arithmetic, rational numbers in lowest
// terms are unique. So, by keeping `Rational`s in reduced form, we can
// derive `Eq` and `PartialEq`.
#[derive(Debug, Eq, PartialEq)]
struct Rational {
    numerator: usize,
    denominator: usize,
}

impl Rational {
    fn new(numerator: usize, denominator: usize) -> Self {
        if denominator == 0 {
            panic!("Zero is an invalid denominator!");
        }

        // Reduce to lowest terms by dividing by the greatest common
        // divisor.
        let gcd = gcd(numerator, denominator);
        Self {
            numerator: numerator / gcd,
            denominator: denominator / gcd,
        }
    }
}

impl Div for Rational {
    // The division of rational numbers is a closed operation.
    type Output = Self;

    fn div(self, rhs: Self) -> Self::Output {
        if rhs.numerator == 0 {
            panic!("Cannot divide by zero-valued `Rational`!");
        }

        let numerator = self.numerator * rhs.denominator;
        let denominator = self.denominator * rhs.numerator;
        Self::new(numerator, denominator)
    }
}

// Euclid's two-thousand-year-old algorithm for finding the greatest common
// divisor.
fn gcd(x: usize, y: usize) -> usize {
    let mut x = x;
    let mut y = y;
    while y != 0 {
        let t = y;
        y = x % y;
        x = t;
    }
    x
}

assert_eq!(Rational::new(1, 2), Rational::new(2, 4));
assert_eq!(Rational::new(1, 2) / Rational::new(3, 4),
           Rational::new(2, 3));
```

## Dividing vectors by scalars as in linear algebra

```rust
use std::ops::Div;

struct Scalar { value: f32 }

#[derive(Debug, PartialEq)]
struct Vector { value: Vec<f32> }

impl Div<Scalar> for Vector {
    type Output = Self;

    fn div(self, rhs: Scalar) -> Self::Output {
        Self { value: self.value.iter().map(|v| v / rhs.value).collect() }
    }
}

let scalar = Scalar { value: 2f32 };
let vector = Vector { value: vec![2f32, 4f32, 6f32] };
assert_eq!(vector / scalar, Vector { value: vec![1f32, 2f32, 3f32] });
```

## trait Rem

```rust
pub const trait Rem<Rhs = Self>
```

The remainder operator `%`.

Note that `Rhs` is `Self` by default, but this is not mandatory.

# Examples

This example implements `Rem` on a `SplitSlice` object. After `Rem` is
implemented, one can use the `%` operator to find out what the remaining
elements of the slice would be after splitting it into equal slices of a
given length.

```rust
use std::ops::Rem;

#[derive(PartialEq, Debug)]
struct SplitSlice<'a, T> {
    slice: &'a [T],
}

impl<'a, T> Rem<usize> for SplitSlice<'a, T> {
    type Output = Self;

    fn rem(self, modulus: usize) -> Self::Output {
        let len = self.slice.len();
        let rem = len % modulus;
        let start = len - rem;
        Self {slice: &self.slice[start..]}
    }
}

// If we were to divide &[0, 1, 2, 3, 4, 5, 6, 7] into slices of size 3,
// the remainder would be &[6, 7].
assert_eq!(SplitSlice { slice: &[0, 1, 2, 3, 4, 5, 6, 7] } % 3,
           SplitSlice { slice: &[6, 7] });
```

## trait Neg

```rust
pub const trait Neg
```

The unary negation operator `-`.

# Examples

An implementation of `Neg` for `Sign`, which allows the use of `-` to
negate its value.

```rust
use std::ops::Neg;

#[derive(Debug, PartialEq)]
enum Sign {
    Negative,
    Zero,
    Positive,
}

impl Neg for Sign {
    type Output = Self;

    fn neg(self) -> Self::Output {
        match self {
            Sign::Negative => Sign::Positive,
            Sign::Zero => Sign::Zero,
            Sign::Positive => Sign::Negative,
        }
    }
}

// A negative positive is a negative.
assert_eq!(-Sign::Positive, Sign::Negative);
// A double negative is a positive.
assert_eq!(-Sign::Negative, Sign::Positive);
// Zero is its own negation.
assert_eq!(-Sign::Zero, Sign::Zero);
```

## trait AddAssign

```rust
pub const trait AddAssign<Rhs = Self>
```

The addition assignment operator `+=`.

# Examples

This example creates a `Point` struct that implements the `AddAssign`
trait, and then demonstrates add-assigning to a mutable `Point`.

```rust
use std::ops::AddAssign;

#[derive(Debug, Copy, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

impl AddAssign for Point {
    fn add_assign(&mut self, other: Self) {
        *self = Self {
            x: self.x + other.x,
            y: self.y + other.y,
        };
    }
}

let mut point = Point { x: 1, y: 0 };
point += Point { x: 2, y: 3 };
assert_eq!(point, Point { x: 3, y: 3 });
```

## trait SubAssign

```rust
pub const trait SubAssign<Rhs = Self>
```

The subtraction assignment operator `-=`.

# Examples

This example creates a `Point` struct that implements the `SubAssign`
trait, and then demonstrates sub-assigning to a mutable `Point`.

```rust
use std::ops::SubAssign;

#[derive(Debug, Copy, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

impl SubAssign for Point {
    fn sub_assign(&mut self, other: Self) {
        *self = Self {
            x: self.x - other.x,
            y: self.y - other.y,
        };
    }
}

let mut point = Point { x: 3, y: 3 };
point -= Point { x: 2, y: 3 };
assert_eq!(point, Point {x: 1, y: 0});
```

## trait MulAssign

```rust
pub const trait MulAssign<Rhs = Self>
```

The multiplication assignment operator `*=`.

# Examples

```rust
use std::ops::MulAssign;

#[derive(Debug, PartialEq)]
struct Frequency { hertz: f64 }

impl MulAssign<f64> for Frequency {
    fn mul_assign(&mut self, rhs: f64) {
        self.hertz *= rhs;
    }
}

let mut frequency = Frequency { hertz: 50.0 };
frequency *= 4.0;
assert_eq!(Frequency { hertz: 200.0 }, frequency);
```

## trait DivAssign

```rust
pub const trait DivAssign<Rhs = Self>
```

The division assignment operator `/=`.

# Examples

```rust
use std::ops::DivAssign;

#[derive(Debug, PartialEq)]
struct Frequency { hertz: f64 }

impl DivAssign<f64> for Frequency {
    fn div_assign(&mut self, rhs: f64) {
        self.hertz /= rhs;
    }
}

let mut frequency = Frequency { hertz: 200.0 };
frequency /= 4.0;
assert_eq!(Frequency { hertz: 50.0 }, frequency);
```

## trait RemAssign

```rust
pub const trait RemAssign<Rhs = Self>
```

The remainder assignment operator `%=`.

# Examples

```rust
use std::ops::RemAssign;

struct CookieJar { cookies: u32 }

impl RemAssign<u32> for CookieJar {
    fn rem_assign(&mut self, piles: u32) {
        self.cookies %= piles;
    }
}

let mut jar = CookieJar { cookies: 31 };
let piles = 4;

println!("Splitting up {} cookies into {} even piles!", jar.cookies, piles);

jar %= piles;

println!("{} cookies remain in the cookie jar!", jar.cookies);
```
