---
title: "core::mem::maybe_uninit (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/mem/maybe_uninit.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::mem::maybe_uninit (part 2 of 2)

## MaybeUninit::assume_init_mut

```rust
pub const unsafe fn assume_init_mut(&mut self) -> &mut T
```

Gets a mutable (unique) reference to the contained value.

This can be useful when we want to access a `MaybeUninit` that has been
initialized but don't have ownership of the `MaybeUninit` (preventing the use
of `.assume_init()`).

# Safety

Calling this when the content is not yet fully initialized causes undefined
behavior: it is up to the caller to guarantee that the `MaybeUninit<T>` really
is in an initialized state. For instance, `.assume_init_mut()` cannot be used to
initialize a `MaybeUninit`.

# Examples

### Correct usage of this method:

```rust
use std::mem::MaybeUninit;

extern "C" {
    /// Initializes *all* the bytes of the input buffer.
    fn initialize_buffer(buf: *mut [u8; 1024]);
}

let mut buf = MaybeUninit::<[u8; 1024]>::uninit();

// Initialize `buf`:
unsafe { initialize_buffer(buf.as_mut_ptr()); }
// Now we know that `buf` has been initialized, so we could `.assume_init()` it.
// However, using `.assume_init()` may trigger a `memcpy` of the 1024 bytes.
// To assert our buffer has been initialized without copying it, we upgrade
// the `&mut MaybeUninit<[u8; 1024]>` to a `&mut [u8; 1024]`:
let buf: &mut [u8; 1024] = unsafe {
    // SAFETY: `buf` has been initialized.
    buf.assume_init_mut()
};

// Now we can use `buf` as a normal slice:
buf.sort_unstable();
assert!(
    buf.windows(2).all(|pair| pair[0] <= pair[1]),
    "buffer is sorted",
);
```

### *Incorrect* usages of this method:

You cannot use `.assume_init_mut()` to initialize a value:

```rust
use std::mem::MaybeUninit;

let mut b = MaybeUninit::<bool>::uninit();
unsafe {
    *b.assume_init_mut() = true;
    // We have created a (mutable) reference to an uninitialized `bool`!
    // This is undefined behavior. ⚠️
}
```

For instance, you cannot `Read` into an uninitialized buffer:

```rust
use std::{io, mem::MaybeUninit};

fn read_chunk (reader: &'_ mut dyn io::Read) -> io::Result<[u8; 64]>
{
    let mut buffer = MaybeUninit::<[u8; 64]>::uninit();
    reader.read_exact(unsafe { buffer.assume_init_mut() })?;
    //                         ^^^^^^^^^^^^^^^^^^^^^^^^
    // (mutable) reference to uninitialized memory!
    // This is undefined behavior.
    Ok(unsafe { buffer.assume_init() })
}
```

Nor can you use direct field access to do field-by-field gradual initialization:

```rust
use std::{mem::MaybeUninit, ptr};

struct Foo {
    a: u32,
    b: u8,
}

let foo: Foo = unsafe {
    let mut foo = MaybeUninit::<Foo>::uninit();
    ptr::write(&mut foo.assume_init_mut().a as *mut u32, 1337);
    //              ^^^^^^^^^^^^^^^^^^^^^
    // (mutable) reference to uninitialized memory!
    // This is undefined behavior.
    ptr::write(&mut foo.assume_init_mut().b as *mut u8, 42);
    //              ^^^^^^^^^^^^^^^^^^^^^
    // (mutable) reference to uninitialized memory!
    // This is undefined behavior.
    foo.assume_init()
};
```

## MaybeUninit::write_copy_of_slice

```rust
pub const fn write_copy_of_slice(&mut self, src: &[T]) -> &mut [T] where T: Copy,
```

Copies the elements from `src` to `self`,
returning a mutable reference to the now initialized contents of `self`.

If `T` does not implement `Copy`, use `write_clone_of_slice` instead.

This is similar to `slice::copy_from_slice`.

# Panics

This function will panic if the two slices have different lengths.

# Examples

```rust
use std::mem::MaybeUninit;

let mut dst = [MaybeUninit::uninit(); 32];
let src = [0; 32];

let init = dst.write_copy_of_slice(&src);

assert_eq!(init, src);
```

```rust
let mut vec = Vec::with_capacity(32);
let src = [0; 16];

vec.spare_capacity_mut()[..src.len()].write_copy_of_slice(&src);

// SAFETY: we have just copied all the elements of len into the spare capacity
// the first src.len() elements of the vec are valid now.
unsafe {
    vec.set_len(src.len());
}

assert_eq!(vec, src);
```

## MaybeUninit::write_clone_of_slice

```rust
pub fn write_clone_of_slice(&mut self, src: &[T]) -> &mut [T] where T: Clone,
```

Clones the elements from `src` to `self`,
returning a mutable reference to the now initialized contents of `self`.
Any already initialized elements will not be dropped.

If `T` implements `Copy`, use `write_copy_of_slice` instead.

This is similar to `slice::clone_from_slice` but does not drop existing elements.

# Panics

This function will panic if the two slices have different lengths, or if the implementation of `Clone` panics.

If there is a panic, the already cloned elements will be dropped.

# Examples

```rust
use std::mem::MaybeUninit;

let mut dst = [const { MaybeUninit::uninit() }; 5];
let src = ["wibbly", "wobbly", "timey", "wimey", "stuff"].map(|s| s.to_string());

let init = dst.write_clone_of_slice(&src);

assert_eq!(init, src);

```

```rust
let mut vec = Vec::with_capacity(32);
let src = ["rust", "is", "a", "pretty", "cool", "language"].map(|s| s.to_string());

vec.spare_capacity_mut()[..src.len()].write_clone_of_slice(&src);

// SAFETY: we have just cloned all the elements of len into the spare capacity
// the first src.len() elements of the vec are valid now.
unsafe {
    vec.set_len(src.len());
}

assert_eq!(vec, src);
```

## MaybeUninit::assume_init_drop

```rust
pub const unsafe fn assume_init_drop(&mut self) where T: [const] Destruct,
```

Drops the contained values in place.

# Safety

It is up to the caller to guarantee that every `MaybeUninit<T>` in the slice
really is in an initialized state. Calling this when the content is not yet
fully initialized causes undefined behavior.

On top of that, all additional invariants of the type `T` must be
satisfied, as the `Drop` implementation of `T` (or its members) may
rely on this. For example, setting a `Vec<T>` to an invalid but
non-null address makes it initialized (under the current implementation;
this does not constitute a stable guarantee), because the only
requirement the compiler knows about it is that the data pointer must be
non-null. Dropping such a `Vec<T>` however will cause undefined
behaviour.

## MaybeUninit::assume_init_ref

```rust
pub const unsafe fn assume_init_ref(&self) -> &[T]
```

Gets a shared reference to the contained value.

# Safety

Calling this when the content is not yet fully initialized causes undefined
behavior: it is up to the caller to guarantee that every `MaybeUninit<T>` in
the slice really is in an initialized state.

## MaybeUninit::assume_init_mut

```rust
pub const unsafe fn assume_init_mut(&mut self) -> &mut [T]
```

Gets a mutable (unique) reference to the contained value.

# Safety

Calling this when the content is not yet fully initialized causes undefined
behavior: it is up to the caller to guarantee that every `MaybeUninit<T>` in the
slice really is in an initialized state. For instance, `.assume_init_mut()` cannot
be used to initialize a `MaybeUninit` slice.
