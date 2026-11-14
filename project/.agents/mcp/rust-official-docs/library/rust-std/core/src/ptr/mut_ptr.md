# core::ptr::mut_ptr

## mut::is_null

```rust
pub const fn is_null(self) -> bool
```

# Examples

```
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
with [`cast_mut`] on `*const T` and may have documentation value if used instead of implicit
coercion.

[`cast_mut`]: pointer::cast_mut

## mut::addr

```rust
pub fn addr(self) -> usize
```

[without_provenance]: without_provenance_mut

## mut::expose_provenance

```rust
pub fn expose_provenance(self) -> usize
```

Exposes the ["provenance"][crate::ptr#provenance] part of the pointer for future use in
[`with_exposed_provenance_mut`] and returns the "address" portion.

This is equivalent to `self as usize`, which semantically discards provenance information.
Furthermore, this (like the `as` cast) has the implicit side-effect of marking the
provenance as 'exposed', so on platforms that support it you can later call
[`with_exposed_provenance_mut`] to reconstitute the original pointer including its provenance.

Due to its inherent ambiguity, [`with_exposed_provenance_mut`] may not be supported by tools
that help you to stay conformant with the Rust memory model. It is recommended to use
[Strict Provenance][crate::ptr#strict-provenance] APIs such as [`with_addr`][pointer::with_addr]
wherever possible, in which case [`addr`][pointer::addr] should be used instead of `expose_provenance`.

On most platforms this will produce a value with the same bytes as the original pointer,
because all the bytes are dedicated to describing the address. Platforms which need to store
additional information in the pointer may not support this operation, since the 'expose'
side-effect which is required for [`with_exposed_provenance_mut`] to work is typically not
available.

This is an [Exposed Provenance][crate::ptr#exposed-provenance] API.

[`with_exposed_provenance_mut`]: with_exposed_provenance_mut

## mut::with_addr

```rust
pub fn with_addr(self, addr: usize) -> Self
```

Creates a new pointer with the given address and the [provenance][crate::ptr#provenance] of
`self`.

This is similar to a `addr as *mut T` cast, but copies
the *provenance* of `self` to the new pointer.
This avoids the inherent ambiguity of the unary cast.

This is equivalent to using [`wrapping_offset`][pointer::wrapping_offset] to offset
`self` to the given address, and therefore has all the same capabilities and restrictions.

This is a [Strict Provenance][crate::ptr#strict-provenance] API.

## mut::map_addr

```rust
pub fn map_addr(self, f: impl FnOnce(usize) -> usize) -> Self
```

Creates a new pointer by mapping `self`'s address to a new one, preserving the original
pointer's [provenance][crate::ptr#provenance].

This is a convenience for [`with_addr`][pointer::with_addr], see that method for details.

This is a [Strict Provenance][crate::ptr#strict-provenance] API.

## mut::as_ref

```rust
pub const unsafe fn as_ref<'a>(self) -> Option<&'a T>
```

```
let ptr: *mut u8 = &mut 10u8 as *mut u8;

unsafe {
    let val_back = ptr.as_ref_unchecked();
    println!("We got back the value: {val_back}!");
}
```

# Examples

```
let ptr: *mut u8 = &mut 10u8 as *mut u8;

unsafe {
    if let Some(val_back) = ptr.as_ref() {
        println!("We got back the value: {val_back}!");
    }
}
```

# See Also

For the mutable counterpart see [`as_mut`].

[`is_null`]: #method.is_null-1
[`as_uninit_ref`]: #method.as_uninit_ref-1
[`as_ref_unchecked`]: #method.as_ref_unchecked-1
[`as_mut`]: #method.as_mut

## mut::as_ref_unchecked

```rust
pub const unsafe fn as_ref_unchecked<'a>(self) -> &'a T
```

Returns a shared reference to the value behind the pointer.
If the pointer may be null or the value may be uninitialized, [`as_uninit_ref`] must be used instead.
If the pointer may be null, but the value is known to have been initialized, [`as_ref`] must be used instead.

For the mutable counterpart see [`as_mut_unchecked`].

[`as_ref`]: #method.as_ref
[`as_uninit_ref`]: #method.as_uninit_ref
[`as_mut_unchecked`]: #method.as_mut_unchecked

# Safety

When calling this method, you have to ensure that the pointer is [convertible to a reference](crate::ptr#pointer-to-reference-conversion).

# Examples

```
let ptr: *mut u8 = &mut 10u8 as *mut u8;

unsafe {
    println!("We got back the value: {}!", ptr.as_ref_unchecked());
}
```

## mut::offset

```rust
pub const unsafe fn offset(self, count: isize) -> *mut T where T: Sized,
```

Consider using [`wrapping_offset`](#method.wrapping_offset) instead if these constraints are
difficult to satisfy. The only advantage of this method is that it
enables more aggressive compiler optimizations.

# Examples

```
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
using [offset][pointer::offset] on it. See that method for documentation
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
(this is called "[Provenance](ptr/index.html#provenance)").
The pointer must not be used to read or write other allocations.

In other words, `let z = x.wrapping_offset((y as isize) - (x as isize))` does *not* make `z`
the same as `y` even if we assume `T` has size `1` and there is no overflow: `z` is still
attached to the object `x` is attached to, and dereferencing it is Undefined Behavior unless
`x` and `y` point into the same allocation.

Compared to [`offset`], this method basically delays the requirement of staying within the
same allocation: [`offset`] is immediate Undefined Behavior when crossing object
boundaries; `wrapping_offset` produces a pointer but still leads to Undefined Behavior if a
pointer is dereferenced when it is out-of-bounds of the object it is attached to. [`offset`]
can be optimized better and is thus preferable in performance-sensitive code.

The delayed check only considers the value of the pointer that was dereferenced, not the
intermediate values used during the computation of the final result. For example,
`x.wrapping_offset(o).wrapping_offset(o.wrapping_neg())` is always the same as `x`. In other
words, leaving the allocation and then re-entering it later is permitted.

[`offset`]: #method.offset
[allocation]: crate::ptr#allocation

# Examples

```
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
using [wrapping_offset][pointer::wrapping_offset] on it. See that method
for documentation.

For non-`Sized` pointees this operation changes only the data pointer,
leaving the metadata untouched.

## mut::as_mut

```rust
pub const unsafe fn as_mut<'a>(self) -> Option<&'a mut T>
```

Returns `None` if the pointer is null, or else returns a unique reference to
the value wrapped in `Some`. If the value may be uninitialized, [`as_uninit_mut`]
must be used instead. If the value is known to be non-null, [`as_mut_unchecked`]
can be used instead.

For the shared counterpart see [`as_ref`].

[`as_uninit_mut`]: #method.as_uninit_mut
[`as_mut_unchecked`]: #method.as_mut_unchecked
[`as_ref`]: pointer#method.as_ref-1

# Safety

When calling this method, you have to ensure that *either*
the pointer is null *or*
the pointer is [convertible to a reference](crate::ptr#pointer-to-reference-conversion).

# Panics during const evaluation

This method will panic during const evaluation if the pointer cannot be
determined to be null or not. See [`is_null`] for more information.

[`is_null`]: #method.is_null-1

# Examples

```
let mut s = [1, 2, 3];
let ptr: *mut u32 = s.as_mut_ptr();
let first_value = unsafe { ptr.as_mut().unwrap() };
*first_value = 4;
# assert_eq!(s, [4, 2, 3]);
println!("{s:?}"); // It'll print: "[4, 2, 3]".
```

# Null-unchecked version

If you are sure the pointer can never be null, you can use `as_mut_unchecked` which returns
`&mut T` instead of `Option<&mut T>`.

```
let mut s = [1, 2, 3];
let ptr: *mut u32 = s.as_mut_ptr();
let first_value = unsafe { ptr.as_mut_unchecked() };
*first_value = 4;
# assert_eq!(s, [4, 2, 3]);
println!("{s:?}"); // It'll print: "[4, 2, 3]".
```

## mut::as_mut_unchecked

```rust
pub const unsafe fn as_mut_unchecked<'a>(self) -> &'a mut T
```

Returns a unique reference to the value behind the pointer.
If the pointer may be null or the value may be uninitialized, [`as_uninit_mut`] must be used instead.
If the pointer may be null, but the value is known to have been initialized, [`as_mut`] must be used instead.

For the shared counterpart see [`as_ref_unchecked`].

[`as_mut`]: #method.as_mut
[`as_uninit_mut`]: #method.as_uninit_mut
[`as_ref_unchecked`]: #method.as_ref_unchecked

# Safety

When calling this method, you have to ensure that
the pointer is [convertible to a reference](crate::ptr#pointer-to-reference-conversion).

# Examples

```
let mut s = [1, 2, 3];
let ptr: *mut u32 = s.as_mut_ptr();
let first_value = unsafe { ptr.as_mut_unchecked() };
*first_value = 4;
# assert_eq!(s, [4, 2, 3]);
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

[`offset`]: pointer#method.offset-1

# Safety

If any of the following conditions are violated, the result is Undefined Behavior:

* `self` and `origin` must either

  * point to the same address, or
  * both be [derived from][crate::ptr#provenance] a pointer to the same [allocation], and the memory range between
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

```rust,no_run
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
using [`offset_from`][pointer::offset_from] on it. See that method for
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

This computes the same value that [`offset_from`](#method.offset_from)
would compute, but with the added precondition that the offset is
guaranteed to be non-negative.  This method is equivalent to
`usize::try_from(self.offset_from(origin)).unwrap_unchecked()`,
but it provides slightly more information to the optimizer, which can
sometimes allow it to optimize slightly better with some backends.

This method can be thought of as recovering the `count` that was passed
to [`add`](#method.add) (or, with the parameters in the other order,
to [`sub`](#method.sub)).  The following are all equivalent, assuming
that their safety preconditions are met:
```rust
# unsafe fn blah(ptr: *mut i32, origin: *mut i32, count: usize) -> bool { unsafe {
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

## mut::byte_offset_from_unsigned

```rust
pub const unsafe fn byte_offset_from_unsigned<U: ?Sized>(self, origin: *mut U) -> usize
```

Calculates the distance between two pointers within the same allocation, *where it's known that
`self` is equal to or greater than `origin`*. The returned value is in
units of **bytes**.

This is purely a convenience for casting to a `u8` pointer and
using [`offset_from_unsigned`][pointer::offset_from_unsigned] on it.
See that method for documentation and safety requirements.

For non-`Sized` pointees this operation considers only the data pointers,
ignoring the metadata.

## mut::add

```rust
pub const unsafe fn add(self, count: usize) -> Self where T: Sized,
```

Consider using [`wrapping_add`](#method.wrapping_add) instead if these constraints are
difficult to satisfy. The only advantage of this method is that it
enables more aggressive compiler optimizations.

# Examples

```
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
using [add][pointer::add] on it. See that method for documentation
and safety requirements.

For non-`Sized` pointees this operation changes only the data pointer,
leaving the metadata untouched.

## mut::sub

```rust
pub const unsafe fn sub(self, count: usize) -> Self where T: Sized,
```

Consider using [`wrapping_sub`](#method.wrapping_sub) instead if these constraints are
difficult to satisfy. The only advantage of this method is that it
enables more aggressive compiler optimizations.

# Examples

```
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
using [sub][pointer::sub] on it. See that method for documentation
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

Compared to [`add`], this method basically delays the requirement of staying within the
same allocation: [`add`] is immediate Undefined Behavior when crossing object
boundaries; `wrapping_add` produces a pointer but still leads to Undefined Behavior if a
pointer is dereferenced when it is out-of-bounds of the object it is attached to. [`add`]
can be optimized better and is thus preferable in performance-sensitive code.

The delayed check only considers the value of the pointer that was dereferenced, not the
intermediate values used during the computation of the final result. For example,
`x.wrapping_add(o).wrapping_sub(o)` is always the same as `x`. In other words, leaving the
allocation and then re-entering it later is permitted.

[`add`]: #method.add
[allocation]: crate::ptr#allocation

# Examples

```
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
using [wrapping_add][pointer::wrapping_add] on it. See that method for documentation.

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

Compared to [`sub`], this method basically delays the requirement of staying within the
same allocation: [`sub`] is immediate Undefined Behavior when crossing object
boundaries; `wrapping_sub` produces a pointer but still leads to Undefined Behavior if a
pointer is dereferenced when it is out-of-bounds of the object it is attached to. [`sub`]
can be optimized better and is thus preferable in performance-sensitive code.

The delayed check only considers the value of the pointer that was dereferenced, not the
intermediate values used during the computation of the final result. For example,
`x.wrapping_add(o).wrapping_sub(o)` is always the same as `x`. In other words, leaving the
allocation and then re-entering it later is permitted.

[`sub`]: #method.sub
[allocation]: crate::ptr#allocation

# Examples

```
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
using [wrapping_sub][pointer::wrapping_sub] on it. See that method for documentation.

For non-`Sized` pointees this operation changes only the data pointer,
leaving the metadata untouched.

## mut::read

```rust
pub const unsafe fn read(self) -> T where T: Sized,
```

Reads the value from `self` without moving it. This leaves the
memory in `self` unchanged.

See [`ptr::read`] for safety concerns and examples.

[`ptr::read`]: crate::ptr::read()

## mut::read_volatile

```rust
pub const unsafe fn read_volatile(self) -> T where T: Sized,
```

Performs a volatile read of the value from `self` without moving it. This
leaves the memory in `self` unchanged.

Volatile operations are intended to act on I/O memory, and are guaranteed
to not be elided or reordered by the compiler across other volatile
operations.

See [`ptr::read_volatile`] for safety concerns and examples.

[`ptr::read_volatile`]: crate::ptr::read_volatile()

## mut::read_unaligned

```rust
pub const unsafe fn read_unaligned(self) -> T where T: Sized,
```

Reads the value from `self` without moving it. This leaves the
memory in `self` unchanged.

Unlike `read`, the pointer may be unaligned.

See [`ptr::read_unaligned`] for safety concerns and examples.

[`ptr::read_unaligned`]: crate::ptr::read_unaligned()

## mut::copy_to

```rust
pub const unsafe fn copy_to(self, dest: *mut T, count: usize) where T: Sized,
```

Copies `count * size_of::<T>()` bytes from `self` to `dest`. The source
and destination may overlap.

NOTE: this has the *same* argument order as [`ptr::copy`].

See [`ptr::copy`] for safety concerns and examples.

[`ptr::copy`]: crate::ptr::copy()

## mut::copy_to_nonoverlapping

```rust
pub const unsafe fn copy_to_nonoverlapping(self, dest: *mut T, count: usize) where T: Sized,
```

Copies `count * size_of::<T>()` bytes from `self` to `dest`. The source
and destination may *not* overlap.

NOTE: this has the *same* argument order as [`ptr::copy_nonoverlapping`].

See [`ptr::copy_nonoverlapping`] for safety concerns and examples.

[`ptr::copy_nonoverlapping`]: crate::ptr::copy_nonoverlapping()

## mut::copy_from

```rust
pub const unsafe fn copy_from(self, src: *const T, count: usize) where T: Sized,
```

Copies `count * size_of::<T>()` bytes from `src` to `self`. The source
and destination may overlap.

NOTE: this has the *opposite* argument order of [`ptr::copy`].

See [`ptr::copy`] for safety concerns and examples.

[`ptr::copy`]: crate::ptr::copy()

## mut::copy_from_nonoverlapping

```rust
pub const unsafe fn copy_from_nonoverlapping(self, src: *const T, count: usize) where T: Sized,
```

Copies `count * size_of::<T>()` bytes from `src` to `self`. The source
and destination may *not* overlap.

NOTE: this has the *opposite* argument order of [`ptr::copy_nonoverlapping`].

See [`ptr::copy_nonoverlapping`] for safety concerns and examples.

[`ptr::copy_nonoverlapping`]: crate::ptr::copy_nonoverlapping()

## mut::drop_in_place

```rust
pub const unsafe fn drop_in_place(self) where T: [const] Destruct,
```

Executes the destructor (if any) of the pointed-to value.

See [`ptr::drop_in_place`] for safety concerns and examples.

[`ptr::drop_in_place`]: crate::ptr::drop_in_place()

## mut::write

```rust
pub const unsafe fn write(self, val: T) where T: Sized,
```

Overwrites a memory location with the given value without reading or
dropping the old value.

See [`ptr::write`] for safety concerns and examples.

[`ptr::write`]: crate::ptr::write()

## mut::write_bytes

```rust
pub const unsafe fn write_bytes(self, val: u8, count: usize) where T: Sized,
```

Invokes memset on the specified pointer, setting `count * size_of::<T>()`
bytes of memory starting at `self` to `val`.

See [`ptr::write_bytes`] for safety concerns and examples.

[`ptr::write_bytes`]: crate::ptr::write_bytes()

## mut::write_volatile

```rust
pub const unsafe fn write_volatile(self, val: T) where T: Sized,
```

Performs a volatile write of a memory location with the given value without
reading or dropping the old value.

Volatile operations are intended to act on I/O memory, and are guaranteed
to not be elided or reordered by the compiler across other volatile
operations.

See [`ptr::write_volatile`] for safety concerns and examples.

[`ptr::write_volatile`]: crate::ptr::write_volatile()

## mut::write_unaligned

```rust
pub const unsafe fn write_unaligned(self, val: T) where T: Sized,
```

Overwrites a memory location with the given value without reading or
dropping the old value.

Unlike `write`, the pointer may be unaligned.

See [`ptr::write_unaligned`] for safety concerns and examples.

[`ptr::write_unaligned`]: crate::ptr::write_unaligned()

## mut::replace

```rust
pub const unsafe fn replace(self, src: T) -> T where T: Sized,
```

Replaces the value at `self` with `src`, returning the old
value, without dropping either.

See [`ptr::replace`] for safety concerns and examples.

[`ptr::replace`]: crate::ptr::replace()

## mut::swap

```rust
pub const unsafe fn swap(self, with: *mut T) where T: Sized,
```

Swaps the values at two mutable locations of the same type, without
deinitializing either. They may overlap, unlike `mem::swap` which is
otherwise equivalent.

See [`ptr::swap`] for safety concerns and examples.

[`ptr::swap`]: crate::ptr::swap()

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

```
# unsafe {
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
# }
```

## mut::is_aligned

```rust
pub fn is_aligned(self) -> bool where T: Sized,
```

Returns whether the pointer is properly aligned for `T`.

# Examples

```
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

```
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