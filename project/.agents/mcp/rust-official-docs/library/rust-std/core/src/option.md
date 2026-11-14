# core::option

Optional values.

Type [`Option`] represents an optional value: every [`Option`]
is either [`Some`] and contains a value, or [`None`], and
does not. [`Option`] types are very common in Rust code, as
they have a number of uses:

* Initial values
* Return values for functions that are not defined
  over their entire input range (partial functions)
* Return value for otherwise reporting simple errors, where [`None`] is
  returned on error
* Optional struct fields
* Struct fields that can be loaned or "taken"
* Optional function arguments
* Nullable pointers
* Swapping things out of difficult situations

[`Option`]s are commonly paired with pattern matching to query the presence
of a value and take action, always accounting for the [`None`] case.

```
fn divide(numerator: f64, denominator: f64) -> Option<f64> {
    if denominator == 0.0 {
        None
    } else {
        Some(numerator / denominator)
    }
}

// The return value of the function is an option
let result = divide(2.0, 3.0);

// Pattern match to retrieve the value
match result {
    // The division was valid
    Some(x) => println!("Result: {x}"),
    // The division was invalid
    None    => println!("Cannot divide by 0"),
}
```

# Options and pointers ("nullable" pointers)

Rust's pointer types must always point to a valid location; there are
no "null" references. Instead, Rust has *optional* pointers, like
the optional owned box, <code>[Option]<[Box\<T>]></code>.

[Box\<T>]: ../../std/boxed/struct.Box.html

The following example uses [`Option`] to create an optional box of
[`i32`]. Notice that in order to use the inner [`i32`] value, the
`check_optional` function first needs to use pattern matching to
determine whether the box has a value (i.e., it is [`Some(...)`][`Some`]) or
not ([`None`]).

```
let optional = None;
check_optional(optional);

let optional = Some(Box::new(9000));
check_optional(optional);

fn check_optional(optional: Option<Box<i32>>) {
    match optional {
        Some(p) => println!("has value {p}"),
        None => println!("has no value"),
    }
}
```

# The question mark operator, `?`

Similar to the [`Result`] type, when writing code that calls many functions that return the
[`Option`] type, handling `Some`/`None` can be tedious. The question mark
operator, [`?`], hides some of the boilerplate of propagating values
up the call stack.

It replaces this:

```
# #![allow(dead_code)]
fn add_last_numbers(stack: &mut Vec<i32>) -> Option<i32> {
    let a = stack.pop();
    let b = stack.pop();

    match (a, b) {
        (Some(x), Some(y)) => Some(x + y),
        _ => None,
    }
}

```

With this:

```
# #![allow(dead_code)]
fn add_last_numbers(stack: &mut Vec<i32>) -> Option<i32> {
    Some(stack.pop()? + stack.pop()?)
}
```

*It's much nicer!*

Ending the expression with [`?`] will result in the [`Some`]'s unwrapped value, unless the
result is [`None`], in which case [`None`] is returned early from the enclosing function.

[`?`] can be used in functions that return [`Option`] because of the
early return of [`None`] that it provides.

[`?`]: crate::ops::Try
[`Some`]: Some
[`None`]: None

# Representation

Rust guarantees to optimize the following types `T` such that [`Option<T>`]
has the same size, alignment, and [function call ABI] as `T`. It is
therefore sound, when `T` is one of these types, to transmute a value `t` of
type `T` to type `Option<T>` (producing the value `Some(t)`) and to
transmute a value `Some(t)` of type `Option<T>` to type `T` (producing the
value `t`).

In some of these cases, Rust further guarantees the following:
- `transmute::<_, Option<T>>([0u8; size_of::<T>()])` is sound and produces
  `Option::<T>::None`
- `transmute::<_, [u8; size_of::<T>()]>(Option::<T>::None)` is sound and produces
  `[0u8; size_of::<T>()]`

These cases are identified by the second column:

| `T`                                                                 | Transmuting between `[0u8; size_of::<T>()]` and `Option::<T>::None` sound? |
|---------------------------------------------------------------------|----------------------------------------------------------------------------|
| [`Box<U>`] (specifically, only `Box<U, Global>`)                    | when `U: Sized`                                                            |
| `&U`                                                                | when `U: Sized`                                                            |
| `&mut U`                                                            | when `U: Sized`                                                            |
| `fn`, `extern "C" fn`[^extern_fn]                                   | always                                                                     |
| [`num::NonZero*`]                                                   | always                                                                     |
| [`ptr::NonNull<U>`]                                                 | when `U: Sized`                                                            |
| `#[repr(transparent)]` struct around one of the types in this list. | when it holds for the inner type                                           |

[^extern_fn]: this remains true for `unsafe` variants, any argument/return types, and any other ABI: `[unsafe] extern "abi" fn` (_e.g._, `extern "system" fn`)

Under some conditions the above types `T` are also null pointer optimized when wrapped in a [`Result`][result_repr].

[`Box<U>`]: ../../std/boxed/struct.Box.html
[`num::NonZero*`]: crate::num
[`ptr::NonNull<U>`]: crate::ptr::NonNull
[function call ABI]: ../primitive.fn.html#abi-compatibility
[result_repr]: crate::result#representation

This is called the "null pointer optimization" or NPO.

It is further guaranteed that, for the cases above, one can
[`mem::transmute`] from all valid values of `T` to `Option<T>` and
from `Some::<T>(_)` to `T` (but transmuting `None::<T>` to `T`
is undefined behavior).

# Method overview

In addition to working with pattern matching, [`Option`] provides a wide
variety of different methods.

## Querying the variant

The [`is_some`] and [`is_none`] methods return [`true`] if the [`Option`]
is [`Some`] or [`None`], respectively.

The [`is_some_and`] and [`is_none_or`] methods apply the provided function
to the contents of the [`Option`] to produce a boolean value.
If this is [`None`] then a default result is returned instead without executing the function.

[`is_none`]: Option::is_none
[`is_some`]: Option::is_some
[`is_some_and`]: Option::is_some_and
[`is_none_or`]: Option::is_none_or

## Adapters for working with references

* [`as_ref`] converts from <code>[&][][Option]\<T></code> to <code>[Option]<[&]T></code>
* [`as_mut`] converts from <code>[&mut] [Option]\<T></code> to <code>[Option]<[&mut] T></code>
* [`as_deref`] converts from <code>[&][][Option]\<T></code> to
  <code>[Option]<[&]T::[Target]></code>
* [`as_deref_mut`] converts from <code>[&mut] [Option]\<T></code> to
  <code>[Option]<[&mut] T::[Target]></code>
* [`as_pin_ref`] converts from <code>[Pin]<[&][][Option]\<T>></code> to
  <code>[Option]<[Pin]<[&]T>></code>
* [`as_pin_mut`] converts from <code>[Pin]<[&mut] [Option]\<T>></code> to
  <code>[Option]<[Pin]<[&mut] T>></code>
* [`as_slice`] returns a one-element slice of the contained value, if any.
  If this is [`None`], an empty slice is returned.
* [`as_mut_slice`] returns a mutable one-element slice of the contained value, if any.
  If this is [`None`], an empty slice is returned.

[&]: reference "shared reference"
[&mut]: reference "mutable reference"
[Target]: Deref::Target "ops::Deref::Target"
[`as_deref`]: Option::as_deref
[`as_deref_mut`]: Option::as_deref_mut
[`as_mut`]: Option::as_mut
[`as_pin_mut`]: Option::as_pin_mut
[`as_pin_ref`]: Option::as_pin_ref
[`as_ref`]: Option::as_ref
[`as_slice`]: Option::as_slice
[`as_mut_slice`]: Option::as_mut_slice

## Extracting the contained value

These methods extract the contained value in an [`Option<T>`] when it
is the [`Some`] variant. If the [`Option`] is [`None`]:

* [`expect`] panics with a provided custom message
* [`unwrap`] panics with a generic message
* [`unwrap_or`] returns the provided default value
* [`unwrap_or_default`] returns the default value of the type `T`
  (which must implement the [`Default`] trait)
* [`unwrap_or_else`] returns the result of evaluating the provided
  function
* [`unwrap_unchecked`] produces *[undefined behavior]*

[`expect`]: Option::expect
[`unwrap`]: Option::unwrap
[`unwrap_or`]: Option::unwrap_or
[`unwrap_or_default`]: Option::unwrap_or_default
[`unwrap_or_else`]: Option::unwrap_or_else
[`unwrap_unchecked`]: Option::unwrap_unchecked
[undefined behavior]: https://doc.rust-lang.org/reference/behavior-considered-undefined.html

## Transforming contained values

These methods transform [`Option`] to [`Result`]:

* [`ok_or`] transforms [`Some(v)`] to [`Ok(v)`], and [`None`] to
  [`Err(err)`] using the provided default `err` value
* [`ok_or_else`] transforms [`Some(v)`] to [`Ok(v)`], and [`None`] to
  a value of [`Err`] using the provided function
* [`transpose`] transposes an [`Option`] of a [`Result`] into a
  [`Result`] of an [`Option`]

[`Err(err)`]: Err
[`Ok(v)`]: Ok
[`Some(v)`]: Some
[`ok_or`]: Option::ok_or
[`ok_or_else`]: Option::ok_or_else
[`transpose`]: Option::transpose

These methods transform the [`Some`] variant:

* [`filter`] calls the provided predicate function on the contained
  value `t` if the [`Option`] is [`Some(t)`], and returns [`Some(t)`]
  if the function returns `true`; otherwise, returns [`None`]
* [`flatten`] removes one level of nesting from an [`Option<Option<T>>`]
* [`inspect`] method takes ownership of the [`Option`] and applies
  the provided function to the contained value by reference if [`Some`]
* [`map`] transforms [`Option<T>`] to [`Option<U>`] by applying the
  provided function to the contained value of [`Some`] and leaving
  [`None`] values unchanged

[`Some(t)`]: Some
[`filter`]: Option::filter
[`flatten`]: Option::flatten
[`inspect`]: Option::inspect
[`map`]: Option::map

These methods transform [`Option<T>`] to a value of a possibly
different type `U`:

* [`map_or`] applies the provided function to the contained value of
  [`Some`], or returns the provided default value if the [`Option`] is
  [`None`]
* [`map_or_else`] applies the provided function to the contained value
  of [`Some`], or returns the result of evaluating the provided
  fallback function if the [`Option`] is [`None`]

[`map_or`]: Option::map_or
[`map_or_else`]: Option::map_or_else

These methods combine the [`Some`] variants of two [`Option`] values:

* [`zip`] returns [`Some((s, o))`] if `self` is [`Some(s)`] and the
  provided [`Option`] value is [`Some(o)`]; otherwise, returns [`None`]
* [`zip_with`] calls the provided function `f` and returns
  [`Some(f(s, o))`] if `self` is [`Some(s)`] and the provided
  [`Option`] value is [`Some(o)`]; otherwise, returns [`None`]

[`Some(f(s, o))`]: Some
[`Some(o)`]: Some
[`Some(s)`]: Some
[`Some((s, o))`]: Some
[`zip`]: Option::zip
[`zip_with`]: Option::zip_with

## Boolean operators

These methods treat the [`Option`] as a boolean value, where [`Some`]
acts like [`true`] and [`None`] acts like [`false`]. There are two
categories of these methods: ones that take an [`Option`] as input, and
ones that take a function as input (to be lazily evaluated).

The [`and`], [`or`], and [`xor`] methods take another [`Option`] as
input, and produce an [`Option`] as output. Only the [`and`] method can
produce an [`Option<U>`] value having a different inner type `U` than
[`Option<T>`].

| method  | self      | input     | output    |
|---------|-----------|-----------|-----------|
| [`and`] | `None`    | (ignored) | `None`    |
| [`and`] | `Some(x)` | `None`    | `None`    |
| [`and`] | `Some(x)` | `Some(y)` | `Some(y)` |
| [`or`]  | `None`    | `None`    | `None`    |
| [`or`]  | `None`    | `Some(y)` | `Some(y)` |
| [`or`]  | `Some(x)` | (ignored) | `Some(x)` |
| [`xor`] | `None`    | `None`    | `None`    |
| [`xor`] | `None`    | `Some(y)` | `Some(y)` |
| [`xor`] | `Some(x)` | `None`    | `Some(x)` |
| [`xor`] | `Some(x)` | `Some(y)` | `None`    |

[`and`]: Option::and
[`or`]: Option::or
[`xor`]: Option::xor

The [`and_then`] and [`or_else`] methods take a function as input, and
only evaluate the function when they need to produce a new value. Only
the [`and_then`] method can produce an [`Option<U>`] value having a
different inner type `U` than [`Option<T>`].

| method       | self      | function input | function result | output    |
|--------------|-----------|----------------|-----------------|-----------|
| [`and_then`] | `None`    | (not provided) | (not evaluated) | `None`    |
| [`and_then`] | `Some(x)` | `x`            | `None`          | `None`    |
| [`and_then`] | `Some(x)` | `x`            | `Some(y)`       | `Some(y)` |
| [`or_else`]  | `None`    | (not provided) | `None`          | `None`    |
| [`or_else`]  | `None`    | (not provided) | `Some(y)`       | `Some(y)` |
| [`or_else`]  | `Some(x)` | (not provided) | (not evaluated) | `Some(x)` |

[`and_then`]: Option::and_then
[`or_else`]: Option::or_else

This is an example of using methods like [`and_then`] and [`or`] in a
pipeline of method calls. Early stages of the pipeline pass failure
values ([`None`]) through unchanged, and continue processing on
success values ([`Some`]). Toward the end, [`or`] substitutes an error
message if it receives [`None`].

```
# use std::collections::BTreeMap;
let mut bt = BTreeMap::new();
bt.insert(20u8, "foo");
bt.insert(42u8, "bar");
let res = [0u8, 1, 11, 200, 22]
    .into_iter()
    .map(|x| {
        // `checked_sub()` returns `None` on error
        x.checked_sub(1)
            // same with `checked_mul()`
            .and_then(|x| x.checked_mul(2))
            // `BTreeMap::get` returns `None` on error
            .and_then(|x| bt.get(&x))
            // Substitute an error message if we have `None` so far
            .or(Some(&"error!"))
            .copied()
            // Won't panic because we unconditionally used `Some` above
            .unwrap()
    })
    .collect::<Vec<_>>();
assert_eq!(res, ["error!", "error!", "foo", "error!", "bar"]);
```

## Comparison operators

If `T` implements [`PartialOrd`] then [`Option<T>`] will derive its
[`PartialOrd`] implementation.  With this order, [`None`] compares as
less than any [`Some`], and two [`Some`] compare the same way as their
contained values would in `T`.  If `T` also implements
[`Ord`], then so does [`Option<T>`].

```
assert!(None < Some(0));
assert!(Some(0) < Some(1));
```

## Iterating over `Option`

An [`Option`] can be iterated over. This can be helpful if you need an
iterator that is conditionally empty. The iterator will either produce
a single value (when the [`Option`] is [`Some`]), or produce no values
(when the [`Option`] is [`None`]). For example, [`into_iter`] acts like
[`once(v)`] if the [`Option`] is [`Some(v)`], and like [`empty()`] if
the [`Option`] is [`None`].

[`Some(v)`]: Some
[`empty()`]: crate::iter::empty
[`once(v)`]: crate::iter::once

Iterators over [`Option<T>`] come in three types:

* [`into_iter`] consumes the [`Option`] and produces the contained
  value
* [`iter`] produces an immutable reference of type `&T` to the
  contained value
* [`iter_mut`] produces a mutable reference of type `&mut T` to the
  contained value

[`into_iter`]: Option::into_iter
[`iter`]: Option::iter
[`iter_mut`]: Option::iter_mut

An iterator over [`Option`] can be useful when chaining iterators, for
example, to conditionally insert items. (It's not always necessary to
explicitly call an iterator constructor: many [`Iterator`] methods that
accept other iterators will also accept iterable types that implement
[`IntoIterator`], which includes [`Option`].)

```
let yep = Some(42);
let nope = None;
// chain() already calls into_iter(), so we don't have to do so
let nums: Vec<i32> = (0..4).chain(yep).chain(4..8).collect();
assert_eq!(nums, [0, 1, 2, 3, 42, 4, 5, 6, 7]);
let nums: Vec<i32> = (0..4).chain(nope).chain(4..8).collect();
assert_eq!(nums, [0, 1, 2, 3, 4, 5, 6, 7]);
```

One reason to chain iterators in this way is that a function returning
`impl Iterator` must have all possible return values be of the same
concrete type. Chaining an iterated [`Option`] can help with that.

```
fn make_iter(do_insert: bool) -> impl Iterator<Item = i32> {
    // Explicit returns to illustrate return types matching
    match do_insert {
        true => return (0..4).chain(Some(42)).chain(4..8),
        false => return (0..4).chain(None).chain(4..8),
    }
}
println!("{:?}", make_iter(true).collect::<Vec<_>>());
println!("{:?}", make_iter(false).collect::<Vec<_>>());
```

If we try to do the same thing, but using [`once()`] and [`empty()`],
we can't return `impl Iterator` anymore because the concrete types of
the return values differ.

[`empty()`]: crate::iter::empty
[`once()`]: crate::iter::once

```compile_fail,E0308
# use std::iter::{empty, once};
// This won't compile because all possible returns from the function
// must have the same concrete type.
fn make_iter(do_insert: bool) -> impl Iterator<Item = i32> {
    // Explicit returns to illustrate return types not matching
    match do_insert {
        true => return (0..4).chain(once(42)).chain(4..8),
        false => return (0..4).chain(empty()).chain(4..8),
    }
}
```

## Collecting into `Option`

[`Option`] implements the [`FromIterator`][impl-FromIterator] trait,
which allows an iterator over [`Option`] values to be collected into an
[`Option`] of a collection of each contained value of the original
[`Option`] values, or [`None`] if any of the elements was [`None`].

[impl-FromIterator]: Option#impl-FromIterator%3COption%3CT%3E%3E-for-Option%3CV%3E

```
let v = [Some(2), Some(4), None, Some(8)];
let res: Option<Vec<_>> = v.into_iter().collect();
assert_eq!(res, None);
let v = [Some(2), Some(4), Some(8)];
let res: Option<Vec<_>> = v.into_iter().collect();
assert_eq!(res, Some(vec![2, 4, 8]));
```

[`Option`] also implements the [`Product`][impl-Product] and
[`Sum`][impl-Sum] traits, allowing an iterator over [`Option`] values
to provide the [`product`][Iterator::product] and
[`sum`][Iterator::sum] methods.

[impl-Product]: Option#impl-Product%3COption%3CU%3E%3E-for-Option%3CT%3E
[impl-Sum]: Option#impl-Sum%3COption%3CU%3E%3E-for-Option%3CT%3E

```
let v = [None, Some(1), Some(2), Some(3)];
let res: Option<i32> = v.into_iter().sum();
assert_eq!(res, None);
let v = [Some(1), Some(2), Some(21)];
let res: Option<i32> = v.into_iter().product();
assert_eq!(res, Some(42));
```

## Modifying an [`Option`] in-place

These methods return a mutable reference to the contained value of an
[`Option<T>`]:

* [`insert`] inserts a value, dropping any old contents
* [`get_or_insert`] gets the current value, inserting a provided
  default value if it is [`None`]
* [`get_or_insert_default`] gets the current value, inserting the
  default value of type `T` (which must implement [`Default`]) if it is
  [`None`]
* [`get_or_insert_with`] gets the current value, inserting a default
  computed by the provided function if it is [`None`]

[`get_or_insert`]: Option::get_or_insert
[`get_or_insert_default`]: Option::get_or_insert_default
[`get_or_insert_with`]: Option::get_or_insert_with
[`insert`]: Option::insert

These methods transfer ownership of the contained value of an
[`Option`]:

* [`take`] takes ownership of the contained value of an [`Option`], if
  any, replacing the [`Option`] with [`None`]
* [`replace`] takes ownership of the contained value of an [`Option`],
  if any, replacing the [`Option`] with a [`Some`] containing the
  provided value

[`replace`]: Option::replace
[`take`]: Option::take

# Examples

Basic pattern matching on [`Option`]:

```
let msg = Some("howdy");

// Take a reference to the contained string
if let Some(m) = &msg {
    println!("{}", *m);
}

// Remove the contained string, destroying the Option
let unwrapped_msg = msg.unwrap_or("default message");
```

Initialize a result to [`None`] before a loop:

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
```

## enum Option

```rust
pub enum Option<T>
```

The `Option` type. See [the module level documentation](self) for more.

## Option::is_some

```rust
pub const fn is_some(&self) -> bool
```

Returns `true` if the option is a [`Some`] value.

# Examples

```
let x: Option<u32> = Some(2);
assert_eq!(x.is_some(), true);

let x: Option<u32> = None;
assert_eq!(x.is_some(), false);
```

## Option::is_some_and

```rust
pub const fn is_some_and(self, f: impl [const] FnOnce(T) -> bool + [const] Destruct) -> bool
```

Returns `true` if the option is a [`Some`] and the value inside of it matches a predicate.

# Examples

```
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

Returns `true` if the option is a [`None`] value.

# Examples

```
let x: Option<u32> = Some(2);
assert_eq!(x.is_none(), false);

let x: Option<u32> = None;
assert_eq!(x.is_none(), true);
```

## Option::is_none_or

```rust
pub const fn is_none_or(self, f: impl [const] FnOnce(T) -> bool + [const] Destruct) -> bool
```

Returns `true` if the option is a [`None`] or the value inside of it matches a predicate.

# Examples

```
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
without moving the [`String`]. The [`map`] method takes the `self` argument by value,
consuming the original, so this technique uses `as_ref` to first take an `Option` to a
reference to the value inside the original.

[`map`]: Option::map
[String]: ../../std/string/struct.String.html "String"
[`String`]: ../../std/string/struct.String.html "String"

```
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

```
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

[&]: reference "shared reference"

## Option::as_pin_mut

```rust
pub const fn as_pin_mut(self: Pin<&mut Self>) -> Option<Pin<&mut T>>
```

Converts from <code>[Pin]<[&mut] Option\<T>></code> to <code>Option<[Pin]<[&mut] T>></code>.

[&mut]: reference "mutable reference"

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
borrowing) [`[_]::first`](slice::first):

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
is [`[_]::first_mut`](slice::first_mut):

```rust
assert_eq!(Some(123).as_mut_slice().first_mut(), Some(&mut 123))
```

## Option::expect

```rust
pub const fn expect(self, msg: &str) -> T
```

Returns the contained [`Some`] value, consuming the `self` value.

# Panics

Panics if the value is a [`None`] with a custom panic message provided by
`msg`.

# Examples

```
let x = Some("value");
assert_eq!(x.expect("fruits are healthy"), "value");
```

```should_panic
let x: Option<&str> = None;
x.expect("fruits are healthy"); // panics with `fruits are healthy`
```

# Recommended Message Style

We recommend that `expect` messages are used to describe the reason you
_expect_ the `Option` should be `Some`.

```should_panic
# let slice: &[u8] = &[];
let item = slice.get(0)
    .expect("slice should not be empty");
```

**Hint**: If you're having trouble remembering how to phrase expect
error messages remember to focus on the word "should" as in "env
variable should be set by blah" or "the given binary should be available
and executable by the current user".

For more detail on expect message styles and the reasoning behind our
recommendation please refer to the section on ["Common Message
Styles"](../../std/error/index.html#common-message-styles) in the [`std::error`](../../std/error/index.html) module docs.

## Option::unwrap

```rust
pub const fn unwrap(self) -> T
```

Returns the contained [`Some`] value, consuming the `self` value.

Because this function may panic, its use is generally discouraged.
Panics are meant for unrecoverable errors, and
[may abort the entire program][panic-abort].

Instead, prefer to use pattern matching and handle the [`None`]
case explicitly, or call [`unwrap_or`], [`unwrap_or_else`], or
[`unwrap_or_default`]. In functions returning `Option`, you can use
[the `?` (try) operator][try-option].

[panic-abort]: https://doc.rust-lang.org/book/ch09-01-unrecoverable-errors-with-panic.html
[try-option]: https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html#where-the--operator-can-be-used
[`unwrap_or`]: Option::unwrap_or
[`unwrap_or_else`]: Option::unwrap_or_else
[`unwrap_or_default`]: Option::unwrap_or_default

# Panics

Panics if the self value equals [`None`].

# Examples

```
let x = Some("air");
assert_eq!(x.unwrap(), "air");
```

```should_panic
let x: Option<&str> = None;
assert_eq!(x.unwrap(), "air"); // fails
```

## Option::unwrap_or

```rust
pub const fn unwrap_or(self, default: T) -> T where T: [const] Destruct,
```

Returns the contained [`Some`] value or a provided default.

Arguments passed to `unwrap_or` are eagerly evaluated; if you are passing
the result of a function call, it is recommended to use [`unwrap_or_else`],
which is lazily evaluated.

[`unwrap_or_else`]: Option::unwrap_or_else

# Examples

```
assert_eq!(Some("car").unwrap_or("bike"), "car");
assert_eq!(None.unwrap_or("bike"), "bike");
```

## Option::unwrap_or_else

```rust
pub const fn unwrap_or_else<F>(self, f: F) -> T where F: [const] FnOnce() -> T + [const] Destruct,
```

Returns the contained [`Some`] value or computes it from a closure.

# Examples

```
let k = 10;
assert_eq!(Some(4).unwrap_or_else(|| 2 * k), 4);
assert_eq!(None.unwrap_or_else(|| 2 * k), 20);
```

## Option::unwrap_or_default

```rust
pub const fn unwrap_or_default(self) -> T where T: [const] Default,
```

Returns the contained [`Some`] value or a default.

Consumes the `self` argument then, if [`Some`], returns the contained
value, otherwise if [`None`], returns the [default value] for that
type.

# Examples

```
let x: Option<u32> = None;
let y: Option<u32> = Some(12);

assert_eq!(x.unwrap_or_default(), 0);
assert_eq!(y.unwrap_or_default(), 12);
```

[default value]: Default::default
[`parse`]: str::parse
[`FromStr`]: crate::str::FromStr

## Option::unwrap_unchecked

```rust
pub const unsafe fn unwrap_unchecked(self) -> T
```

Returns the contained [`Some`] value, consuming the `self` value,
without checking that the value is not [`None`].

# Safety

Calling this method on [`None`] is *[undefined behavior]*.

[undefined behavior]: https://doc.rust-lang.org/reference/behavior-considered-undefined.html

# Examples

```
let x = Some("air");
assert_eq!(unsafe { x.unwrap_unchecked() }, "air");
```

```no_run
let x: Option<&str> = None;
assert_eq!(unsafe { x.unwrap_unchecked() }, "air"); // Undefined behavior!
```

## Option::map

```rust
pub const fn map<U, F>(self, f: F) -> Option<U> where F: [const] FnOnce(T) -> U + [const] Destruct,
```

Maps an `Option<T>` to `Option<U>` by applying a function to a contained value (if `Some`) or returns `None` (if `None`).

# Examples

Calculates the length of an <code>Option<[String]></code> as an
<code>Option<[usize]></code>, consuming the original:

[String]: ../../std/string/struct.String.html "String"
```
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

Calls a function with a reference to the contained value if [`Some`].

Returns the original option.

# Examples

```
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
the result of a function call, it is recommended to use [`map_or_else`],
which is lazily evaluated.

[`map_or_else`]: Option::map_or_else

# Examples

```
let x = Some("foo");
assert_eq!(x.map_or(42, |v| v.len()), 3);

let x: Option<&str> = None;
assert_eq!(x.map_or(42, |v| v.len()), 42);
```

## Option::map_or_else

```rust
pub const fn map_or_else<U, D, F>(self, default: D, f: F) -> U where D: [const] FnOnce() -> U + [const] Destruct, F: [const] FnOnce(T) -> U + [const] Destruct,
```

Computes a default function result (if none), or
applies a different function to the contained value (if any).

# Basic examples

```
let k = 21;

let x = Some("foo");
assert_eq!(x.map_or_else(|| 2 * k, |v| v.len()), 3);

let x: Option<&str> = None;
assert_eq!(x.map_or_else(|| 2 * k, |v| v.len()), 42);
```

# Handling a Result-based fallback

A somewhat common occurrence when dealing with optional values
in combination with [`Result<T, E>`] is the case where one wants to invoke
a fallible fallback if the option is not present.  This example
parses a command line argument (if present), or the contents of a file to
an integer.  However, unlike accessing the command line argument, reading
the file is fallible, so it must be wrapped with `Ok`.

```no_run
# fn main() -> Result<(), Box<dyn std::error::Error>> {
let v: u64 = std::env::args()
   .nth(1)
   .map_or_else(|| std::fs::read_to_string("/etc/someconfig.conf"), Ok)?
   .parse()?;
#   Ok(())
# }
```

## Option::map_or_default

```rust
pub const fn map_or_default<U, F>(self, f: F) -> U where U: [const] Default, F: [const] FnOnce(T) -> U + [const] Destruct,
```

Maps an `Option<T>` to a `U` by applying function `f` to the contained
value if the option is [`Some`], otherwise if [`None`], returns the
[default value] for the type `U`.

# Examples

```
let x: Option<&str> = Some("hi");
let y: Option<&str> = None;

assert_eq!(x.map_or_default(|x| x.len()), 2);
assert_eq!(y.map_or_default(|y| y.len()), 0);
```

[default value]: Default::default

## Option::ok_or

```rust
pub const fn ok_or<E: [const] Destruct>(self, err: E) -> Result<T, E>
```

Transforms the `Option<T>` into a [`Result<T, E>`], mapping [`Some(v)`] to
[`Ok(v)`] and [`None`] to [`Err(err)`].

Arguments passed to `ok_or` are eagerly evaluated; if you are passing the
result of a function call, it is recommended to use [`ok_or_else`], which is
lazily evaluated.

[`Ok(v)`]: Ok
[`Err(err)`]: Err
[`Some(v)`]: Some
[`ok_or_else`]: Option::ok_or_else

# Examples

```
let x = Some("foo");
assert_eq!(x.ok_or(0), Ok("foo"));

let x: Option<&str> = None;
assert_eq!(x.ok_or(0), Err(0));
```

## Option::ok_or_else

```rust
pub const fn ok_or_else<E, F>(self, err: F) -> Result<T, E> where F: [const] FnOnce() -> E + [const] Destruct,
```

Transforms the `Option<T>` into a [`Result<T, E>`], mapping [`Some(v)`] to
[`Ok(v)`] and [`None`] to [`Err(err())`].

[`Ok(v)`]: Ok
[`Err(err())`]: Err
[`Some(v)`]: Some

# Examples

```
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
to the original one, additionally coercing the contents via [`Deref`].

# Examples

```
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
the inner type's [`Deref::Target`] type.

# Examples

```
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

```
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

```
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

Returns [`None`] if the option is [`None`], otherwise returns `optb`.

Arguments passed to `and` are eagerly evaluated; if you are passing the
result of a function call, it is recommended to use [`and_then`], which is
lazily evaluated.

[`and_then`]: Option::and_then

# Examples

```
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

Returns [`None`] if the option is [`None`], otherwise calls `f` with the
wrapped value and returns the result.

Some languages call this operation flatmap.

# Examples

```
fn sq_then_to_string(x: u32) -> Option<String> {
    x.checked_mul(x).map(|sq| sq.to_string())
}

assert_eq!(Some(2).and_then(sq_then_to_string), Some(4.to_string()));
assert_eq!(Some(1_000_000).and_then(sq_then_to_string), None); // overflowed!
assert_eq!(None.and_then(sq_then_to_string), None);
```

Often used to chain fallible operations that may return [`None`].

```
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

Returns [`None`] if the option is [`None`], otherwise calls `predicate`
with the wrapped value and returns:

- [`Some(t)`] if `predicate` returns `true` (where `t` is the wrapped
  value), and
- [`None`] if `predicate` returns `false`.

This function works similar to [`Iterator::filter()`]. You can imagine
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

[`Some(t)`]: Some

## Option::or

```rust
pub const fn or(self, optb: Option<T>) -> Option<T> where T: [const] Destruct,
```

Returns the option if it contains a value, otherwise returns `optb`.

Arguments passed to `or` are eagerly evaluated; if you are passing the
result of a function call, it is recommended to use [`or_else`], which is
lazily evaluated.

[`or_else`]: Option::or_else

# Examples

```
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

```
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

Returns [`Some`] if exactly one of `self`, `optb` is [`Some`], otherwise returns [`None`].

# Examples

```
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

See also [`Option::get_or_insert`], which doesn't update the value if
the option already contains [`Some`].

# Example

```
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

Inserts `value` into the option if it is [`None`], then
returns a mutable reference to the contained value.

See also [`Option::insert`], which updates the value even if
the option already contains [`Some`].

# Examples

```
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

Inserts the default value into the option if it is [`None`], then
returns a mutable reference to the contained value.

# Examples

```
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

Inserts a value computed from `f` into the option if it is [`None`],
then returns a mutable reference to the contained value.

# Examples

```
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

Takes the value out of the option, leaving a [`None`] in its place.

# Examples

```
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
This method operates similar to [`Option::take`] but conditional.

# Examples

```
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
leaving a [`Some`] in its place without deinitializing either one.

# Examples

```
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

```
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

```
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

```
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

```
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

```
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

```
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

Transposes an `Option` of a [`Result`] into a [`Result`] of an `Option`.

<code>[Some]\([Ok]\(\_))</code> is mapped to <code>[Ok]\([Some]\(\_))</code>,
<code>[Some]\([Err]\(\_))</code> is mapped to <code>[Err]\(\_)</code>,
and [`None`] will be mapped to <code>[Ok]\([None])</code>.

# Examples

```
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

An iterator over a reference to the [`Some`] variant of an [`Option`].

The iterator yields one value if the [`Option`] is a [`Some`], otherwise none.

This `struct` is created by the [`Option::iter`] function.

## struct IterMut

```rust
pub struct IterMut<'a, A: 'a>
```

An iterator over a mutable reference to the [`Some`] variant of an [`Option`].

The iterator yields one value if the [`Option`] is a [`Some`], otherwise none.

This `struct` is created by the [`Option::iter_mut`] function.

## ::IntoIter

```rust
pub struct IntoIter<A>
```

An iterator over the value in [`Some`] variant of an [`Option`].

The iterator yields one value if the [`Option`] is a [`Some`], otherwise none.

This `struct` is created by the [`Option::into_iter`] function.

## Option::flatten

```rust
pub const fn flatten(self) -> Option<T>
```

Converts from `Option<Option<T>>` to `Option<T>`.

# Examples

Basic usage:

```
let x: Option<Option<u32>> = Some(Some(6));
assert_eq!(Some(6), x.flatten());

let x: Option<Option<u32>> = Some(None);
assert_eq!(None, x.flatten());

let x: Option<Option<u32>> = None;
assert_eq!(None, x.flatten());
```

Flattening only removes one level of nesting at a time:

```
let x: Option<Option<Option<u32>>> = Some(Some(Some(6)));
assert_eq!(Some(Some(6)), x.flatten());
assert_eq!(Some(6), x.flatten().flatten());
```