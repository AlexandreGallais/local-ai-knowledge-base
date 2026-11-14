---
title: "core::array"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/array/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::array

Utilities for the array primitive type.

*See also the array primitive type.*

## fn repeat

```rust
pub fn repeat<T: Clone, const N: usize>(val: T) -> [T; N]
```

Creates an array of type `[T; N]` by repeatedly cloning a value.

This is the same as `[val; N]`, but it also works for types that do not
implement `Copy`.

The provided value will be used as an element of the resulting array and
will be cloned N - 1 times to fill up the rest. If N is zero, the value
will be dropped.

# Example

Creating multiple copies of a `String`:
```rust
use std::array;

let string = "Hello there!".to_string();
let strings = array::repeat(string);
assert_eq!(strings, ["Hello there!", "Hello there!"]);
```

## fn from_fn

```rust
pub const fn from_fn<T: [const] Destruct, const N: usize, F>(f: F) -> [T; N] where F: [const] FnMut(usize) -> T + [const] Destruct,
```

Creates an array where each element is produced by calling `f` with
that element's index while walking forward through the array.

This is essentially the same as writing
```
[f(0), f(1), f(2), …, f(N - 2), f(N - 1)]
```rust
and is similar to `(0..i).map(f)`, just for arrays not iterators.

If `N == 0`, this produces an empty array without ever calling `f`.

```
// type inference is helping us here, the way `from_fn` knows how many
// elements to produce is the length of array down there: only arrays of
// equal lengths can be compared, so the const generic parameter `N` is
// inferred to be 5, thus creating array of 5 elements.

let array = core::array::from_fn(|i| i);
// indexes are:    0  1  2  3  4
assert_eq!(array, [0, 1, 2, 3, 4]);

let array2: [usize; 8] = core::array::from_fn(|i| i * 2);
// indexes are:     0  1  2  3  4  5   6   7
assert_eq!(array2, [0, 2, 4, 6, 8, 10, 12, 14]);

let bool_arr = core::array::from_fn::<_, 5, _>(|i| i % 2 == 0);
// indexes are:       0     1      2     3      4
assert_eq!(bool_arr, [true, false, true, false, true]);
```rust

You can also capture things, for example to create an array full of clones
where you can't just use `[item; N]` because it's not `Copy`:
```
let my_string: [String; 2] = std::array::from_fn(|i| format!("Hello {i}"));
assert_eq!(my_string, ["Hello 0", "Hello 1"]);
```rust

The array is generated in ascending index order, starting from the front
and going towards the back, so you can use closures with mutable state:
```
let mut state = 1;
let a = std::array::from_fn(|_| { let x = state; state *= 2; x });
assert_eq!(a, [1, 2, 4, 8, 16, 32]);
```rust

## fn from_ref

```rust
pub const fn from_ref<T>(s: &T) -> &[T; 1]
```

Converts a reference to `T` into a reference to an array of length 1 (without copying).

## fn from_mut

```rust
pub const fn from_mut<T>(s: &mut T) -> &mut [T; 1]
```

Converts a mutable reference to `T` into a mutable reference to an array of length 1 (without copying).

## struct TryFromSliceError

```rust
pub struct TryFromSliceError(())
```

The error type returned when a conversion from a slice to an array fails.

## T::map

```rust
pub const fn map<F, U>(self, f: F) -> [U; N] where F: [const] FnMut(T) -> U + [const] Destruct, U: [const] Destruct, T: [const] Destruct,
```

Returns an array of the same size as `self`, with function `f` applied to each element
in order.

If you don't necessarily need a new fixed-size array, consider using
`Iterator::map` instead.

# Note on performance and stack usage

Note that this method is *eager*.  It evaluates `f` all `N` times before
returning the new array.

That means that `arr.map(f).map(g)` is, in general, *not* equivalent to
`array.map(|x| g(f(x)))`, as the former calls `f` 4 times then `g` 4 times,
whereas the latter interleaves the calls (`fgfgfgfg`).

A consequence of this is that it can have fairly-high stack usage, especially
in debug mode or for long arrays.  The backend may be able to optimize it
away, but especially for complicated mappings it might not be able to.

If you're doing a one-step `map` and really want an array as the result,
then absolutely use this method.  Its implementation uses a bunch of tricks
to help the optimizer handle it well.  Particularly for simple arrays,
like `[u8; 3]` or `[f32; 4]`, there's nothing to be concerned about.

However, if you don't actually need an *array* of the results specifically,
just to process them, then you likely want `Iterator::map` instead.

For example, rather than doing an array-to-array map of all the elements
in the array up-front and only iterating after that completes,

```rust
for x in my_array.map(f) {
    // ...
}
```

It's often better to use an iterator along the lines of

```rust
for x in my_array.into_iter().map(f) {
    // ...
}
```

as that's more likely to avoid large temporaries.

# Examples

```rust
let x = [1, 2, 3];
let y = x.map(|v| v + 1);
assert_eq!(y, [2, 3, 4]);

let x = [1, 2, 3];
let mut temp = 0;
let y = x.map(|v| { temp += 1; v * temp });
assert_eq!(y, [1, 4, 9]);

let x = ["Ferris", "Bueller's", "Day", "Off"];
let y = x.map(|v| v.len());
assert_eq!(y, [6, 9, 3, 3]);
```

## T::as_slice

```rust
pub const fn as_slice(&self) -> &[T]
```

Returns a slice containing the entire array. Equivalent to `&s[..]`.

## T::as_mut_slice

```rust
pub const fn as_mut_slice(&mut self) -> &mut [T]
```

Returns a mutable slice containing the entire array. Equivalent to
`&mut s[..]`.

## T::each_ref

```rust
pub const fn each_ref(&self) -> [&T; N]
```

Borrows each element and returns an array of references with the same
size as `self`.

# Example

```rust
let floats = [3.1, 2.7, -1.0];
let float_refs: [&f64; 3] = floats.each_ref();
assert_eq!(float_refs, [&3.1, &2.7, &-1.0]);
```

This method is particularly useful if combined with other methods, like
`map`. This way, you can avoid moving the original
array if its elements are not `Copy`.

```rust
let strings = ["Ferris".to_string(), "♥".to_string(), "Rust".to_string()];
let is_ascii = strings.each_ref().map(|s| s.is_ascii());
assert_eq!(is_ascii, [true, false, true]);

// We can still access the original array: it has not been moved.
assert_eq!(strings.len(), 3);
```

## T::each_mut

```rust
pub const fn each_mut(&mut self) -> [&mut T; N]
```

Borrows each element mutably and returns an array of mutable references
with the same size as `self`.

# Example

```rust

let mut floats = [3.1, 2.7, -1.0];
let float_refs: [&mut f64; 3] = floats.each_mut();
*float_refs[0] = 0.0;
assert_eq!(float_refs, [&mut 0.0, &mut 2.7, &mut -1.0]);
assert_eq!(floats, [0.0, 2.7, -1.0]);
```
