---
title: "core::ptr (part 4 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/ptr/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::ptr (part 4 of 5)

## fn slice_from_raw_parts_mut

```rust
pub const fn slice_from_raw_parts_mut<T>(data: *mut T, len: usize) -> *mut [T]
```

Forms a raw mutable slice from a pointer and a length.

The `len` argument is the number of **elements**, not the number of bytes.

Performs the same functionality as `slice_from_raw_parts`, except that a
raw mutable slice is returned, as opposed to a raw immutable slice.

This function is safe, but actually using the return value is unsafe.
See the documentation of `slice::from_raw_parts_mut` for slice safety requirements.

# Examples

```rust
use std::ptr;

let x = &mut [5, 6, 7];
let raw_pointer = x.as_mut_ptr();
let slice = ptr::slice_from_raw_parts_mut(raw_pointer, 3);

unsafe {
    (*slice)[2] = 99; // assign a value at an index in the slice
};

assert_eq!(unsafe { &*slice }[2], 99);
```

You must ensure that the pointer is valid and not null before dereferencing
the raw slice. A slice reference must never have a null pointer, even if it's empty.

```rust
use std::ptr;
let danger: *mut [u8] = ptr::slice_from_raw_parts_mut(ptr::null_mut(), 0);
unsafe {
    danger.as_mut().expect("references must not be null");
}
```

## fn swap

```rust
pub const unsafe fn swap<T>(x: *mut T, y: *mut T)
```

Swaps the values at two mutable locations of the same type, without
deinitializing either.

But for the following exceptions, this function is semantically
equivalent to `mem::swap`:

* It operates on raw pointers instead of references. When references are
  available, `mem::swap` should be preferred.

* The two pointed-to values may overlap. If the values do overlap, then the
  overlapping region of memory from `x` will be used. This is demonstrated
  in the second example below.

* The operation is "untyped" in the sense that data may be uninitialized or otherwise violate
  the requirements of `T`. The initialization state is preserved exactly.

# Safety

Behavior is undefined if any of the following conditions are violated:

* Both `x` and `y` must be [valid] for both reads and writes. They must remain valid even when the
  other pointer is written. (This means if the memory ranges overlap, the two pointers must not
  be subject to aliasing restrictions relative to each other.)

* Both `x` and `y` must be properly aligned.

Note that even if `T` has size `0`, the pointers must be properly aligned.

# Examples

Swapping two non-overlapping regions:

```rust
use std::ptr;

let mut array = [0, 1, 2, 3];

let (x, y) = array.split_at_mut(2);
let x = x.as_mut_ptr().cast::<[u32; 2]>(); // this is `array[0..2]`
let y = y.as_mut_ptr().cast::<[u32; 2]>(); // this is `array[2..4]`

unsafe {
    ptr::swap(x, y);
    assert_eq!([2, 3, 0, 1], array);
}
```

Swapping two overlapping regions:

```rust
use std::ptr;

let mut array: [i32; 4] = [0, 1, 2, 3];

let array_ptr: *mut i32 = array.as_mut_ptr();

let x = array_ptr as *mut [i32; 3]; // this is `array[0..3]`
let y = unsafe { array_ptr.add(1) } as *mut [i32; 3]; // this is `array[1..4]`

unsafe {
    ptr::swap(x, y);
    // The indices `1..3` of the slice overlap between `x` and `y`.
    // Reasonable results would be for to them be `[2, 3]`, so that indices `0..3` are
    // `[1, 2, 3]` (matching `y` before the `swap`); or for them to be `[0, 1]`
    // so that indices `1..4` are `[0, 1, 2]` (matching `x` before the `swap`).
    // This implementation is defined to make the latter choice.
    assert_eq!([1, 0, 1, 2], array);
}
```

## fn swap_nonoverlapping

```rust
pub const unsafe fn swap_nonoverlapping<T>(x: *mut T, y: *mut T, count: usize)
```

Swaps `count * size_of::<T>()` bytes between the two regions of memory
beginning at `x` and `y`. The two regions must *not* overlap.

The operation is "untyped" in the sense that data may be uninitialized or otherwise violate the
requirements of `T`. The initialization state is preserved exactly.

# Safety

Behavior is undefined if any of the following conditions are violated:

* Both `x` and `y` must be [valid] for both reads and writes of `count *
  size_of::<T>()` bytes.

* Both `x` and `y` must be properly aligned.

* The region of memory beginning at `x` with a size of `count *
  size_of::<T>()` bytes must *not* overlap with the region of memory
  beginning at `y` with the same size.

Note that even if the effectively copied size (`count * size_of::<T>()`) is `0`,
the pointers must be properly aligned.

# Examples

Basic usage:

```rust
use std::ptr;

let mut x = [1, 2, 3, 4];
let mut y = [7, 8, 9];

unsafe {
    ptr::swap_nonoverlapping(x.as_mut_ptr(), y.as_mut_ptr(), 2);
}

assert_eq!(x, [7, 8, 3, 4]);
assert_eq!(y, [1, 2, 9]);
```

## fn replace

```rust
pub const unsafe fn replace<T>(dst: *mut T, src: T) -> T
```

Moves `src` into the pointed `dst`, returning the previous `dst` value.

Neither value is dropped.

This function is semantically equivalent to `mem::replace` except that it
operates on raw pointers instead of references. When references are
available, `mem::replace` should be preferred.

# Safety

Behavior is undefined if any of the following conditions are violated:

* `dst` must be [valid] for both reads and writes or `T` must be a ZST.

* `dst` must be properly aligned.

* `dst` must point to a properly initialized value of type `T`.

Note that even if `T` has size `0`, the pointer must be properly aligned.

# Examples

```rust
use std::ptr;

let mut rust = vec!['b', 'u', 's', 't'];

// `mem::replace` would have the same effect without requiring the unsafe
// block.
let b = unsafe {
    ptr::replace(&mut rust[0], 'r')
};

assert_eq!(b, 'b');
assert_eq!(rust, &['r', 'u', 's', 't']);
```

## fn read

```rust
pub const unsafe fn read<T>(src: *const T) -> T
```

Reads the value from `src` without moving it. This leaves the
memory in `src` unchanged.

# Safety

Behavior is undefined if any of the following conditions are violated:

* `src` must be [valid] for reads or `T` must be a ZST.

* `src` must be properly aligned. Use `read_unaligned` if this is not the
  case.

* `src` must point to a properly initialized value of type `T`.

Note that even if `T` has size `0`, the pointer must be properly aligned.

Care must be taken around ownership of the returned value.

# Examples

Basic usage:

```rust
let x = 12;
let y = &x as *const i32;

unsafe {
    assert_eq!(std::ptr::read(y), 12);
}
```

Manually implement `mem::swap`:

```rust
use std::ptr;

fn swap<T>(a: &mut T, b: &mut T) {
    unsafe {
        // Create a bitwise copy of the value at `a` in `tmp`.
        let tmp = ptr::read(a);

        // Exiting at this point (either by explicitly returning or by
        // calling a function which panics) would cause the value in `tmp` to
        // be dropped while the same value is still referenced by `a`. This
        // could trigger undefined behavior if `T` is not `Copy`.

        // Create a bitwise copy of the value at `b` in `a`.
        // This is safe because mutable references cannot alias.
        ptr::copy_nonoverlapping(b, a, 1);

        // As above, exiting here could trigger undefined behavior because
        // the same value is referenced by `a` and `b`.

        // Move `tmp` into `b`.
        ptr::write(b, tmp);

        // `tmp` has been moved (`write` takes ownership of its second argument),
        // so nothing is dropped implicitly here.
    }
}

let mut foo = "foo".to_owned();
let mut bar = "bar".to_owned();

swap(&mut foo, &mut bar);

assert_eq!(foo, "bar");
assert_eq!(bar, "foo");
```

## Ownership of the Returned Value

`read` creates a bitwise copy of `T`, regardless of whether `T` is `Copy`.
If `T` is not `Copy`, using both the returned value and the value at
`*src` can violate memory safety. Note that assigning to `*src` counts as a
use because it will attempt to drop the value at `*src`.

`write()` can be used to overwrite data without causing it to be dropped.

```rust
use std::ptr;

let mut s = String::from("foo");
unsafe {
    // `s2` now points to the same underlying memory as `s`.
    let mut s2: String = ptr::read(&s);

    assert_eq!(s2, "foo");

    // Assigning to `s2` causes its original value to be dropped. Beyond
    // this point, `s` must no longer be used, as the underlying memory has
    // been freed.
    s2 = String::default();
    assert_eq!(s2, "");

    // Assigning to `s` would cause the old value to be dropped again,
    // resulting in undefined behavior.
    // s = String::from("bar"); // ERROR

    // `ptr::write` can be used to overwrite a value without dropping it.
    ptr::write(&mut s, String::from("bar"));
}

assert_eq!(s, "bar");
```

## fn read_unaligned

```rust
pub const unsafe fn read_unaligned<T>(src: *const T) -> T
```

Reads the value from `src` without moving it. This leaves the
memory in `src` unchanged.

Unlike `read`, `read_unaligned` works with unaligned pointers.

# Safety

Behavior is undefined if any of the following conditions are violated:

* `src` must be [valid] for reads.

* `src` must point to a properly initialized value of type `T`.

Like `read`, `read_unaligned` creates a bitwise copy of `T`, regardless of
whether `T` is `Copy`. If `T` is not `Copy`, using both the returned
value and the value at `*src` can violate memory safety.

## On `packed` structs

Attempting to create a raw pointer to an `unaligned` struct field with
an expression such as `&packed.unaligned as *const FieldType` creates an
intermediate unaligned reference before converting that to a raw pointer.
That this reference is temporary and immediately cast is inconsequential
as the compiler always expects references to be properly aligned.
As a result, using `&packed.unaligned as *const FieldType` causes immediate
*undefined behavior* in your program.

Instead you must use the `&raw const` syntax to create the pointer.
You may use that constructed pointer together with this function.

An example of what not to do and how this relates to `read_unaligned` is:

```rust
#[repr(packed, C)]
struct Packed {
    _padding: u8,
    unaligned: u32,
}

let packed = Packed {
    _padding: 0x00,
    unaligned: 0x01020304,
};

// Take the address of a 32-bit integer which is not aligned.
// In contrast to `&packed.unaligned as *const _`, this has no undefined behavior.
let unaligned = &raw const packed.unaligned;

let v = unsafe { std::ptr::read_unaligned(unaligned) };
assert_eq!(v, 0x01020304);
```

Accessing unaligned fields directly with e.g. `packed.unaligned` is safe however.

# Examples

Read a `usize` value from a byte buffer:

```rust
fn read_usize(x: &[u8]) -> usize {
    assert!(x.len() >= size_of::<usize>());

    let ptr = x.as_ptr() as *const usize;

    unsafe { ptr.read_unaligned() }
}
```

## fn write

```rust
pub const unsafe fn write<T>(dst: *mut T, src: T)
```

Overwrites a memory location with the given value without reading or
dropping the old value.

`write` does not drop the contents of `dst`. This is safe, but it could leak
allocations or resources, so care should be taken not to overwrite an object
that should be dropped.

Additionally, it does not drop `src`. Semantically, `src` is moved into the
location pointed to by `dst`.

This is appropriate for initializing uninitialized memory, or overwriting
memory that has previously been `read` from.

# Safety

Behavior is undefined if any of the following conditions are violated:

* `dst` must be [valid] for writes or `T` must be a ZST.

* `dst` must be properly aligned. Use `write_unaligned` if this is not the
  case.

Note that even if `T` has size `0`, the pointer must be properly aligned.

# Examples

Basic usage:

```rust
let mut x = 0;
let y = &mut x as *mut i32;
let z = 12;

unsafe {
    std::ptr::write(y, z);
    assert_eq!(std::ptr::read(y), 12);
}
```

Manually implement `mem::swap`:

```rust
use std::ptr;

fn swap<T>(a: &mut T, b: &mut T) {
    unsafe {
        // Create a bitwise copy of the value at `a` in `tmp`.
        let tmp = ptr::read(a);

        // Exiting at this point (either by explicitly returning or by
        // calling a function which panics) would cause the value in `tmp` to
        // be dropped while the same value is still referenced by `a`. This
        // could trigger undefined behavior if `T` is not `Copy`.

        // Create a bitwise copy of the value at `b` in `a`.
        // This is safe because mutable references cannot alias.
        ptr::copy_nonoverlapping(b, a, 1);

        // As above, exiting here could trigger undefined behavior because
        // the same value is referenced by `a` and `b`.

        // Move `tmp` into `b`.
        ptr::write(b, tmp);

        // `tmp` has been moved (`write` takes ownership of its second argument),
        // so nothing is dropped implicitly here.
    }
}

let mut foo = "foo".to_owned();
let mut bar = "bar".to_owned();

swap(&mut foo, &mut bar);

assert_eq!(foo, "bar");
assert_eq!(bar, "foo");
```

## fn write_unaligned

```rust
pub const unsafe fn write_unaligned<T>(dst: *mut T, src: T)
```

Overwrites a memory location with the given value without reading or
dropping the old value.

Unlike `write()`, the pointer may be unaligned.

`write_unaligned` does not drop the contents of `dst`. This is safe, but it
could leak allocations or resources, so care should be taken not to overwrite
an object that should be dropped.

Additionally, it does not drop `src`. Semantically, `src` is moved into the
location pointed to by `dst`.

This is appropriate for initializing uninitialized memory, or overwriting
memory that has previously been read with `read_unaligned`.

# Safety

Behavior is undefined if any of the following conditions are violated:

* `dst` must be [valid] for writes.
