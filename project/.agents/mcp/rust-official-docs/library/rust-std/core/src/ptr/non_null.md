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
[`UnsafeCell<T>`]. The same goes for creating a mutable reference from a shared
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

```
use std::ptr::NonNull;

assert_eq!(size_of::<NonNull<i16>>(), size_of::<Option<NonNull<i16>>>());
assert_eq!(align_of::<NonNull<i16>>(), align_of::<Option<NonNull<i16>>>());

assert_eq!(size_of::<NonNull<str>>(), size_of::<Option<NonNull<str>>>());
assert_eq!(align_of::<NonNull<str>>(), align_of::<Option<NonNull<str>>>());
```

[covariant]: https://doc.rust-lang.org/reference/subtyping.html
[`PhantomData`]: crate::marker::PhantomData
[`UnsafeCell<T>`]: crate::cell::UnsafeCell
[null pointer optimization]: crate::option#representation

## NonNull::without_provenance

```rust
pub const fn without_provenance(addr: NonZero<usize>) -> Self
```

Creates a pointer with the given address and no [provenance][crate::ptr#provenance].

For more details, see the equivalent method on a raw pointer, [`ptr::without_provenance_mut`].

This is a [Strict Provenance][crate::ptr#strict-provenance] API.

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

```
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
[provenance][crate::ptr#provenance].

For more details, see the equivalent method on a raw pointer, [`ptr::with_exposed_provenance_mut`].

This is an [Exposed Provenance][crate::ptr#exposed-provenance] API.

## NonNull::new_unchecked

```rust
pub const unsafe fn new_unchecked(ptr: *mut T) -> Self
```

Creates a new `NonNull`.

Note that if you have an `&mut`, you can use the safe [`from_mut`] instead.

[`from_mut`]: NonNull::from_mut

# Safety

`ptr` must be non-null.

# Examples

```
use std::ptr::NonNull;

let mut x = 0u32;
let ptr = unsafe { NonNull::new_unchecked(&mut x as *mut _) };
```

*Incorrect* usage of this function:

```rust,no_run
use std::ptr::NonNull;

// NEVER DO THAT!!! This is undefined behavior. ⚠️
let ptr = unsafe { NonNull::<u32>::new_unchecked(std::ptr::null_mut()) };
```

## NonNull::new

```rust
pub const fn new(ptr: *mut T) -> Option<Self>
```

Creates a new `NonNull` if `ptr` is non-null.

Note that if you have an `&mut`, you can use [`from_mut`] instead to avoid the `Option`.

[`from_mut`]: NonNull::from_mut

# Panics during const evaluation

This method will panic during const evaluation if the pointer cannot be
determined to be null or not. See [`is_null`] for more information.

[`is_null`]: ../primitive.pointer.html#method.is_null-1

# Examples

```
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

For more details, see the equivalent method on a raw pointer, [`pointer::addr`].

This is a [Strict Provenance][crate::ptr#strict-provenance] API.

## NonNull::expose_provenance

```rust
pub fn expose_provenance(self) -> NonZero<usize>
```

Exposes the ["provenance"][crate::ptr#provenance] part of the pointer for future use in
[`with_exposed_provenance`][NonNull::with_exposed_provenance] and returns the "address" portion.

For more details, see the equivalent method on a raw pointer, [`pointer::expose_provenance`].

This is an [Exposed Provenance][crate::ptr#exposed-provenance] API.

## NonNull::with_addr

```rust
pub fn with_addr(self, addr: NonZero<usize>) -> Self
```

Creates a new pointer with the given address and the [provenance][crate::ptr#provenance] of
`self`.

For more details, see the equivalent method on a raw pointer, [`pointer::with_addr`].

This is a [Strict Provenance][crate::ptr#strict-provenance] API.

## NonNull::map_addr

```rust
pub fn map_addr(self, f: impl FnOnce(NonZero<usize>) -> NonZero<usize>) -> Self
```

Creates a new pointer by mapping `self`'s address to a new one, preserving the
[provenance][crate::ptr#provenance] of `self`.

For more details, see the equivalent method on a raw pointer, [`pointer::map_addr`].

This is a [Strict Provenance][crate::ptr#strict-provenance] API.

## NonNull::as_ptr

```rust
pub const fn as_ptr(self) -> *mut T
```

Acquires the underlying `*mut` pointer.

# Examples

```
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

Returns a shared reference to the value. If the value may be uninitialized, [`as_uninit_ref`]
must be used instead.

For the mutable counterpart see [`as_mut`].

[`as_uninit_ref`]: NonNull::as_uninit_ref
[`as_mut`]: NonNull::as_mut

# Safety

When calling this method, you have to ensure that
the pointer is [convertible to a reference](crate::ptr#pointer-to-reference-conversion).

# Examples

```
use std::ptr::NonNull;

let mut x = 0u32;
let ptr = NonNull::new(&mut x as *mut _).expect("pointer should not be null");

let ref_x = unsafe { ptr.as_ref() };
println!("{ref_x}");
```

[the module documentation]: crate::ptr#safety

## NonNull::as_mut

```rust
pub const unsafe fn as_mut<'a>(&mut self) -> &'a mut T
```

Returns a unique reference to the value. If the value may be uninitialized, [`as_uninit_mut`]
must be used instead.

For the shared counterpart see [`as_ref`].

[`as_uninit_mut`]: NonNull::as_uninit_mut
[`as_ref`]: NonNull::as_ref

# Safety

When calling this method, you have to ensure that
the pointer is [convertible to a reference](crate::ptr#pointer-to-reference-conversion).
# Examples

```
use std::ptr::NonNull;

let mut x = 0u32;
let mut ptr = NonNull::new(&mut x).expect("pointer should not be null");

let x_ref = unsafe { ptr.as_mut() };
assert_eq!(*x_ref, 0);
*x_ref += 2;
assert_eq!(*x_ref, 2);
```

[the module documentation]: crate::ptr#safety

## NonNull::cast

```rust
pub const fn cast<U>(self) -> NonNull<U>
```

Casts to a pointer of another type.

# Examples

```
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

```
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
using [offset][pointer::offset] on it. See that method for documentation
and safety requirements.

For non-`Sized` pointees this operation changes only the data pointer,
leaving the metadata untouched.

## NonNull::add

```rust
pub const unsafe fn add(self, count: usize) -> Self where T: Sized,
```

# Examples

```
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
using [`add`][NonNull::add] on it. See that method for documentation
and safety requirements.

For non-`Sized` pointees this operation changes only the data pointer,
leaving the metadata untouched.

## NonNull::sub

```rust
pub const unsafe fn sub(self, count: usize) -> Self where T: Sized,
```

# Examples

```
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
using [`sub`][NonNull::sub] on it. See that method for documentation
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

[`offset`]: #method.offset

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

[`add`]: #method.add
[allocation]: crate::ptr#allocation

# Panics

This function panics if `T` is a Zero-Sized Type ("ZST").

# Examples

Basic usage:

```
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

```rust,no_run
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
using [`offset_from`][NonNull::offset_from] on it. See that method for
documentation and safety requirements.

For non-`Sized` pointees this operation considers only the data pointers,
ignoring the metadata.

## NonNull::offset_from_unsigned

```rust
pub const unsafe fn offset_from_unsigned(self, subtracted: NonNull<T>) -> usize where T: Sized,
```

Calculates the distance between two pointers within the same allocation, *where it's known that
`self` is equal to or greater than `origin`*. The returned value is in
units of T: the distance in bytes is divided by `size_of::<T>()`.

This computes the same value that [`offset_from`](#method.offset_from)
would compute, but with the added precondition that the offset is
guaranteed to be non-negative.  This method is equivalent to
`usize::try_from(self.offset_from(origin)).unwrap_unchecked()`,
but it provides slightly more information to the optimizer, which can
sometimes allow it to optimize slightly better with some backends.

This method can be though of as recovering the `count` that was passed
to [`add`](#method.add) (or, with the parameters in the other order,
to [`sub`](#method.sub)).  The following are all equivalent, assuming
that their safety preconditions are met:
```rust
# unsafe fn blah(ptr: std::ptr::NonNull<u32>, origin: std::ptr::NonNull<u32>, count: usize) -> bool { unsafe {
ptr.offset_from_unsigned(origin) == count
# &&
origin.add(count) == ptr
# &&
ptr.sub(count) == origin
# } }
```

# Safety

- The distance between the pointers must be non-negative (`self >= origin`)

- *All* the safety conditions of [`offset_from`](#method.offset_from)
  apply to this method as well; see it for the full details.

Importantly, despite the return type of this method being able to represent
a larger offset, it's still *not permitted* to pass pointers which differ
by more than `isize::MAX` *bytes*.  As such, the result of this method will
always be less than or equal to `isize::MAX as usize`.

# Panics

This function panics if `T` is a Zero-Sized Type ("ZST").

# Examples

```
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
using [`offset_from_unsigned`][NonNull::offset_from_unsigned] on it.
See that method for documentation and safety requirements.

For non-`Sized` pointees this operation considers only the data pointers,
ignoring the metadata.

## NonNull::read

```rust
pub const unsafe fn read(self) -> T where T: Sized,
```

Reads the value from `self` without moving it. This leaves the
memory in `self` unchanged.

See [`ptr::read`] for safety concerns and examples.

[`ptr::read`]: crate::ptr::read()

## NonNull::read_volatile

```rust
pub unsafe fn read_volatile(self) -> T where T: Sized,
```

Performs a volatile read of the value from `self` without moving it. This
leaves the memory in `self` unchanged.

Volatile operations are intended to act on I/O memory, and are guaranteed
to not be elided or reordered by the compiler across other volatile
operations.

See [`ptr::read_volatile`] for safety concerns and examples.

[`ptr::read_volatile`]: crate::ptr::read_volatile()

## NonNull::read_unaligned

```rust
pub const unsafe fn read_unaligned(self) -> T where T: Sized,
```

Reads the value from `self` without moving it. This leaves the
memory in `self` unchanged.

Unlike `read`, the pointer may be unaligned.

See [`ptr::read_unaligned`] for safety concerns and examples.

[`ptr::read_unaligned`]: crate::ptr::read_unaligned()

## NonNull::copy_to

```rust
pub const unsafe fn copy_to(self, dest: NonNull<T>, count: usize) where T: Sized,
```

Copies `count * size_of::<T>()` bytes from `self` to `dest`. The source
and destination may overlap.

NOTE: this has the *same* argument order as [`ptr::copy`].

See [`ptr::copy`] for safety concerns and examples.

[`ptr::copy`]: crate::ptr::copy()

## NonNull::copy_to_nonoverlapping

```rust
pub const unsafe fn copy_to_nonoverlapping(self, dest: NonNull<T>, count: usize) where T: Sized,
```

Copies `count * size_of::<T>()` bytes from `self` to `dest`. The source
and destination may *not* overlap.

NOTE: this has the *same* argument order as [`ptr::copy_nonoverlapping`].

See [`ptr::copy_nonoverlapping`] for safety concerns and examples.

[`ptr::copy_nonoverlapping`]: crate::ptr::copy_nonoverlapping()

## NonNull::copy_from

```rust
pub const unsafe fn copy_from(self, src: NonNull<T>, count: usize) where T: Sized,
```

Copies `count * size_of::<T>()` bytes from `src` to `self`. The source
and destination may overlap.

NOTE: this has the *opposite* argument order of [`ptr::copy`].

See [`ptr::copy`] for safety concerns and examples.

[`ptr::copy`]: crate::ptr::copy()

## NonNull::copy_from_nonoverlapping

```rust
pub const unsafe fn copy_from_nonoverlapping(self, src: NonNull<T>, count: usize) where T: Sized,
```

Copies `count * size_of::<T>()` bytes from `src` to `self`. The source
and destination may *not* overlap.

NOTE: this has the *opposite* argument order of [`ptr::copy_nonoverlapping`].

See [`ptr::copy_nonoverlapping`] for safety concerns and examples.

[`ptr::copy_nonoverlapping`]: crate::ptr::copy_nonoverlapping()

## NonNull::drop_in_place

```rust
pub const unsafe fn drop_in_place(mut self) where T: [const] Destruct,
```

Executes the destructor (if any) of the pointed-to value.

See [`ptr::drop_in_place`] for safety concerns and examples.

[`ptr::drop_in_place`]: crate::ptr::drop_in_place()

## NonNull::write

```rust
pub const unsafe fn write(self, val: T) where T: Sized,
```

Overwrites a memory location with the given value without reading or
dropping the old value.

See [`ptr::write`] for safety concerns and examples.

[`ptr::write`]: crate::ptr::write()

## NonNull::write_bytes

```rust
pub const unsafe fn write_bytes(self, val: u8, count: usize) where T: Sized,
```

Invokes memset on the specified pointer, setting `count * size_of::<T>()`
bytes of memory starting at `self` to `val`.

See [`ptr::write_bytes`] for safety concerns and examples.

[`ptr::write_bytes`]: crate::ptr::write_bytes()

## NonNull::write_volatile

```rust
pub unsafe fn write_volatile(self, val: T) where T: Sized,
```

Performs a volatile write of a memory location with the given value without
reading or dropping the old value.

Volatile operations are intended to act on I/O memory, and are guaranteed
to not be elided or reordered by the compiler across other volatile
operations.

See [`ptr::write_volatile`] for safety concerns and examples.

[`ptr::write_volatile`]: crate::ptr::write_volatile()

## NonNull::write_unaligned

```rust
pub const unsafe fn write_unaligned(self, val: T) where T: Sized,
```

Overwrites a memory location with the given value without reading or
dropping the old value.

Unlike `write`, the pointer may be unaligned.

See [`ptr::write_unaligned`] for safety concerns and examples.

[`ptr::write_unaligned`]: crate::ptr::write_unaligned()

## NonNull::replace

```rust
pub const unsafe fn replace(self, src: T) -> T where T: Sized,
```

Replaces the value at `self` with `src`, returning the old
value, without dropping either.

See [`ptr::replace`] for safety concerns and examples.

[`ptr::replace`]: crate::ptr::replace()

## NonNull::swap

```rust
pub const unsafe fn swap(self, with: NonNull<T>) where T: Sized,
```

Swaps the values at two mutable locations of the same type, without
deinitializing either. They may overlap, unlike `mem::swap` which is
otherwise equivalent.

See [`ptr::swap`] for safety concerns and examples.

[`ptr::swap`]: crate::ptr::swap()

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

```
use std::ptr::NonNull;

# unsafe {
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
# }
```

## NonNull::is_aligned

```rust
pub fn is_aligned(self) -> bool where T: Sized,
```

Returns whether the pointer is properly aligned for `T`.

# Examples

```
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
See the documentation of [`slice::from_raw_parts`] for slice safety requirements.

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