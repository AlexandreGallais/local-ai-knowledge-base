---
title: "core::intrinsics (part 3 of 7)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/intrinsics/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::intrinsics (part 3 of 7)

## fn transmute

```rust
pub const unsafe fn transmute<Src, Dst>(src: Src) -> Dst
```

Reinterprets the bits of a value of one type as another type.

Both types must have the same size. Compilation will fail if this is not guaranteed.

`transmute` is semantically equivalent to a bitwise move of one type
into another. It copies the bits from the source value into the
destination value, then forgets the original. Note that source and destination
are passed by-value, which means if `Src` or `Dst` contain padding, that padding
is *not* guaranteed to be preserved by `transmute`.

Both the argument and the result must be valid at
their given type. Violating this condition leads to undefined behavior. The compiler
will generate code *assuming that you, the programmer, ensure that there will never be
undefined behavior*. It is therefore your responsibility to guarantee that every value
passed to `transmute` is valid at both types `Src` and `Dst`. Failing to uphold this condition
may lead to unexpected and unstable compilation results. This makes `transmute` **incredibly
unsafe**. `transmute` should be the absolute last resort.

Because `transmute` is a by-value operation, alignment of the *transmuted values
themselves* is not a concern. As with any other function, the compiler already ensures
both `Src` and `Dst` are properly aligned. However, when transmuting values that *point
elsewhere* (such as pointers, references, boxes…), the caller has to ensure proper
alignment of the pointed-to values.

The nomicon has additional documentation.

# Transmutation between pointers and integers

Special care has to be taken when transmuting between pointers and integers, e.g.
transmuting between `*const ()` and `usize`.

Transmuting *pointers to integers* in a `const` context is undefined behavior, unless
the pointer was originally created *from* an integer. (That includes this function
specifically, integer-to-pointer casts, and helpers like `dangling`[crate::ptr::dangling],
but also semantically-equivalent conversions such as punning through `repr(C)` union
fields.) Any attempt to use the resulting value for integer operations will abort
const-evaluation. (And even outside `const`, such transmutation is touching on many
unspecified aspects of the Rust memory model and should be avoided. See below for
alternatives.)

Transmuting *integers to pointers* is a largely unspecified operation. It is likely *not*
equivalent to an `as` cast. Doing non-zero-sized memory accesses with a pointer constructed
this way is currently considered undefined behavior.

All this also applies when the integer is nested inside an array, tuple, struct, or enum.
However, `MaybeUninit<usize>` is not considered an integer type for the purpose of this
section. Transmuting `*const ()` to `MaybeUninit<usize>` is fine---but then calling
`assume_init()` on that result is considered as completing the pointer-to-integer transmute
and thus runs into the issues discussed above.

In particular, doing a pointer-to-integer-to-pointer roundtrip via `transmute` is *not* a
lossless process. If you want to round-trip a pointer through an integer in a way that you
can get back the original pointer, you need to use `as` casts, or replace the integer type
by `MaybeUninit<$int>` (and never call `assume_init()`). If you are looking for a way to
store data of arbitrary type, also use `MaybeUninit<T>` (that will also handle uninitialized
memory due to padding). If you specifically need to store something that is "either an
integer or a pointer", use `*mut ()`: integers can be converted to pointers and back without
any loss (via `as` casts or via `transmute`).

# Examples

There are a few things that `transmute` is really useful for.

Turning a pointer into a function pointer. This is *not* portable to
machines where function pointers and data pointers have different sizes.

```rust
fn foo() -> i32 {
    0
}
// Crucially, we `as`-cast to a raw pointer before `transmute`ing to a function pointer.
// This avoids an integer-to-pointer `transmute`, which can be problematic.
// Transmuting between raw pointers and function pointers (i.e., two pointer types) is fine.
let pointer = foo as fn() -> i32 as *const ();
let function = unsafe {
    std::mem::transmute::<*const (), fn() -> i32>(pointer)
};
assert_eq!(function(), 0);
```

Extending a lifetime, or shortening an invariant lifetime. This is
advanced, very unsafe Rust!

```rust
struct R<'a>(&'a i32);
unsafe fn extend_lifetime<'b>(r: R<'b>) -> R<'static> {
    unsafe { std::mem::transmute::<R<'b>, R<'static>>(r) }
}

unsafe fn shorten_invariant_lifetime<'b, 'c>(r: &'b mut R<'static>)
                                             -> &'b mut R<'c> {
    unsafe { std::mem::transmute::<&'b mut R<'static>, &'b mut R<'c>>(r) }
}
```

# Alternatives

Don't despair: many uses of `transmute` can be achieved through other means.
Below are common applications of `transmute` which can be replaced with safer
constructs.

Turning raw bytes (`[u8; SZ]`) into `u32`, `f64`, etc.:

```rust
let raw_bytes = [0x78, 0x56, 0x34, 0x12];

let num = unsafe {
    std::mem::transmute::<[u8; 4], u32>(raw_bytes)
};

// use `u32::from_ne_bytes` instead
let num = u32::from_ne_bytes(raw_bytes);
// or use `u32::from_le_bytes` or `u32::from_be_bytes` to specify the endianness
let num = u32::from_le_bytes(raw_bytes);
assert_eq!(num, 0x12345678);
let num = u32::from_be_bytes(raw_bytes);
assert_eq!(num, 0x78563412);
```

Turning a pointer into a `usize`:

```rust
let ptr = &0;
let ptr_num_transmute = unsafe {
    std::mem::transmute::<&i32, usize>(ptr)
};

// Use an `as` cast instead
let ptr_num_cast = ptr as *const i32 as usize;
```

Note that using `transmute` to turn a pointer to a `usize` is (as noted above) undefined
behavior in `const` contexts. Also outside of consts, this operation might not behave
as expected -- this is touching on many unspecified aspects of the Rust memory model.
Depending on what the code is doing, the following alternatives are preferable to
pointer-to-integer transmutation:
- If the code just wants to store data of arbitrary type in some buffer and needs to pick a
  type for that buffer, it can use `MaybeUninit`[crate::mem::MaybeUninit].
- If the code actually wants to work on the address the pointer points to, it can use `as`
  casts or `ptr.addr()`[pointer::addr].

Turning a `*mut T` into a `&mut T`:

```rust
let ptr: *mut i32 = &mut 0;
let ref_transmuted = unsafe {
    std::mem::transmute::<*mut i32, &mut i32>(ptr)
};

// Use a reborrow instead
let ref_casted = unsafe { &mut *ptr };
```

Turning a `&mut T` into a `&mut U`:

```rust
let ptr = &mut 0;
let val_transmuted = unsafe {
    std::mem::transmute::<&mut i32, &mut u32>(ptr)
};

// Now, put together `as` and reborrowing - note the chaining of `as`
// `as` is not transitive
let val_casts = unsafe { &mut *(ptr as *mut i32 as *mut u32) };
```

Turning a `&str` into a `&[u8]`:

```rust
// this is not a good way to do this.
let slice = unsafe { std::mem::transmute::<&str, &[u8]>("Rust") };
assert_eq!(slice, &[82, 117, 115, 116]);

// You could use `str::as_bytes`
let slice = "Rust".as_bytes();
assert_eq!(slice, &[82, 117, 115, 116]);

// Or, just use a byte string, if you have control over the string
// literal
assert_eq!(b"Rust", &[82, 117, 115, 116]);
```

Turning a `Vec<&T>` into a `Vec<Option<&T>>`.

To transmute the inner type of the contents of a container, you must make sure to not
violate any of the container's invariants. For `Vec`, this means that both the size
*and alignment* of the inner types have to match. Other containers might rely on the
size of the type, alignment, or even the `TypeId`, in which case transmuting wouldn't
be possible at all without violating the container invariants.

```rust
let store = [0, 1, 2, 3];
let v_orig = store.iter().collect::<Vec<&i32>>();

// clone the vector as we will reuse them later
let v_clone = v_orig.clone();

// Using transmute: this relies on the unspecified data layout of `Vec`, which is a
// bad idea and could cause Undefined Behavior.
// However, it is no-copy.
let v_transmuted = unsafe {
    std::mem::transmute::<Vec<&i32>, Vec<Option<&i32>>>(v_clone)
};

let v_clone = v_orig.clone();

// This is the suggested, safe way.
// It may copy the entire vector into a new one though, but also may not.
let v_collected = v_clone.into_iter()
                         .map(Some)
                         .collect::<Vec<Option<&i32>>>();

let v_clone = v_orig.clone();

// This is the proper no-copy, unsafe way of "transmuting" a `Vec`, without relying on the
// data layout. Instead of literally calling `transmute`, we perform a pointer cast, but
// in terms of converting the original inner type (`&i32`) to the new one (`Option<&i32>`),
// this has all the same caveats. Besides the information provided above, also consult the
// `from_raw_parts` documentation.
let (ptr, len, capacity) = v_clone.into_raw_parts();
let v_from_raw = unsafe {
    Vec::from_raw_parts(ptr.cast::<*mut Option<&i32>>(), len, capacity)
};
```

Implementing `split_at_mut`:

```rust
use std::{slice, mem};

// There are multiple ways to do this, and there are multiple problems
// with the following (transmute) way.
fn split_at_mut_transmute<T>(slice: &mut [T], mid: usize)
                             -> (&mut [T], &mut [T]) {
    let len = slice.len();
    assert!(mid <= len);
    unsafe {
        let slice2 = mem::transmute::<&mut [T], &mut [T]>(slice);
        // first: transmute is not type safe; all it checks is that T and
        // U are of the same size. Second, right here, you have two
        // mutable references pointing to the same memory.
        (&mut slice[0..mid], &mut slice2[mid..len])
    }
}

// This gets rid of the type safety problems; `&mut *` will *only* give
// you a `&mut T` from a `&mut T` or `*mut T`.
fn split_at_mut_casts<T>(slice: &mut [T], mid: usize)
                         -> (&mut [T], &mut [T]) {
    let len = slice.len();
    assert!(mid <= len);
    unsafe {
        let slice2 = &mut *(slice as *mut [T]);
        // however, you still have two mutable references pointing to
        // the same memory.
        (&mut slice[0..mid], &mut slice2[mid..len])
    }
}

// This is how the standard library does it. This is the best method, if
// you need to do something like this
fn split_at_stdlib<T>(to_split: &mut [T], mid: usize)
                      -> (&mut [T], &mut [T]) {
    let len = to_split.len();
    assert!(mid <= len);
    unsafe {
        let ptr = to_split.as_mut_ptr();
        let fst = slice::from_raw_parts_mut(ptr, mid);
        let snd = slice::from_raw_parts_mut(ptr.add(mid), len - mid);
        // The function now has three mutable references to overlapping memory:
        // `to_split`, `fst`, and `snd`.
        // `to_split` is never used after `let ptr = ...` so it can be treated as "dead".
        // This leaves two "live" mutable slice references, `fst` and `snd`, with no overlap.
        (fst, snd)
    }
}
```

## fn transmute_unchecked

```rust
pub const unsafe fn transmute_unchecked<Src, Dst>(src: Src) -> Dst
```

Like `transmute`, but even less checked at compile-time: rather than
giving an error for `size_of::<Src>() != size_of::<Dst>()`, it's
**Undefined Behavior** at runtime.

Prefer normal `transmute` where possible, for the extra checking, since
both do exactly the same thing at runtime, if they both compile.

This is not expected to ever be exposed directly to users, rather it
may eventually be exposed through some more-constrained API.

## fn needs_drop

```rust
pub fn needs_drop<T: ?Sized>() -> bool
```

Returns `true` if the actual type given as `T` requires drop
glue; returns `false` if the actual type provided for `T`
implements `Copy`.

If the actual type neither requires drop glue nor implements
`Copy`, then the return value of this function is unspecified.

Note that, unlike most intrinsics, this can only be called at compile-time
as backends do not have an implementation for it. The only caller (its
stable counterpart) wraps this intrinsic call in a `const` block so that
backends only see an evaluated constant.

The stabilized version of this intrinsic is `mem::needs_drop`.

## fn offset

```rust
pub const unsafe fn offset<Ptr: bounds::BuiltinDeref, Delta>(dst: Ptr, offset: Delta) -> Ptr
```

Calculates the offset from a pointer.

This is implemented as an intrinsic to avoid converting to and from an
integer, since the conversion would throw away aliasing information.

This can only be used with `Ptr` as a raw pointer type (`*mut` or `*const`)
to a `Sized` pointee and with `Delta` as `usize` or `isize`.  Any other
instantiations may arbitrarily misbehave, and that's *not* a compiler bug.

# Safety

If the computed offset is non-zero, then both the starting and resulting pointer must be
either in bounds or at the end of an allocation. If either pointer is out
of bounds or arithmetic overflow occurs then this operation is undefined behavior.

The stabilized version of this intrinsic is `pointer::offset`.

## fn arith_offset

```rust
pub const unsafe fn arith_offset<T>(dst: *const T, offset: isize) -> *const T
```

Calculates the offset from a pointer, potentially wrapping.

This is implemented as an intrinsic to avoid converting to and from an
integer, since the conversion inhibits certain optimizations.

# Safety

Unlike the `offset` intrinsic, this intrinsic does not restrict the
resulting pointer to point into or at the end of an allocated
object, and it wraps with two's complement arithmetic. The resulting
value is not necessarily valid to be used to actually access memory.

The stabilized version of this intrinsic is `pointer::wrapping_offset`.

## fn slice_get_unchecked

```rust
pub const unsafe fn slice_get_unchecked< ItemPtr: bounds::ChangePointee<[T], Pointee = T, Output = SlicePtr>, SlicePtr, T, >( slice_ptr: SlicePtr, index: usize, ) -> ItemPtr
```

Projects to the `index`-th element of `slice_ptr`, as the same kind of pointer
as the slice was provided -- so `&mut [T] → &mut T`, `&[T] → &T`,
`*mut [T] → *mut T`, or `*const [T] → *const T` -- without a bounds check.

This is exposed via `<usize as SliceIndex>::get(_unchecked)(_mut)`,
and isn't intended to be used elsewhere.

Expands in MIR to `{&, &mut, &raw const, &raw mut} (*slice_ptr)[index]`,
depending on the types involved, so no backend support is needed.

# Safety

- `index < PtrMetadata(slice_ptr)`, so the indexing is in-bounds for the slice
- the resulting offsetting is in-bounds of the allocation, which is
  always the case for references, but needs to be upheld manually for pointers
