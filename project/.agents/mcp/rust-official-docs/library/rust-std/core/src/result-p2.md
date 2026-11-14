---
title: "core::result (part 2 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/result.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::result (part 2 of 3)

```rust
let v = [Ok(2), Ok(4), Err("err!"), Ok(8)];
let res: Result<Vec<_>, &str> = v.into_iter().collect();
assert_eq!(res, Err("err!"));
let v = [Ok(2), Ok(4), Ok(8)];
let res: Result<Vec<_>, &str> = v.into_iter().collect();
assert_eq!(res, Ok(vec![2, 4, 8]));
```

`Result` also implements the `Product`[impl-Product] and
`Sum`[impl-Sum] traits, allowing an iterator over `Result` values
to provide the `product`[Iterator::product] and
`sum`[Iterator::sum] methods.

```rust
let v = [Err("error!"), Ok(1), Ok(2), Ok(3), Err("foo")];
let res: Result<i32, &str> = v.into_iter().sum();
assert_eq!(res, Err("error!"));
let v = [Ok(1), Ok(2), Ok(21)];
let res: Result<i32, &str> = v.into_iter().product();
assert_eq!(res, Ok(42));
```

## enum Result

```rust
pub enum Result<T, E>
```

`Result` is a type that represents either success (`Ok`) or failure (`Err`).

See the module documentation for details.

## Result::is_ok

```rust
pub const fn is_ok(&self) -> bool
```

Returns `true` if the result is `Ok`.

# Examples

```rust
let x: Result<i32, &str> = Ok(-3);
assert_eq!(x.is_ok(), true);

let x: Result<i32, &str> = Err("Some error message");
assert_eq!(x.is_ok(), false);
```

## Result::is_ok_and

```rust
pub const fn is_ok_and<F>(self, f: F) -> bool where F: [const] FnOnce(T) -> bool + [const] Destruct, T: [const] Destruct, E: [const] Destruct,
```

Returns `true` if the result is `Ok` and the value inside of it matches a predicate.

# Examples

```rust
let x: Result<u32, &str> = Ok(2);
assert_eq!(x.is_ok_and(|x| x > 1), true);

let x: Result<u32, &str> = Ok(0);
assert_eq!(x.is_ok_and(|x| x > 1), false);

let x: Result<u32, &str> = Err("hey");
assert_eq!(x.is_ok_and(|x| x > 1), false);

let x: Result<String, &str> = Ok("ownership".to_string());
assert_eq!(x.as_ref().is_ok_and(|x| x.len() > 1), true);
println!("still alive {:?}", x);
```

## Result::is_err

```rust
pub const fn is_err(&self) -> bool
```

Returns `true` if the result is `Err`.

# Examples

```rust
let x: Result<i32, &str> = Ok(-3);
assert_eq!(x.is_err(), false);

let x: Result<i32, &str> = Err("Some error message");
assert_eq!(x.is_err(), true);
```

## Result::is_err_and

```rust
pub const fn is_err_and<F>(self, f: F) -> bool where F: [const] FnOnce(E) -> bool + [const] Destruct, E: [const] Destruct, T: [const] Destruct,
```

Returns `true` if the result is `Err` and the value inside of it matches a predicate.

# Examples

```rust
use std::io::{Error, ErrorKind};

let x: Result<u32, Error> = Err(Error::new(ErrorKind::NotFound, "!"));
assert_eq!(x.is_err_and(|x| x.kind() == ErrorKind::NotFound), true);

let x: Result<u32, Error> = Err(Error::new(ErrorKind::PermissionDenied, "!"));
assert_eq!(x.is_err_and(|x| x.kind() == ErrorKind::NotFound), false);

let x: Result<u32, Error> = Ok(123);
assert_eq!(x.is_err_and(|x| x.kind() == ErrorKind::NotFound), false);

let x: Result<u32, String> = Err("ownership".to_string());
assert_eq!(x.as_ref().is_err_and(|x| x.len() > 1), true);
println!("still alive {:?}", x);
```

## Result::ok

```rust
pub const fn ok(self) -> Option<T> where T: [const] Destruct, E: [const] Destruct,
```

Converts from `Result<T, E>` to `Option<T>`.

Converts `self` into an `Option<T>`, consuming `self`,
and converting the error to `None`, if any.

# Examples

```rust
let x: Result<u32, &str> = Ok(2);
assert_eq!(x.ok(), Some(2));

let x: Result<u32, &str> = Err("Nothing here");
assert_eq!(x.ok(), None);
```

## Result::err

```rust
pub const fn err(self) -> Option<E> where T: [const] Destruct, E: [const] Destruct,
```

Converts from `Result<T, E>` to `Option<E>`.

Converts `self` into an `Option<E>`, consuming `self`,
and discarding the success value, if any.

# Examples

```rust
let x: Result<u32, &str> = Ok(2);
assert_eq!(x.err(), None);

let x: Result<u32, &str> = Err("Nothing here");
assert_eq!(x.err(), Some("Nothing here"));
```

## Result::as_ref

```rust
pub const fn as_ref(&self) -> Result<&T, &E>
```

Converts from `&Result<T, E>` to `Result<&T, &E>`.

Produces a new `Result`, containing a reference
into the original, leaving the original in place.

# Examples

```rust
let x: Result<u32, &str> = Ok(2);
assert_eq!(x.as_ref(), Ok(&2));

let x: Result<u32, &str> = Err("Error");
assert_eq!(x.as_ref(), Err(&"Error"));
```

## Result::as_mut

```rust
pub const fn as_mut(&mut self) -> Result<&mut T, &mut E>
```

Converts from `&mut Result<T, E>` to `Result<&mut T, &mut E>`.

# Examples

```rust
fn mutate(r: &mut Result<i32, i32>) {
    match r.as_mut() {
        Ok(v) => *v = 42,
        Err(e) => *e = 0,
    }
}

let mut x: Result<i32, i32> = Ok(2);
mutate(&mut x);
assert_eq!(x.unwrap(), 42);

let mut x: Result<i32, i32> = Err(13);
mutate(&mut x);
assert_eq!(x.unwrap_err(), 0);
```

## Result::map

```rust
pub const fn map<U, F>(self, op: F) -> Result<U, E> where F: [const] FnOnce(T) -> U + [const] Destruct,
```

Maps a `Result<T, E>` to `Result` by applying a function to a
contained `Ok` value, leaving an `Err` value untouched.

This function can be used to compose the results of two functions.

# Examples

Print the numbers on each line of a string multiplied by two.

```rust
let line = "1\n2\n3\n4\n";

for num in line.lines() {
    match num.parse::<i32>().map(|i| i * 2) {
        Ok(n) => println!("{n}"),
        Err(..) => {}
    }
}
```

## Result::map_or

```rust
pub const fn map_or<U, F>(self, default: U, f: F) -> U where F: [const] FnOnce(T) -> U + [const] Destruct, T: [const] Destruct, E: [const] Destruct, U: [const] Destruct,
```

Returns the provided default (if `Err`), or
applies a function to the contained value (if `Ok`).

Arguments passed to `map_or` are eagerly evaluated; if you are passing
the result of a function call, it is recommended to use `map_or_else`,
which is lazily evaluated.

# Examples

```rust
let x: Result<_, &str> = Ok("foo");
assert_eq!(x.map_or(42, |v| v.len()), 3);

let x: Result<&str, _> = Err("bar");
assert_eq!(x.map_or(42, |v| v.len()), 42);
```

## Result::map_or_else

```rust
pub const fn map_or_else<U, D, F>(self, default: D, f: F) -> U where D: [const] FnOnce(E) -> U + [const] Destruct, F: [const] FnOnce(T) -> U + [const] Destruct,
```

Maps a `Result<T, E>` to `U` by applying fallback function `default` to
a contained `Err` value, or function `f` to a contained `Ok` value.

This function can be used to unpack a successful result
while handling an error.

# Examples

```rust
let k = 21;

let x : Result<_, &str> = Ok("foo");
assert_eq!(x.map_or_else(|e| k * 2, |v| v.len()), 3);

let x : Result<&str, _> = Err("bar");
assert_eq!(x.map_or_else(|e| k * 2, |v| v.len()), 42);
```

## Result::map_or_default

```rust
pub const fn map_or_default<U, F>(self, f: F) -> U where F: [const] FnOnce(T) -> U + [const] Destruct, U: [const] Default, T: [const] Destruct, E: [const] Destruct,
```

Maps a `Result<T, E>` to a `U` by applying function `f` to the contained
value if the result is `Ok`, otherwise if `Err`, returns the
[default value] for the type `U`.

# Examples

```rust
let x: Result<_, &str> = Ok("foo");
let y: Result<&str, _> = Err("bar");

assert_eq!(x.map_or_default(|x| x.len()), 3);
assert_eq!(y.map_or_default(|y| y.len()), 0);
```

## Result::map_err

```rust
pub const fn map_err<F, O>(self, op: O) -> Result<T, F> where O: [const] FnOnce(E) -> F + [const] Destruct,
```

Maps a `Result<T, E>` to `Result<T, F>` by applying a function to a
contained `Err` value, leaving an `Ok` value untouched.

This function can be used to pass <example-value> a successful result while handling
an error.

# Examples

```rust
fn stringify(x: u32) -> String { format!("error code: {x}") }

let x: Result<u32, u32> = Ok(2);
assert_eq!(x.map_err(stringify), Ok(2));

let x: Result<u32, u32> = Err(13);
assert_eq!(x.map_err(stringify), Err("error code: 13".to_string()));
```

## Result::inspect

```rust
pub const fn inspect<F>(self, f: F) -> Self where F: [const] FnOnce(&T) + [const] Destruct,
```

Calls a function with a reference to the contained value if `Ok`.

Returns the original result.

# Examples

```rust
let x: u8 = "4"
    .parse::<u8>()
    .inspect(|x| println!("original: {x}"))
    .map(|x| x.pow(3))
    .expect("literal `4` should parse as a `u8`");
```

## Result::inspect_err

```rust
pub const fn inspect_err<F>(self, f: F) -> Self where F: [const] FnOnce(&E) + [const] Destruct,
```

Calls a function with a reference to the contained value if `Err`.

Returns the original result.

# Examples

```rust
use std::{fs, io};

fn read() -> io::Result<String> {
    fs::read_to_string("address.txt")
        .inspect_err(|e| eprintln!("failed to read file: {e}"))
}
```

## Result::as_deref

```rust
pub const fn as_deref(&self) -> Result<&T::Target, &E> where T: [const] Deref,
```

Converts from `Result<T, E>` (or `&Result<T, E>`) to `Result<&<T as Deref>::Target, &E>`.

Coerces the `Ok` variant of the original `Result` via `Deref`
and returns the new `Result`.

# Examples

```rust
let x: Result<String, u32> = Ok("hello".to_string());
let y: Result<&str, &u32> = Ok("hello");
assert_eq!(x.as_deref(), y);

let x: Result<String, u32> = Err(42);
let y: Result<&str, &u32> = Err(&42);
assert_eq!(x.as_deref(), y);
```

## Result::as_deref_mut

```rust
pub const fn as_deref_mut(&mut self) -> Result<&mut T::Target, &mut E> where T: [const] DerefMut,
```

Converts from `Result<T, E>` (or `&mut Result<T, E>`) to `Result<&mut <T as DerefMut>::Target, &mut E>`.

Coerces the `Ok` variant of the original `Result` via `DerefMut`
and returns the new `Result`.

# Examples

```rust
let mut s = "HELLO".to_string();
let mut x: Result<String, u32> = Ok("hello".to_string());
let y: Result<&mut str, &mut u32> = Ok(&mut s);
assert_eq!(x.as_deref_mut().map(|x| { x.make_ascii_uppercase(); x }), y);

let mut i = 42;
let mut x: Result<String, u32> = Err(42);
let y: Result<&mut str, &mut u32> = Err(&mut i);
assert_eq!(x.as_deref_mut().map(|x| { x.make_ascii_uppercase(); x }), y);
```

## Result::iter

```rust
pub const fn iter(&self) -> Iter<'_, T>
```

Returns an iterator over the possibly contained value.

The iterator yields one value if the result is `Result::Ok`, otherwise none.

# Examples

```rust
let x: Result<u32, &str> = Ok(7);
assert_eq!(x.iter().next(), Some(&7));

let x: Result<u32, &str> = Err("nothing!");
assert_eq!(x.iter().next(), None);
```

## Result::iter_mut

```rust
pub const fn iter_mut(&mut self) -> IterMut<'_, T>
```

Returns a mutable iterator over the possibly contained value.

The iterator yields one value if the result is `Result::Ok`, otherwise none.

# Examples

```rust
let mut x: Result<u32, &str> = Ok(7);
match x.iter_mut().next() {
    Some(v) => *v = 40,
    None => {},
}
assert_eq!(x, Ok(40));

let mut x: Result<u32, &str> = Err("nothing!");
assert_eq!(x.iter_mut().next(), None);
```

## Result::expect

```rust
pub fn expect(self, msg: &str) -> T where E: fmt::Debug,
```

Returns the contained `Ok` value, consuming the `self` value.

Because this function may panic, its use is generally discouraged.
Instead, prefer to use pattern matching and handle the `Err`
case explicitly, or call `unwrap_or`, `unwrap_or_else`, or
`unwrap_or_default`.

# Panics

Panics if the value is an `Err`, with a panic message including the
passed message, and the content of the `Err`.

# Examples

```rust
let x: Result<u32, &str> = Err("emergency failure");
x.expect("Testing expect"); // panics with `Testing expect: emergency failure`
```

# Recommended Message Style

We recommend that `expect` messages are used to describe the reason you
_expect_ the `Result` should be `Ok`.

```rust
let path = std::env::var("IMPORTANT_PATH")
    .expect("env variable `IMPORTANT_PATH` should be set by `wrapper_script.sh`");
```

**Hint**: If you're having trouble remembering how to phrase expect
error messages remember to focus on the word "should" as in "env
variable should be set by blah" or "the given binary should be available
and executable by the current user".

For more detail on expect message styles and the reasoning behind our recommendation please
refer to the section on "Common Message
Styles" in the
`std::error` module docs.

## Result::unwrap

```rust
pub fn unwrap(self) -> T where E: fmt::Debug,
```

Returns the contained `Ok` value, consuming the `self` value.

Because this function may panic, its use is generally discouraged.
Panics are meant for unrecoverable errors, and
may abort the entire program.

Instead, prefer to use the `?` (try) operator, or pattern matching
to handle the `Err` case explicitly, or call `unwrap_or`,
`unwrap_or_else`, or `unwrap_or_default`.

# Panics

Panics if the value is an `Err`, with a panic message provided by the
`Err`'s value.

# Examples

Basic usage:

```rust
let x: Result<u32, &str> = Ok(2);
assert_eq!(x.unwrap(), 2);
```

```rust
let x: Result<u32, &str> = Err("emergency failure");
x.unwrap(); // panics with `emergency failure`
```

## Result::unwrap_or_default

```rust
pub const fn unwrap_or_default(self) -> T where T: [const] Default + [const] Destruct, E: [const] Destruct,
```

Returns the contained `Ok` value or a default

Consumes the `self` argument then, if `Ok`, returns the contained
value, otherwise if `Err`, returns the default value for that
type.

# Examples

Converts a string to an integer, turning poorly-formed strings
into 0 (the default value for integers). `parse` converts
a string to any other type that implements `FromStr`, returning an
`Err` on error.

```rust
let good_year_from_input = "1909";
let bad_year_from_input = "190blarg";
let good_year = good_year_from_input.parse().unwrap_or_default();
let bad_year = bad_year_from_input.parse().unwrap_or_default();

assert_eq!(1909, good_year);
assert_eq!(0, bad_year);
```

## Result::expect_err

```rust
pub fn expect_err(self, msg: &str) -> E where T: fmt::Debug,
```

Returns the contained `Err` value, consuming the `self` value.

# Panics

Panics if the value is an `Ok`, with a panic message including the
passed message, and the content of the `Ok`.

# Examples

```rust
let x: Result<u32, &str> = Ok(10);
x.expect_err("Testing expect_err"); // panics with `Testing expect_err: 10`
```

## Result::unwrap_err

```rust
pub fn unwrap_err(self) -> E where T: fmt::Debug,
```

Returns the contained `Err` value, consuming the `self` value.

# Panics

Panics if the value is an `Ok`, with a custom panic message provided
by the `Ok`'s value.

# Examples

```rust
let x: Result<u32, &str> = Ok(2);
x.unwrap_err(); // panics with `2`
```

```rust
let x: Result<u32, &str> = Err("emergency failure");
assert_eq!(x.unwrap_err(), "emergency failure");
```
