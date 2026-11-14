---
title: "alloc::vec (part 3 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/vec/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::vec (part 3 of 5)

## Vec::from_parts_in

```rust
pub const unsafe fn from_parts_in( ptr: NonNull<T>, length: usize, capacity: usize, alloc: A, ) -> Self
```

Creates a `Vec<T, A>` directly from a `NonNull` pointer, a length, a capacity,
and an allocator.

# Safety

The parts must satisfy the invariants described in the [memory layout] section.

Violating them may cause problems like corrupting the allocator's
internal data structures. For example it is **not** safe
to build a `Vec<u8>` from a pointer to a C `char` array with length `size_t`.
It's also not safe to build one from a `Vec<u16>` and its length, because
the allocator cares about the alignment, and these two types have different
alignments. The buffer was allocated with alignment 2 (for `u16`), but after
turning it into a `Vec<u8>` it'll be deallocated with alignment 1.

The ownership of `ptr` is effectively transferred to the
`Vec<T>` which may then deallocate, reallocate or change the
contents of memory pointed to by the pointer at will. Ensure
that nothing else uses the pointer after calling this
function.

# Examples

```rust
use std::alloc::System;

let mut v = Vec::with_capacity_in(3, System);
v.push(1);
v.push(2);
v.push(3);

// Deconstruct the vector into parts.
let (p, len, cap, alloc) = v.into_parts_with_allocator();

unsafe {
    // Overwrite memory with 4, 5, 6
    for i in 0..len {
        p.add(i).write(4 + i);
    }

    // Put everything back together into a Vec
    let rebuilt = Vec::from_parts_in(p, len, cap, alloc.clone());
    assert_eq!(rebuilt, [4, 5, 6]);
}
```

Using memory that was allocated elsewhere:

```rust
use std::alloc::{AllocError, Allocator, Global, Layout};

fn main() {
    let layout = Layout::array::<u32>(16).expect("16 u32s take 64 bytes, so it shouldn't overflow");

    let vec = unsafe {
        let mem = match Global.allocate(layout) {
            Ok(mem) => mem.cast::<u32>(),
            Err(AllocError) => return,
        };

        mem.write(1_000_000);

        Vec::from_parts_in(mem, 1, 16, Global)
    };

    assert_eq!(vec, &[1_000_000]);
    assert_eq!(vec.capacity(), 16);
}
```

## Vec::into_raw_parts_with_allocator

```rust
pub const fn into_raw_parts_with_allocator(self) -> (*mut T, usize, usize, A)
```

Decomposes a `Vec<T>` into its raw components: `(pointer, length, capacity, allocator)`.

Returns the raw pointer to the underlying data, the length of the vector (in elements),
the allocated capacity of the data (in elements), and the allocator. These are the same
arguments in the same order as the arguments to `from_raw_parts_in`.

After calling this function, the caller is responsible for the
memory previously managed by the `Vec`. The only way to do
this is to convert the raw pointer, length, and capacity back
into a `Vec` with the `from_raw_parts_in` function, allowing
the destructor to perform the cleanup.

# Examples

```rust
use std::alloc::System;

let mut v: Vec<i32, System> = Vec::new_in(System);
v.push(-1);
v.push(0);
v.push(1);

let (ptr, len, cap, alloc) = v.into_raw_parts_with_allocator();

let rebuilt = unsafe {
    // We can now make changes to the components, such as
    // transmuting the raw pointer to a compatible type.
    let ptr = ptr as *mut u32;

    Vec::from_raw_parts_in(ptr, len, cap, alloc)
};
assert_eq!(rebuilt, [4294967295, 0, 1]);
```

## Vec::into_parts_with_allocator

```rust
pub const fn into_parts_with_allocator(self) -> (NonNull<T>, usize, usize, A)
```

Decomposes a `Vec<T>` into its raw components: `(NonNull pointer, length, capacity, allocator)`.

Returns the `NonNull` pointer to the underlying data, the length of the vector (in elements),
the allocated capacity of the data (in elements), and the allocator. These are the same
arguments in the same order as the arguments to `from_parts_in`.

After calling this function, the caller is responsible for the
memory previously managed by the `Vec`. The only way to do
this is to convert the `NonNull` pointer, length, and capacity back
into a `Vec` with the `from_parts_in` function, allowing
the destructor to perform the cleanup.

# Examples

```rust
use std::alloc::System;

let mut v: Vec<i32, System> = Vec::new_in(System);
v.push(-1);
v.push(0);
v.push(1);

let (ptr, len, cap, alloc) = v.into_parts_with_allocator();

let rebuilt = unsafe {
    // We can now make changes to the components, such as
    // transmuting the raw pointer to a compatible type.
    let ptr = ptr.cast::<u32>();

    Vec::from_parts_in(ptr, len, cap, alloc)
};
assert_eq!(rebuilt, [4294967295, 0, 1]);
```

## Vec::capacity

```rust
pub const fn capacity(&self) -> usize
```

Returns the total number of elements the vector can hold without
reallocating.

# Examples

```rust
let mut vec: Vec<i32> = Vec::with_capacity(10);
vec.push(42);
assert!(vec.capacity() >= 10);
```

A vector with zero-sized elements will always have a capacity of usize::MAX:

```rust
#[derive(Clone)]
struct ZeroSized;

fn main() {
    assert_eq!(std::mem::size_of::<ZeroSized>(), 0);
    let v = vec![ZeroSized; 0];
    assert_eq!(v.capacity(), usize::MAX);
}
```

## Vec::reserve

```rust
pub fn reserve(&mut self, additional: usize)
```

Reserves capacity for at least `additional` more elements to be inserted
in the given `Vec<T>`. The collection may reserve more space to
speculatively avoid frequent reallocations. After calling `reserve`,
capacity will be greater than or equal to `self.len() + additional`.
Does nothing if capacity is already sufficient.

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

```rust
let mut vec = vec![1];
vec.reserve(10);
assert!(vec.capacity() >= 11);
```

## Vec::reserve_exact

```rust
pub fn reserve_exact(&mut self, additional: usize)
```

Reserves the minimum capacity for at least `additional` more elements to
be inserted in the given `Vec<T>`. Unlike `reserve`, this will not
deliberately over-allocate to speculatively avoid frequent allocations.
After calling `reserve_exact`, capacity will be greater than or equal to
`self.len() + additional`. Does nothing if the capacity is already
sufficient.

Note that the allocator may give the collection more space than it
requests. Therefore, capacity can not be relied upon to be precisely
minimal. Prefer `reserve` if future insertions are expected.

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

```rust
let mut vec = vec![1];
vec.reserve_exact(10);
assert!(vec.capacity() >= 11);
```

## Vec::try_reserve

```rust
pub fn try_reserve(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Tries to reserve capacity for at least `additional` more elements to be inserted
in the given `Vec<T>`. The collection may reserve more space to speculatively avoid
frequent reallocations. After calling `try_reserve`, capacity will be
greater than or equal to `self.len() + additional` if it returns
`Ok(())`. Does nothing if capacity is already sufficient. This method
preserves the contents even if an error occurs.

# Errors

If the capacity overflows, or the allocator reports a failure, then an error
is returned.

# Examples

```rust
use std::collections::TryReserveError;

fn process_data(data: &[u32]) -> Result<Vec<u32>, TryReserveError> {
    let mut output = Vec::new();

    // Pre-reserve the memory, exiting if we can't
    output.try_reserve(data.len())?;

    // Now we know this can't OOM in the middle of our complex work
    output.extend(data.iter().map(|&val| {
        val * 2 + 5 // very complicated
    }));

    Ok(output)
}
```

## Vec::try_reserve_exact

```rust
pub fn try_reserve_exact(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Tries to reserve the minimum capacity for at least `additional`
elements to be inserted in the given `Vec<T>`. Unlike `try_reserve`,
this will not deliberately over-allocate to speculatively avoid frequent
allocations. After calling `try_reserve_exact`, capacity will be greater
than or equal to `self.len() + additional` if it returns `Ok(())`.
Does nothing if the capacity is already sufficient.

Note that the allocator may give the collection more space than it
requests. Therefore, capacity can not be relied upon to be precisely
minimal. Prefer `try_reserve` if future insertions are expected.

# Errors

If the capacity overflows, or the allocator reports a failure, then an error
is returned.

# Examples

```rust
use std::collections::TryReserveError;

fn process_data(data: &[u32]) -> Result<Vec<u32>, TryReserveError> {
    let mut output = Vec::new();

    // Pre-reserve the memory, exiting if we can't
    output.try_reserve_exact(data.len())?;

    // Now we know this can't OOM in the middle of our complex work
    output.extend(data.iter().map(|&val| {
        val * 2 + 5 // very complicated
    }));

    Ok(output)
}
```

## Vec::shrink_to_fit

```rust
pub fn shrink_to_fit(&mut self)
```

Shrinks the capacity of the vector as much as possible.

The behavior of this method depends on the allocator, which may either shrink the vector
in-place or reallocate. The resulting vector might still have some excess capacity, just as
is the case for `with_capacity`. See `Allocator::shrink` for more details.

# Examples

```rust
let mut vec = Vec::with_capacity(10);
vec.extend([1, 2, 3]);
assert!(vec.capacity() >= 10);
vec.shrink_to_fit();
assert!(vec.capacity() >= 3);
```

## Vec::shrink_to

```rust
pub fn shrink_to(&mut self, min_capacity: usize)
```

Shrinks the capacity of the vector with a lower bound.

The capacity will remain at least as large as both the length
and the supplied value.

If the current capacity is less than the lower limit, this is a no-op.

# Examples

```rust
let mut vec = Vec::with_capacity(10);
vec.extend([1, 2, 3]);
assert!(vec.capacity() >= 10);
vec.shrink_to(4);
assert!(vec.capacity() >= 4);
vec.shrink_to(0);
assert!(vec.capacity() >= 3);
```

## Vec::into_boxed_slice

```rust
pub fn into_boxed_slice(mut self) -> Box<[T], A>
```

Converts the vector into `Box<[T]>`.

Before doing the conversion, this method discards excess capacity like `shrink_to_fit`.

# Examples

```rust
let v = vec![1, 2, 3];

let slice = v.into_boxed_slice();
```

Any excess capacity is removed:

```rust
let mut vec = Vec::with_capacity(10);
vec.extend([1, 2, 3]);

assert!(vec.capacity() >= 10);
let slice = vec.into_boxed_slice();
assert_eq!(slice.into_vec().capacity(), 3);
```

## Vec::truncate

```rust
pub fn truncate(&mut self, len: usize)
```

Shortens the vector, keeping the first `len` elements and dropping
the rest.

If `len` is greater or equal to the vector's current length, this has
no effect.

The `drain` method can emulate `truncate`, but causes the excess
elements to be returned instead of dropped.

Note that this method has no effect on the allocated capacity
of the vector.

# Examples

Truncating a five element vector to two elements:

```rust
let mut vec = vec![1, 2, 3, 4, 5];
vec.truncate(2);
assert_eq!(vec, [1, 2]);
```

No truncation occurs when `len` is greater than the vector's current
length:

```rust
let mut vec = vec![1, 2, 3];
vec.truncate(8);
assert_eq!(vec, [1, 2, 3]);
```

Truncating when `len == 0` is equivalent to calling the `clear`
method.

```rust
let mut vec = vec![1, 2, 3];
vec.truncate(0);
assert_eq!(vec, []);
```

## Vec::as_slice

```rust
pub const fn as_slice(&self) -> &[T]
```

Extracts a slice containing the entire vector.

Equivalent to `&s[..]`.

# Examples

```rust
use std::io::{self, Write};
let buffer = vec![1, 2, 3, 5, 8];
io::sink().write(buffer.as_slice()).unwrap();
```

## Vec::as_mut_slice

```rust
pub const fn as_mut_slice(&mut self) -> &mut [T]
```

Extracts a mutable slice of the entire vector.

Equivalent to `&mut s[..]`.

# Examples

```rust
use std::io::{self, Read};
let mut buffer = vec![0; 3];
io::repeat(0b101).read_exact(buffer.as_mut_slice()).unwrap();
```

## Vec::as_ptr

```rust
pub const fn as_ptr(&self) -> *const T
```

Returns a raw pointer to the vector's buffer, or a dangling raw pointer
valid for zero sized reads if the vector [didn't allocate].

The caller must ensure that the vector outlives the pointer this
function returns, or else it will end up dangling.
Modifying the vector may cause its buffer to be reallocated,
which would also make any pointers to it invalid.

The caller must also ensure that the memory the pointer (non-transitively) points to
is never written to (except inside an `UnsafeCell`) using this pointer or any pointer
derived from it. If you need to mutate the contents of the slice, use `as_mut_ptr`.

This method guarantees that for the purpose of the aliasing model, this method
does not materialize a reference to the underlying slice, and thus the returned pointer
will remain valid when mixed with other calls to `as_ptr`, `as_mut_ptr`,
and `as_non_null`.
Note that calling other methods that materialize mutable references to the slice,
or mutable references to specific elements you are planning on accessing through this pointer,
as well as writing to those elements, may still invalidate this pointer.
See the second example below for how this guarantee can be used.

# Examples

```rust
let x = vec![1, 2, 4];
let x_ptr = x.as_ptr();

unsafe {
    for i in 0..x.len() {
        assert_eq!(*x_ptr.add(i), 1 << i);
    }
}
```

Due to the aliasing guarantee, the following code is legal:

```rust
unsafe {
    let mut v = vec![0, 1, 2];
    let ptr1 = v.as_ptr();
    let _ = ptr1.read();
    let ptr2 = v.as_mut_ptr().offset(2);
    ptr2.write(2);
    // Notably, the write to `ptr2` did *not* invalidate `ptr1`
    // because it mutated a different element:
    let _ = ptr1.read();
}
```
