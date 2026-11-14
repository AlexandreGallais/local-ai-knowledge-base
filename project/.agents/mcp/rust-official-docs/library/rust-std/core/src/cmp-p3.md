---
title: "core::cmp (part 3 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/cmp.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::cmp (part 3 of 3)

## fn min_by

```rust
pub const fn min_by<T: [const] Destruct, F: [const] FnOnce(&T, &T) -> Ordering>( v1: T, v2: T, compare: F, ) -> T
```

Returns the minimum of two values with respect to the specified comparison function.

Returns the first argument if the comparison determines them to be equal.

The parameter order is preserved when calling the `compare` function, i.e. `v1` is
always passed as the first argument and `v2` as the second.

# Examples

```rust
use std::cmp;

let abs_cmp = |x: &i32, y: &i32| x.abs().cmp(&y.abs());

let result = cmp::min_by(2, -1, abs_cmp);
assert_eq!(result, -1);

let result = cmp::min_by(2, -3, abs_cmp);
assert_eq!(result, 2);

let result = cmp::min_by(1, -1, abs_cmp);
assert_eq!(result, 1);
```

## fn min_by_key

```rust
pub const fn min_by_key<T, F, K>(v1: T, v2: T, mut f: F) -> T where T: [const] Destruct, F: [const] FnMut(&T) -> K + [const] Destruct, K: [const] Ord + [const] Destruct,
```

Returns the element that gives the minimum value from the specified function.

Returns the first argument if the comparison determines them to be equal.

# Examples

```rust
use std::cmp;

let result = cmp::min_by_key(2, -1, |x: &i32| x.abs());
assert_eq!(result, -1);

let result = cmp::min_by_key(2, -3, |x: &i32| x.abs());
assert_eq!(result, 2);

let result = cmp::min_by_key(1, -1, |x: &i32| x.abs());
assert_eq!(result, 1);
```

## fn max

```rust
pub const fn max<T: [const] Ord + [const] Destruct>(v1: T, v2: T) -> T
```

Compares and returns the maximum of two values.

Returns the second argument if the comparison determines them to be equal.

Internally uses an alias to `Ord::max`.

# Examples

```rust
use std::cmp;

assert_eq!(cmp::max(1, 2), 2);
assert_eq!(cmp::max(2, 2), 2);
```
```rust
use std::cmp::{self, Ordering};

#[derive(Eq)]
struct Equal(&'static str);

impl PartialEq for Equal {
    fn eq(&self, other: &Self) -> bool { true }
}
impl PartialOrd for Equal {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> { Some(Ordering::Equal) }
}
impl Ord for Equal {
    fn cmp(&self, other: &Self) -> Ordering { Ordering::Equal }
}

assert_eq!(cmp::max(Equal("v1"), Equal("v2")).0, "v2");
```

## fn max_by

```rust
pub const fn max_by<T: [const] Destruct, F: [const] FnOnce(&T, &T) -> Ordering>( v1: T, v2: T, compare: F, ) -> T
```

Returns the maximum of two values with respect to the specified comparison function.

Returns the second argument if the comparison determines them to be equal.

The parameter order is preserved when calling the `compare` function, i.e. `v1` is
always passed as the first argument and `v2` as the second.

# Examples

```rust
use std::cmp;

let abs_cmp = |x: &i32, y: &i32| x.abs().cmp(&y.abs());

let result = cmp::max_by(3, -2, abs_cmp) ;
assert_eq!(result, 3);

let result = cmp::max_by(1, -2, abs_cmp);
assert_eq!(result, -2);

let result = cmp::max_by(1, -1, abs_cmp);
assert_eq!(result, -1);
```

## fn max_by_key

```rust
pub const fn max_by_key<T, F, K>(v1: T, v2: T, mut f: F) -> T where T: [const] Destruct, F: [const] FnMut(&T) -> K + [const] Destruct, K: [const] Ord + [const] Destruct,
```

Returns the element that gives the maximum value from the specified function.

Returns the second argument if the comparison determines them to be equal.

# Examples

```rust
use std::cmp;

let result = cmp::max_by_key(3, -2, |x: &i32| x.abs());
assert_eq!(result, 3);

let result = cmp::max_by_key(1, -2, |x: &i32| x.abs());
assert_eq!(result, -2);

let result = cmp::max_by_key(1, -1, |x: &i32| x.abs());
assert_eq!(result, -1);
```

## macro impl_partial_eq_for_primitive!

```rust
macro_rules! impl_partial_eq_for_primitive
```

Implements `PartialEq` for primitive types.

Primitive types have a compiler-defined primitive implementation of `==` and `!=`.
This implements the `PartialEq` trait in terms of those primitive implementations.

NOTE: Calling this on a non-primitive type (such as `()`)
leads to an infinitely-looping self-recursive implementation.
