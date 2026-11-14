---
title: "core::ptr::mut_ptr (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/ptr/mut_ptr.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::ptr::mut_ptr

## mut::is_null

```rust
pub const fn is_null(self) -> bool
```

# Examples

```rust
let mut s = [1, 2, 3];
let ptr: *mut u32 = s.as_mut_ptr();
assert!(!ptr.is_null());
```

## mut::cast

```rust
pub const fn cast<U>(self) -> *mut U
```

Casts to a pointer of another type.

## mut::cast_const

```rust
pub const fn cast_const(self) -> *const T
```

Changes constness without changing the type.

This is a bit safer than `as` because it wouldn't silently change the type if the code is
refactored.

While not strictly required (`*mut T` coerces to `*const T`), this is provided for symmetry
with `cast_mut` on `*const T` and may have documentation value if used instead of implicit
coercion.

## mut::addr

```rust
pub fn addr(self) -> usize
```

## mut::expose_provenance

```rust
pub fn expose_provenance(self) -> usize
```

Exposes the "provenance" part of the pointer for future use in
`with_exposed_provenance_mut` and returns the "address" portion.

This is equivalent to `self as usize`, which semantically discards provenance information.
Furthermore, this (like the `as` cast) has the implicit side-effect of marking the
provenance as 'exposed', so on platforms that support it you can later call
`with_exposed_provenance_mut` to reconstitute the original pointer including its provenance.

Due to its inherent ambiguity, `with_exposed_provenance_mut` may not be supported by tools
that help you to stay conformant with the Rust memory model. It is recommended to use
Strict Provenance APIs such as `with_addr`[pointer::with_addr]
wherever possible, in which case `addr`[pointer::addr] should be used instead of `expose_provenance`.

On most platforms this will produce a value with the same bytes as the original pointer,
because all the bytes are dedicated to describing the address. Platforms which need to store
additional information in the pointer may not support this operation, since the 'expose'
side-effect which is required for `with_exposed_provenance_mut` to work is typically not
available.

This is an Exposed Provenance API.

## mut::with_addr

```rust
pub fn with_addr(self, addr: usize) -> Self
```

Creates a new pointer with the given address and the provenance of
`self`.

This is similar to a `addr as *mut T` cast, but copies
the *provenance* of `self` to the new pointer.
This avoids the inherent ambiguity of the unary cast.

This is equivalent to using `wrapping_offset`[pointer::wrapping_offset] to offset
`self` to the given address, and therefore has all the same capabilities and restrictions.

This is a Strict Provenance API.

## mut::map_addr

```rust
pub fn map_addr(self, f: impl FnOnce(usize) -> usize) -> Self
```

Creates a new pointer by mapping `self`'s address to a new one, preserving the original
pointer's provenance.

This is a convenience for `with_addr`[pointer::with_addr], see that method for details.

This is a Strict Provenance API.

## mut::as_ref

```rust
pub const unsafe fn as_ref<'a>(self) -> Option<&'a T>
```

```rust
let ptr: *mut u8 = &mut 10u8 as *mut u8;

unsafe {
    let val_back = ptr.as_ref_unchecked();
    println!("We got back the value: {val_back}!");
}
```

# Examples

```rust
let ptr: *mut u8 = &mut 10u8 as *mut u8;

unsafe {
    if let Some(val_back) = ptr.as_ref() {
        println!("We got back the value: {val_back}!");
    }
}
```

# See Also

For the mutable counterpart see `as_mut`.

## mut::as_ref_unchecked

```rust
pub const unsafe fn as_ref_unchecked<'a>(self) -> &'a T
```

Returns a shared reference to the value behind the pointer.
If the pointer may be null or the value may be uninitialized, `as_uninit_ref` must be used instead.
If the pointer may be null, but the value is known to have been initialized, `as_ref` must be used instead.

For the mutable counterpart see `as_mut_unchecked`.

# Safety

When calling this method, you have to ensure that the pointer is convertible to a reference.

# Examples

```rust
let ptr: *mut u8 = &mut 10u8 as *mut u8;

unsafe {
    println!("We got back the value: {}!", ptr.as_ref_unchecked());
}
```

## mut::offset

```rust
pub const unsafe fn offset(self, count: isize) -> *mut T where T: Sized,
```

Consider using `wrapping_offset` instead if these constraints are
difficult to satisfy. The only advantage of this method is that it
enables more aggressive compiler optimizations.

# Examples

```rust
let mut s = [1, 2, 3];
let ptr: *mut u32 = s.as_mut_ptr();

unsafe {
    assert_eq!(2, *ptr.offset(1));
    assert_eq!(3, *ptr.offset(2));
}
```

## mut::byte_offset

```rust
pub const unsafe fn byte_offset(self, count: isize) -> Self
```

Adds a signed offset in bytes to a pointer.

`count` is in units of **bytes**.

This is purely a convenience for casting to a `u8` pointer and
using offset on it. See that method for documentation
and safety requirements.

For non-`Sized` pointees this operation changes only the data pointer,
leaving the metadata untouched.

## mut::wrapping_offset

```rust
pub const fn wrapping_offset(self, count: isize) -> *mut T where T: Sized,
```

Adds a signed offset to a pointer using wrapping arithmetic.

`count` is in units of T; e.g., a `count` of 3 represents a pointer
offset of `3 * size_of::<T>()` bytes.

# Safety

This operation itself is always safe, but using the resulting pointer is not.

The resulting pointer "remembers" the [allocation] that `self` points to
(this is called "Provenance").
The pointer must not be used to read or write other allocations.

In other words, `let z = x.wrapping_offset((y as isize) - (x as isize))` does *not* make `z`
the same as `y` even if we assume `T` has size `1` and there is no overflow: `z` is still
attached to the object `x` is attached to, and dereferencing it is Undefined Behavior unless
`x` and `y` point into the same allocation.

Compared to `offset`, this method basically delays the requirement of staying within the
same allocation: `offset` is immediate Undefined Behavior when crossing object
boundaries; `wrapping_offset` produces a pointer but still leads to Undefined Behavior if a
pointer is dereferenced when it is out-of-bounds of the object it is attached to. `offset`
can be optimized better and is thus preferable in performance-sensitive code.

The delayed check only considers the value of the pointer that was dereferenced, not the
intermediate values used during the computation of the final result. For example,
`x.wrapping_offset(o).wrapping_offset(o.wrapping_neg())` is always the same as `x`. In other
words, leaving the allocation and then re-entering it later is permitted.

# Examples

```rust
// Iterate using a raw pointer in increments of two elements
let mut data = [1u8, 2, 3, 4, 5];
let mut ptr: *mut u8 = data.as_mut_ptr();
let step = 2;
let end_rounded_up = ptr.wrapping_offset(6);

while ptr != end_rounded_up {
    unsafe {
        *ptr = 0;
    }
    ptr = ptr.wrapping_offset(step);
}
assert_eq!(&data, &[0, 2, 0, 4, 0]);
```

## mut::wrapping_byte_offset

```rust
pub const fn wrapping_byte_offset(self, count: isize) -> Self
```

Adds a signed offset in bytes to a pointer using wrapping arithmetic.

`count` is in units of **bytes**.

This is purely a convenience for casting to a `u8` pointer and
using wrapping_offset on it. See that method
for documentation.

For non-`Sized` pointees this operation changes only the data pointer,
leaving the metadata untouched.

## mut::as_mut

```rust
pub const unsafe fn as_mut<'a>(self) -> Option<&'a mut T>
```

Returns `None` if the pointer is null, or else returns a unique reference to
the value wrapped in `Some`. If the value may be uninitialized, `as_uninit_mut`
must be used instead. If the value is known to be non-null, `as_mut_unchecked`
can be used instead.

For the shared counterpart see `as_ref`.

# Safety

When calling this method, you have to ensure that *either*
the pointer is null *or*
the pointer is convertible to a reference.

# Panics during const evaluation

This method will panic during const evaluation if the pointer cannot be
determined to be null or not. See `is_null` for more information.

# Examples

```rust
let mut s = [1, 2, 3];
let ptr: *mut u32 = s.as_mut_ptr();
let first_value = unsafe { ptr.as_mut().unwrap() };
*first_value = 4;
println!("{s:?}"); // It'll print: "[4, 2, 3]".
```

# Null-unchecked version

If you are sure the pointer can never be null, you can use `as_mut_unchecked` which returns
`&mut T` instead of `Option<&mut T>`.

```rust
let mut s = [1, 2, 3];
let ptr: *mut u32 = s.as_mut_ptr();
let first_value = unsafe { ptr.as_mut_unchecked() };
*first_value = 4;
println!("{s:?}"); // It'll print: "[4, 2, 3]".
```

## mut::as_mut_unchecked

```rust
pub const unsafe fn as_mut_unchecked<'a>(self) -> &'a mut T
```

Returns a unique reference to the value behind the pointer.
If the pointer may be null or the value may be uninitialized, `as_uninit_mut` must be used instead.
If the pointer may be null, but the value is known to have been initialized, `as_mut` must be used instead.

For the shared counterpart see `as_ref_unchecked`.

# Safety

When calling this method, you have to ensure that
the pointer is convertible to a reference.

# Examples

```rust
let mut s = [1, 2, 3];
let ptr: *mut u32 = s.as_mut_ptr();
let first_value = unsafe { ptr.as_mut_unchecked() };
*first_value = 4;
println!("{s:?}"); // It'll print: "[4, 2, 3]".
```

## mut::offset_from

```rust
pub const unsafe fn offset_from(self, origin: *const T) -> isize where T: Sized,
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
  * both be derived from a pointer to the same [allocation], and the memory range between
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
let mut a = [0; 5];
let ptr1: *mut i32 = &mut a[1];
let ptr2: *mut i32 = &mut a[3];
unsafe {
    assert_eq!(ptr2.offset_from(ptr1), 2);
    assert_eq!(ptr1.offset_from(ptr2), -2);
    assert_eq!(ptr1.offset(2), ptr2);
    assert_eq!(ptr2.offset(-2), ptr1);
}
```

*Incorrect* usage:

```rust
let ptr1 = Box::into_raw(Box::new(0u8));
let ptr2 = Box::into_raw(Box::new(1u8));
let diff = (ptr2 as isize).wrapping_sub(ptr1 as isize);
// Make ptr2_other an "alias" of ptr2.add(1), but derived from ptr1.
let ptr2_other = (ptr1 as *mut u8).wrapping_offset(diff).wrapping_offset(1);
assert_eq!(ptr2 as usize, ptr2_other as usize);
// Since ptr2_other and ptr2 are derived from pointers to different objects,
// computing their offset is undefined behavior, even though
// they point to addresses that are in-bounds of the same object!
unsafe {
    let one = ptr2_other.offset_from(ptr2); // Undefined Behavior! ⚠️
}
```

## mut::byte_offset_from

```rust
pub const unsafe fn byte_offset_from<U: ?Sized>(self, origin: *const U) -> isize
```

Calculates the distance between two pointers within the same allocation. The returned value is in
units of **bytes**.

This is purely a convenience for casting to a `u8` pointer and
using `offset_from`[pointer::offset_from] on it. See that method for
documentation and safety requirements.

For non-`Sized` pointees this operation considers only the data pointers,
ignoring the metadata.

## mut::offset_from_unsigned

```rust
pub const unsafe fn offset_from_unsigned(self, origin: *const T) -> usize where T: Sized,
```

Calculates the distance between two pointers within the same allocation, *where it's known that
`self` is equal to or greater than `origin`*. The returned value is in
units of T: the distance in bytes is divided by `size_of::<T>()`.

This computes the same value that `offset_from`
would compute, but with the added precondition that the offset is
guaranteed to be non-negative.  This method is equivalent to
`usize::try_from(self.offset_from(origin)).unwrap_unchecked()`,
but it provides slightly more information to the optimizer, which can
sometimes allow it to optimize slightly better with some backends.

This method can be thought of as recovering the `count` that was passed
to `add` (or, with the parameters in the other order,
to `sub`).  The following are all equivalent, assuming
that their safety preconditions are met:
```rust
ptr.offset_from_unsigned(origin) == count
origin.add(count) == ptr
ptr.sub(count) == origin
```

# Safety

- The distance between the pointers must be non-negative (`self >= origin`)

- *All* the safety conditions of `offset_from`
  apply to this method as well; see it for the full details.

Importantly, despite the return type of this method being able to represent
a larger offset, it's still *not permitted* to pass <example-value> which differ
by more than `isize::MAX` *bytes*.  As such, the result of this method will
always be less than or equal to `isize::MAX as usize`.

# Panics

This function panics if `T` is a Zero-Sized Type ("ZST").

# Examples

```rust
let mut a = [0; 5];
let p: *mut i32 = a.as_mut_ptr();
unsafe {
    let ptr1: *mut i32 = p.add(1);
    let ptr2: *mut i32 = p.add(3);

    assert_eq!(ptr2.offset_from_unsigned(ptr1), 2);
    assert_eq!(ptr1.add(2), ptr2);
    assert_eq!(ptr2.sub(2), ptr1);
    assert_eq!(ptr2.offset_from_unsigned(ptr2), 0);
}

// This would be incorrect, as the pointers are not correctly ordered:
// ptr1.offset_from(ptr2)
```
