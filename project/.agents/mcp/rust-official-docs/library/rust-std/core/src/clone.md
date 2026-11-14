---
title: "core::clone"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/clone.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::clone

The `Clone` trait for types that cannot be 'implicitly copied'.

In Rust, some simple types are "implicitly copyable" and when you
assign them or pass them as arguments, the receiver will get a copy,
leaving the original value in place. These types do not require
allocation to copy and do not have finalizers (i.e., they do not
contain owned boxes or implement `Drop`), so the compiler considers
them cheap and safe to copy. For other types copies must be made
explicitly, by convention implementing the `Clone` trait and calling
the `clone` method.

Basic usage example:

```rust
let s = String::new(); // String type implements Clone
let copy = s.clone(); // so we can clone it
```

To easily implement the Clone trait, you can also use
`#[derive(Clone)]`. Example:

```rust
#[derive(Clone)] // we add the Clone trait to Morpheus struct
struct Morpheus {
   blue_pill: f32,
   red_pill: i64,
}

fn main() {
   let f = Morpheus { blue_pill: 0.0, red_pill: 0 };
   let copy = f.clone(); // and now we can clone it!
}
```

## trait Clone

```rust
pub const trait Clone: Sized
```

A common trait that allows explicit creation of a duplicate value.

Calling `clone` always produces a new value.
However, for types that are references to other data (such as smart pointers or references),
the new value may still point to the same underlying data, rather than duplicating it.
See `Clone::clone` for more details.

This distinction is especially important when using `#[derive(Clone)]` on structs containing
smart pointers like `Arc<Mutex<T>>` - the cloned struct will share mutable state with the
original.

Differs from `Copy` in that `Copy` is implicit and an inexpensive bit-wise copy, while
`Clone` is always explicit and may or may not be expensive. `Copy` has no methods, so you
cannot change its behavior, but when implementing `Clone`, the `clone` method you provide
may run arbitrary code.

Since `Clone` is a supertrait of `Copy`, any type that implements `Copy` must also implement
`Clone`.

## Derivable

This trait can be used with `#[derive]` if all fields are `Clone`. The `derive`d
implementation of `Clone` calls `clone` on each field.

For a generic struct, `#[derive]` implements `Clone` conditionally by adding bound `Clone` on
generic parameters.

```rust
// `derive` implements Clone for Reading<T> when T is Clone.
#[derive(Clone)]
struct Reading<T> {
    frequency: T,
}
```

## How can I implement `Clone`?

Types that are `Copy` should have a trivial implementation of `Clone`. More formally:
if `T: Copy`, `x: T`, and `y: &T`, then `let x = y.clone();` is equivalent to `let x = *y;`.
Manual implementations should be careful to uphold this invariant; however, unsafe code
must not rely on it to ensure memory safety.

An example is a generic struct holding a function pointer. In this case, the
implementation of `Clone` cannot be `derive`d, but can be implemented as:

```rust
struct Generate<T>(fn() -> T);

impl<T> Copy for Generate<T> {}

impl<T> Clone for Generate<T> {
    fn clone(&self) -> Self {
        *self
    }
}
```

If we `derive`:

```rust
#[derive(Copy, Clone)]
struct Generate<T>(fn() -> T);
```

the auto-derived implementations will have unnecessary `T: Copy` and `T: Clone` bounds:

```rust

// Automatically derived
impl<T: Copy> Copy for Generate<T> { }

// Automatically derived
impl<T: Clone> Clone for Generate<T> {
    fn clone(&self) -> Generate<T> {
        Generate(Clone::clone(&self.0))
    }
}
```

The bounds are unnecessary because clearly the function itself should be
copy- and cloneable even if its return type is not:

```
#[derive(Copy, Clone)]
struct Generate<T>(fn() -> T);

struct NotCloneable;

fn generate_not_cloneable() -> NotCloneable {
    NotCloneable
}

Generate(generate_not_cloneable).clone(); // error: trait bounds were not satisfied
// Note: With the manual implementations the above line will compile.
```rust

## `Clone` and `PartialEq`/`Eq`
`Clone` is intended for the duplication of objects. Consequently, when implementing
both `Clone` and `PartialEq`, the following property is expected to hold:
```
x == x -> x.clone() == x
```rust
In other words, if an object compares equal to itself,
its clone must also compare equal to the original.

For types that also implement `Eq` – for which `x == x` always holds –
this implies that `x.clone() == x` must always be true.
Standard library collections such as
`HashMap`, `HashSet`, `BTreeMap`, `BTreeSet` and `BinaryHeap`
rely on their keys respecting this property for correct behavior.
Furthermore, these collections require that cloning a key <example-value> the outcome of the
`Hash` and `Ord` methods. Thankfully, this follows automatically from `x.clone() == x`
if `Hash` and `Ord` are correctly implemented according to their own requirements.

When deriving both `Clone` and `PartialEq` using `#[derive(Clone, PartialEq)]`
or when additionally deriving `Eq` using `#[derive(Clone, PartialEq, Eq)]`,
then this property is automatically upheld – provided that it is satisfied by
the underlying types.

Violating this property is a logic error. The behavior resulting from a logic error is not
specified, but users of the trait must ensure that such logic errors do *not* result in
undefined behavior. This means that `unsafe` code **must not** rely on this property
being satisfied.

## Additional implementors

In addition to the [implementors listed below][impls],
the following types also implement `Clone`:

* Function item types (i.e., the distinct types defined for each function)
* Function pointer types (e.g., `fn() -> i32`)
* Closure types, if they capture no value from the environment
  or if all such captured values implement `Clone` themselves.
  Note that variables captured by shared reference always implement `Clone`
  (even if the referent doesn't),
  while variables captured by mutable reference never implement `Clone`.

`HashMap`: ../../std/collections/struct.HashMap.html
`HashSet`: ../../std/collections/struct.HashSet.html
`BTreeMap`: ../../std/collections/struct.BTreeMap.html
`BTreeSet`: ../../std/collections/struct.BTreeSet.html
`BinaryHeap`: ../../std/collections/struct.BinaryHeap.html
[impls]: #implementors

## CloneToUninit::clone_to_uninit

```rust
unsafe fn clone_to_uninit(&self, dest: *mut u8)
```

Performs copy-assignment from `self` to `dest`.

This is analogous to `std::ptr::write(dest.cast(), self.clone())`,
except that `Self` may be a dynamically-sized type (`!Sized`).

Before this function is called, `dest` may point to uninitialized memory.
After this function is called, `dest` will point to initialized memory; it will be
sound to create a `&Self` reference from the pointer with the [pointer metadata]
from `self`.

# Safety

Behavior is undefined if any of the following conditions are violated:

* `dest` must be [valid] for writes for `size_of_val(self)` bytes.
* `dest` must be properly aligned to `align_of_val(self)`.

# Panics

This function may panic. (For example, it might panic if memory allocation for a clone
of a value owned by `self` fails.)
If the call panics, then `*dest` should be treated as uninitialized memory; it must not be
read or dropped, because even if it was previously valid, it may have been partially
overwritten.

The caller may wish to take care to deallocate the allocation pointed to by `dest`,
if applicable, to avoid a memory leak (but this is not a requirement).

Implementors should avoid leaking values by, upon unwinding, dropping all component values
that might have already been created. (For example, if a `[Foo]` of length 3 is being
cloned, and the second of the three calls to `Foo::clone()` unwinds, then the first `Foo`
cloned should be dropped.)
