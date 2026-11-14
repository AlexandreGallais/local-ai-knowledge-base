---
title: "core::convert (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/convert/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::convert

Traits for conversions between types.

The traits in this module provide a way to convert from one type to another type.
Each trait serves a different purpose:

- Implement the `AsRef` trait for cheap reference-to-reference conversions
- Implement the `AsMut` trait for cheap mutable-to-mutable conversions
- Implement the `From` trait for consuming value-to-value conversions that cannot fail. This
  automatically provides an implementation of `Into`
- Implement the `TryFrom` trait for consuming value-to-value conversions that can fail. This
  automatically provides an implementation of `TryInto`

The traits in this module are often used as trait bounds for generic functions such that
arguments of multiple types are supported. See the documentation of each trait for examples.

As a library author, you should always prefer implementing `From<T>``From` or
`TryFrom<T>``TryFrom` rather than `Into``Into` or `TryInto``TryInto`,
as `From` and `TryFrom` provide greater flexibility and offer
equivalent `Into` or `TryInto` implementations for free, thanks to a
blanket implementation in the standard library. In versions of Rust prior to Rust 1.41,
it was sometimes necessary to implement `Into` or `TryInto` directly when converting to a
type outside the current crate.

#### Generic Implementations

- `AsRef` and `AsMut` auto-dereference if the inner type is a reference
  (but not generally for all dereferenceable types)
- `From`` for T` implies `Into``<T> for U`
- `TryFrom`` for T` implies `TryInto``<T> for U`
- `From` and `Into` are reflexive, which means that all types can
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

This trait is similar to `AsMut` which is used for converting between mutable references.
If you need to do a costly conversion it is better to implement `From` with type
`&T` or write a custom function.

# Relation to `Borrow`

`AsRef` has the same signature as `Borrow`, but `Borrow` is different in a few aspects:

- Unlike `AsRef`, `Borrow` has a blanket impl for any `T`, and can be used to accept either
  a reference or a value. (See also note on `AsRef`'s reflexibility below.)
- `Borrow` also requires that `Hash`, `Eq` and `Ord` for a borrowed value are
  equivalent to those of the owned value. For this reason, if you want to
  borrow only a single field of a struct you can implement `AsRef`, but not `Borrow`.

**Note: This trait must not fail**. If the conversion can fail, use a
dedicated method which returns an `Option<T>` or a `Result<T, E>`.

# Generic Implementations

`AsRef` auto-dereferences if the inner type is a reference or a mutable reference
(e.g.: `foo.as_ref()` will work the same if `foo` has type `&mut Foo` or `&&mut Foo`).

Note that due to historic reasons, the above currently does not hold generally for all
[dereferenceable types], e.g. `foo.as_ref()` will *not* work the same as
`Box::new(foo).as_ref()`. Instead, many smart pointers provide an `as_ref` implementation which
simply returns a reference to the [pointed-to value] (but do not perform a cheap
reference-to-reference conversion for that value). However, `AsRef::as_ref` should not be
used for the sole purpose of dereferencing; instead ['`Deref` coercion'] can be used:

```rust
let x = Box::new(5i32);
// Avoid this:
// let y: &i32 = x.as_ref();
// Better just write:
let y: &i32 = &x;
```

Types which implement `Deref` should consider implementing `AsRef<T>` as follows:

```rust
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
with `as_ref` simply returning its argument unchanged.
Such a blanket implementation is currently *not* provided due to technical restrictions of
Rust's type system (it would be overlapping with another existing blanket implementation for
`&T where T: AsRef` which allows `AsRef` to auto-dereference, see "Generic Implementations"
above).

A trivial implementation of `AsRef<T> for T` must be added explicitly for a particular type `T`
where needed or desired. Note, however, that not all types from `std` contain such an
implementation, and those cannot be added by external code due to orphan rules.

# Examples

By using trait bounds we can accept arguments of different types as long as they can be
converted to the specified type `T`.

For example: By creating a generic function that takes an `AsRef<str>` we express that we
want to accept all references that can be converted to `&str` as an argument.
Since both `String` and `&str` implement `AsRef<str>` we can accept both as input argument.

```rust
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

This trait is similar to `AsRef` but used for converting between mutable
references. If you need to do a costly conversion it is better to
implement `From` with type `&mut T` or write a custom function.

**Note: This trait must not fail**. If the conversion can fail, use a
dedicated method which returns an `Option<T>` or a `Result<T, E>`.

# Generic Implementations

`AsMut` auto-dereferences if the inner type is a mutable reference
(e.g.: `foo.as_mut()` will work the same if `foo` has type `&mut Foo` or `&mut &mut Foo`).

Note that due to historic reasons, the above currently does not hold generally for all
[mutably dereferenceable types], e.g. `foo.as_mut()` will *not* work the same as
`Box::new(foo).as_mut()`. Instead, many smart pointers provide an `as_mut` implementation which
simply returns a reference to the [pointed-to value] (but do not perform a cheap
reference-to-reference conversion for that value). However, `AsMut::as_mut` should not be
used for the sole purpose of mutable dereferencing; instead ['`Deref` coercion'] can be used:

```rust
let mut x = Box::new(5i32);
// Avoid this:
// let y: &mut i32 = x.as_mut();
// Better just write:
let y: &mut i32 = &mut x;
```

Types which implement `DerefMut` should consider to add an implementation of `AsMut<T>` as
follows:

```rust
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
with `as_mut` simply returning its argument unchanged.
Such a blanket implementation is currently *not* provided due to technical restrictions of
Rust's type system (it would be overlapping with another existing blanket implementation for
`&mut T where T: AsMut` which allows `AsMut` to auto-dereference, see "Generic
Implementations" above).

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

```rust
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
opposite of `From`.

One should avoid implementing `Into` and implement `From` instead.
Implementing `From` automatically provides one with an implementation of `Into`
thanks to the blanket implementation in the standard library.

Prefer using `Into` over `From` when specifying trait bounds on a generic function
to ensure that types that only implement `Into` can be used as well.

**Note: This trait must not fail**. If the conversion can fail, use `TryInto`.

# Generic Implementations

- `From``<T> for U` implies `Into for T`
- `Into` is reflexive, which means that `Into<T> for T` is implemented

# Implementing `Into` for conversions to external types in old versions of Rust

Prior to Rust 1.41, if the destination type was not part of the current crate
then you couldn't implement `From` directly.
For example, take this code:

```rust
struct Wrapper<T>(Vec<T>);
impl<T> From<Wrapper<T>> for Vec<T> {
    fn from(w: Wrapper<T>) -> Vec<T> {
        w.0
    }
}
```
This will fail to compile in older versions of the language because Rust's orphaning rules
used to be a little bit more strict. To bypass this, you could implement `Into` directly:

```rust
struct Wrapper<T>(Vec<T>);
impl<T> Into<Vec<T>> for Wrapper<T> {
    fn into(self) -> Vec<T> {
        self.0
    }
}
```

It is important to understand that `Into` does not provide a `From` implementation
(as `From` does with `Into`). Therefore, you should always try to implement `From`
and then fall back to `Into` if `From` can't be implemented.

# Examples

`String` implements `Into``<``Vec``<``u8``>>`:

In order to express that we want a generic function to take all arguments that can be
converted to a specified type `T`, we can use a trait bound of `Into``<T>`.
For example: The function `is_hello` takes all arguments that can be converted into a
`Vec``<``u8``>`.

```rust
fn is_hello<T: Into<Vec<u8>>>(s: T) {
   let bytes = b"hello".to_vec();
   assert_eq!(bytes, s.into());
}

let s = "hello".to_string();
is_hello(s);
```
