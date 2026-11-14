---
title: "core::ptr::non_null (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/ptr/non_null.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::ptr::non_null (part 2 of 2)

## NonNull::offset_from_unsigned

```rust
pub const unsafe fn offset_from_unsigned(self, subtracted: NonNull<T>) -> usize where T: Sized,
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

This method can be though of as recovering the `count` that was passed
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
use std::ptr::NonNull;

let a = [0; 5];
let ptr1: NonNull<u32> = NonNull::from(&a[1]);
let ptr2: NonNull<u32> = NonNull::from(&a[3]);
unsafe {
    assert_eq!(ptr2.offset_from_unsigned(ptr1), 2);
    assert_eq!(ptr1.add(2), ptr2);
    assert_eq!(ptr2.sub(2), ptr1);
    assert_eq!(ptr2.offset_from_unsigned(ptr2), 0);
}

// This would be incorrect, as the pointers are not correctly ordered:
// ptr1.offset_from_unsigned(ptr2)
```

## NonNull::byte_offset_from_unsigned

```rust
pub const unsafe fn byte_offset_from_unsigned<U: ?Sized>(self, origin: NonNull<U>) -> usize
```

Calculates the distance between two pointers within the same allocation, *where it's known that
`self` is equal to or greater than `origin`*. The returned value is in
units of **bytes**.

This is purely a convenience for casting to a `u8` pointer and
using `offset_from_unsigned`[NonNull::offset_from_unsigned] on it.
See that method for documentation and safety requirements.

For non-`Sized` pointees this operation considers only the data pointers,
ignoring the metadata.

## NonNull::read

```rust
pub const unsafe fn read(self) -> T where T: Sized,
```

Reads the value from `self` without moving it. This leaves the
memory in `self` unchanged.

See `ptr::read` for safety concerns and examples.

## NonNull::read_volatile

```rust
pub unsafe fn read_volatile(self) -> T where T: Sized,
```

Performs a volatile read of the value from `self` without moving it. This
leaves the memory in `self` unchanged.

Volatile operations are intended to act on I/O memory, and are guaranteed
to not be elided or reordered by the compiler across other volatile
operations.

See `ptr::read_volatile` for safety concerns and examples.

## NonNull::read_unaligned

```rust
pub const unsafe fn read_unaligned(self) -> T where T: Sized,
```

Reads the value from `self` without moving it. This leaves the
memory in `self` unchanged.

Unlike `read`, the pointer may be unaligned.

See `ptr::read_unaligned` for safety concerns and examples.

## NonNull::copy_to

```rust
pub const unsafe fn copy_to(self, dest: NonNull<T>, count: usize) where T: Sized,
```

Copies `count * size_of::<T>()` bytes from `self` to `dest`. The source
and destination may overlap.

NOTE: this has the *same* argument order as `ptr::copy`.

See `ptr::copy` for safety concerns and examples.

## NonNull::copy_to_nonoverlapping

```rust
pub const unsafe fn copy_to_nonoverlapping(self, dest: NonNull<T>, count: usize) where T: Sized,
```

Copies `count * size_of::<T>()` bytes from `self` to `dest`. The source
and destination may *not* overlap.

NOTE: this has the *same* argument order as `ptr::copy_nonoverlapping`.

See `ptr::copy_nonoverlapping` for safety concerns and examples.

## NonNull::copy_from

```rust
pub const unsafe fn copy_from(self, src: NonNull<T>, count: usize) where T: Sized,
```

Copies `count * size_of::<T>()` bytes from `src` to `self`. The source
and destination may overlap.

NOTE: this has the *opposite* argument order of `ptr::copy`.

See `ptr::copy` for safety concerns and examples.

## NonNull::copy_from_nonoverlapping

```rust
pub const unsafe fn copy_from_nonoverlapping(self, src: NonNull<T>, count: usize) where T: Sized,
```

Copies `count * size_of::<T>()` bytes from `src` to `self`. The source
and destination may *not* overlap.

NOTE: this has the *opposite* argument order of `ptr::copy_nonoverlapping`.

See `ptr::copy_nonoverlapping` for safety concerns and examples.

## NonNull::drop_in_place

```rust
pub const unsafe fn drop_in_place(mut self) where T: [const] Destruct,
```

Executes the destructor (if any) of the pointed-to value.

See `ptr::drop_in_place` for safety concerns and examples.

## NonNull::write

```rust
pub const unsafe fn write(self, val: T) where T: Sized,
```

Overwrites a memory location with the given value without reading or
dropping the old value.

See `ptr::write` for safety concerns and examples.

## NonNull::write_bytes

```rust
pub const unsafe fn write_bytes(self, val: u8, count: usize) where T: Sized,
```

Invokes memset on the specified pointer, setting `count * size_of::<T>()`
bytes of memory starting at `self` to `val`.

See `ptr::write_bytes` for safety concerns and examples.

## NonNull::write_volatile

```rust
pub unsafe fn write_volatile(self, val: T) where T: Sized,
```

Performs a volatile write of a memory location with the given value without
reading or dropping the old value.

Volatile operations are intended to act on I/O memory, and are guaranteed
to not be elided or reordered by the compiler across other volatile
operations.

See `ptr::write_volatile` for safety concerns and examples.

## NonNull::write_unaligned

```rust
pub const unsafe fn write_unaligned(self, val: T) where T: Sized,
```

Overwrites a memory location with the given value without reading or
dropping the old value.

Unlike `write`, the pointer may be unaligned.

See `ptr::write_unaligned` for safety concerns and examples.

## NonNull::replace

```rust
pub const unsafe fn replace(self, src: T) -> T where T: Sized,
```

Replaces the value at `self` with `src`, returning the old
value, without dropping either.

See `ptr::replace` for safety concerns and examples.

## NonNull::swap

```rust
pub const unsafe fn swap(self, with: NonNull<T>) where T: Sized,
```

Swaps the values at two mutable locations of the same type, without
deinitializing either. They may overlap, unlike `mem::swap` which is
otherwise equivalent.

See `ptr::swap` for safety concerns and examples.

## NonNull::align_offset

```rust
pub fn align_offset(self, align: usize) -> usize where T: Sized,
```

Computes the offset that needs to be applied to the pointer in order to make it aligned to
`align`.

If it is not possible to align the pointer, the implementation returns
`usize::MAX`.

The offset is expressed in number of `T` elements, and not bytes.

There are no guarantees whatsoever that offsetting the pointer will not overflow or go
beyond the allocation that the pointer points into. It is up to the caller to ensure that
the returned offset is correct in all terms other than alignment.

When this is called during compile-time evaluation (which is unstable), the implementation
may return `usize::MAX` in cases where that can never happen at runtime. This is because the
actual alignment of pointers is not known yet during compile-time, so an offset with
guaranteed alignment can sometimes not be computed. For example, a buffer declared as `[u8;
N]` might be allocated at an odd or an even address, but at compile-time this is not yet
known, so the execution has to be correct for either choice. It is therefore impossible to
find an offset that is guaranteed to be 2-aligned. (This behavior is subject to change, as usual
for unstable APIs.)

# Panics

The function panics if `align` is not a power-of-two.

# Examples

Accessing adjacent `u8` as `u16`

```rust
use std::ptr::NonNull;

let x = [5_u8, 6, 7, 8, 9];
let ptr = NonNull::new(x.as_ptr() as *mut u8).unwrap();
let offset = ptr.align_offset(align_of::<u16>());

if offset < x.len() - 1 {
    let u16_ptr = ptr.add(offset).cast::<u16>();
    assert!(u16_ptr.read() == u16::from_ne_bytes([5, 6]) || u16_ptr.read() == u16::from_ne_bytes([6, 7]));
} else {
    // while the pointer can be aligned via `offset`, it would point
    // outside the allocation
}
```

## NonNull::is_aligned

```rust
pub fn is_aligned(self) -> bool where T: Sized,
```

Returns whether the pointer is properly aligned for `T`.

# Examples

```rust
use std::ptr::NonNull;

// On some platforms, the alignment of i32 is less than 4.
#[repr(align(4))]
struct AlignedI32(i32);

let data = AlignedI32(42);
let ptr = NonNull::<AlignedI32>::from(&data);

assert!(ptr.is_aligned());
assert!(!NonNull::new(ptr.as_ptr().wrapping_byte_add(1)).unwrap().is_aligned());
```

## NonNull::slice_from_raw_parts

```rust
pub const fn slice_from_raw_parts(data: NonNull<T>, len: usize) -> Self
```

Creates a non-null raw slice from a thin pointer and a length.

The `len` argument is the number of **elements**, not the number of bytes.

This function is safe, but dereferencing the return value is unsafe.
See the documentation of `slice::from_raw_parts` for slice safety requirements.

# Examples

```rust
use std::ptr::NonNull;

// create a slice pointer when starting out with a pointer to the first element
let mut x = [5, 6, 7];
let nonnull_pointer = NonNull::new(x.as_mut_ptr()).unwrap();
let slice = NonNull::slice_from_raw_parts(nonnull_pointer, 3);
assert_eq!(unsafe { slice.as_ref()[2] }, 7);
```

(Note that this example artificially demonstrates a use of this method,
but `let slice = NonNull::from(&x[..]);` would be a better way to write code like this.)

## NonNull::len

```rust
pub const fn len(self) -> usize
```

Returns the length of a non-null raw slice.

The returned value is the number of **elements**, not the number of bytes.

This function is safe, even when the non-null raw slice cannot be dereferenced to a slice
because the pointer does not have a valid address.

# Examples

```rust
use std::ptr::NonNull;

let slice: NonNull<[i8]> = NonNull::slice_from_raw_parts(NonNull::dangling(), 3);
assert_eq!(slice.len(), 3);
```

## NonNull::is_empty

```rust
pub const fn is_empty(self) -> bool
```

Returns `true` if the non-null raw slice has a length of 0.

# Examples

```rust
use std::ptr::NonNull;

let slice: NonNull<[i8]> = NonNull::slice_from_raw_parts(NonNull::dangling(), 3);
assert!(!slice.is_empty());
```
