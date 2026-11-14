# alloc::boxed

The `Box<T>` type for heap allocation.

[`Box<T>`], casually referred to as a 'box', provides the simplest form of
heap allocation in Rust. Boxes provide ownership for this allocation, and
drop their contents when they go out of scope. Boxes also ensure that they
never allocate more than `isize::MAX` bytes.

# Examples

Move a value from the stack to the heap by creating a [`Box`]:

```
let val: u8 = 5;
let boxed: Box<u8> = Box::new(val);
```

Move a value from a [`Box`] back to the stack by [dereferencing]:

```
let boxed: Box<u8> = Box::new(5);
let val: u8 = *boxed;
```

Creating a recursive data structure:

```
# #[allow(dead_code)]
#[derive(Debug)]
enum List<T> {
    Cons(T, Box<List<T>>),
    Nil,
}

let list: List<i32> = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));
println!("{list:?}");
```

This will print `Cons(1, Cons(2, Nil))`.

Recursive structures must be boxed, because if the definition of `Cons`
looked like this:

```compile_fail,E0072
# enum List<T> {
Cons(T, List<T>),
# }
```

It wouldn't work. This is because the size of a `List` depends on how many
elements are in the list, and so we don't know how much memory to allocate
for a `Cons`. By introducing a [`Box<T>`], which has a defined size, we know how
big `Cons` needs to be.

# Memory layout

For non-zero-sized values, a [`Box<T, A>`] will use its allocator of type `A` for its allocation.
It is valid to convert both ways between a `Box` and a raw pointer allocated with `A`, so long as:
- the size of the pointee, as reported by [`size_of_val`], is non-zero,
- the [`Layout::for_value`] of the pointee [*fits*](Allocator#memory-fitting) the memory block, and
- the pointee is a valid instance of `T` (for the given metadata of the pointer).

For zero-sized values, a [`Box<T, A>`] may use any sufficiently aligned non-null pointer.
While it is sound to convert a zero-sized allocation from `A` into a `Box`, as
long as it is backed by a valid value of `T`, doing so may lead to memory leaks, as
the destructor of [`Box`] will not call [`deallocate`](Allocator::deallocate)
on zero-sized values. It is recommended to use [`ptr::dangling`] instead.

Likewise, manually deallocating the raw pointer acquired from a `Box` is only sound
if the size of the pointee is non-zero, as zero-sized values may be represented by
a pointer that is not [*currently allocated*] by that allocator. It is recommended to
pair [`Box::into_raw_with_allocator`] with [`Box::from_raw_in`], rather than
doing this.

Note that even the [`Global`] allocator might not use dangling pointers for
zero-sized allocations, even though *most* implementations do this.

So long as `T: Sized`, a `Box<T>` is guaranteed to be represented
as a single pointer and is also ABI-compatible with C pointers
(i.e. the C type `T*`). This means that if you have extern "C"
Rust functions that will be called from C, you can define those
Rust functions using `Box<T>` types, and use `T*` as corresponding
type on the C side. As an example, consider this C header which
declares functions that create and destroy some kind of `Foo`
value:

```c
/* C header */

/* Returns ownership to the caller */
struct Foo* foo_new(void);

/* Takes ownership from the caller; no-op when invoked with null */
void foo_delete(struct Foo*);
```

These two functions might be implemented in Rust as follows. Here, the
`struct Foo*` type from C is translated to `Box<Foo>`, which captures
the ownership constraints. Note also that the nullable argument to
`foo_delete` is represented in Rust as `Option<Box<Foo>>`, since `Box<Foo>`
cannot be null.

```
#[repr(C)]
pub struct Foo;

#[unsafe(no_mangle)]
pub extern "C" fn foo_new() -> Box<Foo> {
    Box::new(Foo)
}

#[unsafe(no_mangle)]
pub extern "C" fn foo_delete(_: Option<Box<Foo>>) {}
```

Even though `Box<T>` has the same representation and C ABI as a C pointer,
this does not mean that you can convert an arbitrary `T*` into a `Box<T>`
and expect things to work. `Box<T>` values will always be fully aligned,
non-null pointers. Moreover, the destructor for `Box<T>` will attempt to
free the value with the global allocator. In general, the best practice
is to only use `Box<T>` for pointers that originated from the global
allocator.

**Important.** At least at present, you should avoid using
`Box<T>` types for functions that are defined in C but invoked
from Rust. In those cases, you should directly mirror the C types
as closely as possible. Using types like `Box<T>` where the C
definition is just using `T*` can lead to undefined behavior, as
described in [rust-lang/unsafe-code-guidelines#198][ucg#198].

# Considerations for unsafe code

**Warning: This section is not normative and is subject to change, possibly
being relaxed in the future! It is a simplified summary of the rules
currently implemented in the compiler.**

The aliasing rules for `Box<T>` are the same as for `&mut T`. `Box<T>`
asserts uniqueness over its content. Using raw pointers derived from a box
after that box has been mutated through, moved or borrowed as `&mut T`
is not allowed. For more guidance on working with box from unsafe code, see
[rust-lang/unsafe-code-guidelines#326][ucg#326].

# Editions

A special case exists for the implementation of `IntoIterator` for arrays on the Rust 2021
edition, as documented [here][array]. Unfortunately, it was later found that a similar
workaround should be added for boxed slices, and this was applied in the 2024 edition.

Specifically, `IntoIterator` is implemented for `Box<[T]>` on all editions, but specific calls
to `into_iter()` for boxed slices will defer to the slice implementation on editions before
2024:

```rust,edition2021
// Rust 2015, 2018, and 2021:

# #![allow(boxed_slice_into_iter)] // override our `deny(warnings)`
let boxed_slice: Box<[i32]> = vec![0; 3].into_boxed_slice();

// This creates a slice iterator, producing references to each value.
for item in boxed_slice.into_iter().enumerate() {
    let (i, x): (usize, &i32) = item;
    println!("boxed_slice[{i}] = {x}");
}

// The `boxed_slice_into_iter` lint suggests this change for future compatibility:
for item in boxed_slice.iter().enumerate() {
    let (i, x): (usize, &i32) = item;
    println!("boxed_slice[{i}] = {x}");
}

// You can explicitly iterate a boxed slice by value using `IntoIterator::into_iter`
for item in IntoIterator::into_iter(boxed_slice).enumerate() {
    let (i, x): (usize, i32) = item;
    println!("boxed_slice[{i}] = {x}");
}
```

Similar to the array implementation, this may be modified in the future to remove this override,
and it's best to avoid relying on this edition-dependent behavior if you wish to preserve
compatibility with future versions of the compiler.

[*currently allocated*]: Allocator#currently-allocated-memory
[ucg#198]: https://github.com/rust-lang/unsafe-code-guidelines/issues/198
[ucg#326]: https://github.com/rust-lang/unsafe-code-guidelines/issues/326
[dereferencing]: core::ops::Deref
[`Box::<T>::from_raw(value)`]: Box::from_raw
[`Global`]: crate::alloc::Global
[`Layout`]: crate::alloc::Layout
[`Layout::for_value(&*value)`]: crate::alloc::Layout::for_value
[valid]: ptr#safety

## Box::new

```rust
pub fn new(x: T) -> Self
```

Allocates memory on the heap and then places `x` into it.

This doesn't actually allocate if `T` is zero-sized.
See the [memory layout] section for more details.

# Examples

```
let five = Box::new(5);
```

[memory layout]: self#memory-layout

## Box::new_uninit

```rust
pub const fn new_uninit() -> Box<mem::MaybeUninit<T>>
```

Constructs a new box with uninitialized contents.

# Examples

```
let mut five = Box::<u32>::new_uninit();
// Deferred initialization:
five.write(5);
let five = unsafe { five.assume_init() };

assert_eq!(*five, 5)
```

## Box::new_zeroed

```rust
pub fn new_zeroed() -> Box<mem::MaybeUninit<T>>
```

Constructs a new `Box` with uninitialized contents, with the memory
being filled with `0` bytes.

See [`MaybeUninit::zeroed`][zeroed] for examples of correct and incorrect usage
of this method.

# Examples

```
let zero = Box::<u32>::new_zeroed();
let zero = unsafe { zero.assume_init() };

assert_eq!(*zero, 0)
```

[zeroed]: mem::MaybeUninit::zeroed

## Box::pin

```rust
pub fn pin(x: T) -> Pin<Box<T>>
```

Constructs a new `Pin<Box<T>>`. If `T` does not implement [`Unpin`], then
`x` will be pinned in memory and unable to be moved.

Constructing and pinning of the `Box` can also be done in two steps: `Box::pin(x)`
does the same as <code>[Box::into_pin]\([Box::new]\(x))</code>. Consider using
[`into_pin`](Box::into_pin) if you already have a `Box<T>`, or if you want to
construct a (pinned) `Box` in a different way than with [`Box::new`].

## Box::new_in

```rust
pub fn new_in(x: T, alloc: A) -> Self
```

Allocates memory in the given allocator then places `x` into it.

This doesn't actually allocate if `T` is zero-sized.
See the [memory layout] section for more details.

# Examples

```
use std::alloc::System;

let five = Box::new_in(5, System);
```

[memory layout]: self#memory-layout

## Box::take

```rust
pub fn take(boxed: Self) -> (T, Box<mem::MaybeUninit<T>, A>)
```

Consumes the `Box` without consuming its allocation, returning the wrapped value and a `Box`
to the uninitialized memory where the wrapped value used to live.

This can be used together with [`write`](Box::write) to reuse the allocation for multiple
boxed values.

# Examples

```
let c = Box::new(5);

// take the value out of the box
let (value, uninit) = Box::take(c);
assert_eq!(value, 5);

// reuse the box for a second value
let c = Box::write(uninit, 6);
assert_eq!(*c, 6);
```

## Box::map

```rust
pub fn map<U>(this: Self, f: impl FnOnce(T) -> U) -> Box<U, A>
```

Maps the value in a box, reusing the allocation if possible.

`f` is called on the value in the box, and the result is returned, also boxed.

Note: this is an associated function, which means that you have
to call it as `Box::map(b, f)` instead of `b.map(f)`. This
is so that there is no conflict with a method on the inner type.

# Examples

```
let b = Box::new(7);
let new = Box::map(b, |i| i + 7);
assert_eq!(*new, 14);
```

## Box::new_uninit_slice

```rust
pub fn new_uninit_slice(len: usize) -> Box<[mem::MaybeUninit<T>]>
```

Constructs a new boxed slice with uninitialized contents.

# Examples

```
let mut values = Box::<[u32]>::new_uninit_slice(3);
// Deferred initialization:
values[0].write(1);
values[1].write(2);
values[2].write(3);
let values = unsafe { values.assume_init() };

assert_eq!(*values, [1, 2, 3])
```

## Box::new_zeroed_slice

```rust
pub fn new_zeroed_slice(len: usize) -> Box<[mem::MaybeUninit<T>]>
```

Constructs a new boxed slice with uninitialized contents, with the memory
being filled with `0` bytes.

See [`MaybeUninit::zeroed`][zeroed] for examples of correct and incorrect usage
of this method.

# Examples

```
let values = Box::<[u32]>::new_zeroed_slice(3);
let values = unsafe { values.assume_init() };

assert_eq!(*values, [0, 0, 0])
```

[zeroed]: mem::MaybeUninit::zeroed

## Box::assume_init

```rust
pub const unsafe fn assume_init(self) -> Box<T, A>
```

Converts to `Box<T, A>`.

# Safety

As with [`MaybeUninit::assume_init`],
it is up to the caller to guarantee that the value
really is in an initialized state.
Calling this when the content is not yet fully initialized
causes immediate undefined behavior.

[`MaybeUninit::assume_init`]: mem::MaybeUninit::assume_init

# Examples

```
let mut five = Box::<u32>::new_uninit();
// Deferred initialization:
five.write(5);
let five: Box<u32> = unsafe { five.assume_init() };

assert_eq!(*five, 5)
```

## Box::write

```rust
pub fn write(mut boxed: Self, value: T) -> Box<T, A>
```

Writes the value and converts to `Box<T, A>`.

This method converts the box similarly to [`Box::assume_init`] but
writes `value` into it before conversion thus guaranteeing safety.
In some scenarios use of this method may improve performance because
the compiler may be able to optimize copying from stack.

# Examples

```
let big_box = Box::<[usize; 1024]>::new_uninit();

let mut array = [0; 1024];
for (i, place) in array.iter_mut().enumerate() {
    *place = i;
}

// The optimizer may be able to elide this copy, so previous code writes
// to heap directly.
let big_box = Box::write(big_box, array);

for (i, x) in big_box.iter().enumerate() {
    assert_eq!(*x, i);
}
```

## Box::assume_init

```rust
pub unsafe fn assume_init(self) -> Box<[T], A>
```

Converts to `Box<[T], A>`.

# Safety

As with [`MaybeUninit::assume_init`],
it is up to the caller to guarantee that the values
really are in an initialized state.
Calling this when the content is not yet fully initialized
causes immediate undefined behavior.

[`MaybeUninit::assume_init`]: mem::MaybeUninit::assume_init

# Examples

```
let mut values = Box::<[u32]>::new_uninit_slice(3);
// Deferred initialization:
values[0].write(1);
values[1].write(2);
values[2].write(3);
let values = unsafe { values.assume_init() };

assert_eq!(*values, [1, 2, 3])
```

## Box::from_raw

```rust
pub unsafe fn from_raw(raw: *mut T) -> Self
```

Constructs a box from a raw pointer.

After calling this function, the raw pointer is owned by the
resulting `Box`. Specifically, the `Box` destructor will call
the destructor of `T` and free the allocated memory. For this
to be safe, the memory must have been allocated in accordance
with the [memory layout] used by `Box` .

# Safety

This function is unsafe because improper use may lead to
memory problems. For example, a double-free may occur if the
function is called twice on the same raw pointer.

The exact safety requirements are described in the [memory layout] section, together
with recommendations about how to handle the special case of zero-sized allocations
correctly.

In particular, if the size of the pointee, as reported by [`size_of_val`], is
nonzero, then the raw pointer must point to a block of memory allocated by
[`Global`].
If the size of the pointee is zero, then the raw pointer can be any
sufficiently aligned non-null pointer, e.g. [`ptr::dangling`].

Note that the [considerations for unsafe code] apply to all `Box<T>` values.

# Examples

Recreate a `Box` which was previously converted to a raw pointer
using [`Box::into_raw`]:
```
let x = Box::new(5);
let ptr = Box::into_raw(x);
let x = unsafe { Box::from_raw(ptr) };
```
Manually create a `Box` from scratch by using the global allocator:
```
use std::alloc::{alloc, Layout};

unsafe {
    let ptr = alloc(Layout::new::<i32>()) as *mut i32;
    // In general .write is required to avoid attempting to destruct
    // the (uninitialized) previous contents of `ptr`, though for this
    // simple example `*ptr = 5` would have worked as well.
    ptr.write(5);
    let x = Box::from_raw(ptr);
}
```

[memory layout]: self#memory-layout
[considerations for unsafe code]: self#considerations-for-unsafe-code

## Box::from_non_null

```rust
pub unsafe fn from_non_null(ptr: NonNull<T>) -> Self
```

Constructs a box from a `NonNull` pointer.

After calling this function, the `NonNull` pointer is owned by
the resulting `Box`. Specifically, the `Box` destructor will call
the destructor of `T` and free the allocated memory. For this
to be safe, the memory must have been allocated in accordance
with the [memory layout] used by `Box` .

# Safety

This function is unsafe because improper use may lead to
memory problems. For example, a double-free may occur if the
function is called twice on the same `NonNull` pointer.

The exact safety requirements are described in the [memory layout] section, together
with recommendations about how to handle the special case of zero-sized allocations
correctly.

In particular, if the size of the pointee, as reported by [`size_of_val`], is
nonzero, then the raw pointer must point to a block of memory allocated by
[`Global`].
If the size of the pointee is zero, then the raw pointer can be any
sufficiently aligned pointer, e.g. [`NonNull::dangling`].

Note that the [considerations for unsafe code] apply to all `Box<T>` values.

# Examples

Recreate a `Box` which was previously converted to a `NonNull`
pointer using [`Box::into_non_null`]:
```
let x = Box::new(5);
let non_null = Box::into_non_null(x);
let x = unsafe { Box::from_non_null(non_null) };
```
Manually create a `Box` from scratch by using the global allocator:
```
use std::alloc::{alloc, Layout};
use std::ptr::NonNull;

unsafe {
    let non_null = NonNull::new(alloc(Layout::new::<i32>()).cast::<i32>())
        .expect("alloc should have successfully allocated memory");
    // In general .write is required to avoid attempting to destruct
    // the (uninitialized) previous contents of `non_null`.
    non_null.write(5);
    let x = Box::from_non_null(non_null);
}
```

[memory layout]: self#memory-layout
[considerations for unsafe code]: self#considerations-for-unsafe-code

## Box::into_raw

```rust
pub fn into_raw(b: Self) -> *mut T
```

Consumes the `Box`, returning a wrapped raw pointer.

The pointer will be properly aligned and non-null.

After calling this function, the caller is responsible for the
memory previously managed by the `Box`. In particular, the
caller should properly destroy `T` and release the memory, taking
into account the [memory layout] used by `Box`. The easiest way to
do this is to convert the raw pointer back into a `Box` with the
[`Box::from_raw`] function, allowing the `Box` destructor to perform
the cleanup.

While manually deallocating the pointer through [`deallocate`]
is possible, you must only do this if the pointee's size, as reported by
[`size_of_val`], is non-zero (the `Box` may be a dangling pointer
otherwise). See the [memory layout] section for more details.

Note: this is an associated function, which means that you have
to call it as `Box::into_raw(b)` instead of `b.into_raw()`. This
is so that there is no conflict with a method on the inner type.

# Examples
Converting the raw pointer back into a `Box` with [`Box::from_raw`]
for automatic cleanup:
```
let x = Box::new(String::from("Hello"));
let ptr = Box::into_raw(x);
let x = unsafe { Box::from_raw(ptr) };
```
Manual cleanup by explicitly running the destructor and deallocating
the memory:
```
use std::alloc::{dealloc, Layout};
use std::ptr;

let x = Box::new(String::from("Hello"));
let ptr = Box::into_raw(x);
unsafe {
    ptr::drop_in_place(ptr);
    dealloc(ptr as *mut u8, Layout::new::<String>());
}
```
Note: This is equivalent to the following:
```
let x = Box::new(String::from("Hello"));
let ptr = Box::into_raw(x);
unsafe {
    drop(Box::from_raw(ptr));
}
```

[memory layout]: self#memory-layout
[`deallocate`]: Allocator::deallocate

## Box::into_non_null

```rust
pub fn into_non_null(b: Self) -> NonNull<T>
```

Consumes the `Box`, returning a wrapped `NonNull` pointer.

The pointer will be properly aligned.

After calling this function, the caller is responsible for the
memory previously managed by the `Box`. In particular, the
caller should properly destroy `T` and release the memory, taking
into account the [memory layout] used by `Box`. The easiest way to
do this is to convert the `NonNull` pointer back into a `Box` with the
[`Box::from_non_null`] function, allowing the `Box` destructor to
perform the cleanup.

While manually deallocating the pointer through [`deallocate`]
is possible, you must only do this if the pointee's size, as reported by
[`size_of_val`], is non-zero (the `Box` may be a dangling pointer
otherwise). See the [memory layout] section for more details.

Note: this is an associated function, which means that you have
to call it as `Box::into_non_null(b)` instead of `b.into_non_null()`.
This is so that there is no conflict with a method on the inner type.

# Examples
Converting the `NonNull` pointer back into a `Box` with [`Box::from_non_null`]
for automatic cleanup:
```
let x = Box::new(String::from("Hello"));
let non_null = Box::into_non_null(x);
let x = unsafe { Box::from_non_null(non_null) };
```
Manual cleanup by explicitly running the destructor and deallocating
the memory:
```
use std::alloc::{dealloc, Layout};

let x = Box::new(String::from("Hello"));
let non_null = Box::into_non_null(x);
unsafe {
    non_null.drop_in_place();
    dealloc(non_null.as_ptr().cast::<u8>(), Layout::new::<String>());
}
```
Note: This is equivalent to the following:
```
let x = Box::new(String::from("Hello"));
let non_null = Box::into_non_null(x);
unsafe {
    drop(Box::from_non_null(non_null));
}
```

[memory layout]: self#memory-layout
[`deallocate`]: Allocator::deallocate

## Box::from_raw_in

```rust
pub unsafe fn from_raw_in(raw: *mut T, alloc: A) -> Self
```

Constructs a box from a raw pointer in the given allocator.

After calling this function, the raw pointer is owned by the
resulting `Box`. Specifically, the `Box` destructor will call
the destructor of `T` and free the allocated memory, except
in the cases described in the [memory layout] section.

# Safety

This function is unsafe because improper use may lead to
memory problems. For example, a double-free may occur if the
function is called twice on the same raw pointer.

The exact safety requirements are described in the [memory layout] section, together
with recommendations about how to handle the special case of zero-sized allocations
correctly.

In particular, if the size of the pointee, as reported by [`size_of_val`], is
nonzero, then the raw pointer must point to a block of memory allocated by
`alloc`.
If the size of the pointee is zero, then the raw pointer can be any
sufficiently aligned non-null pointer, e.g. [`ptr::dangling`].

Note that the [considerations for unsafe code] apply to all `Box<T, A>` values.

# Examples

Recreate a `Box` which was previously converted to a raw pointer
using [`Box::into_raw_with_allocator`]:
```
use std::alloc::System;

let x = Box::new_in(5, System);
let (ptr, alloc) = Box::into_raw_with_allocator(x);
let x = unsafe { Box::from_raw_in(ptr, alloc) };
```
Manually create a `Box` from scratch by using the system allocator:
```
#![feature(slice_ptr_get)]

use std::alloc::{Allocator, Layout, System};

unsafe {
    let ptr = System.allocate(Layout::new::<i32>())?.as_mut_ptr() as *mut i32;
    // In general .write is required to avoid attempting to destruct
    // the (uninitialized) previous contents of `ptr`, though for this
    // simple example `*ptr = 5` would have worked as well.
    ptr.write(5);
    let x = Box::from_raw_in(ptr, System);
}
# Ok::<(), std::alloc::AllocError>(())
```

[memory layout]: self#memory-layout
[considerations for unsafe code]: self#considerations-for-unsafe-code

## Box::from_non_null_in

```rust
pub unsafe fn from_non_null_in(raw: NonNull<T>, alloc: A) -> Self
```

Constructs a box from a `NonNull` pointer in the given allocator.

After calling this function, the `NonNull` pointer is owned by
the resulting `Box`. Specifically, the `Box` destructor will call
the destructor of `T` and free the allocated memory, except
in the cases described in the [memory layout] section.

# Safety

This function is unsafe because improper use may lead to
memory problems. For example, a double-free may occur if the
function is called twice on the same raw pointer.

The exact safety requirements are described in the [memory layout] section, together
with recommendations about how to handle the special case of zero-sized allocations
correctly.

In particular, if the size of the pointee, as reported by [`size_of_val`], is
nonzero, then the raw pointer must point to a block of memory allocated by
`alloc`.
If the size of the pointee is zero, then the raw pointer can be any
sufficiently aligned pointer, e.g. [`NonNull::dangling`].

Note that the [considerations for unsafe code] apply to all `Box<T, A>` values.

# Examples

Recreate a `Box` which was previously converted to a `NonNull` pointer
using [`Box::into_non_null_with_allocator`]:
```
use std::alloc::System;

let x = Box::new_in(5, System);
let (non_null, alloc) = Box::into_non_null_with_allocator(x);
let x = unsafe { Box::from_non_null_in(non_null, alloc) };
```
Manually create a `Box` from scratch by using the system allocator:
```
use std::alloc::{Allocator, Layout, System};

unsafe {
    let non_null = System.allocate(Layout::new::<i32>())?.cast::<i32>();
    // In general .write is required to avoid attempting to destruct
    // the (uninitialized) previous contents of `non_null`.
    non_null.write(5);
    let x = Box::from_non_null_in(non_null, System);
}
# Ok::<(), std::alloc::AllocError>(())
```

[memory layout]: self#memory-layout
[considerations for unsafe code]: self#considerations-for-unsafe-code

## Box::into_raw_with_allocator

```rust
pub const fn into_raw_with_allocator(b: Self) -> (*mut T, A)
```

Consumes the `Box`, returning a wrapped raw pointer and the allocator.

The pointer will be properly aligned and non-null.

After calling this function, the caller is responsible for the
memory previously managed by the `Box`. In particular, the
caller should properly destroy `T` and release the memory, taking
into account the [memory layout] used by `Box`. The easiest way to
do this is to convert the raw pointer back into a `Box` with the
[`Box::from_raw_in`] function, allowing the `Box` destructor to perform
the cleanup.

While manually deallocating the pointer through [`deallocate`]
is possible, you must only do this if the pointee's size, as reported by
[`size_of_val`], is non-zero (the `Box` may be a dangling pointer
otherwise). See the [memory layout] section for more details.

Note: this is an associated function, which means that you have
to call it as `Box::into_raw_with_allocator(b)` instead of `b.into_raw_with_allocator()`. This
is so that there is no conflict with a method on the inner type.

# Examples
Converting the raw pointer back into a `Box` with [`Box::from_raw_in`]
for automatic cleanup:
```
use std::alloc::System;

let x = Box::new_in(String::from("Hello"), System);
let (ptr, alloc) = Box::into_raw_with_allocator(x);
let x = unsafe { Box::from_raw_in(ptr, alloc) };
```
Manual cleanup by explicitly running the destructor and deallocating
the memory:
```
use std::alloc::{Allocator, Layout, System};
use std::ptr::{self, NonNull};

let x = Box::new_in(String::from("Hello"), System);
let (ptr, alloc) = Box::into_raw_with_allocator(x);
unsafe {
    ptr::drop_in_place(ptr);
    let non_null = NonNull::new_unchecked(ptr);
    alloc.deallocate(non_null.cast(), Layout::new::<String>());
}
```

[memory layout]: self#memory-layout
[`deallocate`]: Allocator::deallocate

## Box::into_non_null_with_allocator

```rust
pub fn into_non_null_with_allocator(b: Self) -> (NonNull<T>, A)
```

Consumes the `Box`, returning a wrapped `NonNull` pointer and the allocator.

The pointer will be properly aligned.

After calling this function, the caller is responsible for the
memory previously managed by the `Box`. In particular, the
caller should properly destroy `T` and release the memory, taking
into account the [memory layout] used by `Box`. The easiest way to
do this is to convert the `NonNull` pointer back into a `Box` with the
[`Box::from_non_null_in`] function, allowing the `Box` destructor to
perform the cleanup.

While manually deallocating the pointer through [`deallocate`]
is possible, you must only do this if the pointee's size, as reported by
[`size_of_val`], is non-zero (the `Box` may be a dangling pointer
otherwise). See the [memory layout] section for more details.

Note: this is an associated function, which means that you have
to call it as `Box::into_non_null_with_allocator(b)` instead of
`b.into_non_null_with_allocator()`. This is so that there is no
conflict with a method on the inner type.

# Examples
Converting the `NonNull` pointer back into a `Box` with
[`Box::from_non_null_in`] for automatic cleanup:
```
use std::alloc::System;

let x = Box::new_in(String::from("Hello"), System);
let (non_null, alloc) = Box::into_non_null_with_allocator(x);
let x = unsafe { Box::from_non_null_in(non_null, alloc) };
```
Manual cleanup by explicitly running the destructor and deallocating
the memory:
```
use std::alloc::{Allocator, Layout, System};

let x = Box::new_in(String::from("Hello"), System);
let (non_null, alloc) = Box::into_non_null_with_allocator(x);
unsafe {
    non_null.drop_in_place();
    alloc.deallocate(non_null.cast::<u8>(), Layout::new::<String>());
}
```

[memory layout]: self#memory-layout
[`deallocate`]: Allocator::deallocate

## Box::as_mut_ptr

```rust
pub fn as_mut_ptr(b: &mut Self) -> *mut T
```

Returns a raw mutable pointer to the `Box`'s contents.

The caller must ensure that the `Box` outlives the pointer this
function returns, or else it will end up dangling.

This method guarantees that for the purpose of the aliasing model, this method
does not materialize a reference to the underlying memory, and thus the returned pointer
will remain valid when mixed with other calls to [`as_ptr`], [`as_mut_ptr`], and [`as_non_null`].
Note that calling other methods that materialize references to the memory
may still invalidate this pointer.
See the example below for how this guarantee can be used.

# Examples

Due to the aliasing guarantee, the following code is legal:

```rust
unsafe {
    let mut b = Box::new(0);
    let ptr1 = Box::as_mut_ptr(&mut b);
    ptr1.write(1);
    let ptr2 = Box::as_mut_ptr(&mut b);
    ptr2.write(2);
    // Notably, the write to `ptr2` did *not* invalidate `ptr1`:
    ptr1.write(3);
}
```

[`as_mut_ptr`]: Self::as_mut_ptr
[`as_ptr`]: Self::as_ptr
[`as_non_null`]: Self::as_non_null

## Box::as_ptr

```rust
pub fn as_ptr(b: &Self) -> *const T
```

Returns a raw pointer to the `Box`'s contents.

The caller must ensure that the `Box` outlives the pointer this
function returns, or else it will end up dangling.

The caller must also ensure that the memory the pointer (non-transitively) points to
is never written to (except inside an `UnsafeCell`) using this pointer or any pointer
derived from it. If you need to mutate the contents of the `Box`, use [`as_mut_ptr`].

This method guarantees that for the purpose of the aliasing model, this method
does not materialize a reference to the underlying memory, and thus the returned pointer
will remain valid when mixed with other calls to [`as_ptr`], [`as_mut_ptr`], and [`as_non_null`].
Note that calling other methods that materialize mutable references to the memory,
as well as writing to this memory, may still invalidate this pointer.
See the example below for how this guarantee can be used.

# Examples

Due to the aliasing guarantee, the following code is legal:

```rust
unsafe {
    let mut v = Box::new(0);
    let ptr1 = Box::as_ptr(&v);
    let ptr2 = Box::as_mut_ptr(&mut v);
    let _val = ptr2.read();
    // No write to this memory has happened yet, so `ptr1` is still valid.
    let _val = ptr1.read();
    // However, once we do a write...
    ptr2.write(1);
    // ... `ptr1` is no longer valid.
    // This would be UB: let _val = ptr1.read();
}
```

[`as_mut_ptr`]: Self::as_mut_ptr
[`as_ptr`]: Self::as_ptr
[`as_non_null`]: Self::as_non_null

## Box::allocator

```rust
pub fn allocator(b: &Self) -> &A
```

Returns a reference to the underlying allocator.

Note: this is an associated function, which means that you have
to call it as `Box::allocator(&b)` instead of `b.allocator()`. This
is so that there is no conflict with a method on the inner type.

## Box::leak

```rust
pub fn leak<'a>(b: Self) -> &'a mut T where A: 'a,
```

Consumes and leaks the `Box`, returning a mutable reference,
`&'a mut T`.

Note that the type `T` must outlive the chosen lifetime `'a`. If the type
has only static references, or none at all, then this may be chosen to be
`'static`.

This function is mainly useful for data that lives for the remainder of the program's life,
i.e., memory that is meant to leak. If the memory should eventually be freed, prefer to use
[`Box::into_raw`] or [`Box::into_non_null`] instead. Reconstructing ("unleaking") a `Box` from
the mutable reference returned here (e.g. via [`Box::from_raw`]) is only possible if the
allocator is `Global`, and even then it is a grey area (meaning it is possible under specific
circumstances but many seemingly harmless ways of doing it are undefined behavior) and should
be avoided.

Note: this is an associated function, which means that you have
to call it as `Box::leak(b)` instead of `b.leak()`. This
is so that there is no conflict with a method on the inner type.

# Examples

Simple usage:

```
let x = Box::new(41);
let static_ref: &'static mut usize = Box::leak(x);
*static_ref += 1;
assert_eq!(*static_ref, 42);
# // FIXME(https://github.com/rust-lang/miri/issues/3670):
# // use -Zmiri-disable-leak-check instead of unleaking in tests meant to leak.
# drop(unsafe { Box::from_raw(static_ref) });
```

Unsized data:

```
let x = vec![1, 2, 3].into_boxed_slice();
let static_ref = Box::leak(x);
static_ref[0] = 4;
assert_eq!(*static_ref, [4, 2, 3]);
# // FIXME(https://github.com/rust-lang/miri/issues/3670):
# // use -Zmiri-disable-leak-check instead of unleaking in tests meant to leak.
# drop(unsafe { Box::from_raw(static_ref) });
```

## Box::into_pin

```rust
pub fn into_pin(boxed: Self) -> Pin<Self> where A: StaticAllocator,
```

Converts a `Box<T>` into a `Pin<Box<T>>`. If `T` does not implement [`Unpin`], then
`*boxed` will be pinned in memory and unable to be moved.

This conversion does not allocate on the heap and happens in place.

This is also available via [`From`].

Constructing and pinning a `Box` with <code>Box::into_pin([Box::new]\(x))</code>
can also be written more concisely using <code>[Box::pin]\(x)</code>.
This `into_pin` method is useful if you already have a `Box<T>`, or you are
constructing a (pinned) `Box` in a different way than with [`Box::new`].

# Notes

It's not recommended that crates add an impl like `From<Box<T>> for Pin<T>`,
as it'll introduce an ambiguity when calling `Pin::from`.
A demonstration of such a poor impl is shown below.

```compile_fail
# use std::pin::Pin;
struct Foo; // A type defined in this crate.
impl From<Box<()>> for Pin<Foo> {
    fn from(_: Box<()>) -> Pin<Foo> {
        Pin::new(Foo)
    }
}

let foo = Box::new(());
let bar = Pin::from(foo);
```