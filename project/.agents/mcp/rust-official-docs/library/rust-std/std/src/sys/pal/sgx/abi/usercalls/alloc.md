---
title: "std::sys::pal::sgx::abi::usercalls::alloc"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/sgx/abi/usercalls/alloc.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::sgx::abi::usercalls::alloc

## UserSafe::align_of

```rust
fn align_of() -> usize
```

Equivalent to `align_of::<Self>`.

## UserSafe::from_raw_sized_unchecked

```rust
unsafe fn from_raw_sized_unchecked(ptr: *mut u8, size: usize) -> *mut Self
```

Constructs a pointer to `Self` given a memory range in user space.

N.B., this takes a size, not a length!

# Safety

The caller must ensure the memory range is in user memory, is the
correct size and is correctly aligned and points to the right type.

## UserSafe::from_raw_sized

```rust
unsafe fn from_raw_sized(ptr: *mut u8, size: usize) -> NonNull<Self>
```

Constructs a pointer to `Self` given a memory range.

N.B., this takes a size, not a length!

# Safety

The caller must ensure the memory range points to the correct type.

# Panics

This function panics if:

* the pointer is not aligned.
* the pointer is null.
* the pointed-to range does not fit in the address space.
* the pointed-to range is not in user memory.

## UserSafe::check_ptr

```rust
unsafe fn check_ptr(ptr: *const Self)
```

Checks if a pointer may point to `Self` in user memory.

# Safety

The caller must ensure the memory range points to the correct type and
length (if this is a slice).

# Panics

This function panics if:

* the pointer is not aligned.
* the pointer is null.
* the pointed-to range is not in user memory.

## UserSafeCopyDestination::as_mut_ptr

```rust
fn as_mut_ptr(&mut self) -> *mut T
```

Returns a pointer for writing to the value.

## User::new_from_enclave

```rust
pub fn new_from_enclave(val: &T) -> Self
```

Copies `val` into freshly allocated space in user memory.

## User::from_raw

```rust
pub unsafe fn from_raw(ptr: *mut T) -> Self
```

Creates an owned `User<T>` from a raw pointer.

# Safety
The caller must ensure `ptr` points to `T`, is freeable with the `free`
usercall and the alignment of `T`, and is uniquely owned.

# Panics
This function panics if:

* The pointer is not aligned
* The pointer is null
* The pointed-to range is not in user memory

## User::into_raw

```rust
pub fn into_raw(self) -> *mut T
```

Converts this value into a raw pointer. The value will no longer be
automatically freed.

## User::uninitialized

```rust
pub fn uninitialized() -> Self
```

Allocates space for `T` in user memory.

## User::uninitialized

```rust
pub fn uninitialized(n: usize) -> Self
```

Allocates space for a `[T]` of `n` elements in user memory.

## User::from_raw_parts

```rust
pub unsafe fn from_raw_parts(ptr: *mut T, len: usize) -> Self
```

Creates an owned `User<[T]>` from a raw thin pointer and a slice length.

# Safety
The caller must ensure `ptr` points to `len` elements of `T`, is
freeable with the `free` usercall and the alignment of `T`, and is
uniquely owned.

# Panics
This function panics if:

* The pointer is not aligned
* The pointer is null
* The pointed-to range does not fit in the address space
* The pointed-to range is not in user memory

## UserRef::from_ptr

```rust
pub unsafe fn from_ptr<'a>(ptr: *const T) -> &'a Self
```

Creates a `&UserRef<[T]>` from a raw pointer.

# Safety
The caller must ensure `ptr` points to `T`.

# Panics
This function panics if:

* The pointer is not aligned
* The pointer is null
* The pointed-to range is not in user memory

## UserRef::from_mut_ptr

```rust
pub unsafe fn from_mut_ptr<'a>(ptr: *mut T) -> &'a mut Self
```

Creates a `&mut UserRef<[T]>` from a raw pointer. See the struct
documentation for the nuances regarding a `&mut UserRef<T>`.

# Safety
The caller must ensure `ptr` points to `T`.

# Panics
This function panics if:

* The pointer is not aligned
* The pointer is null
* The pointed-to range is not in user memory

## UserRef::copy_from_enclave

```rust
pub fn copy_from_enclave(&mut self, val: &T)
```

Copies `val` into user memory.

# Panics
This function panics if the destination doesn't have the same size as
the source. This can happen for dynamically-sized types such as slices.

## UserRef::copy_to_enclave

```rust
pub fn copy_to_enclave<U: ?Sized + UserSafeCopyDestination<T>>(&self, dest: &mut U)
```

Copies the value from user memory and place it into `dest`.

# Panics
This function panics if the destination doesn't have the same size as
the source. This can happen for dynamically-sized types such as slices.

## UserRef::as_raw_ptr

```rust
pub fn as_raw_ptr(&self) -> *const T
```

Obtain a raw pointer from this reference.

## UserRef::as_raw_mut_ptr

```rust
pub fn as_raw_mut_ptr(&mut self) -> *mut T
```

Obtain a raw pointer from this reference.

## UserRef::to_enclave

```rust
pub fn to_enclave(&self) -> T
```

Copies the value from user memory into enclave memory.

## UserRef::from_raw_parts

```rust
pub unsafe fn from_raw_parts<'a>(ptr: *const T, len: usize) -> &'a Self
```

Creates a `&UserRef<[T]>` from a raw thin pointer and a slice length.

# Safety
The caller must ensure `ptr` points to `n` elements of `T`.

# Panics
This function panics if:

* The pointer is not aligned
* The pointer is null
* The pointed-to range does not fit in the address space
* The pointed-to range is not in user memory

## UserRef::from_raw_parts_mut

```rust
pub unsafe fn from_raw_parts_mut<'a>(ptr: *mut T, len: usize) -> &'a mut Self
```

Creates a `&mut UserRef<[T]>` from a raw thin pointer and a slice length.
See the struct documentation for the nuances regarding a
`&mut UserRef<T>`.

# Safety
The caller must ensure `ptr` points to `n` elements of `T`.

# Panics
This function panics if:

* The pointer is not aligned
* The pointer is null
* The pointed-to range does not fit in the address space
* The pointed-to range is not in user memory

## UserRef::as_ptr

```rust
pub fn as_ptr(&self) -> *const T
```

Obtain a raw pointer to the first element of this user slice.

## UserRef::as_mut_ptr

```rust
pub fn as_mut_ptr(&mut self) -> *mut T
```

Obtain a raw pointer to the first element of this user slice.

## UserRef::len

```rust
pub fn len(&self) -> usize
```

Obtain the number of elements in this user slice.

## UserRef::append_to_enclave_vec

```rust
pub fn append_to_enclave_vec(&self, dest: &mut Vec<T>)
```

Copies the value from user memory and appends it to `dest`.

## UserRef::to_enclave

```rust
pub fn to_enclave(&self) -> Vec<T>
```

Copies the value from user memory into a vector in enclave memory.

## UserRef::iter

```rust
pub fn iter(&self) -> Iter<'_, T> where T: UserSafe, // FIXME: should be implied by [T]: UserSafe?
```

Returns an iterator over the slice.

## UserRef::iter_mut

```rust
pub fn iter_mut(&mut self) -> IterMut<'_, T> where T: UserSafe, // FIXME: should be implied by [T]: UserSafe?
```

Returns an iterator that allows modifying each value.

## UserRef::copy_user_buffer

```rust
pub fn copy_user_buffer(&self) -> Vec<u8>
```

Copies the user memory range pointed to by the user `ByteBuffer` to
enclave memory.

# Panics
This function panics if, in the user `ByteBuffer`:

* The pointer is null
* The pointed-to range does not fit in the address space
* The pointed-to range is not in user memory
