---
title: "core::ptr::const_ptr (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/ptr/const_ptr.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::ptr::const_ptr (part 2 of 2)

## const::wrapping_add

```rust
pub const fn wrapping_add(self, count: usize) -> Self where T: Sized,
```

Adds an unsigned offset to a pointer using wrapping arithmetic.

`count` is in units of T; e.g., a `count` of 3 represents a pointer
offset of `3 * size_of::<T>()` bytes.

# Safety

This operation itself is always safe, but using the resulting pointer is not.

The resulting pointer "remembers" the [allocation] that `self` points to; it must not
be used to read or write other allocations.

In other words, `let z = x.wrapping_add((y as usize) - (x as usize))` does *not* make `z`
the same as `y` even if we assume `T` has size `1` and there is no overflow: `z` is still
attached to the object `x` is attached to, and dereferencing it is Undefined Behavior unless
`x` and `y` point into the same allocation.

Compared to `add`, this method basically delays the requirement of staying within the
same allocation: `add` is immediate Undefined Behavior when crossing object
boundaries; `wrapping_add` produces a pointer but still leads to Undefined Behavior if a
pointer is dereferenced when it is out-of-bounds of the object it is attached to. `add`
can be optimized better and is thus preferable in performance-sensitive code.

The delayed check only considers the value of the pointer that was dereferenced, not the
intermediate values used during the computation of the final result. For example,
`x.wrapping_add(o).wrapping_sub(o)` is always the same as `x`. In other words, leaving the
allocation and then re-entering it later is permitted.

# Examples

```rust
// Iterate using a raw pointer in increments of two elements
let data = [1u8, 2, 3, 4, 5];
let mut ptr: *const u8 = data.as_ptr();
let step = 2;
let end_rounded_up = ptr.wrapping_add(6);

let mut out = String::new();
while ptr != end_rounded_up {
    unsafe {
        write!(&mut out, "{}, ", *ptr)?;
    }
    ptr = ptr.wrapping_add(step);
}
assert_eq!(out, "1, 3, 5, ");
```

## const::wrapping_byte_add

```rust
pub const fn wrapping_byte_add(self, count: usize) -> Self
```

Adds an unsigned offset in bytes to a pointer using wrapping arithmetic.

`count` is in units of bytes.

This is purely a convenience for casting to a `u8` pointer and
using wrapping_add on it. See that method for documentation.

For non-`Sized` pointees this operation changes only the data pointer,
leaving the metadata untouched.

## const::wrapping_sub

```rust
pub const fn wrapping_sub(self, count: usize) -> Self where T: Sized,
```

Subtracts an unsigned offset from a pointer using wrapping arithmetic.

`count` is in units of T; e.g., a `count` of 3 represents a pointer
offset of `3 * size_of::<T>()` bytes.

# Safety

This operation itself is always safe, but using the resulting pointer is not.

The resulting pointer "remembers" the [allocation] that `self` points to; it must not
be used to read or write other allocations.

In other words, `let z = x.wrapping_sub((x as usize) - (y as usize))` does *not* make `z`
the same as `y` even if we assume `T` has size `1` and there is no overflow: `z` is still
attached to the object `x` is attached to, and dereferencing it is Undefined Behavior unless
`x` and `y` point into the same allocation.

Compared to `sub`, this method basically delays the requirement of staying within the
same allocation: `sub` is immediate Undefined Behavior when crossing object
boundaries; `wrapping_sub` produces a pointer but still leads to Undefined Behavior if a
pointer is dereferenced when it is out-of-bounds of the object it is attached to. `sub`
can be optimized better and is thus preferable in performance-sensitive code.

The delayed check only considers the value of the pointer that was dereferenced, not the
intermediate values used during the computation of the final result. For example,
`x.wrapping_add(o).wrapping_sub(o)` is always the same as `x`. In other words, leaving the
allocation and then re-entering it later is permitted.

# Examples

```rust
// Iterate using a raw pointer in increments of two elements (backwards)
let data = [1u8, 2, 3, 4, 5];
let mut ptr: *const u8 = data.as_ptr();
let start_rounded_down = ptr.wrapping_sub(2);
ptr = ptr.wrapping_add(4);
let step = 2;
let mut out = String::new();
while ptr != start_rounded_down {
    unsafe {
        write!(&mut out, "{}, ", *ptr)?;
    }
    ptr = ptr.wrapping_sub(step);
}
assert_eq!(out, "5, 3, 1, ");
```

## const::wrapping_byte_sub

```rust
pub const fn wrapping_byte_sub(self, count: usize) -> Self
```

Subtracts an unsigned offset in bytes from a pointer using wrapping arithmetic.

`count` is in units of bytes.

This is purely a convenience for casting to a `u8` pointer and
using wrapping_sub on it. See that method for documentation.

For non-`Sized` pointees this operation changes only the data pointer,
leaving the metadata untouched.

## const::read

```rust
pub const unsafe fn read(self) -> T where T: Sized,
```

Reads the value from `self` without moving it. This leaves the
memory in `self` unchanged.

See `ptr::read` for safety concerns and examples.

## const::read_volatile

```rust
pub const unsafe fn read_volatile(self) -> T where T: Sized,
```

Performs a volatile read of the value from `self` without moving it. This
leaves the memory in `self` unchanged.

Volatile operations are intended to act on I/O memory, and are guaranteed
to not be elided or reordered by the compiler across other volatile
operations.

See `ptr::read_volatile` for safety concerns and examples.

## const::read_unaligned

```rust
pub const unsafe fn read_unaligned(self) -> T where T: Sized,
```

Reads the value from `self` without moving it. This leaves the
memory in `self` unchanged.

Unlike `read`, the pointer may be unaligned.

See `ptr::read_unaligned` for safety concerns and examples.

## const::copy_to

```rust
pub const unsafe fn copy_to(self, dest: *mut T, count: usize) where T: Sized,
```

Copies `count * size_of::<T>()` bytes from `self` to `dest`. The source
and destination may overlap.

NOTE: this has the *same* argument order as `ptr::copy`.

See `ptr::copy` for safety concerns and examples.

## const::copy_to_nonoverlapping

```rust
pub const unsafe fn copy_to_nonoverlapping(self, dest: *mut T, count: usize) where T: Sized,
```

Copies `count * size_of::<T>()` bytes from `self` to `dest`. The source
and destination may *not* overlap.

NOTE: this has the *same* argument order as `ptr::copy_nonoverlapping`.

See `ptr::copy_nonoverlapping` for safety concerns and examples.

## const::align_offset

```rust
pub fn align_offset(self, align: usize) -> usize where T: Sized,
```

Computes the offset that needs to be applied to the pointer in order to make it aligned to
`align`.

If it is not possible to align the pointer, the implementation returns
`usize::MAX`.

The offset is expressed in number of `T` elements, and not bytes. The value returned can be
used with the `wrapping_add` method.

There are no guarantees whatsoever that offsetting the pointer will not overflow or go
beyond the allocation that the pointer points into. It is up to the caller to ensure that
the returned offset is correct in all terms other than alignment.

# Panics

The function panics if `align` is not a power-of-two.

# Examples

Accessing adjacent `u8` as `u16`

```rust
let x = [5_u8, 6, 7, 8, 9];
let ptr = x.as_ptr();
let offset = ptr.align_offset(align_of::<u16>());

if offset < x.len() - 1 {
    let u16_ptr = ptr.add(offset).cast::<u16>();
    assert!(*u16_ptr == u16::from_ne_bytes([5, 6]) || *u16_ptr == u16::from_ne_bytes([6, 7]));
} else {
    // while the pointer can be aligned via `offset`, it would point
    // outside the allocation
}
```

## const::is_aligned

```rust
pub fn is_aligned(self) -> bool where T: Sized,
```

Returns whether the pointer is properly aligned for `T`.

# Examples

```rust
// On some platforms, the alignment of i32 is less than 4.
#[repr(align(4))]
struct AlignedI32(i32);

let data = AlignedI32(42);
let ptr = &data as *const AlignedI32;

assert!(ptr.is_aligned());
assert!(!ptr.wrapping_byte_add(1).is_aligned());
```

## const::len

```rust
pub const fn len(self) -> usize
```

Returns the length of a raw slice.

The returned value is the number of **elements**, not the number of bytes.

This function is safe, even when the raw slice cannot be cast to a slice
reference because the pointer is null or unaligned.

# Examples

```rust
use std::ptr;

let slice: *const [i8] = ptr::slice_from_raw_parts(ptr::null(), 3);
assert_eq!(slice.len(), 3);
```

## const::is_empty

```rust
pub const fn is_empty(self) -> bool
```

Returns `true` if the raw slice has a length of 0.

# Examples

```rust
use std::ptr;

let slice: *const [i8] = ptr::slice_from_raw_parts(ptr::null(), 3);
assert!(!slice.is_empty());
```

## const::as_array

```rust
pub const fn as_array<const N: usize>(self) -> Option<*const [T; N]>
```

Gets a raw pointer to the underlying array.

If `N` is not exactly equal to the length of `self`, then this method returns `None`.
