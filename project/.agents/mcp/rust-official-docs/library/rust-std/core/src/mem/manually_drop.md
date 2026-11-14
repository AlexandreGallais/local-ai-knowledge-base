---
title: "core::mem::manually_drop"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/mem/manually_drop.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::mem::manually_drop

## struct ManuallyDrop

```rust
pub struct ManuallyDrop<T: ?Sized>
```

A wrapper to inhibit the compiler from automatically calling `T`’s
destructor. This wrapper is 0-cost.

`ManuallyDrop<T>` is guaranteed to have the same layout and bit validity as
`T`, and is subject to the same layout optimizations as `T`. As a
consequence, it has *no effect* on the assumptions that the compiler makes
about its contents. For example, initializing a `ManuallyDrop<&mut T>` with
`mem::zeroed` is undefined behavior. If you need to handle uninitialized
data, use `MaybeUninit<T>` instead.

Note that accessing the value inside a `ManuallyDrop<T>` is safe. This means
that a `ManuallyDrop<T>` whose content has been dropped must not be exposed
through a public safe API. Correspondingly, `ManuallyDrop::drop` is unsafe.

# `ManuallyDrop` and drop order

Rust has a well-defined [drop order] of values. To make sure that fields or
locals are dropped in a specific order, reorder the declarations such that
the implicit drop order is the correct one.

It is possible to use `ManuallyDrop` to control the drop order, but this
requires unsafe code and is hard to do correctly in the presence of
unwinding.

For example, if you want to make sure that a specific field is dropped after
the others, make it the last field of a struct:

```rust
struct Context;

struct Widget {
    children: Vec<Widget>,
    // `context` will be dropped after `children`.
    // Rust guarantees that fields are dropped in the order of declaration.
    context: Context,
}
```

# Safety hazards when storing `ManuallyDrop` in a struct or an enum.

Special care is needed when all of the conditions below are met:
* A struct or enum contains a `ManuallyDrop`.
* The `ManuallyDrop` is not inside a `union`.
* The struct or enum is part of public API, or is stored in a struct or an
  enum that is part of public API.
* There is a _safe_ function that drops the contents of the `ManuallyDrop`
  field, and it can be called outside the struct or enum's `Drop` implementation.

In particular, deriving `Debug`, `Clone`, `PartialEq`, `PartialOrd`, `Ord`,
or `Hash` on the struct or enum could be unsound, since the derived
implementations of these traits would access the `ManuallyDrop` field.

For example, in the following code, `derive(Debug)` is unsound in combination
with the `ManuallyDrop::drop` call in `Foo::new`:

```rust
#[derive(Debug)]
pub struct Foo {
    /// Invariant: this value may have been dropped!
    value: ManuallyDrop<String>,
}
impl Foo {
    pub fn new() -> Self {
        let mut temp = Self {
            value: ManuallyDrop::new(String::from("Unsafe rust is hard."))
        };
        unsafe {
            // SAFETY: `value` hasn't been dropped yet.
            ManuallyDrop::drop(&mut temp.value);
        }
        temp
    }
}
```

As one could use the `Debug` implementation to access an already dropped
field:

```
let foo = Foo::new();
println!("{foo:?}"); // Undefined behavior!
```rust

Note that similar unsoundness can arise without `derive`. The cause of the
unsoundness are public APIs which allow to access an already dropped value
inside `ManuallyDrop`.

Before Rust `1.96.0`, if you had a `ManuallyDrop<T>`, where the type `T`
was a `Box` or contained a `Box` inside, then dropping the `T` followed by
moving the `ManuallyDrop<T>` was [considered to be undefined
behavior](https://github.com/rust-lang/unsafe-code-guidelines/issues/245).
That is, the following code caused undefined behavior:

```
use std::mem::ManuallyDrop;

let mut x = ManuallyDrop::new(Box::new(42));
unsafe {
    ManuallyDrop::drop(&mut x);
}
let y = x; // Undefined behavior! (pre 1.96.0)
```rust

Note that this could also have happen with a generic type where the user of
the library providing it could substitute the generic for a `Box<_>` and
then move the library type:

```
use std::mem::ManuallyDrop;

pub struct BadOption<T> {
    // Invariant: Has been dropped if `is_some` is false.
    value: ManuallyDrop<T>,
    is_some: bool,
}
impl<T> BadOption<T> {
    pub fn new(value: T) -> Self {
        Self { value: ManuallyDrop::new(value), is_some: true }
    }
    pub fn change_to_none(&mut self) {
        if self.is_some {
            self.is_some = false;
            unsafe {
                // SAFETY: `value` hasn't been dropped yet, as per the invariant
                // (This is actually unsound pre rust 1.96.0!)
                ManuallyDrop::drop(&mut self.value);
            }
        }
    }
}

// In another crate:

let mut option = BadOption::new(Box::new(42));
option.change_to_none();
let option2 = option; // Undefined behavior! (pre 1.96)
```rust

[drop order]: https://doc.rust-lang.org/reference/destructors.html
`mem::zeroed`: crate::mem::zeroed
`MaybeUninit<T>`: crate::mem::MaybeUninit
`MaybeUninit`: crate::mem::MaybeUninit

## ManuallyDrop::new

```rust
pub const fn new(value: T) -> ManuallyDrop<T>
```

Wrap a value to be manually dropped.

# Examples

```rust
use std::mem::ManuallyDrop;
let mut x = ManuallyDrop::new(String::from("Hello World!"));
x.truncate(5); // You can still safely operate on the value
assert_eq!(*x, "Hello");
// But `Drop` will not be run here
```

## ManuallyDrop::into_inner

```rust
pub const fn into_inner(slot: ManuallyDrop<T>) -> T
```

Extracts the value from the `ManuallyDrop` container.

This allows the value to be dropped again.

# Examples

```rust
use std::mem::ManuallyDrop;
let x = ManuallyDrop::new(Box::new(()));
let _: Box<()> = ManuallyDrop::into_inner(x); // This drops the `Box`.
```

## ManuallyDrop::take

```rust
pub const unsafe fn take(slot: &mut ManuallyDrop<T>) -> T
```

Takes the value from the `ManuallyDrop<T>` container out.

This method is primarily intended for moving out values in drop.
Instead of using `ManuallyDrop::drop` to manually drop the value,
you can use this method to take the value and use it however desired.

Whenever possible, it is preferable to use `into_inner``ManuallyDrop::into_inner`
instead, which prevents duplicating the content of the `ManuallyDrop<T>`.

# Safety

This function semantically moves out the contained value without preventing further usage,
leaving the state of this container unchanged.
It is your responsibility to ensure that this `ManuallyDrop` is not used again.

## ManuallyDrop::drop

```rust
pub const unsafe fn drop(slot: &mut ManuallyDrop<T>) where T: [const] Destruct,
```

Manually drops the contained value.

This is exactly equivalent to calling `ptr::drop_in_place` with a
pointer to the contained value. As such, unless the contained value is a
packed struct, the destructor will be called in-place without moving the
value, and thus can be used to safely drop [pinned] data.

If you have ownership of the value, you can use `ManuallyDrop::into_inner` instead.

# Safety

This function runs the destructor of the contained value. Other than changes made by
the destructor itself, the memory is left unchanged, and so as far as the compiler is
concerned still holds a bit-pattern which is valid for the type `T`.

However, this "zombie" value should not be exposed to safe code, and this function
should not be called more than once. To use a value after it's been dropped, or drop
a value multiple times, can cause Undefined Behavior (depending on what `drop` does).
This is normally prevented by the type system, but users of `ManuallyDrop` must
uphold those guarantees without assistance from the compiler.
