---
title: "core::option (part 1 of 4)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/option.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::option

Optional values.

Type `Option` represents an optional value: every `Option`
is either `Some` and contains a value, or `None`, and
does not. `Option` types are very common in Rust code, as
they have a number of uses:

* Initial values
* Return values for functions that are not defined
  over their entire input range (partial functions)
* Return value for otherwise reporting simple errors, where `None` is
  returned on error
* Optional struct fields
* Struct fields that can be loaned or "taken"
* Optional function arguments
* Nullable pointers
* Swapping things out of difficult situations

`Option`s are commonly paired with pattern matching to query the presence
of a value and take action, always accounting for the `None` case.

```rust
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

#### Options and pointers ("nullable" pointers)

Rust's pointer types must always point to a valid location; there are
no "null" references. Instead, Rust has *optional* pointers, like
the optional owned box, <code>[Option]<[Box\<T>]></code>.

The following example uses `Option` to create an optional box of
`i32`. Notice that in order to use the inner `i32` value, the
`check_optional` function first needs to use pattern matching to
determine whether the box has a value (i.e., it is `Some(...)``Some`) or
not (`None`).

```rust
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

#### The question mark operator, `?`

Similar to the `Result` type, when writing code that calls many functions that return the
`Option` type, handling `Some`/`None` can be tedious. The question mark
operator, `?`, hides some of the boilerplate of propagating values
up the call stack.

It replaces this:

```rust
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

```rust
fn add_last_numbers(stack: &mut Vec<i32>) -> Option<i32> {
    Some(stack.pop()? + stack.pop()?)
}
```

*It's much nicer!*

Ending the expression with `?` will result in the `Some`'s unwrapped value, unless the
result is `None`, in which case `None` is returned early from the enclosing function.

`?` can be used in functions that return `Option` because of the
early return of `None` that it provides.

#### Representation

Rust guarantees to optimize the following types `T` such that `Option<T>`
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
| `Box` (specifically, only `Box`)                    | when `U: Sized`                                                            |
| `&U`                                                                | when `U: Sized`                                                            |
| `&mut U`                                                            | when `U: Sized`                                                            |
| `fn`, `extern "C" fn`[^extern_fn]                                   | always                                                                     |
| `num::NonZero*`                                                   | always                                                                     |
| `ptr::NonNull`                                                 | when `U: Sized`                                                            |
| `#[repr(transparent)]` struct around one of the types in this list. | when it holds for the inner type                                           |

Under some conditions the above types `T` are also null pointer optimized when wrapped in a `Result`[result_repr].

This is called the "null pointer optimization" or NPO.

It is further guaranteed that, for the cases above, one can
`mem::transmute` from all valid values of `T` to `Option<T>` and
from `Some::<T>(_)` to `T` (but transmuting `None::<T>` to `T`
is undefined behavior).

#### Method overview

In addition to working with pattern matching, `Option` provides a wide
variety of different methods.

#### Querying the variant

The `is_some` and `is_none` methods return `true` if the `Option`
is `Some` or `None`, respectively.

The `is_some_and` and `is_none_or` methods apply the provided function
to the contents of the `Option` to produce a boolean value.
If this is `None` then a default result is returned instead without executing the function.

#### Adapters for working with references

* `as_ref` converts from <code>&[Option]\<T></code> to <code>[Option]<[&]T></code>
* `as_mut` converts from <code>[&mut] [Option]\<T></code> to <code>[Option]<[&mut] T></code>
* `as_deref` converts from <code>&[Option]\<T></code> to
  <code>[Option]<[&]T::[Target]></code>
* `as_deref_mut` converts from <code>[&mut] [Option]\<T></code> to
  <code>[Option]<[&mut] T::[Target]></code>
* `as_pin_ref` converts from <code>[Pin]<&[Option]\<T>></code> to
  <code>[Option]<[Pin]<[&]T>></code>
* `as_pin_mut` converts from <code>[Pin]<[&mut] [Option]\<T>></code> to
  <code>[Option]<[Pin]<[&mut] T>></code>
* `as_slice` returns a one-element slice of the contained value, if any.
  If this is `None`, an empty slice is returned.
* `as_mut_slice` returns a mutable one-element slice of the contained value, if any.
  If this is `None`, an empty slice is returned.

#### Extracting the contained value

These methods extract the contained value in an `Option<T>` when it
is the `Some` variant. If the `Option` is `None`:

* `expect` panics with a provided custom message
* `unwrap` panics with a generic message
* `unwrap_or` returns the provided default value
* `unwrap_or_default` returns the default value of the type `T`
  (which must implement the `Default` trait)
* `unwrap_or_else` returns the result of evaluating the provided
  function
* `unwrap_unchecked` produces *[undefined behavior]*

#### Transforming contained values

These methods transform `Option` to `Result`:

* `ok_or` transforms `Some(v)` to `Ok(v)`, and `None` to
  `Err(err)` using the provided default `err` value
* `ok_or_else` transforms `Some(v)` to `Ok(v)`, and `None` to
  a value of `Err` using the provided function
* `transpose` transposes an `Option` of a `Result` into a
  `Result` of an `Option`

These methods transform the `Some` variant:

* `filter` calls the provided predicate function on the contained
  value `t` if the `Option` is `Some(t)`, and returns `Some(t)`
  if the function returns `true`; otherwise, returns `None`
* `flatten` removes one level of nesting from an `Option<Option<T>>`
* `inspect` method takes ownership of the `Option` and applies
  the provided function to the contained value by reference if `Some`
* `map` transforms `Option<T>` to `Option` by applying the
  provided function to the contained value of `Some` and leaving
  `None` values unchanged

These methods transform `Option<T>` to a value of a possibly
different type `U`:

* `map_or` applies the provided function to the contained value of
  `Some`, or returns the provided default value if the `Option` is
  `None`
* `map_or_else` applies the provided function to the contained value
  of `Some`, or returns the result of evaluating the provided
  fallback function if the `Option` is `None`

These methods combine the `Some` variants of two `Option` values:

* `zip` returns `Some((s, o))` if `self` is `Some(s)` and the
  provided `Option` value is `Some(o)`; otherwise, returns `None`
* `zip_with` calls the provided function `f` and returns
  `Some(f(s, o))` if `self` is `Some(s)` and the provided
  `Option` value is `Some(o)`; otherwise, returns `None`

#### Boolean operators

These methods treat the `Option` as a boolean value, where `Some`
acts like `true` and `None` acts like `false`. There are two
categories of these methods: ones that take an `Option` as input, and
ones that take a function as input (to be lazily evaluated).

The `and`, `or`, and `xor` methods take another `Option` as
input, and produce an `Option` as output. Only the `and` method can
produce an `Option` value having a different inner type `U` than
`Option<T>`.

| method  | self      | input     | output    |
|---------|-----------|-----------|-----------|
| `and` | `None`    | (ignored) | `None`    |
| `and` | `Some(x)` | `None`    | `None`    |
| `and` | `Some(x)` | `Some(y)` | `Some(y)` |
| `or`  | `None`    | `None`    | `None`    |
| `or`  | `None`    | `Some(y)` | `Some(y)` |
| `or`  | `Some(x)` | (ignored) | `Some(x)` |
| `xor` | `None`    | `None`    | `None`    |
| `xor` | `None`    | `Some(y)` | `Some(y)` |
| `xor` | `Some(x)` | `None`    | `Some(x)` |
| `xor` | `Some(x)` | `Some(y)` | `None`    |

The `and_then` and `or_else` methods take a function as input, and
only evaluate the function when they need to produce a new value. Only
the `and_then` method can produce an `Option` value having a
different inner type `U` than `Option<T>`.

| method       | self      | function input | function result | output    |
|--------------|-----------|----------------|-----------------|-----------|
| `and_then` | `None`    | (not provided) | (not evaluated) | `None`    |
| `and_then` | `Some(x)` | `x`            | `None`          | `None`    |
| `and_then` | `Some(x)` | `x`            | `Some(y)`       | `Some(y)` |
| `or_else`  | `None`    | (not provided) | `None`          | `None`    |
| `or_else`  | `None`    | (not provided) | `Some(y)`       | `Some(y)` |
| `or_else`  | `Some(x)` | (not provided) | (not evaluated) | `Some(x)` |

This is an example of using methods like `and_then` and `or` in a
pipeline of method calls. Early stages of the pipeline pass <example-value>
values (`None`) through unchanged, and continue processing on
success values (`Some`). Toward the end, `or` substitutes an error
message if it receives `None`.

```rust
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

#### Comparison operators

If `T` implements `PartialOrd` then `Option<T>` will derive its
`PartialOrd` implementation.  With this order, `None` compares as
less than any `Some`, and two `Some` compare the same way as their
contained values would in `T`.  If `T` also implements
`Ord`, then so does `Option<T>`.

```rust
assert!(None < Some(0));
assert!(Some(0) < Some(1));
```

#### Iterating over `Option`

An `Option` can be iterated over. This can be helpful if you need an
iterator that is conditionally empty. The iterator will either produce
a single value (when the `Option` is `Some`), or produce no values
(when the `Option` is `None`). For example, `into_iter` acts like
`once(v)` if the `Option` is `Some(v)`, and like `empty()` if
the `Option` is `None`.

Iterators over `Option<T>` come in three types:

* `into_iter` consumes the `Option` and produces the contained
  value
* `iter` produces an immutable reference of type `&T` to the
  contained value
* `iter_mut` produces a mutable reference of type `&mut T` to the
  contained value

An iterator over `Option` can be useful when chaining iterators, for
example, to conditionally insert items. (It's not always necessary to
explicitly call an iterator constructor: many `Iterator` methods that
accept other iterators will also accept iterable types that implement
`IntoIterator`, which includes `Option`.)

```rust
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
concrete type. Chaining an iterated `Option` can help with that.

```rust
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

If we try to do the same thing, but using `once()` and `empty()`,
we can't return `impl Iterator` anymore because the concrete types of
the return values differ.
