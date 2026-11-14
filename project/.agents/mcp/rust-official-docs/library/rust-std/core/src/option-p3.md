---
title: "core::option (part 3 of 4)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/option.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::option (part 3 of 4)

## Option::map_or_else

```rust
pub const fn map_or_else<U, D, F>(self, default: D, f: F) -> U where D: [const] FnOnce() -> U + [const] Destruct, F: [const] FnOnce(T) -> U + [const] Destruct,
```

Computes a default function result (if none), or
applies a different function to the contained value (if any).

# Basic <example-value>

```rust
let k = 21;

let x = Some("foo");
assert_eq!(x.map_or_else(|| 2 * k, |v| v.len()), 3);

let x: Option<&str> = None;
assert_eq!(x.map_or_else(|| 2 * k, |v| v.len()), 42);
```

# Handling a Result-based fallback

A somewhat common occurrence when dealing with optional values
in combination with `Result<T, E>` is the case where one wants to invoke
a fallible fallback if the option is not present.  This example
parses a command line argument (if present), or the contents of a file to
an integer.  However, unlike accessing the command line argument, reading
the file is fallible, so it must be wrapped with `Ok`.

```rust
let v: u64 = std::env::args()
   .nth(1)
   .map_or_else(|| std::fs::read_to_string("/etc/someconfig.conf"), Ok)?
   .parse()?;
```

## Option::map_or_default

```rust
pub const fn map_or_default<U, F>(self, f: F) -> U where U: [const] Default, F: [const] FnOnce(T) -> U + [const] Destruct,
```

Maps an `Option<T>` to a `U` by applying function `f` to the contained
value if the option is `Some`, otherwise if `None`, returns the
[default value] for the type `U`.

# Examples

```rust
let x: Option<&str> = Some("hi");
let y: Option<&str> = None;

assert_eq!(x.map_or_default(|x| x.len()), 2);
assert_eq!(y.map_or_default(|y| y.len()), 0);
```

## Option::ok_or

```rust
pub const fn ok_or<E: [const] Destruct>(self, err: E) -> Result<T, E>
```

Transforms the `Option<T>` into a `Result<T, E>`, mapping `Some(v)` to
`Ok(v)` and `None` to `Err(err)`.

Arguments passed to `ok_or` are eagerly evaluated; if you are passing the
result of a function call, it is recommended to use `ok_or_else`, which is
lazily evaluated.

# Examples

```rust
let x = Some("foo");
assert_eq!(x.ok_or(0), Ok("foo"));

let x: Option<&str> = None;
assert_eq!(x.ok_or(0), Err(0));
```

## Option::ok_or_else

```rust
pub const fn ok_or_else<E, F>(self, err: F) -> Result<T, E> where F: [const] FnOnce() -> E + [const] Destruct,
```

Transforms the `Option<T>` into a `Result<T, E>`, mapping `Some(v)` to
`Ok(v)` and `None` to `Err(err())`.

# Examples

```rust
let x = Some("foo");
assert_eq!(x.ok_or_else(|| 0), Ok("foo"));

let x: Option<&str> = None;
assert_eq!(x.ok_or_else(|| 0), Err(0));
```

## Option::as_deref

```rust
pub const fn as_deref(&self) -> Option<&T::Target> where T: [const] Deref,
```

Converts from `Option<T>` (or `&Option<T>`) to `Option<&T::Target>`.

Leaves the original Option in-place, creating a new one with a reference
to the original one, additionally coercing the contents via `Deref`.

# Examples

```rust
let x: Option<String> = Some("hey".to_owned());
assert_eq!(x.as_deref(), Some("hey"));

let x: Option<String> = None;
assert_eq!(x.as_deref(), None);
```

## Option::as_deref_mut

```rust
pub const fn as_deref_mut(&mut self) -> Option<&mut T::Target> where T: [const] DerefMut,
```

Converts from `Option<T>` (or `&mut Option<T>`) to `Option<&mut T::Target>`.

Leaves the original `Option` in-place, creating a new one containing a mutable reference to
the inner type's `Deref::Target` type.

# Examples

```rust
let mut x: Option<String> = Some("hey".to_owned());
assert_eq!(x.as_deref_mut().map(|x| {
    x.make_ascii_uppercase();
    x
}), Some("HEY".to_owned().as_mut_str()));
```

## Option::iter

```rust
pub fn iter(&self) -> Iter<'_, T>
```

Returns an iterator over the possibly contained value.

# Examples

```rust
let x = Some(4);
assert_eq!(x.iter().next(), Some(&4));

let x: Option<u32> = None;
assert_eq!(x.iter().next(), None);
```

## Option::iter_mut

```rust
pub fn iter_mut(&mut self) -> IterMut<'_, T>
```

Returns a mutable iterator over the possibly contained value.

# Examples

```rust
let mut x = Some(4);
match x.iter_mut().next() {
    Some(v) => *v = 42,
    None => {},
}
assert_eq!(x, Some(42));

let mut x: Option<u32> = None;
assert_eq!(x.iter_mut().next(), None);
```

## Option::and

```rust
pub const fn and<U>(self, optb: Option<U>) -> Option<U> where T: [const] Destruct, U: [const] Destruct,
```

Returns `None` if the option is `None`, otherwise returns `optb`.

Arguments passed to `and` are eagerly evaluated; if you are passing the
result of a function call, it is recommended to use `and_then`, which is
lazily evaluated.

# Examples

```rust
let x = Some(2);
let y: Option<&str> = None;
assert_eq!(x.and(y), None);

let x: Option<u32> = None;
let y = Some("foo");
assert_eq!(x.and(y), None);

let x = Some(2);
let y = Some("foo");
assert_eq!(x.and(y), Some("foo"));

let x: Option<u32> = None;
let y: Option<&str> = None;
assert_eq!(x.and(y), None);
```

## Option::and_then

```rust
pub const fn and_then<U, F>(self, f: F) -> Option<U> where F: [const] FnOnce(T) -> Option<U> + [const] Destruct,
```

Returns `None` if the option is `None`, otherwise calls `f` with the
wrapped value and returns the result.

Some languages call this operation flatmap.

# Examples

```rust
fn sq_then_to_string(x: u32) -> Option<String> {
    x.checked_mul(x).map(|sq| sq.to_string())
}

assert_eq!(Some(2).and_then(sq_then_to_string), Some(4.to_string()));
assert_eq!(Some(1_000_000).and_then(sq_then_to_string), None); // overflowed!
assert_eq!(None.and_then(sq_then_to_string), None);
```

Often used to chain fallible operations that may return `None`.

```rust
let arr_2d = [["A0", "A1"], ["B0", "B1"]];

let item_0_1 = arr_2d.get(0).and_then(|row| row.get(1));
assert_eq!(item_0_1, Some(&"A1"));

let item_2_0 = arr_2d.get(2).and_then(|row| row.get(0));
assert_eq!(item_2_0, None);
```

## Option::filter

```rust
pub const fn filter<P>(self, predicate: P) -> Self where P: [const] FnOnce(&T) -> bool + [const] Destruct, T: [const] Destruct,
```

Returns `None` if the option is `None`, otherwise calls `predicate`
with the wrapped value and returns:

- `Some(t)` if `predicate` returns `true` (where `t` is the wrapped
  value), and
- `None` if `predicate` returns `false`.

This function works similar to `Iterator::filter()`. You can imagine
the `Option<T>` being an iterator over one or zero elements. `filter()`
lets you decide which elements to keep.

# Examples

```rust
fn is_even(n: &i32) -> bool {
    n % 2 == 0
}

assert_eq!(None.filter(is_even), None);
assert_eq!(Some(3).filter(is_even), None);
assert_eq!(Some(4).filter(is_even), Some(4));
```

## Option::or

```rust
pub const fn or(self, optb: Option<T>) -> Option<T> where T: [const] Destruct,
```

Returns the option if it contains a value, otherwise returns `optb`.

Arguments passed to `or` are eagerly evaluated; if you are passing the
result of a function call, it is recommended to use `or_else`, which is
lazily evaluated.

# Examples

```rust
let x = Some(2);
let y = None;
assert_eq!(x.or(y), Some(2));

let x = None;
let y = Some(100);
assert_eq!(x.or(y), Some(100));

let x = Some(2);
let y = Some(100);
assert_eq!(x.or(y), Some(2));

let x: Option<u32> = None;
let y = None;
assert_eq!(x.or(y), None);
```

## Option::or_else

```rust
pub const fn or_else<F>(self, f: F) -> Option<T> where F: [const] FnOnce() -> Option<T> + [const] Destruct, //FIXME(const_hack): this `T: [const] Destruct` is unnecessary, but even precise live drops can't tell // no value of type `T` gets dropped here T: [const] Destruct,
```

Returns the option if it contains a value, otherwise calls `f` and
returns the result.

# Examples

```rust
fn nobody() -> Option<&'static str> { None }
fn vikings() -> Option<&'static str> { Some("vikings") }

assert_eq!(Some("barbarians").or_else(vikings), Some("barbarians"));
assert_eq!(None.or_else(vikings), Some("vikings"));
assert_eq!(None.or_else(nobody), None);
```

## Option::xor

```rust
pub const fn xor(self, optb: Option<T>) -> Option<T> where T: [const] Destruct,
```

Returns `Some` if exactly one of `self`, `optb` is `Some`, otherwise returns `None`.

# Examples

```rust
let x = Some(2);
let y: Option<u32> = None;
assert_eq!(x.xor(y), Some(2));

let x: Option<u32> = None;
let y = Some(2);
assert_eq!(x.xor(y), Some(2));

let x = Some(2);
let y = Some(2);
assert_eq!(x.xor(y), None);

let x: Option<u32> = None;
let y: Option<u32> = None;
assert_eq!(x.xor(y), None);
```

## Option::insert

```rust
pub const fn insert(&mut self, value: T) -> &mut T where T: [const] Destruct,
```

Inserts `value` into the option, then returns a mutable reference to it.

If the option already contains a value, the old value is dropped.

See also `Option::get_or_insert`, which doesn't update the value if
the option already contains `Some`.

# Example

```rust
let mut opt = None;
let val = opt.insert(1);
assert_eq!(*val, 1);
assert_eq!(opt.unwrap(), 1);
let val = opt.insert(2);
assert_eq!(*val, 2);
*val = 3;
assert_eq!(opt.unwrap(), 3);
```

## Option::get_or_insert

```rust
pub const fn get_or_insert(&mut self, value: T) -> &mut T where T: [const] Destruct,
```

Inserts `value` into the option if it is `None`, then
returns a mutable reference to the contained value.

See also `Option::insert`, which updates the value even if
the option already contains `Some`.

# Examples

```rust
let mut x = None;

{
    let y: &mut u32 = x.get_or_insert(5);
    assert_eq!(y, &5);

    *y = 7;
}

assert_eq!(x, Some(7));
```

## Option::get_or_insert_default

```rust
pub const fn get_or_insert_default(&mut self) -> &mut T where T: [const] Default,
```

Inserts the default value into the option if it is `None`, then
returns a mutable reference to the contained value.

# Examples

```rust
let mut x = None;

{
    let y: &mut u32 = x.get_or_insert_default();
    assert_eq!(y, &0);

    *y = 7;
}

assert_eq!(x, Some(7));
```

## Option::get_or_insert_with

```rust
pub const fn get_or_insert_with<F>(&mut self, f: F) -> &mut T where F: [const] FnOnce() -> T + [const] Destruct,
```

Inserts a value computed from `f` into the option if it is `None`,
then returns a mutable reference to the contained value.

# Examples

```rust
let mut x = None;

{
    let y: &mut u32 = x.get_or_insert_with(|| 5);
    assert_eq!(y, &5);

    *y = 7;
}

assert_eq!(x, Some(7));
```

## Option::take

```rust
pub const fn take(&mut self) -> Option<T>
```

Takes the value out of the option, leaving a `None` in its place.

# Examples

```rust
let mut x = Some(2);
let y = x.take();
assert_eq!(x, None);
assert_eq!(y, Some(2));

let mut x: Option<u32> = None;
let y = x.take();
assert_eq!(x, None);
assert_eq!(y, None);
```

## Option::take_if

```rust
pub const fn take_if<P>(&mut self, predicate: P) -> Option<T> where P: [const] FnOnce(&mut T) -> bool + [const] Destruct,
```

Takes the value out of the option, but only if the predicate evaluates to
`true` on a mutable reference to the value.

In other words, replaces `self` with `None` if the predicate returns `true`.
This method operates similar to `Option::take` but conditional.

# Examples

```rust
let mut x = Some(42);

let prev = x.take_if(|v| if *v == 42 {
    *v += 1;
    false
} else {
    false
});
assert_eq!(x, Some(43));
assert_eq!(prev, None);

let prev = x.take_if(|v| *v == 43);
assert_eq!(x, None);
assert_eq!(prev, Some(43));
```

## Option::replace

```rust
pub const fn replace(&mut self, value: T) -> Option<T>
```

Replaces the actual value in the option by the value given in parameter,
returning the old value if present,
leaving a `Some` in its place without deinitializing either one.

# Examples

```rust
let mut x = Some(2);
let old = x.replace(5);
assert_eq!(x, Some(5));
assert_eq!(old, Some(2));

let mut x = None;
let old = x.replace(3);
assert_eq!(x, Some(3));
assert_eq!(old, None);
```

## Option::zip

```rust
pub const fn zip<U>(self, other: Option<U>) -> Option<(T, U)> where T: [const] Destruct, U: [const] Destruct,
```

Makes a tuple of the value in `self` and the value in another `Option`.

If `self` is `Some(s)` and `other` is `Some(o)`, this method returns `Some((s, o))`.
Otherwise, `None` is returned.

# Examples

```rust
let x = Some(1);
let y = Some("hi");
let z = None::<u8>;

assert_eq!(x.zip(y), Some((1, "hi")));
assert_eq!(x.zip(z), None);
```

## Option::unzip

```rust
pub fn unzip(self) -> (Option<T>, Option<U>)
```

Unzips an option containing a tuple of two options.

If `self` is `Some((a, b))` this method returns `(Some(a), Some(b))`.
Otherwise, `(None, None)` is returned.

# Examples

```rust
let x = Some((1, "hi"));
let y = None::<(u8, u32)>;

assert_eq!(x.unzip(), (Some(1), Some("hi")));
assert_eq!(y.unzip(), (None, None));
```

## Option::copied

```rust
pub const fn copied(self) -> Option<T> where T: Copy,
```

Maps an `Option<&T>` to an `Option<T>` by copying the contents of the
option.

# Examples

```rust
let x = 12;
let opt_x = Some(&x);
assert_eq!(opt_x, Some(&12));
let copied = opt_x.copied();
assert_eq!(copied, Some(12));
```

## Option::cloned

```rust
pub fn cloned(self) -> Option<T> where T: Clone,
```

Maps an `Option<&T>` to an `Option<T>` by cloning the contents of the
option.

# Examples

```rust
let x = 12;
let opt_x = Some(&x);
assert_eq!(opt_x, Some(&12));
let cloned = opt_x.cloned();
assert_eq!(cloned, Some(12));
```

## Option::copied

```rust
pub const fn copied(self) -> Option<T> where T: Copy,
```

Maps an `Option<&mut T>` to an `Option<T>` by copying the contents of the
option.

# Examples

```rust
let mut x = 12;
let opt_x = Some(&mut x);
assert_eq!(opt_x, Some(&mut 12));
let copied = opt_x.copied();
assert_eq!(copied, Some(12));
```

## Option::cloned

```rust
pub fn cloned(self) -> Option<T> where T: Clone,
```

Maps an `Option<&mut T>` to an `Option<T>` by cloning the contents of the
option.

# Examples

```rust
let mut x = 12;
let opt_x = Some(&mut x);
assert_eq!(opt_x, Some(&mut 12));
let cloned = opt_x.cloned();
assert_eq!(cloned, Some(12));
```

## Option::transpose

```rust
pub const fn transpose(self) -> Result<Option<T>, E>
```

Transposes an `Option` of a `Result` into a `Result` of an `Option`.

`[Some]\([Ok]\(\_))` is mapped to `[Ok]\([Some]\(\_))`,
`[Some]\([Err]\(\_))` is mapped to `[Err]\(\_)`,
and `None` will be mapped to `[Ok]\([None])`.

# Examples

```rust
#[derive(Debug, Eq, PartialEq)]
struct SomeErr;

let x: Option<Result<i32, SomeErr>> = Some(Ok(5));
let y: Result<Option<i32>, SomeErr> = Ok(Some(5));
assert_eq!(x.transpose(), y);
```

## ::Iter

```rust
pub struct Iter<'a, A: 'a>
```

An iterator over a reference to the `Some` variant of an `Option`.

The iterator yields one value if the `Option` is a `Some`, otherwise none.

This `struct` is created by the `Option::iter` function.

## struct IterMut

```rust
pub struct IterMut<'a, A: 'a>
```

An iterator over a mutable reference to the `Some` variant of an `Option`.

The iterator yields one value if the `Option` is a `Some`, otherwise none.

This `struct` is created by the `Option::iter_mut` function.
