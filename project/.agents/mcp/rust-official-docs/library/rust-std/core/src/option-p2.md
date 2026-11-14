---
title: "core::option (part 2 of 4)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/option.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::option (part 2 of 4)

```
#### use std::iter::{empty, once};
// This won't compile because all possible returns from the function
// must have the same concrete type.
fn make_iter(do_insert: bool) -> impl Iterator<Item = i32> {
    // Explicit returns to illustrate return types not matching
    match do_insert {
        true => return (0..4).chain(once(42)).chain(4..8),
        false => return (0..4).chain(empty()).chain(4..8),
    }
}
```rust

#### Collecting into `Option`

`Option` implements the `FromIterator`[impl-FromIterator] trait,
which allows an iterator over `Option` values to be collected into an
`Option` of a collection of each contained value of the original
`Option` values, or `None` if any of the elements was `None`.

[impl-FromIterator]: Option#impl-FromIterator%3COption%3CT%3E%3E-for-Option%3CV%3E

```
let v = [Some(2), Some(4), None, Some(8)];
let res: Option<Vec<_>> = v.into_iter().collect();
assert_eq!(res, None);
let v = [Some(2), Some(4), Some(8)];
let res: Option<Vec<_>> = v.into_iter().collect();
assert_eq!(res, Some(vec![2, 4, 8]));
```rust

`Option` also implements the `Product`[impl-Product] and
`Sum`[impl-Sum] traits, allowing an iterator over `Option` values
to provide the `product`[Iterator::product] and
`sum`[Iterator::sum] methods.

[impl-Product]: Option#impl-Product%3COption%3CU%3E%3E-for-Option%3CT%3E
[impl-Sum]: Option#impl-Sum%3COption%3CU%3E%3E-for-Option%3CT%3E

```
let v = [None, Some(1), Some(2), Some(3)];
let res: Option<i32> = v.into_iter().sum();
assert_eq!(res, None);
let v = [Some(1), Some(2), Some(21)];
let res: Option<i32> = v.into_iter().product();
assert_eq!(res, Some(42));
```rust

#### Modifying an `Option` in-place

These methods return a mutable reference to the contained value of an
`Option<T>`:

* `insert` inserts a value, dropping any old contents
* `get_or_insert` gets the current value, inserting a provided
  default value if it is `None`
* `get_or_insert_default` gets the current value, inserting the
  default value of type `T` (which must implement `Default`) if it is
  `None`
* `get_or_insert_with` gets the current value, inserting a default
  computed by the provided function if it is `None`

`get_or_insert`: Option::get_or_insert
`get_or_insert_default`: Option::get_or_insert_default
`get_or_insert_with`: Option::get_or_insert_with
`insert`: Option::insert

These methods transfer ownership of the contained value of an
`Option`:

* `take` takes ownership of the contained value of an `Option`, if
  any, replacing the `Option` with `None`
* `replace` takes ownership of the contained value of an `Option`,
  if any, replacing the `Option` with a `Some` containing the
  provided value

`replace`: Option::replace
`take`: Option::take

Basic <example-value> matching on `Option`:

```
let msg = Some("howdy");

// Take a reference to the contained string
if let Some(m) = &msg {
    println!("{}", *m);
}

// Remove the contained string, destroying the Option
let unwrapped_msg = msg.unwrap_or("default message");
```rust

Initialize a result to `None` before a loop:

```
enum Kingdom { Plant(u32, &'static str), Animal(u32, &'static str) }

// A list of data to search through.
let all_the_big_things = [
    Kingdom::Plant(250, "redwood"),
    Kingdom::Plant(230, "noble fir"),
    Kingdom::Plant(229, "sugar pine"),
    Kingdom::Animal(25, "blue whale"),
    Kingdom::Animal(19, "fin whale"),
    Kingdom::Animal(15, "north pacific right whale"),
];

// We're going to search for the name of the biggest animal,
// but to start with we've just got `None`.
let mut name_of_biggest_animal = None;
let mut size_of_biggest_animal = 0;
for big_thing in &all_the_big_things {
    match *big_thing {
        Kingdom::Animal(size, name) if size > size_of_biggest_animal => {
            // Now we've found the name of some big animal
            size_of_biggest_animal = size;
            name_of_biggest_animal = Some(name);
        }
        Kingdom::Animal(..) | Kingdom::Plant(..) => ()
    }
}

match name_of_biggest_animal {
    Some(name) => println!("the biggest animal is {name}"),
    None => println!("there are no animals :("),
}
```rust

## enum Option

```rust
pub enum Option<T>
```

The `Option` type. See the module level documentation for more.

## Option::is_some

```rust
pub const fn is_some(&self) -> bool
```

Returns `true` if the option is a `Some` value.

# Examples

```rust
let x: Option<u32> = Some(2);
assert_eq!(x.is_some(), true);

let x: Option<u32> = None;
assert_eq!(x.is_some(), false);
```

## Option::is_some_and

```rust
pub const fn is_some_and(self, f: impl [const] FnOnce(T) -> bool + [const] Destruct) -> bool
```

Returns `true` if the option is a `Some` and the value inside of it matches a predicate.

# Examples

```rust
let x: Option<u32> = Some(2);
assert_eq!(x.is_some_and(|x| x > 1), true);

let x: Option<u32> = Some(0);
assert_eq!(x.is_some_and(|x| x > 1), false);

let x: Option<u32> = None;
assert_eq!(x.is_some_and(|x| x > 1), false);

let x: Option<String> = Some("ownership".to_string());
assert_eq!(x.as_ref().is_some_and(|x| x.len() > 1), true);
println!("still alive {:?}", x);
```

## Option::is_none

```rust
pub const fn is_none(&self) -> bool
```

Returns `true` if the option is a `None` value.

# Examples

```rust
let x: Option<u32> = Some(2);
assert_eq!(x.is_none(), false);

let x: Option<u32> = None;
assert_eq!(x.is_none(), true);
```

## Option::is_none_or

```rust
pub const fn is_none_or(self, f: impl [const] FnOnce(T) -> bool + [const] Destruct) -> bool
```

Returns `true` if the option is a `None` or the value inside of it matches a predicate.

# Examples

```rust
let x: Option<u32> = Some(2);
assert_eq!(x.is_none_or(|x| x > 1), true);

let x: Option<u32> = Some(0);
assert_eq!(x.is_none_or(|x| x > 1), false);

let x: Option<u32> = None;
assert_eq!(x.is_none_or(|x| x > 1), true);

let x: Option<String> = Some("ownership".to_string());
assert_eq!(x.as_ref().is_none_or(|x| x.len() > 1), true);
println!("still alive {:?}", x);
```

## Option::as_ref

```rust
pub const fn as_ref(&self) -> Option<&T>
```

Converts from `&Option<T>` to `Option<&T>`.

# Examples

Calculates the length of an <code>Option<[String]></code> as an <code>Option<[usize]></code>
without moving the `String`. The `map` method takes the `self` argument by value,
consuming the original, so this technique uses `as_ref` to first take an `Option` to a
reference to the value inside the original.

```rust
let text: Option<String> = Some("Hello, world!".to_string());
// First, cast `Option<String>` to `Option<&String>` with `as_ref`,
// then consume *that* with `map`, leaving `text` on the stack.
let text_length: Option<usize> = text.as_ref().map(|s| s.len());
println!("still can print text: {text:?}");
```

## Option::as_mut

```rust
pub const fn as_mut(&mut self) -> Option<&mut T>
```

Converts from `&mut Option<T>` to `Option<&mut T>`.

# Examples

```rust
let mut x = Some(2);
match x.as_mut() {
    Some(v) => *v = 42,
    None => {},
}
assert_eq!(x, Some(42));
```

## Option::as_pin_ref

```rust
pub const fn as_pin_ref(self: Pin<&Self>) -> Option<Pin<&T>>
```

Converts from <code>[Pin]<[&]Option\<T>></code> to <code>Option<[Pin]<[&]T>></code>.

## Option::as_pin_mut

```rust
pub const fn as_pin_mut(self: Pin<&mut Self>) -> Option<Pin<&mut T>>
```

Converts from <code>[Pin]<[&mut] Option\<T>></code> to <code>Option<[Pin]<[&mut] T>></code>.

## Option::as_slice

```rust
pub const fn as_slice(&self) -> &[T]
```

Returns a slice of the contained value, if any. If this is `None`, an
empty slice is returned. This can be useful to have a single type of
iterator over an `Option` or slice.

Note: Should you have an `Option<&T>` and wish to get a slice of `T`,
you can unpack it via `opt.map_or(&[], std::slice::from_ref)`.

# Examples

```rust
assert_eq!(
    [Some(1234).as_slice(), None.as_slice()],
    [&[1234][..], &[][..]],
);
```

The inverse of this function is (discounting
borrowing) `[_]::first`:

```rust
for i in [Some(1234_u16), None] {
    assert_eq!(i.as_ref(), i.as_slice().first());
}
```

## Option::as_mut_slice

```rust
pub const fn as_mut_slice(&mut self) -> &mut [T]
```

Returns a mutable slice of the contained value, if any. If this is
`None`, an empty slice is returned. This can be useful to have a
single type of iterator over an `Option` or slice.

Note: Should you have an `Option<&mut T>` instead of a
`&mut Option<T>`, which this method takes, you can obtain a mutable
slice via `opt.map_or(&mut [], std::slice::from_mut)`.

# Examples

```rust
assert_eq!(
    [Some(1234).as_mut_slice(), None.as_mut_slice()],
    [&mut [1234][..], &mut [][..]],
);
```

The result is a mutable slice of zero or one items that points into
our original `Option`:

```rust
let mut x = Some(1234);
x.as_mut_slice()[0] += 1;
assert_eq!(x, Some(1235));
```

The inverse of this method (discounting borrowing)
is `[_]::first_mut`:

```rust
assert_eq!(Some(123).as_mut_slice().first_mut(), Some(&mut 123))
```

## Option::expect

```rust
pub const fn expect(self, msg: &str) -> T
```

Returns the contained `Some` value, consuming the `self` value.

# Panics

Panics if the value is a `None` with a custom panic message provided by
`msg`.

# Examples

```rust
let x = Some("value");
assert_eq!(x.expect("fruits are healthy"), "value");
```

```rust
let x: Option<&str> = None;
x.expect("fruits are healthy"); // panics with `fruits are healthy`
```

# Recommended Message Style

We recommend that `expect` messages are used to describe the reason you
_expect_ the `Option` should be `Some`.

```rust
let item = slice.get(0)
    .expect("slice should not be empty");
```

**Hint**: If you're having trouble remembering how to phrase expect
error messages remember to focus on the word "should" as in "env
variable should be set by blah" or "the given binary should be available
and executable by the current user".

For more detail on expect message styles and the reasoning behind our
recommendation please refer to the section on "Common Message
Styles" in the `std::error` module docs.

## Option::unwrap

```rust
pub const fn unwrap(self) -> T
```

Returns the contained `Some` value, consuming the `self` value.

Because this function may panic, its use is generally discouraged.
Panics are meant for unrecoverable errors, and
may abort the entire program.

Instead, prefer to use pattern matching and handle the `None`
case explicitly, or call `unwrap_or`, `unwrap_or_else`, or
`unwrap_or_default`. In functions returning `Option`, you can use
the `?` (try) operator.

# Panics

Panics if the self value equals `None`.

# Examples

```rust
let x = Some("air");
assert_eq!(x.unwrap(), "air");
```

```rust
let x: Option<&str> = None;
assert_eq!(x.unwrap(), "air"); // fails
```

## Option::unwrap_or

```rust
pub const fn unwrap_or(self, default: T) -> T where T: [const] Destruct,
```

Returns the contained `Some` value or a provided default.

Arguments passed to `unwrap_or` are eagerly evaluated; if you are passing
the result of a function call, it is recommended to use `unwrap_or_else`,
which is lazily evaluated.

# Examples

```rust
assert_eq!(Some("car").unwrap_or("bike"), "car");
assert_eq!(None.unwrap_or("bike"), "bike");
```

## Option::unwrap_or_else

```rust
pub const fn unwrap_or_else<F>(self, f: F) -> T where F: [const] FnOnce() -> T + [const] Destruct,
```

Returns the contained `Some` value or computes it from a closure.

# Examples

```rust
let k = 10;
assert_eq!(Some(4).unwrap_or_else(|| 2 * k), 4);
assert_eq!(None.unwrap_or_else(|| 2 * k), 20);
```

## Option::unwrap_or_default

```rust
pub const fn unwrap_or_default(self) -> T where T: [const] Default,
```

Returns the contained `Some` value or a default.

Consumes the `self` argument then, if `Some`, returns the contained
value, otherwise if `None`, returns the [default value] for that
type.

# Examples

```rust
let x: Option<u32> = None;
let y: Option<u32> = Some(12);

assert_eq!(x.unwrap_or_default(), 0);
assert_eq!(y.unwrap_or_default(), 12);
```

## Option::unwrap_unchecked

```rust
pub const unsafe fn unwrap_unchecked(self) -> T
```

Returns the contained `Some` value, consuming the `self` value,
without checking that the value is not `None`.

# Safety

Calling this method on `None` is *[undefined behavior]*.

# Examples

```rust
let x = Some("air");
assert_eq!(unsafe { x.unwrap_unchecked() }, "air");
```

```rust
let x: Option<&str> = None;
assert_eq!(unsafe { x.unwrap_unchecked() }, "air"); // Undefined behavior!
```

## Option::map

```rust
pub const fn map<U, F>(self, f: F) -> Option<U> where F: [const] FnOnce(T) -> U + [const] Destruct,
```

Maps an `Option<T>` to `Option` by applying a function to a contained value (if `Some`) or returns `None` (if `None`).

# Examples

Calculates the length of an <code>Option<[String]></code> as an
<code>Option<[usize]></code>, consuming the original:

```rust
let maybe_some_string = Some(String::from("Hello, World!"));
// `Option::map` takes self *by value*, consuming `maybe_some_string`
let maybe_some_len = maybe_some_string.map(|s| s.len());
assert_eq!(maybe_some_len, Some(13));

let x: Option<&str> = None;
assert_eq!(x.map(|s| s.len()), None);
```

## Option::inspect

```rust
pub const fn inspect<F>(self, f: F) -> Self where F: [const] FnOnce(&T) + [const] Destruct,
```

Calls a function with a reference to the contained value if `Some`.

Returns the original option.

# Examples

```rust
let list = vec![1, 2, 3];

// prints "got: 2"
let x = list
    .get(1)
    .inspect(|x| println!("got: {x}"))
    .expect("list should be long enough");

// prints nothing
list.get(5).inspect(|x| println!("got: {x}"));
```

## Option::map_or

```rust
pub const fn map_or<U, F>(self, default: U, f: F) -> U where F: [const] FnOnce(T) -> U + [const] Destruct, U: [const] Destruct,
```

Returns the provided default result (if none),
or applies a function to the contained value (if any).

Arguments passed to `map_or` are eagerly evaluated; if you are passing
the result of a function call, it is recommended to use `map_or_else`,
which is lazily evaluated.

# Examples

```rust
let x = Some("foo");
assert_eq!(x.map_or(42, |v| v.len()), 3);

let x: Option<&str> = None;
assert_eq!(x.map_or(42, |v| v.len()), 42);
```
