---
title: "core::ptr::mut_ptr (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/ptr/mut_ptr.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::ptr::mut_ptr (part 2 of 2)

## mut::byte_offset_from_unsigned

```rust
pub const unsafe fn byte_offset_from_unsigned<U: ?Sized>(self, origin: *mut U) -> usize
```

Calculates the distance between two pointers within the same allocation, *where it's known that
`self` is equal to or greater than `origin`*. The returned value is in
units of **bytes**.

This is purely a convenience for casting to a `u8` pointer and
using `offset_from_unsigned`[pointer::offset_from_unsigned] on it.
See that method for documentation and safety requirements.

For non-`Sized` pointees this operation considers only the data pointers,
ignoring the metadata.

## mut::add

```rust
pub const unsafe fn add(self, count: usize) -> Self where T: Sized,
```

Consider using `wrapping_add` instead if these constraints are
difficult to satisfy. The only advantage of this method is that it
enables more aggressive compiler optimizations.

# Examples

```rust
let mut s: String = "123".to_string();
let ptr: *mut u8 = s.as_mut_ptr();

unsafe {
    assert_eq!('2', *ptr.add(1) as char);
    assert_eq!('3', *ptr.add(2) as char);
}
```

## mut::byte_add

```rust
pub const unsafe fn byte_add(self, count: usize) -> Self
```

Adds an unsigned offset in bytes to a pointer.

`count` is in units of bytes.

This is purely a convenience for casting to a `u8` pointer and
using add on it. See that method for documentation
and safety requirements.

For non-`Sized` pointees this operation changes only the data pointer,
leaving the metadata untouched.

## mut::sub

```rust
pub const unsafe fn sub(self, count: usize) -> Self where T: Sized,
```

Consider using `wrapping_sub` instead if these constraints are
difficult to satisfy. The only advantage of this method is that it
enables more aggressive compiler optimizations.

# Examples

```rust
let s: &str = "123";

unsafe {
    let end: *const u8 = s.as_ptr().add(3);
    assert_eq!('3', *end.sub(1) as char);
    assert_eq!('2', *end.sub(2) as char);
}
```

## mut::byte_sub

```rust
pub const unsafe fn byte_sub(self, count: usize) -> Self
```

Subtracts an unsigned offset in bytes from a pointer.

`count` is in units of bytes.

This is purely a convenience for casting to a `u8` pointer and
using sub on it. See that method for documentation
and safety requirements.

For non-`Sized` pointees this operation changes only the data pointer,
leaving the metadata untouched.

## mut::wrapping_add

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

// This loop prints "1, 3, 5, "
while ptr != end_rounded_up {
    unsafe {
        print!("{}, ", *ptr);
    }
    ptr = ptr.wrapping_add(step);
}
```

## mut::wrapping_byte_add

```rust
pub const fn wrapping_byte_add(self, count: usize) -> Self
```

Adds an unsigned offset in bytes to a pointer using wrapping arithmetic.

`count` is in units of bytes.

This is purely a convenience for casting to a `u8` pointer and
using wrapping_add on it. See that method for documentation.

For non-`Sized` pointees this operation changes only the data pointer,
leaving the metadata untouched.

## mut::wrapping_sub

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
// This loop prints "5, 3, 1, "
while ptr != start_rounded_down {
    unsafe {
        print!("{}, ", *ptr);
    }
    ptr = ptr.wrapping_sub(step);
}
```

## mut::wrapping_byte_sub

```rust
pub const fn wrapping_byte_sub(self, count: usize) -> Self
```

Subtracts an unsigned offset in bytes from a pointer using wrapping arithmetic.

`count` is in units of bytes.

This is purely a convenience for casting to a `u8` pointer and
using wrapping_sub on it. See that method for documentation.

For non-`Sized` pointees this operation changes only the data pointer,
leaving the metadata untouched.

## mut::read

```rust
pub const unsafe fn read(self) -> T where T: Sized,
```

Reads the value from `self` without moving it. This leaves the
memory in `self` unchanged.

See `ptr::read` for safety concerns and examples.

## mut::read_volatile

```rust
pub const unsafe fn read_volatile(self) -> T where T: Sized,
```

Performs a volatile read of the value from `self` without moving it. This
leaves the memory in `self` unchanged.

Volatile operations are intended to act on I/O memory, and are guaranteed
to not be elided or reordered by the compiler across other volatile
operations.

See `ptr::read_volatile` for safety concerns and examples.

## mut::read_unaligned

```rust
pub const unsafe fn read_unaligned(self) -> T where T: Sized,
```

Reads the value from `self` without moving it. This leaves the
memory in `self` unchanged.

Unlike `read`, the pointer may be unaligned.

See `ptr::read_unaligned` for safety concerns and examples.

## mut::copy_to

```rust
pub const unsafe fn copy_to(self, dest: *mut T, count: usize) where T: Sized,
```

Copies `count * size_of::<T>()` bytes from `self` to `dest`. The source
and destination may overlap.

NOTE: this has the *same* argument order as `ptr::copy`.

See `ptr::copy` for safety concerns and examples.

## mut::copy_to_nonoverlapping

```rust
pub const unsafe fn copy_to_nonoverlapping(self, dest: *mut T, count: usize) where T: Sized,
```

Copies `count * size_of::<T>()` bytes from `self` to `dest`. The source
and destination may *not* overlap.

NOTE: this has the *same* argument order as `ptr::copy_nonoverlapping`.

See `ptr::copy_nonoverlapping` for safety concerns and examples.

## mut::copy_from

```rust
pub const unsafe fn copy_from(self, src: *const T, count: usize) where T: Sized,
```

Copies `count * size_of::<T>()` bytes from `src` to `self`. The source
and destination may overlap.

NOTE: this has the *opposite* argument order of `ptr::copy`.

See `ptr::copy` for safety concerns and examples.

## mut::copy_from_nonoverlapping

```rust
pub const unsafe fn copy_from_nonoverlapping(self, src: *const T, count: usize) where T: Sized,
```

Copies `count * size_of::<T>()` bytes from `src` to `self`. The source
and destination may *not* overlap.

NOTE: this has the *opposite* argument order of `ptr::copy_nonoverlapping`.

See `ptr::copy_nonoverlapping` for safety concerns and examples.

## mut::drop_in_place

```rust
pub const unsafe fn drop_in_place(self) where T: [const] Destruct,
```

Executes the destructor (if any) of the pointed-to value.

See `ptr::drop_in_place` for safety concerns and examples.

## mut::write

```rust
pub const unsafe fn write(self, val: T) where T: Sized,
```

Overwrites a memory location with the given value without reading or
dropping the old value.

See `ptr::write` for safety concerns and examples.

## mut::write_bytes

```rust
pub const unsafe fn write_bytes(self, val: u8, count: usize) where T: Sized,
```

Invokes memset on the specified pointer, setting `count * size_of::<T>()`
bytes of memory starting at `self` to `val`.

See `ptr::write_bytes` for safety concerns and examples.

## mut::write_volatile

```rust
pub const unsafe fn write_volatile(self, val: T) where T: Sized,
```

Performs a volatile write of a memory location with the given value without
reading or dropping the old value.

Volatile operations are intended to act on I/O memory, and are guaranteed
to not be elided or reordered by the compiler across other volatile
operations.

See `ptr::write_volatile` for safety concerns and examples.

## mut::write_unaligned

```rust
pub const unsafe fn write_unaligned(self, val: T) where T: Sized,
```

Overwrites a memory location with the given value without reading or
dropping the old value.

Unlike `write`, the pointer may be unaligned.

See `ptr::write_unaligned` for safety concerns and examples.

## mut::replace

```rust
pub const unsafe fn replace(self, src: T) -> T where T: Sized,
```

Replaces the value at `self` with `src`, returning the old
value, without dropping either.

See `ptr::replace` for safety concerns and examples.

## mut::swap

```rust
pub const unsafe fn swap(self, with: *mut T) where T: Sized,
```

Swaps the values at two mutable locations of the same type, without
deinitializing either. They may overlap, unlike `mem::swap` which is
otherwise equivalent.

See `ptr::swap` for safety concerns and examples.

## mut::align_offset

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
let mut x = [5_u8, 6, 7, 8, 9];
let ptr = x.as_mut_ptr();
let offset = ptr.align_offset(align_of::<u16>());

if offset < x.len() - 1 {
    let u16_ptr = ptr.add(offset).cast::<u16>();
    *u16_ptr = 0;

    assert!(x == [0, 0, 7, 8, 9] || x == [5, 0, 0, 8, 9]);
} else {
    // while the pointer can be aligned via `offset`, it would point
    // outside the allocation
}
```

## mut::is_aligned

```rust
pub fn is_aligned(self) -> bool where T: Sized,
```

Returns whether the pointer is properly aligned for `T`.

# Examples

```rust
// On some platforms, the alignment of i32 is less than 4.
#[repr(align(4))]
struct AlignedI32(i32);

let mut data = AlignedI32(42);
let ptr = &mut data as *mut AlignedI32;

assert!(ptr.is_aligned());
assert!(!ptr.wrapping_byte_add(1).is_aligned());
```

## mut::len

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

let slice: *mut [i8] = ptr::slice_from_raw_parts_mut(ptr::null_mut(), 3);
assert_eq!(slice.len(), 3);
```

## mut::is_empty

```rust
pub const fn is_empty(self) -> bool
```

Returns `true` if the raw slice has a length of 0.

# Examples

```rust
use std::ptr;

let slice: *mut [i8] = ptr::slice_from_raw_parts_mut(ptr::null_mut(), 3);
assert!(!slice.is_empty());
```

## mut::as_mut_array

```rust
pub const fn as_mut_array<const N: usize>(self) -> Option<*mut [T; N]>
```

Gets a raw, mutable pointer to the underlying array.

If `N` is not exactly equal to the length of `self`, then this method returns `None`.
