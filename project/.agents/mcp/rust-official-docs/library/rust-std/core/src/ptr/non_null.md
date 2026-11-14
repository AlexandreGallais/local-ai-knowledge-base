---
title: "core::ptr::non_null (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/ptr/non_null.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::ptr::non_null

## struct NonNull

```rust
pub struct NonNull<T: PointeeSized>
```

`*mut T` but non-zero and [covariant].

This is often the correct thing to use when building data structures using
raw pointers, but is ultimately more dangerous to use because of its additional
properties. If you're not sure if you should use `NonNull<T>`, just use `*mut T`!

Unlike `*mut T`, the pointer must always be non-null, even if the pointer
is never dereferenced. This is so that enums may use this forbidden value
as a discriminant -- `Option<NonNull<T>>` has the same size as `*mut T`.
However the pointer may still dangle if it isn't dereferenced.

Unlike `*mut T`, `NonNull<T>` is covariant over `T`. This is usually the correct
choice for most data structures and safe abstractions, such as `Box`, `Rc`, `Arc`, `Vec`,
and `LinkedList`.

In rare cases, if your type exposes a way to mutate the value of `T` through a `NonNull<T>`,
and you need to prevent unsoundness from variance (for example, if `T` could be a reference
with a shorter lifetime), you should add a field to make your type invariant, such as
`PhantomData<Cell<T>>` or `PhantomData<&'a mut T>`.

Example of a type that must be invariant:
```rust
use std::cell::Cell;
use std::marker::PhantomData;
struct Invariant<T> {
    ptr: std::ptr::NonNull<T>,
    _invariant: PhantomData<Cell<T>>,
}
```

Notice that `NonNull<T>` has a `From` instance for `&T`. However, this does
not change the fact that mutating through a (pointer derived from a) shared
reference is undefined behavior unless the mutation happens inside an
`UnsafeCell<T>`. The same goes for creating a mutable reference from a shared
reference. When using this `From` instance without an `UnsafeCell<T>`,
it is your responsibility to ensure that `as_mut` is never called, and `as_ptr`
is never used for mutation.

# Layout

`NonNull<T>` is guaranteed to have the same layout and bit validity as `*mut T`
with the exception that a null pointer is invalid.
`Option<NonNull<T>>` is guaranteed to be ABI-compatible with `*mut T`, including in
FFI.

Thanks to the [null pointer optimization],
`NonNull<T>` and `Option<NonNull<T>>`
are guaranteed to have the same size and alignment:

```rust
use std::ptr::NonNull;

assert_eq!(size_of::<NonNull<i16>>(), size_of::<Option<NonNull<i16>>>());
assert_eq!(align_of::<NonNull<i16>>(), align_of::<Option<NonNull<i16>>>());

assert_eq!(size_of::<NonNull<str>>(), size_of::<Option<NonNull<str>>>());
assert_eq!(align_of::<NonNull<str>>(), align_of::<Option<NonNull<str>>>());
```

## NonNull::without_provenance

```rust
pub const fn without_provenance(addr: NonZero<usize>) -> Self
```

Creates a pointer with the given address and no provenance.

For more details, see the equivalent method on a raw pointer, `ptr::without_provenance_mut`.

This is a Strict Provenance API.

## NonNull::dangling

```rust
pub const fn dangling() -> Self
```

Creates a new `NonNull` that is dangling, but well-aligned.

This is useful for initializing types which lazily allocate, like
`Vec::new` does.

Note that the address of the returned pointer may potentially
be that of a valid pointer, which means this must not be used
as a "not yet initialized" sentinel value.
Types that lazily allocate must track initialization by some other means.

# Examples

```rust
use std::ptr::NonNull;

let ptr = NonNull::<u32>::dangling();
// Important: don't try to access the value of `ptr` without
// initializing it first! The pointer is not null but isn't valid either!
```

## NonNull::with_exposed_provenance

```rust
pub const fn with_exposed_provenance(addr: NonZero<usize>) -> Self
```

Converts an address back to a mutable pointer, picking up some previously 'exposed'
provenance.

For more details, see the equivalent method on a raw pointer, `ptr::with_exposed_provenance_mut`.

This is an Exposed Provenance API.

## NonNull::new_unchecked

```rust
pub const unsafe fn new_unchecked(ptr: *mut T) -> Self
```

Creates a new `NonNull`.

Note that if you have an `&mut`, you can use the safe `from_mut` instead.

# Safety

`ptr` must be non-null.

# Examples

```rust
use std::ptr::NonNull;

let mut x = 0u32;
let ptr = unsafe { NonNull::new_unchecked(&mut x as *mut _) };
```

*Incorrect* usage of this function:

```rust
use std::ptr::NonNull;

// NEVER DO THAT!!! This is undefined behavior. ⚠️
let ptr = unsafe { NonNull::<u32>::new_unchecked(std::ptr::null_mut()) };
```

## NonNull::new

```rust
pub const fn new(ptr: *mut T) -> Option<Self>
```

Creates a new `NonNull` if `ptr` is non-null.

Note that if you have an `&mut`, you can use `from_mut` instead to avoid the `Option`.

# Panics during const evaluation

This method will panic during const evaluation if the pointer cannot be
determined to be null or not. See `is_null` for more information.

# Examples

```rust
use std::ptr::NonNull;

let mut x = 0u32;
let ptr = NonNull::<u32>::new(&mut x as *mut _).expect("pointer should not be null");

if let Some(ptr) = NonNull::<u32>::new(std::ptr::null_mut()) {
    unreachable!();
}
```

## NonNull::from_ref

```rust
pub const fn from_ref(r: &T) -> Self
```

Converts a reference to a `NonNull` pointer.

## NonNull::from_mut

```rust
pub const fn from_mut(r: &mut T) -> Self
```

Converts a mutable reference to a `NonNull` pointer.

## NonNull::addr

```rust
pub fn addr(self) -> NonZero<usize>
```

Gets the "address" portion of the pointer.

For more details, see the equivalent method on a raw pointer, `pointer::addr`.

This is a Strict Provenance API.

## NonNull::expose_provenance

```rust
pub fn expose_provenance(self) -> NonZero<usize>
```

Exposes the "provenance" part of the pointer for future use in
`with_exposed_provenance`[NonNull::with_exposed_provenance] and returns the "address" portion.

For more details, see the equivalent method on a raw pointer, `pointer::expose_provenance`.

This is an Exposed Provenance API.

## NonNull::with_addr

```rust
pub fn with_addr(self, addr: NonZero<usize>) -> Self
```

Creates a new pointer with the given address and the provenance of
`self`.

For more details, see the equivalent method on a raw pointer, `pointer::with_addr`.

This is a Strict Provenance API.

## NonNull::map_addr

```rust
pub fn map_addr(self, f: impl FnOnce(NonZero<usize>) -> NonZero<usize>) -> Self
```

Creates a new pointer by mapping `self`'s address to a new one, preserving the
provenance of `self`.

For more details, see the equivalent method on a raw pointer, `pointer::map_addr`.

This is a Strict Provenance API.

## NonNull::as_ptr

```rust
pub const fn as_ptr(self) -> *mut T
```

Acquires the underlying `*mut` pointer.

# Examples

```rust
use std::ptr::NonNull;

let mut x = 0u32;
let ptr = NonNull::new(&mut x).expect("pointer should not be null");

let x_value = unsafe { *ptr.as_ptr() };
assert_eq!(x_value, 0);

unsafe { *ptr.as_ptr() += 2; }
let x_value = unsafe { *ptr.as_ptr() };
assert_eq!(x_value, 2);
```

## NonNull::as_ref

```rust
pub const unsafe fn as_ref<'a>(&self) -> &'a T
```

Returns a shared reference to the value. If the value may be uninitialized, `as_uninit_ref`
must be used instead.

For the mutable counterpart see `as_mut`.

# Safety

When calling this method, you have to ensure that
the pointer is convertible to a reference.

# Examples

```rust
use std::ptr::NonNull;

let mut x = 0u32;
let ptr = NonNull::new(&mut x as *mut _).expect("pointer should not be null");

let ref_x = unsafe { ptr.as_ref() };
println!("{ref_x}");
```

## NonNull::as_mut

```rust
pub const unsafe fn as_mut<'a>(&mut self) -> &'a mut T
```

Returns a unique reference to the value. If the value may be uninitialized, `as_uninit_mut`
must be used instead.

For the shared counterpart see `as_ref`.

# Safety

When calling this method, you have to ensure that
the pointer is convertible to a reference.
# Examples

```rust
use std::ptr::NonNull;

let mut x = 0u32;
let mut ptr = NonNull::new(&mut x).expect("pointer should not be null");

let x_ref = unsafe { ptr.as_mut() };
assert_eq!(*x_ref, 0);
*x_ref += 2;
assert_eq!(*x_ref, 2);
```

## NonNull::cast

```rust
pub const fn cast<U>(self) -> NonNull<U>
```

Casts to a pointer of another type.

# Examples

```rust
use std::ptr::NonNull;

let mut x = 0u32;
let ptr = NonNull::new(&mut x as *mut _).expect("pointer should not be null");

let casted_ptr = ptr.cast::<i8>();
let raw_ptr: *mut i8 = casted_ptr.as_ptr();
```

## NonNull::offset

```rust
pub const unsafe fn offset(self, count: isize) -> Self where T: Sized,
```

# Examples

```rust
use std::ptr::NonNull;

let mut s = [1, 2, 3];
let ptr: NonNull<u32> = NonNull::new(s.as_mut_ptr()).unwrap();

unsafe {
    println!("{}", ptr.offset(1).read());
    println!("{}", ptr.offset(2).read());
}
```

## NonNull::byte_offset

```rust
pub const unsafe fn byte_offset(self, count: isize) -> Self
```

Calculates the offset from a pointer in bytes.

`count` is in units of **bytes**.

This is purely a convenience for casting to a `u8` pointer and
using offset on it. See that method for documentation
and safety requirements.

For non-`Sized` pointees this operation changes only the data pointer,
leaving the metadata untouched.

## NonNull::add

```rust
pub const unsafe fn add(self, count: usize) -> Self where T: Sized,
```

# Examples

```rust
use std::ptr::NonNull;

let s: &str = "123";
let ptr: NonNull<u8> = NonNull::new(s.as_ptr().cast_mut()).unwrap();

unsafe {
    println!("{}", ptr.add(1).read() as char);
    println!("{}", ptr.add(2).read() as char);
}
```

## NonNull::byte_add

```rust
pub const unsafe fn byte_add(self, count: usize) -> Self
```

Calculates the offset from a pointer in bytes (convenience for `.byte_offset(count as isize)`).

`count` is in units of bytes.

This is purely a convenience for casting to a `u8` pointer and
using `add`[NonNull::add] on it. See that method for documentation
and safety requirements.

For non-`Sized` pointees this operation changes only the data pointer,
leaving the metadata untouched.

## NonNull::sub

```rust
pub const unsafe fn sub(self, count: usize) -> Self where T: Sized,
```

# Examples

```rust
use std::ptr::NonNull;

let s: &str = "123";

unsafe {
    let end: NonNull<u8> = NonNull::new(s.as_ptr().cast_mut()).unwrap().add(3);
    println!("{}", end.sub(1).read() as char);
    println!("{}", end.sub(2).read() as char);
}
```

## NonNull::byte_sub

```rust
pub const unsafe fn byte_sub(self, count: usize) -> Self
```

Calculates the offset from a pointer in bytes (convenience for
`.byte_offset((count as isize).wrapping_neg())`).

`count` is in units of bytes.

This is purely a convenience for casting to a `u8` pointer and
using `sub`[NonNull::sub] on it. See that method for documentation
and safety requirements.

For non-`Sized` pointees this operation changes only the data pointer,
leaving the metadata untouched.

## NonNull::offset_from

```rust
pub const unsafe fn offset_from(self, origin: NonNull<T>) -> isize where T: Sized,
```

Calculates the distance between two pointers within the same allocation. The returned value is in
units of T: the distance in bytes divided by `size_of::<T>()`.

This is equivalent to `(self as isize - origin as isize) / (size_of::<T>() as isize)`,
except that it has a lot more opportunities for UB, in exchange for the compiler
better understanding what you are doing.

The primary motivation of this method is for computing the `len` of an array/slice
of `T` that you are currently representing as a "start" and "end" pointer
(and "end" is "one past the end" of the array).
In that case, `end.offset_from(start)` gets you the length of the array.

All of the following safety requirements are trivially satisfied for this usecase.

# Safety

If any of the following conditions are violated, the result is Undefined Behavior:

* `self` and `origin` must either

  * point to the same address, or
  * both be *derived from* a pointer to the same [allocation], and the memory range between
    the two pointers must be in bounds of that object. (See below for an example.)

* The distance between the pointers, in bytes, must be an exact multiple
  of the size of `T`.

As a consequence, the absolute distance between the pointers, in bytes, computed on
mathematical integers (without "wrapping around"), cannot overflow an `isize`. This is
implied by the in-bounds requirement, and the fact that no allocation can be larger
than `isize::MAX` bytes.

The requirement for pointers to be derived from the same allocation is primarily
needed for `const`-compatibility: the distance between pointers into *different* allocated
objects is not known at compile-time. However, the requirement also exists at
runtime and may be exploited by optimizations. If you wish to compute the difference between
pointers that are not guaranteed to be from the same allocation, use
`(self.addr() as isize - origin.addr() as isize) / size_of::<T>()`.

# Panics

This function panics if `T` is a Zero-Sized Type ("ZST").

# Examples

Basic usage:

```rust
use std::ptr::NonNull;

let a = [0; 5];
let ptr1: NonNull<u32> = NonNull::from(&a[1]);
let ptr2: NonNull<u32> = NonNull::from(&a[3]);
unsafe {
    assert_eq!(ptr2.offset_from(ptr1), 2);
    assert_eq!(ptr1.offset_from(ptr2), -2);
    assert_eq!(ptr1.offset(2), ptr2);
    assert_eq!(ptr2.offset(-2), ptr1);
}
```

*Incorrect* usage:

```rust
use std::ptr::NonNull;

let ptr1 = NonNull::new(Box::into_raw(Box::new(0u8))).unwrap();
let ptr2 = NonNull::new(Box::into_raw(Box::new(1u8))).unwrap();
let diff = (ptr2.addr().get() as isize).wrapping_sub(ptr1.addr().get() as isize);
// Make ptr2_other an "alias" of ptr2.add(1), but derived from ptr1.
let diff_plus_1 = diff.wrapping_add(1);
let ptr2_other = NonNull::new(ptr1.as_ptr().wrapping_byte_offset(diff_plus_1)).unwrap();
assert_eq!(ptr2.addr(), ptr2_other.addr());
// Since ptr2_other and ptr2 are derived from pointers to different objects,
// computing their offset is undefined behavior, even though
// they point to addresses that are in-bounds of the same object!

let one = unsafe { ptr2_other.offset_from(ptr2) }; // Undefined Behavior! ⚠️
```

## NonNull::byte_offset_from

```rust
pub const unsafe fn byte_offset_from<U: ?Sized>(self, origin: NonNull<U>) -> isize
```

Calculates the distance between two pointers within the same allocation. The returned value is in
units of **bytes**.

This is purely a convenience for casting to a `u8` pointer and
using `offset_from`[NonNull::offset_from] on it. See that method for
documentation and safety requirements.

For non-`Sized` pointees this operation considers only the data pointers,
ignoring the metadata.
