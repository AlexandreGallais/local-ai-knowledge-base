---
title: "core::result (part 3 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/result.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::result (part 3 of 3)

## Result::and

```rust
pub const fn and<U>(self, res: Result<U, E>) -> Result<U, E> where T: [const] Destruct, E: [const] Destruct, U: [const] Destruct,
```

Returns `res` if the result is `Ok`, otherwise returns the `Err` value of `self`.

Arguments passed to `and` are eagerly evaluated; if you are passing the
result of a function call, it is recommended to use `and_then`, which is
lazily evaluated.

# Examples

```rust
let x: Result<u32, &str> = Ok(2);
let y: Result<&str, &str> = Err("late error");
assert_eq!(x.and(y), Err("late error"));

let x: Result<u32, &str> = Err("early error");
let y: Result<&str, &str> = Ok("foo");
assert_eq!(x.and(y), Err("early error"));

let x: Result<u32, &str> = Err("not a 2");
let y: Result<&str, &str> = Err("late error");
assert_eq!(x.and(y), Err("not a 2"));

let x: Result<u32, &str> = Ok(2);
let y: Result<&str, &str> = Ok("different result type");
assert_eq!(x.and(y), Ok("different result type"));
```

## Result::and_then

```rust
pub const fn and_then<U, F>(self, op: F) -> Result<U, E> where F: [const] FnOnce(T) -> Result<U, E> + [const] Destruct,
```

Calls `op` if the result is `Ok`, otherwise returns the `Err` value of `self`.

This function can be used for control flow based on `Result` values.

# Examples

```rust
fn sq_then_to_string(x: u32) -> Result<String, &'static str> {
    x.checked_mul(x).map(|sq| sq.to_string()).ok_or("overflowed")
}

assert_eq!(Ok(2).and_then(sq_then_to_string), Ok(4.to_string()));
assert_eq!(Ok(1_000_000).and_then(sq_then_to_string), Err("overflowed"));
assert_eq!(Err("not a number").and_then(sq_then_to_string), Err("not a number"));
```

Often used to chain fallible operations that may return `Err`.

```rust
use std::{io::ErrorKind, path::Path};

// Note: on Windows "/" maps to "C:\"
let root_modified_time = Path::new("/").metadata().and_then(|md| md.modified());
assert!(root_modified_time.is_ok());

let should_fail = Path::new("/bad/path").metadata().and_then(|md| md.modified());
assert!(should_fail.is_err());
assert_eq!(should_fail.unwrap_err().kind(), ErrorKind::NotFound);
```

## Result::or

```rust
pub const fn or<F>(self, res: Result<T, F>) -> Result<T, F> where T: [const] Destruct, E: [const] Destruct, F: [const] Destruct,
```

Returns `res` if the result is `Err`, otherwise returns the `Ok` value of `self`.

Arguments passed to `or` are eagerly evaluated; if you are passing the
result of a function call, it is recommended to use `or_else`, which is
lazily evaluated.

# Examples

```rust
let x: Result<u32, &str> = Ok(2);
let y: Result<u32, &str> = Err("late error");
assert_eq!(x.or(y), Ok(2));

let x: Result<u32, &str> = Err("early error");
let y: Result<u32, &str> = Ok(2);
assert_eq!(x.or(y), Ok(2));

let x: Result<u32, &str> = Err("not a 2");
let y: Result<u32, &str> = Err("late error");
assert_eq!(x.or(y), Err("late error"));

let x: Result<u32, &str> = Ok(2);
let y: Result<u32, &str> = Ok(100);
assert_eq!(x.or(y), Ok(2));
```

## Result::or_else

```rust
pub const fn or_else<F, O>(self, op: O) -> Result<T, F> where O: [const] FnOnce(E) -> Result<T, F> + [const] Destruct,
```

Calls `op` if the result is `Err`, otherwise returns the `Ok` value of `self`.

This function can be used for control flow based on result values.

# Examples

```rust
fn sq(x: u32) -> Result<u32, u32> { Ok(x * x) }
fn err(x: u32) -> Result<u32, u32> { Err(x) }

assert_eq!(Ok(2).or_else(sq).or_else(sq), Ok(2));
assert_eq!(Ok(2).or_else(err).or_else(sq), Ok(2));
assert_eq!(Err(3).or_else(sq).or_else(err), Ok(9));
assert_eq!(Err(3).or_else(err).or_else(err), Err(3));
```

## Result::unwrap_or

```rust
pub const fn unwrap_or(self, default: T) -> T where T: [const] Destruct, E: [const] Destruct,
```

Returns the contained `Ok` value or a provided default.

Arguments passed to `unwrap_or` are eagerly evaluated; if you are passing
the result of a function call, it is recommended to use `unwrap_or_else`,
which is lazily evaluated.

# Examples

```rust
let default = 2;
let x: Result<u32, &str> = Ok(9);
assert_eq!(x.unwrap_or(default), 9);

let x: Result<u32, &str> = Err("error");
assert_eq!(x.unwrap_or(default), default);
```

## Result::unwrap_or_else

```rust
pub const fn unwrap_or_else<F>(self, op: F) -> T where F: [const] FnOnce(E) -> T + [const] Destruct,
```

Returns the contained `Ok` value or computes it from a closure.

# Examples

```rust
fn count(x: &str) -> usize { x.len() }

assert_eq!(Ok(2).unwrap_or_else(count), 2);
assert_eq!(Err("foo").unwrap_or_else(count), 3);
```

## Result::unwrap_unchecked

```rust
pub const unsafe fn unwrap_unchecked(self) -> T
```

Returns the contained `Ok` value, consuming the `self` value,
without checking that the value is not an `Err`.

# Safety

Calling this method on an `Err` is *[undefined behavior]*.

# Examples

```rust
let x: Result<u32, &str> = Ok(2);
assert_eq!(unsafe { x.unwrap_unchecked() }, 2);
```

```rust
let x: Result<u32, &str> = Err("emergency failure");
unsafe { x.unwrap_unchecked() }; // Undefined behavior!
```

## Result::unwrap_err_unchecked

```rust
pub const unsafe fn unwrap_err_unchecked(self) -> E where T: [const] Destruct, E: [const] Destruct,
```

Returns the contained `Err` value, consuming the `self` value,
without checking that the value is not an `Ok`.

# Safety

Calling this method on an `Ok` is *[undefined behavior]*.

# Examples

```rust
let x: Result<u32, &str> = Ok(2);
unsafe { x.unwrap_err_unchecked() }; // Undefined behavior!
```

```rust
let x: Result<u32, &str> = Err("emergency failure");
assert_eq!(unsafe { x.unwrap_err_unchecked() }, "emergency failure");
```

## Result::copied

```rust
pub const fn copied(self) -> Result<T, E> where T: Copy,
```

Maps a `Result<&T, E>` to a `Result<T, E>` by copying the contents of the
`Ok` part.

# Examples

```rust
let val = 12;
let x: Result<&i32, i32> = Ok(&val);
assert_eq!(x, Ok(&12));
let copied = x.copied();
assert_eq!(copied, Ok(12));
```

## Result::cloned

```rust
pub fn cloned(self) -> Result<T, E> where T: Clone,
```

Maps a `Result<&T, E>` to a `Result<T, E>` by cloning the contents of the
`Ok` part.

# Examples

```rust
let val = 12;
let x: Result<&i32, i32> = Ok(&val);
assert_eq!(x, Ok(&12));
let cloned = x.cloned();
assert_eq!(cloned, Ok(12));
```

## Result::copied

```rust
pub const fn copied(self) -> Result<T, E> where T: Copy,
```

Maps a `Result<&mut T, E>` to a `Result<T, E>` by copying the contents of the
`Ok` part.

# Examples

```rust
let mut val = 12;
let x: Result<&mut i32, i32> = Ok(&mut val);
assert_eq!(x, Ok(&mut 12));
let copied = x.copied();
assert_eq!(copied, Ok(12));
```

## Result::cloned

```rust
pub fn cloned(self) -> Result<T, E> where T: Clone,
```

Maps a `Result<&mut T, E>` to a `Result<T, E>` by cloning the contents of the
`Ok` part.

# Examples

```rust
let mut val = 12;
let x: Result<&mut i32, i32> = Ok(&mut val);
assert_eq!(x, Ok(&mut 12));
let cloned = x.cloned();
assert_eq!(cloned, Ok(12));
```

## Result::transpose

```rust
pub const fn transpose(self) -> Option<Result<T, E>>
```

Transposes a `Result` of an `Option` into an `Option` of a `Result`.

`Ok(None)` will be mapped to `None`.
`Ok(Some(_))` and `Err(_)` will be mapped to `Some(Ok(_))` and `Some(Err(_))`.

# Examples

```rust
#[derive(Debug, Eq, PartialEq)]
struct SomeErr;

let x: Result<Option<i32>, SomeErr> = Ok(Some(5));
let y: Option<Result<i32, SomeErr>> = Some(Ok(5));
assert_eq!(x.transpose(), y);
```

## Result::flatten

```rust
pub const fn flatten(self) -> Result<T, E>
```

Converts from `Result<Result<T, E>, E>` to `Result<T, E>`

# Examples

```rust
let x: Result<Result<&'static str, u32>, u32> = Ok(Ok("hello"));
assert_eq!(Ok("hello"), x.flatten());

let x: Result<Result<&'static str, u32>, u32> = Ok(Err(6));
assert_eq!(Err(6), x.flatten());

let x: Result<Result<&'static str, u32>, u32> = Err(6);
assert_eq!(Err(6), x.flatten());
```

Flattening only removes one level of nesting at a time:

```rust
let x: Result<Result<Result<&'static str, u32>, u32>, u32> = Ok(Ok(Ok("hello")));
assert_eq!(Ok(Ok("hello")), x.flatten());
assert_eq!(Ok("hello"), x.flatten().flatten());
```

## struct Iter

```rust
pub struct Iter<'a, T: 'a>
```

An iterator over a reference to the `Ok` variant of a `Result`.

The iterator yields one value if the result is `Ok`, otherwise none.

Created by `Result::iter`.

## struct IterMut

```rust
pub struct IterMut<'a, T: 'a>
```

An iterator over a mutable reference to the `Ok` variant of a `Result`.

Created by `Result::iter_mut`.

## ::IntoIter

```rust
pub struct IntoIter<T>
```

An iterator over the value in a `Ok` variant of a `Result`.

The iterator yields one value if the result is `Ok`, otherwise none.

This struct is created by the `into_iter` method on
`Result` (provided by the `IntoIterator` trait).
