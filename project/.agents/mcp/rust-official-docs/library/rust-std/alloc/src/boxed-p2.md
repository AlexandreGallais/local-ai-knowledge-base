---
title: "alloc::boxed (part 2 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/boxed.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::boxed (part 2 of 3)

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

In particular, if the size of the pointee, as reported by `size_of_val`, is
nonzero, then the raw pointer must point to a block of memory allocated by
`Global`.
If the size of the pointee is zero, then the raw pointer can be any
sufficiently aligned pointer, e.g. `NonNull::dangling`.

Note that the [considerations for unsafe code] apply to all `Box<T>` values.

# Examples

Recreate a `Box` which was previously converted to a `NonNull`
pointer using `Box::into_non_null`:
```rust
let x = Box::new(5);
let non_null = Box::into_non_null(x);
let x = unsafe { Box::from_non_null(non_null) };
```
Manually create a `Box` from scratch by using the global allocator:
```rust
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
`Box::from_raw` function, allowing the `Box` destructor to perform
the cleanup.

While manually deallocating the pointer through `deallocate`
is possible, you must only do this if the pointee's size, as reported by
`size_of_val`, is non-zero (the `Box` may be a dangling pointer
otherwise). See the [memory layout] section for more details.

Note: this is an associated function, which means that you have
to call it as `Box::into_raw(b)` instead of `b.into_raw()`. This
is so that there is no conflict with a method on the inner type.

# Examples
Converting the raw pointer back into a `Box` with `Box::from_raw`
for automatic cleanup:
```rust
let x = Box::new(String::from("Hello"));
let ptr = Box::into_raw(x);
let x = unsafe { Box::from_raw(ptr) };
```
Manual cleanup by explicitly running the destructor and deallocating
the memory:
```rust
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
```rust
let x = Box::new(String::from("Hello"));
let ptr = Box::into_raw(x);
unsafe {
    drop(Box::from_raw(ptr));
}
```

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
`Box::from_non_null` function, allowing the `Box` destructor to
perform the cleanup.

While manually deallocating the pointer through `deallocate`
is possible, you must only do this if the pointee's size, as reported by
`size_of_val`, is non-zero (the `Box` may be a dangling pointer
otherwise). See the [memory layout] section for more details.

Note: this is an associated function, which means that you have
to call it as `Box::into_non_null(b)` instead of `b.into_non_null()`.
This is so that there is no conflict with a method on the inner type.

# Examples
Converting the `NonNull` pointer back into a `Box` with `Box::from_non_null`
for automatic cleanup:
```rust
let x = Box::new(String::from("Hello"));
let non_null = Box::into_non_null(x);
let x = unsafe { Box::from_non_null(non_null) };
```
Manual cleanup by explicitly running the destructor and deallocating
the memory:
```rust
use std::alloc::{dealloc, Layout};

let x = Box::new(String::from("Hello"));
let non_null = Box::into_non_null(x);
unsafe {
    non_null.drop_in_place();
    dealloc(non_null.as_ptr().cast::<u8>(), Layout::new::<String>());
}
```
Note: This is equivalent to the following:
```rust
let x = Box::new(String::from("Hello"));
let non_null = Box::into_non_null(x);
unsafe {
    drop(Box::from_non_null(non_null));
}
```

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

In particular, if the size of the pointee, as reported by `size_of_val`, is
nonzero, then the raw pointer must point to a block of memory allocated by
`alloc`.
If the size of the pointee is zero, then the raw pointer can be any
sufficiently aligned non-null pointer, e.g. `ptr::dangling`.

Note that the [considerations for unsafe code] apply to all `Box<T, A>` values.

# Examples

Recreate a `Box` which was previously converted to a raw pointer
using `Box::into_raw_with_allocator`:
```rust
use std::alloc::System;

let x = Box::new_in(5, System);
let (ptr, alloc) = Box::into_raw_with_allocator(x);
let x = unsafe { Box::from_raw_in(ptr, alloc) };
```
Manually create a `Box` from scratch by using the system allocator:
```rust
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
```

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

In particular, if the size of the pointee, as reported by `size_of_val`, is
nonzero, then the raw pointer must point to a block of memory allocated by
`alloc`.
If the size of the pointee is zero, then the raw pointer can be any
sufficiently aligned pointer, e.g. `NonNull::dangling`.

Note that the [considerations for unsafe code] apply to all `Box<T, A>` values.

# Examples

Recreate a `Box` which was previously converted to a `NonNull` pointer
using `Box::into_non_null_with_allocator`:
```rust
use std::alloc::System;

let x = Box::new_in(5, System);
let (non_null, alloc) = Box::into_non_null_with_allocator(x);
let x = unsafe { Box::from_non_null_in(non_null, alloc) };
```
Manually create a `Box` from scratch by using the system allocator:
```rust
use std::alloc::{Allocator, Layout, System};

unsafe {
    let non_null = System.allocate(Layout::new::<i32>())?.cast::<i32>();
    // In general .write is required to avoid attempting to destruct
    // the (uninitialized) previous contents of `non_null`.
    non_null.write(5);
    let x = Box::from_non_null_in(non_null, System);
}
```

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
`Box::from_raw_in` function, allowing the `Box` destructor to perform
the cleanup.

While manually deallocating the pointer through `deallocate`
is possible, you must only do this if the pointee's size, as reported by
`size_of_val`, is non-zero (the `Box` may be a dangling pointer
otherwise). See the [memory layout] section for more details.

Note: this is an associated function, which means that you have
to call it as `Box::into_raw_with_allocator(b)` instead of `b.into_raw_with_allocator()`. This
is so that there is no conflict with a method on the inner type.

# Examples
Converting the raw pointer back into a `Box` with `Box::from_raw_in`
for automatic cleanup:
```rust
use std::alloc::System;

let x = Box::new_in(String::from("Hello"), System);
let (ptr, alloc) = Box::into_raw_with_allocator(x);
let x = unsafe { Box::from_raw_in(ptr, alloc) };
```
Manual cleanup by explicitly running the destructor and deallocating
the memory:
```rust
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
`Box::from_non_null_in` function, allowing the `Box` destructor to
perform the cleanup.

While manually deallocating the pointer through `deallocate`
is possible, you must only do this if the pointee's size, as reported by
`size_of_val`, is non-zero (the `Box` may be a dangling pointer
otherwise). See the [memory layout] section for more details.

Note: this is an associated function, which means that you have
to call it as `Box::into_non_null_with_allocator(b)` instead of
`b.into_non_null_with_allocator()`. This is so that there is no
conflict with a method on the inner type.

# Examples
Converting the `NonNull` pointer back into a `Box` with
`Box::from_non_null_in` for automatic cleanup:
```rust
use std::alloc::System;

let x = Box::new_in(String::from("Hello"), System);
let (non_null, alloc) = Box::into_non_null_with_allocator(x);
let x = unsafe { Box::from_non_null_in(non_null, alloc) };
```
Manual cleanup by explicitly running the destructor and deallocating
the memory:
```rust
use std::alloc::{Allocator, Layout, System};

let x = Box::new_in(String::from("Hello"), System);
let (non_null, alloc) = Box::into_non_null_with_allocator(x);
unsafe {
    non_null.drop_in_place();
    alloc.deallocate(non_null.cast::<u8>(), Layout::new::<String>());
}
```

## Box::as_mut_ptr

```rust
pub fn as_mut_ptr(b: &mut Self) -> *mut T
```

Returns a raw mutable pointer to the `Box`'s contents.

The caller must ensure that the `Box` outlives the pointer this
function returns, or else it will end up dangling.

This method guarantees that for the purpose of the aliasing model, this method
does not materialize a reference to the underlying memory, and thus the returned pointer
will remain valid when mixed with other calls to `as_ptr`, `as_mut_ptr`, and `as_non_null`.
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
