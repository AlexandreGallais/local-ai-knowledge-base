# core::convert

Traits for conversions between types.

The traits in this module provide a way to convert from one type to another type.
Each trait serves a different purpose:

- Implement the [`AsRef`] trait for cheap reference-to-reference conversions
- Implement the [`AsMut`] trait for cheap mutable-to-mutable conversions
- Implement the [`From`] trait for consuming value-to-value conversions that cannot fail. This
  automatically provides an implementation of [`Into`]
- Implement the [`TryFrom`] trait for consuming value-to-value conversions that can fail. This
  automatically provides an implementation of [`TryInto`]

The traits in this module are often used as trait bounds for generic functions such that
arguments of multiple types are supported. See the documentation of each trait for examples.

As a library author, you should always prefer implementing [`From<T>`][`From`] or
[`TryFrom<T>`][`TryFrom`] rather than [`Into<U>`][`Into`] or [`TryInto<U>`][`TryInto`],
as [`From`] and [`TryFrom`] provide greater flexibility and offer
equivalent [`Into`] or [`TryInto`] implementations for free, thanks to a
blanket implementation in the standard library. In versions of Rust prior to Rust 1.41,
it was sometimes necessary to implement [`Into`] or [`TryInto`] directly when converting to a
type outside the current crate.

# Generic Implementations

- [`AsRef`] and [`AsMut`] auto-dereference if the inner type is a reference
  (but not generally for all [dereferenceable types][core::ops::Deref])
- [`From`]`<U> for T` implies [`Into`]`<T> for U`
- [`TryFrom`]`<U> for T` implies [`TryInto`]`<T> for U`
- [`From`] and [`Into`] are reflexive, which means that all types can
  `into` themselves and `from` themselves

See each trait for usage examples.

## fn identity

```rust
pub const fn identity<T>(x: T) -> T
```

The identity function.

Two things are important to note about this function:

- It is not always equivalent to a closure like `|x| x`, since the
  closure may coerce `x` into a different type.

- It moves the input `x` passed to the function.

While it might seem strange to have a function that just returns back the
input, there are some interesting uses.

# Examples

Using `identity` to do nothing in a sequence of other, interesting,
functions:

```rust
use std::convert::identity;

fn manipulation(x: u32) -> u32 {
    // Let's pretend that adding one is an interesting function.
    x + 1
}

let _arr = &[identity, manipulation];
```

Using `identity` as a "do nothing" base case in a conditional:

```rust
use std::convert::identity;

# let condition = true;
#
# fn manipulation(x: u32) -> u32 { x + 1 }
#
let do_stuff = if condition { manipulation } else { identity };

// Do more interesting stuff...

let _results = do_stuff(42);
```

Using `identity` to keep the `Some` variants of an iterator of `Option<T>`:

```rust
use std::convert::identity;

let iter = [Some(1), None, Some(3)].into_iter();
let filtered = iter.filter_map(identity).collect::<Vec<_>>();
assert_eq!(vec![1, 3], filtered);
```

## trait AsRef

```rust
pub const trait AsRef<T: PointeeSized>: PointeeSized
```

Used to do a cheap reference-to-reference conversion.

This trait is similar to [`AsMut`] which is used for converting between mutable references.
If you need to do a costly conversion it is better to implement [`From`] with type
`&T` or write a custom function.

# Relation to `Borrow`

`AsRef` has the same signature as [`Borrow`], but [`Borrow`] is different in a few aspects:

- Unlike `AsRef`, [`Borrow`] has a blanket impl for any `T`, and can be used to accept either
  a reference or a value. (See also note on `AsRef`'s reflexibility below.)
- [`Borrow`] also requires that [`Hash`], [`Eq`] and [`Ord`] for a borrowed value are
  equivalent to those of the owned value. For this reason, if you want to
  borrow only a single field of a struct you can implement `AsRef`, but not [`Borrow`].

**Note: This trait must not fail**. If the conversion can fail, use a
dedicated method which returns an [`Option<T>`] or a [`Result<T, E>`].

# Generic Implementations

`AsRef` auto-dereferences if the inner type is a reference or a mutable reference
(e.g.: `foo.as_ref()` will work the same if `foo` has type `&mut Foo` or `&&mut Foo`).

Note that due to historic reasons, the above currently does not hold generally for all
[dereferenceable types], e.g. `foo.as_ref()` will *not* work the same as
`Box::new(foo).as_ref()`. Instead, many smart pointers provide an `as_ref` implementation which
simply returns a reference to the [pointed-to value] (but do not perform a cheap
reference-to-reference conversion for that value). However, [`AsRef::as_ref`] should not be
used for the sole purpose of dereferencing; instead ['`Deref` coercion'] can be used:

[dereferenceable types]: core::ops::Deref
[pointed-to value]: core::ops::Deref::Target
['`Deref` coercion']: core::ops::Deref#deref-coercion

```
let x = Box::new(5i32);
// Avoid this:
// let y: &i32 = x.as_ref();
// Better just write:
let y: &i32 = &x;
```

Types which implement [`Deref`] should consider implementing `AsRef<T>` as follows:

[`Deref`]: core::ops::Deref

```
# use core::ops::Deref;
# struct SomeType;
# impl Deref for SomeType {
#     type Target = [u8];
#     fn deref(&self) -> &[u8] {
#         &[]
#     }
# }
impl<T> AsRef<T> for SomeType
where
    T: ?Sized,
    <SomeType as Deref>::Target: AsRef<T>,
{
    fn as_ref(&self) -> &T {
        self.deref().as_ref()
    }
}
```

# Reflexivity

Ideally, `AsRef` would be reflexive, i.e. there would be an `impl<T: ?Sized> AsRef<T> for T`
with [`as_ref`] simply returning its argument unchanged.
Such a blanket implementation is currently *not* provided due to technical restrictions of
Rust's type system (it would be overlapping with another existing blanket implementation for
`&T where T: AsRef<U>` which allows `AsRef` to auto-dereference, see "Generic Implementations"
above).

[`as_ref`]: AsRef::as_ref

A trivial implementation of `AsRef<T> for T` must be added explicitly for a particular type `T`
where needed or desired. Note, however, that not all types from `std` contain such an
implementation, and those cannot be added by external code due to orphan rules.

# Examples

By using trait bounds we can accept arguments of different types as long as they can be
converted to the specified type `T`.

For example: By creating a generic function that takes an `AsRef<str>` we express that we
want to accept all references that can be converted to [`&str`] as an argument.
Since both [`String`] and [`&str`] implement `AsRef<str>` we can accept both as input argument.

[`&str`]: primitive@str
[`Borrow`]: crate::borrow::Borrow
[`Eq`]: crate::cmp::Eq
[`Ord`]: crate::cmp::Ord
[`String`]: ../../std/string/struct.String.html

```
fn is_hello<T: AsRef<str>>(s: T) {
   assert_eq!("hello", s.as_ref());
}

let s = "hello";
is_hello(s);

let s = "hello".to_string();
is_hello(s);
```

## trait AsMut

```rust
pub const trait AsMut<T: PointeeSized>: PointeeSized
```

Used to do a cheap mutable-to-mutable reference conversion.

This trait is similar to [`AsRef`] but used for converting between mutable
references. If you need to do a costly conversion it is better to
implement [`From`] with type `&mut T` or write a custom function.

**Note: This trait must not fail**. If the conversion can fail, use a
dedicated method which returns an [`Option<T>`] or a [`Result<T, E>`].

# Generic Implementations

`AsMut` auto-dereferences if the inner type is a mutable reference
(e.g.: `foo.as_mut()` will work the same if `foo` has type `&mut Foo` or `&mut &mut Foo`).

Note that due to historic reasons, the above currently does not hold generally for all
[mutably dereferenceable types], e.g. `foo.as_mut()` will *not* work the same as
`Box::new(foo).as_mut()`. Instead, many smart pointers provide an `as_mut` implementation which
simply returns a reference to the [pointed-to value] (but do not perform a cheap
reference-to-reference conversion for that value). However, [`AsMut::as_mut`] should not be
used for the sole purpose of mutable dereferencing; instead ['`Deref` coercion'] can be used:

[mutably dereferenceable types]: core::ops::DerefMut
[pointed-to value]: core::ops::Deref::Target
['`Deref` coercion']: core::ops::DerefMut#mutable-deref-coercion

```
let mut x = Box::new(5i32);
// Avoid this:
// let y: &mut i32 = x.as_mut();
// Better just write:
let y: &mut i32 = &mut x;
```

Types which implement [`DerefMut`] should consider to add an implementation of `AsMut<T>` as
follows:

[`DerefMut`]: core::ops::DerefMut

```
# use core::ops::{Deref, DerefMut};
# struct SomeType;
# impl Deref for SomeType {
#     type Target = [u8];
#     fn deref(&self) -> &[u8] {
#         &[]
#     }
# }
# impl DerefMut for SomeType {
#     fn deref_mut(&mut self) -> &mut [u8] {
#         &mut []
#     }
# }
impl<T> AsMut<T> for SomeType
where
    <SomeType as Deref>::Target: AsMut<T>,
{
    fn as_mut(&mut self) -> &mut T {
        self.deref_mut().as_mut()
    }
}
```

# Reflexivity

Ideally, `AsMut` would be reflexive, i.e. there would be an `impl<T: ?Sized> AsMut<T> for T`
with [`as_mut`] simply returning its argument unchanged.
Such a blanket implementation is currently *not* provided due to technical restrictions of
Rust's type system (it would be overlapping with another existing blanket implementation for
`&mut T where T: AsMut<U>` which allows `AsMut` to auto-dereference, see "Generic
Implementations" above).

[`as_mut`]: AsMut::as_mut

A trivial implementation of `AsMut<T> for T` must be added explicitly for a particular type `T`
where needed or desired. Note, however, that not all types from `std` contain such an
implementation, and those cannot be added by external code due to orphan rules.

# Examples

Using `AsMut` as trait bound for a generic function, we can accept all mutable references that
can be converted to type `&mut T`. Unlike [dereference], which has a single [target type],
there can be multiple implementations of `AsMut` for a type. In particular, `Vec<T>` implements
both `AsMut<Vec<T>>` and `AsMut<[T]>`.

In the following, the example functions `caesar` and `null_terminate` provide a generic
interface which works with any type that can be converted by cheap mutable-to-mutable conversion
into a byte slice (`[u8]`) or a byte vector (`Vec<u8>`), respectively.

[dereference]: core::ops::DerefMut
[target type]: core::ops::Deref::Target

```
struct Document {
    info: String,
    content: Vec<u8>,
}

impl<T: ?Sized> AsMut<T> for Document
where
    Vec<u8>: AsMut<T>,
{
    fn as_mut(&mut self) -> &mut T {
        self.content.as_mut()
    }
}

fn caesar<T: AsMut<[u8]>>(data: &mut T, key: u8) {
    for byte in data.as_mut() {
        *byte = byte.wrapping_add(key);
    }
}

fn null_terminate<T: AsMut<Vec<u8>>>(data: &mut T) {
    // Using a non-generic inner function, which contains most of the
    // functionality, helps to minimize monomorphization overhead.
    fn doit(data: &mut Vec<u8>) {
        let len = data.len();
        if len == 0 || data[len-1] != 0 {
            data.push(0);
        }
    }
    doit(data.as_mut());
}

fn main() {
    let mut v: Vec<u8> = vec![1, 2, 3];
    caesar(&mut v, 5);
    assert_eq!(v, [6, 7, 8]);
    null_terminate(&mut v);
    assert_eq!(v, [6, 7, 8, 0]);
    let mut doc = Document {
        info: String::from("Example"),
        content: vec![17, 19, 8],
    };
    caesar(&mut doc, 1);
    assert_eq!(doc.content, [18, 20, 9]);
    null_terminate(&mut doc);
    assert_eq!(doc.content, [18, 20, 9, 0]);
}
```

Note, however, that APIs don't need to be generic. In many cases taking a `&mut [u8]` or
`&mut Vec<u8>`, for example, is the better choice (callers need to pass the correct type then).

## trait Into

```rust
pub const trait Into<T>: Sized
```

A value-to-value conversion that consumes the input value. The
opposite of [`From`].

One should avoid implementing [`Into`] and implement [`From`] instead.
Implementing [`From`] automatically provides one with an implementation of [`Into`]
thanks to the blanket implementation in the standard library.

Prefer using [`Into`] over [`From`] when specifying trait bounds on a generic function
to ensure that types that only implement [`Into`] can be used as well.

**Note: This trait must not fail**. If the conversion can fail, use [`TryInto`].

# Generic Implementations

- [`From`]`<T> for U` implies `Into<U> for T`
- [`Into`] is reflexive, which means that `Into<T> for T` is implemented

# Implementing [`Into`] for conversions to external types in old versions of Rust

Prior to Rust 1.41, if the destination type was not part of the current crate
then you couldn't implement [`From`] directly.
For example, take this code:

```
# #![allow(non_local_definitions)]
struct Wrapper<T>(Vec<T>);
impl<T> From<Wrapper<T>> for Vec<T> {
    fn from(w: Wrapper<T>) -> Vec<T> {
        w.0
    }
}
```
This will fail to compile in older versions of the language because Rust's orphaning rules
used to be a little bit more strict. To bypass this, you could implement [`Into`] directly:

```
struct Wrapper<T>(Vec<T>);
impl<T> Into<Vec<T>> for Wrapper<T> {
    fn into(self) -> Vec<T> {
        self.0
    }
}
```

It is important to understand that [`Into`] does not provide a [`From`] implementation
(as [`From`] does with [`Into`]). Therefore, you should always try to implement [`From`]
and then fall back to [`Into`] if [`From`] can't be implemented.

# Examples

[`String`] implements [`Into`]`<`[`Vec`]`<`[`u8`]`>>`:

In order to express that we want a generic function to take all arguments that can be
converted to a specified type `T`, we can use a trait bound of [`Into`]`<T>`.
For example: The function `is_hello` takes all arguments that can be converted into a
[`Vec`]`<`[`u8`]`>`.

```
fn is_hello<T: Into<Vec<u8>>>(s: T) {
   let bytes = b"hello".to_vec();
   assert_eq!(bytes, s.into());
}

let s = "hello".to_string();
is_hello(s);
```

[`String`]: ../../std/string/struct.String.html
[`Vec`]: ../../std/vec/struct.Vec.html

## trait From

```rust
pub const trait From<T>: Sized
```

Used to do value-to-value conversions while consuming the input value. It is the reciprocal of
[`Into`].

One should always prefer implementing `From` over [`Into`]
because implementing `From` automatically provides one with an implementation of [`Into`]
thanks to the blanket implementation in the standard library.

Only implement [`Into`] when targeting a version prior to Rust 1.41 and converting to a type
outside the current crate.
`From` was not able to do these types of conversions in earlier versions because of Rust's
orphaning rules.
See [`Into`] for more details.

Prefer using [`Into`] over [`From`] when specifying trait bounds on a generic function
to ensure that types that only implement [`Into`] can be used as well.

The `From` trait is also very useful when performing error handling. When constructing a function
that is capable of failing, the return type will generally be of the form `Result<T, E>`.
`From` simplifies error handling by allowing a function to return a single error type
that encapsulates multiple error types. See the "Examples" section and [the book][book] for more
details.

**Note: This trait must not fail**. The `From` trait is intended for perfect conversions.
If the conversion can fail or is not perfect, use [`TryFrom`].

# Generic Implementations

- `From<T> for U` implies [`Into`]`<U> for T`
- `From` is reflexive, which means that `From<T> for T` is implemented

# When to implement `From`

While there's no technical restrictions on which conversions can be done using
a `From` implementation, the general expectation is that the conversions
should typically be restricted as follows:

* The conversion is *infallible*: if the conversion can fail, use [`TryFrom`]
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
  by the [`Display`](crate::fmt::Display) trait.)

* The conversion is *obvious*: it's the only reasonable conversion between
  the two types.  Otherwise it's better to have it be a named method or
  constructor, like how [`str::as_bytes`] is a method and how integers have
  methods like [`u32::from_ne_bytes`], [`u32::from_le_bytes`], and
  [`u32::from_be_bytes`], none of which are `From` implementations.  Whereas
  there's only one reasonable way to wrap an [`Ipv6Addr`](crate::net::Ipv6Addr)
  into an [`IpAddr`](crate::net::IpAddr), thus `IpAddr: From<Ipv6Addr>` exists.

# Examples

[`String`] implements `From<&str>`:

An explicit conversion from a `&str` to a String is done as follows:

```
let string = "hello".to_string();
let other_string = String::from("hello");

assert_eq!(string, other_string);
```

While performing error handling it is often useful to implement `From` for your own error type.
By converting underlying error types to our own custom error type that encapsulates the
underlying error type, we can return a single error type without losing information on the
underlying cause. The '?' operator automatically converts the underlying error type to our
custom error type with `From::from`.

```
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

[`String`]: ../../std/string/struct.String.html
[`from`]: From::from
[book]: ../../book/ch09-00-error-handling.html

## trait TryInto

```rust
pub const trait TryInto<T>: Sized
```

An attempted conversion that consumes `self`, which may or may not be
expensive.

Library authors should usually not directly implement this trait,
but should prefer implementing the [`TryFrom`] trait, which offers
greater flexibility and provides an equivalent `TryInto`
implementation for free, thanks to a blanket implementation in the
standard library. For more information on this, see the
documentation for [`Into`].

Prefer using [`TryInto`] over [`TryFrom`] when specifying trait bounds on a generic function
to ensure that types that only implement [`TryInto`] can be used as well.

# Implementing `TryInto`

This suffers the same restrictions and reasoning as implementing
[`Into`], see there for details.

## trait TryFrom

```rust
pub const trait TryFrom<T>: Sized
```

Simple and safe type conversions that may fail in a controlled
way under some circumstances. It is the reciprocal of [`TryInto`].

This is useful when you are doing a type conversion that may
trivially succeed but may also need special handling.
For example, there is no way to convert an [`i64`] into an [`i32`]
using the [`From`] trait, because an [`i64`] may contain a value
that an [`i32`] cannot represent and so the conversion would lose data.
This might be handled by truncating the [`i64`] to an [`i32`] or by
simply returning [`i32::MAX`], or by some other method.  The [`From`]
trait is intended for perfect conversions, so the `TryFrom` trait
informs the programmer when a type conversion could go bad and lets
them decide how to handle it.

# Generic Implementations

- `TryFrom<T> for U` implies [`TryInto`]`<U> for T`
- [`try_from`] is reflexive, which means that `TryFrom<T> for T`
is implemented and cannot fail -- the associated `Error` type for
calling `T::try_from()` on a value of type `T` is [`Infallible`].
When the [`!`] type is stabilized [`Infallible`] and [`!`] will be
equivalent.

Prefer using [`TryInto`] over [`TryFrom`] when specifying trait bounds on a generic function
to ensure that types that only implement [`TryInto`] can be used as well.

`TryFrom<T>` can be implemented as follows:

```
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

As described, [`i32`] implements `TryFrom<`[`i64`]`>`:

```
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

[`try_from`]: TryFrom::try_from

## type Infallible

```rust
pub type Infallible = !
```

The error type for errors that can never happen.

Since this is an alias to the never type, a value of this type can never actually exist.
This can be useful for generic APIs that use [`Result`] and parameterize the error type,
to indicate that the result is always [`Ok`].

For example, the [`TryFrom`] trait (conversion that returns a [`Result`])
has a blanket implementation for all types where a reverse [`Into`] implementation exists.

```ignore (illustrates std code, duplicating the impl in a doctest would be an error)
impl<T, U> TryFrom<U> for T where U: Into<T> {
    type Error = Infallible;

    fn try_from(value: U) -> Result<Self, Infallible> {
        Ok(U::into(value))  // Never returns `Err`
    }
}
```

Note: Since [`!`] (the "never" type) was stabilized in Rust 1.100.0, it is
preferred to use `!` directly unless targeting older Rust versions. `Infallible` may be
deprecated in a future Rust version.