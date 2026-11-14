---
title: "core::marker::variance"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/marker/variance.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::marker::variance

## name::new

```rust
pub const fn new() -> Self
```

Constructs a new instance of the variance marker.

## name::new

```rust
pub const fn new() -> Self
```

Constructs a new instance of the variance marker.

## struct PhantomCovariantLifetime

```rust
pub struct PhantomCovariantLifetime<'a>(PhantomCovariant<&'a ()>)
```

Zero-sized type used to mark a lifetime as covariant.

Covariant lifetimes must live at least as long as declared. See the reference for more
information.

Note: If `'a` is otherwise contravariant or invariant, the resulting type is invariant.

## Layout

For all `'a`, the following are guaranteed:
* `size_of::<PhantomCovariantLifetime<'a>>() == 0`
* `align_of::<PhantomCovariantLifetime<'a>>() == 1`

## struct PhantomContravariantLifetime

```rust
pub struct PhantomContravariantLifetime<'a>(PhantomContravariant<&'a ()>)
```

Zero-sized type used to mark a lifetime as contravariant.

Contravariant lifetimes must live at most as long as declared. See the reference for
more information.

Note: If `'a` is otherwise covariant or invariant, the resulting type is invariant.

## Layout

For all `'a`, the following are guaranteed:
* `size_of::<PhantomContravariantLifetime<'a>>() == 0`
* `align_of::<PhantomContravariantLifetime<'a>>() == 1`

## struct PhantomInvariantLifetime

```rust
pub struct PhantomInvariantLifetime<'a>(PhantomInvariant<&'a ()>)
```

Zero-sized type used to mark a lifetime as invariant.

Invariant lifetimes must be live for the exact length declared, neither shorter nor longer.
See the reference for more information.

## Layout

For all `'a`, the following are guaranteed:
* `size_of::<PhantomInvariantLifetime<'a>>() == 0`
* `align_of::<PhantomInvariantLifetime<'a>>() == 1`

## struct PhantomCovariant

```rust
pub struct PhantomCovariant<T>(PhantomData<fn() -> T>)
```

Zero-sized type used to mark a type parameter as covariant.

Types used as part of the return value from a function are covariant. If the type is _also_
passed as a parameter then it is invariant. See the reference for
more information.

Note: If `T` is otherwise contravariant or invariant, the resulting type is invariant.

## Layout

For all `T`, the following are guaranteed:
* `size_of::<PhantomCovariant<T>>() == 0`
* `align_of::<PhantomCovariant<T>>() == 1`

## struct PhantomContravariant

```rust
pub struct PhantomContravariant<T>(PhantomData<fn(T)>)
```

Zero-sized type used to mark a type parameter as contravariant.

Types passed as arguments to a function are contravariant. If the type is _also_ part of the
return value from a function then it is invariant. See the
reference for more information.

Note: If `T` is otherwise covariant or invariant, the resulting type is invariant.

## Layout

For all `T`, the following are guaranteed:
* `size_of::<PhantomContravariant<T>>() == 0`
* `align_of::<PhantomContravariant<T>>() == 1`

## struct PhantomInvariant

```rust
pub struct PhantomInvariant<T>(PhantomData<fn(T) -> T>)
```

Zero-sized type used to mark a type parameter as invariant.

Types that are both passed as an argument _and_ used as part of the return value from a
function are invariant. See the reference for more information.

## Layout

For all `T`, the following are guaranteed:
* `size_of::<PhantomInvariant<T>>() == 0`
* `align_of::<PhantomInvariant<T>>() == 1`

## trait Variance

```rust
pub trait Variance: private_items::PrivateItems + Default
```

A marker trait for phantom variance types.

## Variance::variance

```rust
pub const fn variance<T>() -> T where T: Variance,
```

Construct a variance marker; equivalent to `Default::default`.

This type can be any of the following. You generally should not need to explicitly name the
type, however.

- `PhantomCovariant`
- `PhantomContravariant`
- `PhantomInvariant`
- `PhantomCovariantLifetime`
- `PhantomContravariantLifetime`
- `PhantomInvariantLifetime`

# Example

```rust
#![feature(phantom_variance_markers)]

use core::marker::{PhantomCovariant, variance};

struct BoundFn<F, P, R>
where
    F: Fn(P) -> R,
{
    function: F,
    parameter: P,
    return_value: PhantomCovariant<R>,
}

let bound_fn = BoundFn {
    function: core::convert::identity,
    parameter: 5u8,
    return_value: variance(),
};
```
