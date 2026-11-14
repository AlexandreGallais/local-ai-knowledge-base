---
title: "core::mem (part 1 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/mem/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::mem

Basic <example-value> for dealing with memory, values, and types.

The contents of this module can be seen as belonging to a few families:

* `drop`, `replace`, `swap`, and `take`
  are safe functions for moving values in particular ways.
  They are useful in everyday Rust code.

* `size_of`, `size_of_val`, `align_of`, `align_of_val`, and `offset_of`
  give information about the representation of values in memory.

* `discriminant`
  allows comparing the variants of `enum` values while ignoring their fields.

* `forget` and `ManuallyDrop`
  prevent destructors from running, which is used in certain kinds of ownership transfer.
  `needs_drop`
  tells you whether a type’s destructor even does anything.

* `transmute`, `transmute_copy`, and `MaybeUninit`
  convert and construct values in `unsafe` ways.

See also the `alloc` and `ptr` modules for more primitive operations on memory.

## fn forget

```rust
pub const fn forget<T>(t: T)
```

Takes ownership and "forgets" about the value **without running its destructor**.

Any resources the value manages, such as heap memory or a file handle, will linger
forever in an unreachable state. However, it does not guarantee that pointers
to this memory will remain valid.

* If you want to leak memory, see `Box::leak`.
* If you want to obtain a raw pointer to the memory, see `Box::into_raw`.
* If you want to dispose of a value properly, running its destructor, see
  `mem::drop`.

# Safety

`forget` is not marked as `unsafe`, because Rust's safety guarantees
do not include a guarantee that destructors will always run. For example,
a program can create a reference cycle using `Rc`[rc], or call
`process::exit`[exit] to exit without running destructors. Thus, allowing
`mem::forget` from safe code does not fundamentally change Rust's safety
guarantees.

That said, leaking resources such as memory or I/O objects is usually undesirable.
The need comes up in some specialized use cases for FFI or unsafe code, but even
then, `ManuallyDrop` is typically preferred.

Because forgetting a value is allowed, any `unsafe` code you write must
allow for this possibility. You cannot return a value and expect that the
caller will necessarily run the value's destructor.

# Examples

The canonical safe use of `mem::forget` is to circumvent a value's destructor
implemented by the `Drop` trait. For example, this will leak a `File`, i.e. reclaim
the space taken by the variable but never close the underlying system resource:

```rust
use std::mem;
use std::fs::File;

let file = File::open("foo.txt").unwrap();
mem::forget(file);
```

This is useful when the ownership of the underlying resource was previously
transferred to code outside of Rust, for example by transmitting the raw
file descriptor to C code.

# Relationship with `ManuallyDrop`

While `mem::forget` can also be used to transfer *memory* ownership, doing so is error-prone.
`ManuallyDrop` should be used instead. Consider, for example, this code:

```rust
use std::mem;

let mut v = vec![65, 122];
// Build a `String` using the contents of `v`
let s = unsafe { String::from_raw_parts(v.as_mut_ptr(), v.len(), v.capacity()) };
// leak `v` because its memory is now managed by `s`
mem::forget(v);  // ERROR - v is invalid and must not be passed to a function
assert_eq!(s, "Az");
// `s` is implicitly dropped and its memory deallocated.
```

There are two issues with the above example:

* If more code were added between the construction of `String` and the invocation of
  `mem::forget()`, a panic within it would cause a double free because the same memory
  is handled by both `v` and `s`.
* After calling `v.as_mut_ptr()` and transmitting the ownership of the data to `s`,
  the `v` value is invalid. Even when a value is just moved to `mem::forget` (which won't
  inspect it), some types have strict requirements on their values that
  make them invalid when dangling or no longer owned. Using invalid values in any
  way, including passing them to or returning them from functions, constitutes
  undefined behavior and may break the assumptions made by the compiler.

Switching to `ManuallyDrop` avoids both issues:

```rust
use std::mem::ManuallyDrop;

let v = vec![65, 122];
// Before we disassemble `v` into its raw parts, make sure it
// does not get dropped!
let mut v = ManuallyDrop::new(v);
// Now disassemble `v`. These operations cannot panic, so there cannot be a leak.
let (ptr, len, cap) = (v.as_mut_ptr(), v.len(), v.capacity());
// Finally, build a `String`.
let s = unsafe { String::from_raw_parts(ptr, len, cap) };
assert_eq!(s, "Az");
// `s` is implicitly dropped and its memory deallocated.
```

`ManuallyDrop` robustly prevents double-free because we disable `v`'s destructor
before doing anything else. `mem::forget()` doesn't allow this because it consumes its
argument, forcing us to call it only after extracting anything we need from `v`. Even
if a panic were introduced between construction of `ManuallyDrop` and building the
string (which cannot happen in the code as shown), it would result in a leak and not a
double free. In other words, `ManuallyDrop` errs on the side of leaking instead of
erring on the side of (double-)dropping.

Also, `ManuallyDrop` prevents us from having to "touch" `v` after transferring the
ownership to `s` — the final step of interacting with `v` to dispose of it without
running its destructor is entirely avoided.

## fn size_of

```rust
pub const fn size_of<T>() -> usize
```

Returns the size of a type in bytes.

More specifically, this is the offset in bytes between successive elements
in an array with that item type including alignment padding. Thus, for any
type `T` and length `n`, `[T; n]` has a size of `n * size_of::<T>()`.

In general, the size of a type is not stable across compilations, but
specific types such as primitives are.

The following table gives the size for primitives.

Type | `size_of::<Type>()`
---- | ---------------
() | 0
bool | 1
u8 | 1
u16 | 2
u32 | 4
u64 | 8
u128 | 16
i8 | 1
i16 | 2
i32 | 4
i64 | 8
i128 | 16
f32 | 4
f64 | 8
char | 4

Furthermore, `usize` and `isize` have the same size.

The types `*const T`, `&T`, `Box<T>`, `Option<&T>`, and `Option<Box<T>>` all have
the same size. If `T` is `Sized`, all of those types have the same size as `usize`.

The mutability of a pointer does not change its size. As such, `&T` and `&mut T`
have the same size. Likewise for `*const T` and `*mut T`.

# Size of `#[repr(C)]` items

The `C` representation for items has a defined layout. With this layout,
the size of items is also stable as long as all fields have a stable size.

## Size of Structs

For `struct`s, the size is determined by the following algorithm.

For each field in the struct ordered by declaration order:

1. Add the size of the field.
2. Round up the current size to the nearest multiple of the next field's [alignment].

Finally, round the size of the struct to the nearest multiple of its [alignment].
The alignment of the struct is usually the largest alignment of all its
fields; this can be changed with the use of `repr(align(N))`.

Unlike `C`, zero sized structs are not rounded up to one byte in size.

## Size of Enums

Enums that carry no data other than the discriminant have the same size as C enums
on the platform they are compiled for.

## Size of Unions

The size of a union is the size of its largest field.

Unlike `C`, zero sized unions are not rounded up to one byte in size.

# Examples

```rust
// Some primitives
assert_eq!(4, size_of::<i32>());
assert_eq!(8, size_of::<f64>());
assert_eq!(0, size_of::<()>());

// Some arrays
assert_eq!(8, size_of::<[i32; 2]>());
assert_eq!(12, size_of::<[i32; 3]>());
assert_eq!(0, size_of::<[i32; 0]>());

// Pointer size equality
assert_eq!(size_of::<&i32>(), size_of::<*const i32>());
assert_eq!(size_of::<&i32>(), size_of::<Box<i32>>());
assert_eq!(size_of::<&i32>(), size_of::<Option<&i32>>());
assert_eq!(size_of::<Box<i32>>(), size_of::<Option<Box<i32>>>());
```

Using `#[repr(C)]`.

```rust
#[repr(C)]
struct FieldStruct {
    first: u8,
    second: u16,
    third: u8
}

// The size of the first field is 1, so add 1 to the size. Size is 1.
// The alignment of the second field is 2, so add 1 to the size for padding. Size is 2.
// The size of the second field is 2, so add 2 to the size. Size is 4.
// The alignment of the third field is 1, so add 0 to the size for padding. Size is 4.
// The size of the third field is 1, so add 1 to the size. Size is 5.
// Finally, the alignment of the struct is 2 (because the largest alignment amongst its
// fields is 2), so add 1 to the size for padding. Size is 6.
assert_eq!(6, size_of::<FieldStruct>());

#[repr(C)]
struct TupleStruct(u8, u16, u8);

// Tuple structs follow the same rules.
assert_eq!(6, size_of::<TupleStruct>());

// Note that reordering the fields can lower the size. We can remove both padding bytes
// by putting `third` before `second`.
#[repr(C)]
struct FieldStructOptimized {
    first: u8,
    third: u8,
    second: u16
}

assert_eq!(4, size_of::<FieldStructOptimized>());

// Union size is the size of the largest field.
#[repr(C)]
union ExampleUnion {
    smaller: u8,
    larger: u16
}

assert_eq!(2, size_of::<ExampleUnion>());
```

## fn size_of_val

```rust
pub const fn size_of_val<T: ?Sized>(val: &T) -> usize
```

Returns the size of the pointed-to value in bytes.

This is usually the same as `size_of::<T>()`. However, when `T` *has* no
statically-known size, e.g., a slice `[T]` or a [trait object],
then `size_of_val` can be used to get the dynamically-known size.

# Examples

```rust
assert_eq!(4, size_of_val(&5i32));

let x: [u8; 13] = [0; 13];
let y: &[u8] = &x;
assert_eq!(13, size_of_val(y));
```

## fn size_of_val_raw

```rust
pub const unsafe fn size_of_val_raw<T: ?Sized>(val: *const T) -> usize
```

- No other kind of unsized tail currently exists that satisfies the trait bounds for this
      function. If more kinds of unsized tails get introduced in the future, the documentation
      of this function will have to be extended before it can be used for such types.

Here, *unsized tail* refers to the type obtained by recursively descending through the last
field of a tuple or struct until we arrived at a built-in unsized type.

As a consequence of these rules, it is the case that whenever it is allowed to convert `val`
into a shared reference, then it is also allowed to invoke this function.

# Examples

```rust
use std::mem;

assert_eq!(4, size_of_val(&5i32));

let x: [u8; 13] = [0; 13];
let y: &[u8] = &x;
assert_eq!(13, unsafe { mem::size_of_val_raw(y) });
```

## fn min_align_of

```rust
pub fn min_align_of<T>() -> usize
```

Returns the [ABI]-required minimum alignment of a type in bytes.

Every reference to a value of the type `T` must be a multiple of this number.

This is the alignment used for struct fields. It may be smaller than the preferred alignment.

# Examples

```rust
use std::mem;

assert_eq!(4, mem::min_align_of::<i32>());
```

## fn min_align_of_val

```rust
pub fn min_align_of_val<T: ?Sized>(val: &T) -> usize
```

Returns the [ABI]-required minimum alignment of the type of the value that `val` points to in
bytes.

Every reference to a value of the type `T` must be a multiple of this number.

# Examples

```rust
use std::mem;

assert_eq!(4, mem::min_align_of_val(&5i32));
```

## fn align_of

```rust
pub const fn align_of<T>() -> usize
```

Returns the [ABI]-required minimum alignment of a type, in bytes.

Every reference to a value of the type `T` must be a multiple of this number.

This is the alignment used for struct fields. It may be smaller than the preferred alignment.

# Examples

```rust
assert_eq!(4, align_of::<i32>());
```

(Caution: it is not guaranteed that the alignment of `i32` is `4`;
that is, the above assertion does not pass on all platforms.)

## fn align_of_val

```rust
pub const fn align_of_val<T: ?Sized>(val: &T) -> usize
```

Returns the [ABI]-required minimum alignment of the type of the value that `val` points to, in
bytes.

This function is identical to `align_of::<T>()`[align_of] whenever `T: [Sized]`,
but also supports determining the alignment required by a `dyn Trait` value, which is the
alignment of the underlying concrete type.

# Examples

```rust
assert_eq!(4, align_of_val(&5i32));
```

(Caution: it is not guaranteed that the alignment of `i32` is `4`;
that is, this example assertion does not pass on all platforms.)

`dyn` types may have different alignments for different values;
`align_of_val` can be used to learn those alignments:

```rust
let a: &dyn ToString = &1234u16;
let b: &dyn ToString = &String::from("abcd");

assert_eq!(align_of_val(a), align_of::<u16>());
assert_eq!(align_of_val(b), align_of::<String>());
```

## fn align_of_val_raw

```rust
pub const unsafe fn align_of_val_raw<T: ?Sized>(val: *const T) -> usize
```

- No other kind of unsized tail currently exists that satisfies the trait bounds for this
      function. If more kinds of unsized tails get introduced in the future, the documentation
      of this function will have to be extended before it can be used for such types.

Here, *unsized tail* refers to the type obtained by recursively descending through the last
field of a tuple or struct until we arrived at a built-in unsized type.

As a consequence of these rules, it is the case that whenever it is allowed to convert `val`
into a shared reference, then it is also allowed to invoke this function.

# Examples

```rust
use std::mem;

assert_eq!(4, unsafe { mem::align_of_val_raw(&5i32) });
```

(Caution: it is not guaranteed that the alignment of `i32` is `4`;
that is, the above assertion does not pass on all platforms.)
