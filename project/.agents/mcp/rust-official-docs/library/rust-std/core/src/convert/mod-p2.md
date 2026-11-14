---
title: "core::convert (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/convert/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::convert (part 2 of 2)

## trait From

```rust
pub const trait From<T>: Sized
```

Used to do value-to-value conversions while consuming the input value. It is the reciprocal of
`Into`.

One should always prefer implementing `From` over `Into`
because implementing `From` automatically provides one with an implementation of `Into`
thanks to the blanket implementation in the standard library.

Only implement `Into` when targeting a version prior to Rust 1.41 and converting to a type
outside the current crate.
`From` was not able to do these types of conversions in earlier versions because of Rust's
orphaning rules.
See `Into` for more details.

Prefer using `Into` over `From` when specifying trait bounds on a generic function
to ensure that types that only implement `Into` can be used as well.

The `From` trait is also very useful when performing error handling. When constructing a function
that is capable of failing, the return type will generally be of the form `Result<T, E>`.
`From` simplifies error handling by allowing a function to return a single error type
that encapsulates multiple error types. See the "Examples" section and the book for more
details.

**Note: This trait must not fail**. The `From` trait is intended for perfect conversions.
If the conversion can fail or is not perfect, use `TryFrom`.

# Generic Implementations

- `From<T> for U` implies `Into`` for T`
- `From` is reflexive, which means that `From<T> for T` is implemented

# When to implement `From`

While there's no technical restrictions on which conversions can be done using
a `From` implementation, the general expectation is that the conversions
should typically be restricted as follows:

* The conversion is *infallible*: if the conversion can fail, use `TryFrom`
  instead; don't provide a `From` impl that panics.

* The conversion is *lossless*: semantically, it should not lose or discard
  information. For example, `i32: From<u16>` exists, where the original
  value can be recovered using `u16: TryFrom<i32>`.  And `String: From<&str>`
  exists, where you can get something equivalent to the original value via
  `Deref`.  But `From` cannot be used to convert from `u32` to `u16`, since
  that cannot succeed in a lossless way.  (There's some wiggle room here for
  information not considered semantically relevant.  For example,
  `Box<[T]>: From<Vec<T>>` exists even though it might not preserve capacity,
  like how two vectors can be equal despite differing capacities.)

* The conversion is *value-preserving*: the conceptual kind and meaning of
  the resulting value is the same, even though the Rust type and technical
  representation might be different.  For example `-1_i8 as u8` is *lossless*,
  since `as` casting back can recover the original value, but that conversion
  is *not* available via `From` because `-1` and `255` are different conceptual
  values (despite being identical bit patterns technically).  But
  `f32: From<i16>` *is* available because `1_i16` and `1.0_f32` are conceptually
  the same real number (despite having very different bit patterns technically).
  `String: From<char>` is available because they're both *text*, but
  `String: From<u32>` is *not* available, since `1` (a number) and `"1"`
  (text) are too different.  (Converting values to text is instead covered
  by the `Display` trait.)

* The conversion is *obvious*: it's the only reasonable conversion between
  the two types.  Otherwise it's better to have it be a named method or
  constructor, like how `str::as_bytes` is a method and how integers have
  methods like `u32::from_ne_bytes`, `u32::from_le_bytes`, and
  `u32::from_be_bytes`, none of which are `From` implementations.  Whereas
  there's only one reasonable way to wrap an `Ipv6Addr`
  into an `IpAddr`, thus `IpAddr: From<Ipv6Addr>` exists.

# Examples

`String` implements `From<&str>`:

An explicit conversion from a `&str` to a String is done as follows:

```rust
let string = "hello".to_string();
let other_string = String::from("hello");

assert_eq!(string, other_string);
```

While performing error handling it is often useful to implement `From` for your own error type.
By converting underlying error types to our own custom error type that encapsulates the
underlying error type, we can return a single error type without losing information on the
underlying cause. The '?' operator automatically converts the underlying error type to our
custom error type with `From::from`.

```rust
use std::fs;
use std::io;
use std::num;

enum CliError {
    IoError(io::Error),
    ParseError(num::ParseIntError),
}

impl From<io::Error> for CliError {
    fn from(error: io::Error) -> Self {
        CliError::IoError(error)
    }
}

impl From<num::ParseIntError> for CliError {
    fn from(error: num::ParseIntError) -> Self {
        CliError::ParseError(error)
    }
}

fn open_and_parse_file(file_name: &str) -> Result<i32, CliError> {
    let mut contents = fs::read_to_string(&file_name)?;
    let num: i32 = contents.trim().parse()?;
    Ok(num)
}
```

## trait TryInto

```rust
pub const trait TryInto<T>: Sized
```

An attempted conversion that consumes `self`, which may or may not be
expensive.

Library authors should usually not directly implement this trait,
but should prefer implementing the `TryFrom` trait, which offers
greater flexibility and provides an equivalent `TryInto`
implementation for free, thanks to a blanket implementation in the
standard library. For more information on this, see the
documentation for `Into`.

Prefer using `TryInto` over `TryFrom` when specifying trait bounds on a generic function
to ensure that types that only implement `TryInto` can be used as well.

# Implementing `TryInto`

This suffers the same restrictions and reasoning as implementing
`Into`, see there for details.

## trait TryFrom

```rust
pub const trait TryFrom<T>: Sized
```

Simple and safe type conversions that may fail in a controlled
way under some circumstances. It is the reciprocal of `TryInto`.

This is useful when you are doing a type conversion that may
trivially succeed but may also need special handling.
For example, there is no way to convert an `i64` into an `i32`
using the `From` trait, because an `i64` may contain a value
that an `i32` cannot represent and so the conversion would lose data.
This might be handled by truncating the `i64` to an `i32` or by
simply returning `i32::MAX`, or by some other method.  The `From`
trait is intended for perfect conversions, so the `TryFrom` trait
informs the programmer when a type conversion could go bad and lets
them decide how to handle it.

# Generic Implementations

- `TryFrom<T> for U` implies `TryInto`` for T`
- `try_from` is reflexive, which means that `TryFrom<T> for T`
is implemented and cannot fail -- the associated `Error` type for
calling `T::try_from()` on a value of type `T` is `Infallible`.
When the `!` type is stabilized `Infallible` and `!` will be
equivalent.

Prefer using `TryInto` over `TryFrom` when specifying trait bounds on a generic function
to ensure that types that only implement `TryInto` can be used as well.

`TryFrom<T>` can be implemented as follows:

```rust
struct GreaterThanZero(i32);

impl TryFrom<i32> for GreaterThanZero {
    type Error = &'static str;

    fn try_from(value: i32) -> Result<Self, Self::Error> {
        if value <= 0 {
            Err("GreaterThanZero only accepts values greater than zero!")
        } else {
            Ok(GreaterThanZero(value))
        }
    }
}
```

# Examples

As described, `i32` implements `TryFrom<``i64``>`:

```rust
let big_number = 1_000_000_000_000i64;
// Silently truncates `big_number`, requires detecting
// and handling the truncation after the fact.
let smaller_number = big_number as i32;
assert_eq!(smaller_number, -727379968);

// Returns an error because `big_number` is too big to
// fit in an `i32`.
let try_smaller_number = i32::try_from(big_number);
assert!(try_smaller_number.is_err());

// Returns `Ok(3)`.
let try_successful_smaller_number = i32::try_from(3);
assert!(try_successful_smaller_number.is_ok());
```

## type Infallible

```rust
pub type Infallible = !
```

The error type for errors that can never happen.

Since this is an alias to the never type, a value of this type can never actually exist.
This can be useful for generic APIs that use `Result` and parameterize the error type,
to indicate that the result is always `Ok`.

For example, the `TryFrom` trait (conversion that returns a `Result`)
has a blanket implementation for all types where a reverse `Into` implementation exists.

```
impl<T, U> TryFrom<U> for T where U: Into<T> {
    type Error = Infallible;

    fn try_from(value: U) -> Result<Self, Infallible> {
        Ok(U::into(value))  // Never returns `Err`
    }
}
```rust

Note: Since `!` (the "never" type) was stabilized in Rust 1.100.0, it is
preferred to use `!` directly unless targeting older Rust versions. `Infallible` may be
deprecated in a future Rust version.
