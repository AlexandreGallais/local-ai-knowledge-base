---
title: "alloc::vec (part 2 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/vec/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::vec (part 2 of 5)

## Vec::from_raw_parts

```rust
pub const unsafe fn from_raw_parts(ptr: *mut T, length: usize, capacity: usize) -> Self
```

Creates a `Vec<T>` directly from a pointer, a length, and a capacity.

# Safety

The parts must satisfy the invariants described in the [memory layout] section,
with allocator `Global`.

Violating them may cause problems like corrupting the allocator's
internal data structures. For example it is normally **not** safe
to build a `Vec<u8>` from a pointer to a C `char` array with length
`size_t`, doing so is only safe if the array was initially allocated by
a `Vec` or `String`.
It's also not safe to build one from a `Vec<u16>` and its length, because
the allocator cares about the alignment, and these two types have different
alignments. The buffer was allocated with alignment 2 (for `u16`), but after
turning it into a `Vec<u8>` it'll be deallocated with alignment 1. To avoid
these issues, it is often preferable to do casting/transmuting using
`slice::from_raw_parts` instead.

The ownership of `ptr` is effectively transferred to the
`Vec<T>` which may then deallocate, reallocate or change the
contents of memory pointed to by the pointer at will. Ensure
that nothing else uses the pointer after calling this
function.

# Examples

```rust
use std::ptr;

let v = vec![1, 2, 3];

// Deconstruct the vector into parts.
let (p, len, cap) = v.into_raw_parts();

unsafe {
    // Overwrite memory with 4, 5, 6
    for i in 0..len {
        ptr::write(p.add(i), 4 + i);
    }

    // Put everything back together into a Vec
    let rebuilt = Vec::from_raw_parts(p, len, cap);
    assert_eq!(rebuilt, [4, 5, 6]);
}
```

Using memory that was allocated elsewhere:

```rust
use std::alloc::{alloc, Layout};

fn main() {
    let layout = Layout::array::<u32>(16).expect("16 u32s take 64 bytes, so it shouldn't overflow");

    let vec = unsafe {
        let mem = alloc(layout).cast::<u32>();
        if mem.is_null() {
            return;
        }

        mem.write(1_000_000);

        Vec::from_raw_parts(mem, 1, 16)
    };

    assert_eq!(vec, &[1_000_000]);
    assert_eq!(vec.capacity(), 16);
}
```

## Vec::from_parts

```rust
pub const unsafe fn from_parts(ptr: NonNull<T>, length: usize, capacity: usize) -> Self
```

Creates a `Vec<T>` directly from a `NonNull` pointer, a length, and a capacity.

# Safety

The parts must satisfy the invariants described in the [memory layout] section,
with allocator `Global`.

Violating them may cause problems like corrupting the allocator's
internal data structures. For example it is normally **not** safe
to build a `Vec<u8>` from a pointer to a C `char` array with length
`size_t`, doing so is only safe if the array was initially allocated by
a `Vec` or `String`.
It's also not safe to build one from a `Vec<u16>` and its length, because
the allocator cares about the alignment, and these two types have different
alignments. The buffer was allocated with alignment 2 (for `u16`), but after
turning it into a `Vec<u8>` it'll be deallocated with alignment 1. To avoid
these issues, it is often preferable to do casting/transmuting using
`NonNull::slice_from_raw_parts` instead.

The ownership of `ptr` is effectively transferred to the
`Vec<T>` which may then deallocate, reallocate or change the
contents of memory pointed to by the pointer at will. Ensure
that nothing else uses the pointer after calling this
function.

# Examples

```rust
let v = vec![1, 2, 3];

// Deconstruct the vector into parts.
let (p, len, cap) = v.into_parts();

unsafe {
    // Overwrite memory with 4, 5, 6
    for i in 0..len {
        p.add(i).write(4 + i);
    }

    // Put everything back together into a Vec
    let rebuilt = Vec::from_parts(p, len, cap);
    assert_eq!(rebuilt, [4, 5, 6]);
}
```

Using memory that was allocated elsewhere:

```rust
use std::alloc::{alloc, Layout};
use std::ptr::NonNull;

fn main() {
    let layout = Layout::array::<u32>(16).expect("16 u32s take 64 bytes, so it shouldn't overflow");

    let vec = unsafe {
        let Some(mem) = NonNull::new(alloc(layout).cast::<u32>()) else {
            return;
        };

        mem.write(1_000_000);

        Vec::from_parts(mem, 1, 16)
    };

    assert_eq!(vec, &[1_000_000]);
    assert_eq!(vec.capacity(), 16);
}
```

## Vec::from_fn

```rust
pub fn from_fn<F>(length: usize, f: F) -> Self where F: FnMut(usize) -> T,
```

Creates a `Vec<T>` where each element is produced by calling `f` with
that element's index while walking forward through the `Vec<T>`.

This is essentially the same as writing

```
vec![f(0), f(1), f(2), …, f(length - 2), f(length - 1)]
```rust
and is similar to `(0..i).map(f)`, just for `Vec<T>`s not iterators.

If `length == 0`, this produces an empty `Vec<T>` without ever calling `f`.

```
let vec = Vec::from_fn(5, |i| i);

// indexes are:  0  1  2  3  4
assert_eq!(vec, [0, 1, 2, 3, 4]);

let vec2 = Vec::from_fn(8, |i| i * 2);

// indexes are:   0  1  2  3  4  5   6   7
assert_eq!(vec2, [0, 2, 4, 6, 8, 10, 12, 14]);

let bool_vec = Vec::from_fn(5, |i| i % 2 == 0);

// indexes are:       0     1      2     3      4
assert_eq!(bool_vec, [true, false, true, false, true]);
```rust

The `Vec<T>` is generated in ascending index order, starting from the front
and going towards the back, so you can use closures with mutable state:
```
let mut state = 1;
let a = Vec::from_fn(6, |_| { let x = state; state *= 2; x });

assert_eq!(a, [1, 2, 4, 8, 16, 32]);
```rust

## Vec::into_raw_parts

```rust
pub const fn into_raw_parts(self) -> (*mut T, usize, usize)
```

Decomposes a `Vec<T>` into its raw components: `(pointer, length, capacity)`.

Returns the raw pointer to the underlying data, the length of
the vector (in elements), and the allocated capacity of the
data (in elements). These are the same arguments in the same
order as the arguments to `from_raw_parts`.

After calling this function, the caller is responsible for the
memory previously managed by the `Vec`. Most often, one does
this by converting the raw pointer, length, and capacity back
into a `Vec` with the `from_raw_parts` function; more generally,
if `T` is non-zero-sized and the capacity is nonzero, one may use
any method that calls `dealloc` with a layout of
`Layout::array::<T>(capacity)`; if `T` is zero-sized or the
capacity is zero, nothing needs to be done.

# Examples

```rust
let v: Vec<i32> = vec![-1, 0, 1];

let (ptr, len, cap) = v.into_raw_parts();

let rebuilt = unsafe {
    // We can now make changes to the components, such as
    // transmuting the raw pointer to a compatible type.
    let ptr = ptr as *mut u32;

    Vec::from_raw_parts(ptr, len, cap)
};
assert_eq!(rebuilt, [4294967295, 0, 1]);
```

## Vec::into_parts

```rust
pub const fn into_parts(self) -> (NonNull<T>, usize, usize)
```

Decomposes a `Vec<T>` into its raw components: `(NonNull pointer, length, capacity)`.

Returns the `NonNull` pointer to the underlying data, the length of
the vector (in elements), and the allocated capacity of the
data (in elements). These are the same arguments in the same
order as the arguments to `from_parts`.

After calling this function, the caller is responsible for the
memory previously managed by the `Vec`. The only way to do
this is to convert the `NonNull` pointer, length, and capacity back
into a `Vec` with the `from_parts` function, allowing
the destructor to perform the cleanup.

# Examples

```rust
let v: Vec<i32> = vec![-1, 0, 1];

let (ptr, len, cap) = v.into_parts();

let rebuilt = unsafe {
    // We can now make changes to the components, such as
    // transmuting the raw pointer to a compatible type.
    let ptr = ptr.cast::<u32>();

    Vec::from_parts(ptr, len, cap)
};
assert_eq!(rebuilt, [4294967295, 0, 1]);
```

## Vec::with_capacity_in

```rust
pub fn with_capacity_in(capacity: usize, alloc: A) -> Self
```

Constructs a new, empty `Vec<T, A>` with at least the specified capacity
with the provided allocator.

The vector will be able to hold at least `capacity` elements without
reallocating. This method is allowed to allocate for more elements than
`capacity`. If `capacity` is zero, the vector [will not allocate].

It is important to note that although the returned vector has the
minimum *capacity* specified, the vector will have a zero *length*. For
an explanation of the difference between length and capacity, see
*[Capacity and reallocation]*.

If it is important to know the exact allocated capacity of a `Vec`,
always use the `capacity` method after construction.

For `Vec<T, A>` where `T` is a zero-sized type, the vector
[will not allocate], and the capacity will always be `usize::MAX`.

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

```rust
use std::alloc::System;

let mut vec = Vec::with_capacity_in(10, System);

// The vector contains no items, even though it has capacity for more
assert_eq!(vec.len(), 0);
assert!(vec.capacity() >= 10);

// These are all done without reallocating...
for i in 0..10 {
    vec.push(i);
}
assert_eq!(vec.len(), 10);
assert!(vec.capacity() >= 10);

// ...but this may make the vector reallocate
vec.push(11);
assert_eq!(vec.len(), 11);
assert!(vec.capacity() >= 11);

// A vector of a zero-sized type will always over-allocate, since no
// allocation is necessary
let vec_units = Vec::<(), System>::with_capacity_in(10, System);
assert_eq!(vec_units.capacity(), usize::MAX);
```

## Vec::push

```rust
pub fn push(&mut self, value: T)
```

Appends an element to the back of a collection.

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

```rust
let mut vec = vec![1, 2];
vec.push(3);
assert_eq!(vec, [1, 2, 3]);
```

# Time complexity

Takes amortized *O*(1) time. If the vector's length would exceed its
capacity after the push, *O*(*capacity*) time is taken to copy the
vector's elements to a larger allocation. This expensive operation is
offset by the *capacity* *O*(1) insertions it allows.

## Vec::push_mut

```rust
pub fn push_mut(&mut self, value: T) -> &mut T
```

Appends an element to the back of a collection, returning a reference to it.

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

```rust
let mut vec = vec![1, 2];
let last = vec.push_mut(3);
assert_eq!(*last, 3);
assert_eq!(vec, [1, 2, 3]);

let last = vec.push_mut(3);
*last += 1;
assert_eq!(vec, [1, 2, 3, 4]);
```

# Time complexity

Takes amortized *O*(1) time. If the vector's length would exceed its
capacity after the push, *O*(*capacity*) time is taken to copy the
vector's elements to a larger allocation. This expensive operation is
offset by the *capacity* *O*(1) insertions it allows.

## Vec::new_in

```rust
pub const fn new_in(alloc: A) -> Self
```

Constructs a new, empty `Vec<T, A>`.

The vector will not allocate until elements are pushed onto it.

# Examples

```rust
use std::alloc::System;

let vec: Vec<i32, System> = Vec::new_in(System);
```

## Vec::from_raw_parts_in

```rust
pub const unsafe fn from_raw_parts_in( ptr: *mut T, length: usize, capacity: usize, alloc: A, ) -> Self
```

Creates a `Vec<T, A>` directly from a pointer, a length, a capacity,
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

use std::ptr;

let mut v = Vec::with_capacity_in(3, System);
v.push(1);
v.push(2);
v.push(3);

// Deconstruct the vector into parts.
let (p, len, cap, alloc) = v.into_raw_parts_with_allocator();

unsafe {
    // Overwrite memory with 4, 5, 6
    for i in 0..len {
        ptr::write(p.add(i), 4 + i);
    }

    // Put everything back together into a Vec
    let rebuilt = Vec::from_raw_parts_in(p, len, cap, alloc.clone());
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
            Ok(mem) => mem.cast::<u32>().as_ptr(),
            Err(AllocError) => return,
        };

        mem.write(1_000_000);

        Vec::from_raw_parts_in(mem, 1, 16, Global)
    };

    assert_eq!(vec, &[1_000_000]);
    assert_eq!(vec.capacity(), 16);
}
```
