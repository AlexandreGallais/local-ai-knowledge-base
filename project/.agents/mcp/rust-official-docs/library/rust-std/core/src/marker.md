---
title: "core::marker"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/marker.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::marker

Primitive traits and types representing basic <example-value> of types.

Rust types can be classified in various useful ways according to
their intrinsic properties. These classifications are represented
as traits.

## trait Copy

```rust
pub trait Copy: Clone
```

Types whose values can be duplicated simply by copying bits.

By default, variable bindings have 'move semantics.' In other
words:

```rust
#[derive(Debug)]
struct Foo;

let x = Foo;

let y = x;

// `x` has moved into `y`, and so cannot be used

// println!("{x:?}"); // error: use of moved value
```

However, if a type implements `Copy`, it instead has 'copy semantics':

```rust
// We can derive a `Copy` implementation. `Clone` is also required, as it's
// a supertrait of `Copy`.
#[derive(Debug, Copy, Clone)]
struct Foo;

let x = Foo;

let y = x;

// `y` is a copy of `x`

println!("{x:?}"); // A-OK!
```

It's important to note that in these two examples, the only difference is whether you
are allowed to access `x` after the assignment. Under the hood, both a copy and a move
can result in bits being copied in memory, although this is sometimes optimized away.

## How can I implement `Copy`?

There are two ways to implement `Copy` on your type. The simplest is to use `derive`:

```rust
#[derive(Copy, Clone)]
struct MyStruct;
```

You can also implement `Copy` and `Clone` manually:

```rust
struct MyStruct;

impl Copy for MyStruct { }

impl Clone for MyStruct {
    fn clone(&self) -> MyStruct {
        *self
    }
}
```

There is a small difference between the two. The `derive` strategy will also place a `Copy`
bound on type parameters:

```rust
#[derive(Clone)]
struct MyStruct<T>(T);

impl<T: Copy> Copy for MyStruct<T> { }
```

This isn't always desired. For example, shared references (`&T`) can be copied regardless of
whether `T` is `Copy`. Likewise, a generic struct containing markers such as `PhantomData`
could potentially be duplicated with a bit-wise copy.

## What's the difference between `Copy` and `Clone`?

Copies happen implicitly, for example as part of an assignment `y = x`. The behavior of
`Copy` is not overloadable; it is always a simple bit-wise copy.

Cloning is an explicit action, `x.clone()`. The implementation of `Clone` can
provide any type-specific behavior necessary to duplicate values safely. For example,
the implementation of `Clone` for `String` needs to copy the pointed-to string
buffer in the heap. A simple bitwise copy of `String` values would merely copy the
pointer, leading to a double free down the line. For this reason, `String` is `Clone`
but not `Copy`.

`Clone` is a supertrait of `Copy`, so everything which is `Copy` must also implement
`Clone`. If a type is `Copy` then its `Clone` implementation only needs to return `*self`
(see the example above).

## When can my type be `Copy`?

A type can implement `Copy` if all of its components implement `Copy`. For example, this
struct can be `Copy`:

```rust
#[derive(Copy, Clone)]
struct Point {
   x: i32,
   y: i32,
}
```

A struct can be `Copy`, and `i32` is `Copy`, therefore `Point` is eligible to be `Copy`.
By contrast, consider

```rust
struct PointList {
    points: Vec<Point>,
}
```

The struct `PointList` cannot implement `Copy`, because `Vec<T>` is not `Copy`. If we
attempt to derive a `Copy` implementation, we'll get an error:

```
the trait `Copy` cannot be implemented for this type; field `points` does not implement `Copy`
```rust

Shared references (`&T`) are also `Copy`, so a type can be `Copy`, even when it holds
shared references of types `T` that are *not* `Copy`. Consider the following struct,
which can implement `Copy`, because it only holds a *shared reference* to our non-`Copy`
type `PointList` from above:

```
# #![allow(dead_code)]
# struct PointList;
#[derive(Copy, Clone)]
struct PointListWrapper<'a> {
    point_list_ref: &'a PointList,
}
```rust

## When *can't* my type be `Copy`?

Some types can't be copied safely. For example, copying `&mut T` would create an aliased
mutable reference. Copying `String` would duplicate responsibility for managing the
`String`'s buffer, leading to a double free.

Generalizing the latter case, any type implementing `Drop` can't be `Copy`, because it's
managing some resource besides its own `size_of::<T>` bytes.

If you try to implement `Copy` on a struct or enum containing non-`Copy` data, you will get
the error [E0204].

[E0204]: ../../error_codes/E0204.html

## When *should* my type be `Copy`?

Generally speaking, if your type _can_ implement `Copy`, it should. Keep in mind, though,
that implementing `Copy` is part of the public API of your type. If the type might become
non-`Copy` in the future, it could be prudent to omit the `Copy` implementation now, to
avoid a breaking API change.

## Additional implementors

In addition to the [implementors listed below][impls],
the following types also implement `Copy`:

* Function item types (i.e., the distinct types defined for each function)
* Function pointer types (e.g., `fn() -> i32`)
* Closure types, if they capture no value from the environment
  or if all such captured values implement `Copy` themselves.
  Note that variables captured by shared reference always implement `Copy`
  (even if the referent doesn't),
  while variables captured by mutable reference never implement `Copy`.

`Vec<T>`: ../../std/vec/struct.Vec.html
`String`: ../../std/string/struct.String.html
`size_of::<T>`: size_of
[impls]: #implementors

## ::PhantomData

```rust
pub struct PhantomData<T: PointeeSized>
```

Zero-sized type used to mark things that "act like" they own a `T`.

Adding a `PhantomData<T>` field to your type tells the compiler that your
type acts as though it stores a value of type `T`, even though it doesn't
really. This information is used when computing certain safety properties.

For a more in-depth explanation of how to use `PhantomData<T>`, please see
the Nomicon.

# A ghastly note 👻👻👻

Though they both have scary names, `PhantomData` and 'phantom types' are
related, but not identical. A phantom type parameter is simply a type
parameter which is never used. In Rust, this often causes the compiler to
complain, and the solution is to add a "dummy" use by way of `PhantomData`.

# Examples

## Unused lifetime parameters

Perhaps the most common use case for `PhantomData` is a struct that has an
unused lifetime parameter, typically as part of some unsafe code. For
example, here is a struct `Slice` that has two pointers of type `*const T`,
presumably pointing into an array somewhere:

```
struct Slice<'a, T> {
    start: *const T,
    end: *const T,
}
```rust

The intention is that the underlying data is only valid for the
lifetime `'a`, so `Slice` should not outlive `'a`. However, this
intent is not expressed in the code, since there are no uses of
the lifetime `'a` and hence it is not clear what data it applies
to. We can correct this by telling the compiler to act *as if* the
`Slice` struct contained a reference `&'a T`:

```
use std::marker::PhantomData;

# #[allow(dead_code)]
struct Slice<'a, T> {
    start: *const T,
    end: *const T,
    phantom: PhantomData<&'a T>,
}
```rust

This also in turn infers the lifetime bound `T: 'a`, indicating
that any references in `T` are valid over the lifetime `'a`.

When initializing a `Slice` you simply provide the value
`PhantomData` for the field `phantom`:

```
# #![allow(dead_code)]
# use std::marker::PhantomData;
# struct Slice<'a, T> {
#     start: *const T,
#     end: *const T,
#     phantom: PhantomData<&'a T>,
# }
fn borrow_vec<T>(vec: &Vec<T>) -> Slice<'_, T> {
    let ptr = vec.as_ptr();
    Slice {
        start: ptr,
        end: unsafe { ptr.add(vec.len()) },
        phantom: PhantomData,
    }
}
```rust

## Unused type parameters

It sometimes happens that you have unused type parameters which
indicate what type of data a struct is "tied" to, even though that
data is not actually found in the struct itself. Here is an
example where this arises with [FFI]. The foreign interface uses
handles of type `*mut ()` to refer to Rust values of different
types. We track the Rust type using a phantom type parameter on
the struct `ExternalResource` which wraps a handle.

[FFI]: ../../book/ch19-01-unsafe-rust.html#using-extern-functions-to-call-external-code

```
# #![allow(dead_code)]
# trait ResType { }
# struct ParamType;
# mod foreign_lib {
#     pub fn new(_: usize) -> *mut () { 42 as *mut () }
#     pub fn do_stuff(_: *mut (), _: usize) {}
# }
# fn convert_params(_: ParamType) -> usize { 42 }
use std::marker::PhantomData;

struct ExternalResource<R> {
   resource_handle: *mut (),
   resource_type: PhantomData<R>,
}

impl<R: ResType> ExternalResource<R> {
    fn new() -> Self {
        let size_of_res = size_of::<R>();
        Self {
            resource_handle: foreign_lib::new(size_of_res),
            resource_type: PhantomData,
        }
    }

    fn do_stuff(&self, param: ParamType) {
        let foreign_params = convert_params(param);
        foreign_lib::do_stuff(self.resource_handle, foreign_params);
    }
}
```rust

## Ownership and the drop check

The exact interaction of `PhantomData` with drop check **may change in the future**.

Currently, adding a field of type `PhantomData<T>` indicates that your type *owns* data of type
`T` in very rare circumstances. This in turn has effects on the Rust compiler's [drop check]
analysis. For the exact rules, see the [drop check] documentation.

## Layout

For all `T`, the following are guaranteed:
* `size_of::<PhantomData<T>>() == 0`
* `align_of::<PhantomData<T>>() == 1`

[drop check]: Drop#drop-check

## DiscriminantKind::Discriminant

```rust
type Discriminant: Clone + Copy + Debug + Eq + PartialEq + Hash + Send + Sync + Unpin
```

The type of the discriminant, which must satisfy the trait
bounds required by `mem::Discriminant`.
