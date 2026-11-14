# alloc::vec

A contiguous growable array type with heap-allocated contents, written
`Vec<T>`.

Vectors have *O*(1) indexing, amortized *O*(1) push (to the end) and
*O*(1) pop (from the end).

Vectors ensure they never allocate more than `isize::MAX` bytes.

# Examples

You can explicitly create a [`Vec`] with [`Vec::new`]:

```
let v: Vec<i32> = Vec::new();
```

...or by using the [`vec!`] macro:

```
let v: Vec<i32> = vec![];

let v = vec![1, 2, 3, 4, 5];

let v = vec![0; 10]; // ten zeroes
```

You can [`push`] values onto the end of a vector (which will grow the vector
as needed):

```
let mut v = vec![1, 2];

v.push(3);
```

Popping values works in much the same way:

```
let mut v = vec![1, 2];

let two = v.pop();
```

Vectors also support indexing (through the [`Index`] and [`IndexMut`] traits):

```
let mut v = vec![1, 2, 3];
let three = v[2];
v[1] = v[1] + 5;
```

# Memory layout

A [`Vec`] conceptually consists of a raw pointer `ptr` to the start of the allocation, a
length `len`, a capacity `cap`, and an allocator `alloc`.
While the exact fields and their order are not specified, a [`Vec`] can be converted to and
from these parts using [`Vec::into_raw_parts_with_allocator`], [`Vec::from_raw_parts_in`],
[`Vec::into_raw_parts`], and [`Vec::from_raw_parts`], as well as their [`NonNull`]-based
versions.

The parts of a [`Vec`] have the following invariants:

* If [`size_of::<T>()`](size_of) and `cap` are non-zero, then:
  - `ptr` must point to the start of a memory block [*currently allocated*] via `alloc`.
  - [`Layout::array::<T>(cap)`] must [*fit*] the memory block of `ptr`. In particular,
    * `T` must have the same alignment as the [`Layout`] `ptr` was allocated with, and
    * `size_of::<T>() * cap` must be at least the size of the [`Layout`] `ptr` was
      allocated with, and at most the size of the allocation returned the allocator.
  - `size_of::<T>() * cap` must be at most [`isize::MAX`].
    See the safety documentation of [`pointer::offset`].
* If [`size_of::<T>()`](size_of) or `cap` is zero, then `ptr` must be any sufficiently aligned non-null pointer.

  NOTE: `ptr` will not be passed to the allocator for deallocation by the destructor of [`Vec`]
  in this case. Thus, it is unwise to use a pointer acquired from the allocator for this, as
  overallocated memory may end up being leaked. Use [`ptr::dangling`] instead.
* The following must always be satisfied:
  - `len` needs to be less than or equal to `cap`.
  - At `ptr`, there are at least `len` valid values of type `T`, laid out contiguously
    (like an array). These values are considered owned by the [`Vec`].

It is sound to create a [`Vec`] from parts that satisfy these invariants.

Conversely, the memory backing `ptr` obtained from [`Vec::as_mut_ptr`] or
[`Vec::into_raw_parts_with_allocator`]-like methods may be deallocated
using the allocator, with layout [`Layout::array::<T>(cap)`], provided
that [`size_of::<T>()`](size_of) or `cap` is non-zero.
To automatically handle the case where the allocation is zero-sized,
it is recommended to use [`Vec::from_raw_parts_in`], instead of manually
deallocating.

[*fit*]: crate::alloc::Allocator#memory-fitting
[*currently allocated*]: crate::alloc::Allocator#currently-allocated-memory
[`allocate`]: crate::alloc::Allocator::allocate
[`push`]: Vec::push
[`ptr::NonNull::dangling`]: NonNull::dangling
[`Layout`]: crate::alloc::Layout
[`Layout::array::<T>(cap)`]: crate::alloc::Layout::array

## struct Vec

```rust
pub struct Vec< T, #[stable(feature = "allocator_api", since = "1.100.0")] A: Allocator = Global, >
```

A contiguous growable array type, written as `Vec<T>`, short for 'vector'.

# Examples

```
let mut vec = Vec::new();
vec.push(1);
vec.push(2);

assert_eq!(vec.len(), 2);
assert_eq!(vec[0], 1);

assert_eq!(vec.pop(), Some(2));
assert_eq!(vec.len(), 1);

vec[0] = 7;
assert_eq!(vec[0], 7);

vec.extend([1, 2, 3]);

for x in &vec {
    println!("{x}");
}
assert_eq!(vec, [7, 1, 2, 3]);
```

The [`vec!`] macro is provided for convenient initialization:

```
let mut vec1 = vec![1, 2, 3];
vec1.push(4);
let vec2 = Vec::from([1, 2, 3, 4]);
assert_eq!(vec1, vec2);
```

It can also initialize each element of a `Vec<T>` with a given value.
This may be more efficient than performing allocation and initialization
in separate steps, especially when initializing a vector of zeros:

```
let vec = vec![0; 5];
assert_eq!(vec, [0, 0, 0, 0, 0]);

// The following is equivalent, but potentially slower:
let mut vec = Vec::with_capacity(5);
vec.resize(5, 0);
assert_eq!(vec, [0, 0, 0, 0, 0]);
```

For more information, see
[Capacity and Reallocation](#capacity-and-reallocation).

Use a `Vec<T>` as an efficient stack:

```
let mut stack = Vec::new();

stack.push(1);
stack.push(2);
stack.push(3);

while let Some(top) = stack.pop() {
    // Prints 3, 2, 1
    println!("{top}");
}
```

# Indexing

The `Vec` type allows access to values by index, because it implements the
[`Index`] trait. An example will be more explicit:

```
let v = vec![0, 2, 4, 6];
println!("{}", v[1]); // it will display '2'
```

However be careful: if you try to access an index which isn't in the `Vec`,
your software will panic! You cannot do this:

```should_panic
let v = vec![0, 2, 4, 6];
println!("{}", v[6]); // it will panic!
```

Use [`get`] and [`get_mut`] if you want to check whether the index is in
the `Vec`.

# Slicing

A `Vec` can be mutable. On the other hand, slices are read-only objects.
To get a [slice][prim@slice], use [`&`]. Example:

```
fn read_slice(slice: &[usize]) {
    // ...
}

let v = vec![0, 1];
read_slice(&v);

// ... and that's all!
// you can also do it like this:
let u: &[usize] = &v;
// or like this:
let u: &[_] = &v;
```

In Rust, it's more common to pass slices as arguments rather than vectors
when you just want to provide read access. The same goes for [`String`] and
[`&str`].

# Capacity and reallocation

The capacity of a vector is the amount of space allocated for any future
elements that will be added onto the vector. This is not to be confused with
the *length* of a vector, which specifies the number of actual elements
within the vector. If a vector's length exceeds its capacity, its capacity
will automatically be increased, but its elements will have to be
reallocated.

For example, a vector with capacity 10 and length 0 would be an empty vector
with space for 10 more elements. Pushing 10 or fewer elements onto the
vector will not change its capacity or cause reallocation to occur. However,
if the vector's length is increased to 11, it will have to reallocate, which
can be slow. For this reason, it is recommended to use [`Vec::with_capacity`]
whenever possible to specify how big the vector is expected to get.

# Guarantees

The following section is to be read as an addendum of the
[memory layout](self#memory-layout) section.

Due to its incredibly fundamental nature, `Vec` makes a lot of guarantees
about its design. This ensures that it's as low-overhead as possible in
the general case, and can be correctly manipulated in primitive ways
by unsafe code.

A vector containing the elements `'a'` and `'b'` with capacity 4 can be
visualized as below. The top part is the `Vec` struct, it contains a
pointer to the head of the allocation in the heap, length and capacity.
The bottom part is the allocation on the heap, a contiguous memory block.

```text
            ptr      len  capacity
       +--------+--------+--------+
       | 0x0123 |      2 |      4 |
       +--------+--------+--------+
            |
            v
Heap   +--------+--------+--------+--------+
       |    'a' |    'b' | uninit | uninit |
       +--------+--------+--------+--------+
```

- **uninit** represents memory that is not initialized, see [`MaybeUninit`].
- Note: the ABI is not stable and `Vec` makes no guarantees about its memory
  layout (including the order of fields).

`Vec` will never perform a "small optimization" where elements are actually
stored on the stack for two reasons:

* It would make it more difficult for unsafe code to correctly manipulate
  a `Vec`. The contents of a `Vec` wouldn't have a stable address if it were
  only moved, and it would be more difficult to determine if a `Vec` had
  actually allocated memory.

* It would penalize the general case, incurring an additional branch
  on every access.

`Vec` will never automatically shrink itself, even if completely empty. This
ensures no unnecessary allocations or deallocations occur. Emptying a `Vec`
and then filling it back up to the same [`len`] should incur no calls to
the allocator. If you wish to free up unused memory, use
[`shrink_to_fit`] or [`shrink_to`].

[`push`] and [`insert`] will never (re)allocate if the reported capacity is
sufficient. [`push`] and [`insert`] *will* (re)allocate if
<code>[len] == [capacity]</code>. That is, the reported capacity is completely
accurate, and can be relied on. It can even be used to manually free the memory
allocated by a `Vec` if desired. Bulk insertion methods *may* reallocate, even
when not necessary.

`Vec` does not guarantee any particular growth strategy when reallocating
when full, nor when [`reserve`] is called. The current strategy is basic
and it may prove desirable to use a non-constant growth factor. Whatever
strategy is used will of course guarantee *O*(1) amortized [`push`].

It is guaranteed, in order to respect the intentions of the programmer, that
all of `vec![e_1, e_2, ..., e_n]`, `vec![x; n]`, and [`Vec::with_capacity(n)`] produce a `Vec`
that requests an allocation of the exact size needed for precisely `n` elements from the allocator,
and no other size (such as, for example: a size rounded up to the nearest power of 2).
The allocator will return an allocation that is at least as large as requested, but it may be larger.

It is guaranteed that the [`Vec::capacity`] method returns a value that is at least the requested capacity
and not more than the allocated capacity.

The method [`Vec::shrink_to_fit`] will attempt to discard excess capacity an allocator has given to a `Vec`.
If <code>[len] == [capacity]</code>, then a `Vec<T>` can be converted
to and from a [`Box<[T]>`][owned slice] without reallocating or moving the elements.
`Vec` exploits this fact as much as reasonable when implementing common conversions
such as [`into_boxed_slice`].

`Vec` will not specifically overwrite any data that is removed from it,
but also won't specifically preserve it. Its uninitialized memory is
scratch space that it may use however it wants. It will generally just do
whatever is most efficient or otherwise easy to implement. Do not rely on
removed data to be erased for security purposes. Even if you drop a `Vec`, its
buffer may simply be reused by another allocation. Even if you zero a `Vec`'s memory
first, that might not actually happen because the optimizer does not consider
this a side-effect that must be preserved. There is one case which we will
not break, however: using `unsafe` code to write to the excess capacity,
and then increasing the length to match, is always valid.

Currently, `Vec` does not guarantee the order in which elements are dropped.
The order has changed in the past and may change again.

[`get`]: slice::get
[`get_mut`]: slice::get_mut
[`String`]: crate::string::String
[`&str`]: type@str
[`shrink_to_fit`]: Vec::shrink_to_fit
[`shrink_to`]: Vec::shrink_to
[capacity]: Vec::capacity
[`capacity`]: Vec::capacity
[`Vec::capacity`]: Vec::capacity
[size_of::\<T>]: size_of
[len]: Vec::len
[`len`]: Vec::len
[`push`]: Vec::push
[`insert`]: Vec::insert
[`reserve`]: Vec::reserve
[`Vec::with_capacity(n)`]: Vec::with_capacity
[`MaybeUninit`]: core::mem::MaybeUninit
[owned slice]: Box
[`into_boxed_slice`]: Vec::into_boxed_slice

## Vec::new

```rust
pub const fn new() -> Self
```

Constructs a new, empty `Vec<T>`.

The vector will not allocate until elements are pushed onto it.

# Examples

```
# #![allow(unused_mut)]
let mut vec: Vec<i32> = Vec::new();
```

## Vec::with_capacity

```rust
pub const fn with_capacity(capacity: usize) -> Self
```

Constructs a new, empty `Vec<T>` with at least the specified capacity.

The vector will be able to hold at least `capacity` elements without
reallocating. This method is allowed to allocate for more elements than
`capacity`. If `capacity` is zero, the vector [will not allocate].

It is important to note that although the returned vector has the
minimum *capacity* specified, the vector will have a zero *length*. For
an explanation of the difference between length and capacity, see
*[Capacity and reallocation]*.

If it is important to know the exact allocated capacity of a `Vec`,
always use the [`capacity`] method after construction.

For `Vec<T>` where `T` is a zero-sized type, the vector
[will not allocate], and the capacity will always be `usize::MAX`.

[Capacity and reallocation]: #capacity-and-reallocation
[`capacity`]: Vec::capacity
[will not allocate]: self#memory-layout

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

```
let mut vec = Vec::with_capacity(10);

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
let vec_units = Vec::<()>::with_capacity(10);
assert_eq!(vec_units.capacity(), usize::MAX);
```

## Vec::from_raw_parts

```rust
pub const unsafe fn from_raw_parts(ptr: *mut T, length: usize, capacity: usize) -> Self
```

Creates a `Vec<T>` directly from a pointer, a length, and a capacity.

# Safety

The parts must satisfy the invariants described in the [memory layout] section,
with allocator [`Global`].

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
[`slice::from_raw_parts`] instead.

The ownership of `ptr` is effectively transferred to the
`Vec<T>` which may then deallocate, reallocate or change the
contents of memory pointed to by the pointer at will. Ensure
that nothing else uses the pointer after calling this
function.

[`String`]: crate::string::String
[memory layout]: self#memory-layout

# Examples

```
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
with allocator [`Global`].

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
[`NonNull::slice_from_raw_parts`] instead.

The ownership of `ptr` is effectively transferred to the
`Vec<T>` which may then deallocate, reallocate or change the
contents of memory pointed to by the pointer at will. Ensure
that nothing else uses the pointer after calling this
function.

[`String`]: crate::string::String
[memory layout]: self#memory-layout

# Examples

```
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

```text
vec![f(0), f(1), f(2), …, f(length - 2), f(length - 1)]
```
and is similar to `(0..i).map(f)`, just for `Vec<T>`s not iterators.

If `length == 0`, this produces an empty `Vec<T>` without ever calling `f`.

# Example

```rust
let vec = Vec::from_fn(5, |i| i);

// indexes are:  0  1  2  3  4
assert_eq!(vec, [0, 1, 2, 3, 4]);

let vec2 = Vec::from_fn(8, |i| i * 2);

// indexes are:   0  1  2  3  4  5   6   7
assert_eq!(vec2, [0, 2, 4, 6, 8, 10, 12, 14]);

let bool_vec = Vec::from_fn(5, |i| i % 2 == 0);

// indexes are:       0     1      2     3      4
assert_eq!(bool_vec, [true, false, true, false, true]);
```

The `Vec<T>` is generated in ascending index order, starting from the front
and going towards the back, so you can use closures with mutable state:
```
let mut state = 1;
let a = Vec::from_fn(6, |_| { let x = state; state *= 2; x });

assert_eq!(a, [1, 2, 4, 8, 16, 32]);
```

## Vec::into_raw_parts

```rust
pub const fn into_raw_parts(self) -> (*mut T, usize, usize)
```

Decomposes a `Vec<T>` into its raw components: `(pointer, length, capacity)`.

Returns the raw pointer to the underlying data, the length of
the vector (in elements), and the allocated capacity of the
data (in elements). These are the same arguments in the same
order as the arguments to [`from_raw_parts`].

After calling this function, the caller is responsible for the
memory previously managed by the `Vec`. Most often, one does
this by converting the raw pointer, length, and capacity back
into a `Vec` with the [`from_raw_parts`] function; more generally,
if `T` is non-zero-sized and the capacity is nonzero, one may use
any method that calls [`dealloc`] with a layout of
`Layout::array::<T>(capacity)`; if `T` is zero-sized or the
capacity is zero, nothing needs to be done.

[`from_raw_parts`]: Vec::from_raw_parts
[`dealloc`]: crate::alloc::GlobalAlloc::dealloc

# Examples

```
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
order as the arguments to [`from_parts`].

After calling this function, the caller is responsible for the
memory previously managed by the `Vec`. The only way to do
this is to convert the `NonNull` pointer, length, and capacity back
into a `Vec` with the [`from_parts`] function, allowing
the destructor to perform the cleanup.

[`from_parts`]: Vec::from_parts

# Examples

```
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
always use the [`capacity`] method after construction.

For `Vec<T, A>` where `T` is a zero-sized type, the vector
[will not allocate], and the capacity will always be `usize::MAX`.

[Capacity and reallocation]: #capacity-and-reallocation
[`capacity`]: Vec::capacity
[will not allocate]: self#memory-layout

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

```
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

```
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

```
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

```
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

[`String`]: crate::string::String
[`allocate`]: crate::alloc::Allocator::allocate
[memory layout]: self#memory-layout

# Examples

```
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

[`String`]: crate::string::String
[`dealloc`]: crate::alloc::GlobalAlloc::dealloc
[memory layout]: self#memory-layout

# Examples

```
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
arguments in the same order as the arguments to [`from_raw_parts_in`].

After calling this function, the caller is responsible for the
memory previously managed by the `Vec`. The only way to do
this is to convert the raw pointer, length, and capacity back
into a `Vec` with the [`from_raw_parts_in`] function, allowing
the destructor to perform the cleanup.

[`from_raw_parts_in`]: Vec::from_raw_parts_in

# Examples

```
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
arguments in the same order as the arguments to [`from_parts_in`].

After calling this function, the caller is responsible for the
memory previously managed by the `Vec`. The only way to do
this is to convert the `NonNull` pointer, length, and capacity back
into a `Vec` with the [`from_parts_in`] function, allowing
the destructor to perform the cleanup.

[`from_parts_in`]: Vec::from_parts_in

# Examples

```
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

```
let mut vec: Vec<i32> = Vec::with_capacity(10);
vec.push(42);
assert!(vec.capacity() >= 10);
```

A vector with zero-sized elements will always have a capacity of usize::MAX:

```
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

```
let mut vec = vec![1];
vec.reserve(10);
assert!(vec.capacity() >= 11);
```

## Vec::reserve_exact

```rust
pub fn reserve_exact(&mut self, additional: usize)
```

Reserves the minimum capacity for at least `additional` more elements to
be inserted in the given `Vec<T>`. Unlike [`reserve`], this will not
deliberately over-allocate to speculatively avoid frequent allocations.
After calling `reserve_exact`, capacity will be greater than or equal to
`self.len() + additional`. Does nothing if the capacity is already
sufficient.

Note that the allocator may give the collection more space than it
requests. Therefore, capacity can not be relied upon to be precisely
minimal. Prefer [`reserve`] if future insertions are expected.

[`reserve`]: Vec::reserve

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

```
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

```
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
# process_data(&[1, 2, 3]).expect("this test needs 12 bytes, so it shouldn't fail");
```

## Vec::try_reserve_exact

```rust
pub fn try_reserve_exact(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Tries to reserve the minimum capacity for at least `additional`
elements to be inserted in the given `Vec<T>`. Unlike [`try_reserve`],
this will not deliberately over-allocate to speculatively avoid frequent
allocations. After calling `try_reserve_exact`, capacity will be greater
than or equal to `self.len() + additional` if it returns `Ok(())`.
Does nothing if the capacity is already sufficient.

Note that the allocator may give the collection more space than it
requests. Therefore, capacity can not be relied upon to be precisely
minimal. Prefer [`try_reserve`] if future insertions are expected.

[`try_reserve`]: Vec::try_reserve

# Errors

If the capacity overflows, or the allocator reports a failure, then an error
is returned.

# Examples

```
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
# process_data(&[1, 2, 3]).expect("this test needs 12 bytes, so it shouldn't fail");
```

## Vec::shrink_to_fit

```rust
pub fn shrink_to_fit(&mut self)
```

Shrinks the capacity of the vector as much as possible.

The behavior of this method depends on the allocator, which may either shrink the vector
in-place or reallocate. The resulting vector might still have some excess capacity, just as
is the case for [`with_capacity`]. See [`Allocator::shrink`] for more details.

[`with_capacity`]: Vec::with_capacity

# Examples

```
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

```
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

Converts the vector into [`Box<[T]>`][owned slice].

Before doing the conversion, this method discards excess capacity like [`shrink_to_fit`].

[owned slice]: Box
[`shrink_to_fit`]: Vec::shrink_to_fit

# Examples

```
let v = vec![1, 2, 3];

let slice = v.into_boxed_slice();
```

Any excess capacity is removed:

```
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

The [`drain`] method can emulate `truncate`, but causes the excess
elements to be returned instead of dropped.

Note that this method has no effect on the allocated capacity
of the vector.

# Examples

Truncating a five element vector to two elements:

```
let mut vec = vec![1, 2, 3, 4, 5];
vec.truncate(2);
assert_eq!(vec, [1, 2]);
```

No truncation occurs when `len` is greater than the vector's current
length:

```
let mut vec = vec![1, 2, 3];
vec.truncate(8);
assert_eq!(vec, [1, 2, 3]);
```

Truncating when `len == 0` is equivalent to calling the [`clear`]
method.

```
let mut vec = vec![1, 2, 3];
vec.truncate(0);
assert_eq!(vec, []);
```

[`clear`]: Vec::clear
[`drain`]: Vec::drain

## Vec::as_slice

```rust
pub const fn as_slice(&self) -> &[T]
```

Extracts a slice containing the entire vector.

Equivalent to `&s[..]`.

# Examples

```
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

```
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
derived from it. If you need to mutate the contents of the slice, use [`as_mut_ptr`].

This method guarantees that for the purpose of the aliasing model, this method
does not materialize a reference to the underlying slice, and thus the returned pointer
will remain valid when mixed with other calls to [`as_ptr`], [`as_mut_ptr`],
and [`as_non_null`].
Note that calling other methods that materialize mutable references to the slice,
or mutable references to specific elements you are planning on accessing through this pointer,
as well as writing to those elements, may still invalidate this pointer.
See the second example below for how this guarantee can be used.


# Examples

```
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

[`as_mut_ptr`]: Vec::as_mut_ptr
[`as_ptr`]: Vec::as_ptr
[`as_non_null`]: Vec::as_non_null
[didn't allocate]: self#memory-layout

## Vec::as_mut_ptr

```rust
pub const fn as_mut_ptr(&mut self) -> *mut T
```

Returns a raw mutable pointer to the vector's buffer, or a dangling
raw pointer valid for zero sized reads if the vector [didn't allocate].

The caller must ensure that the vector outlives the pointer this
function returns, or else it will end up dangling.
Modifying the vector may cause its buffer to be reallocated,
which would also make any pointers to it invalid.

This method guarantees that for the purpose of the aliasing model, this method
does not materialize a reference to the underlying slice, and thus the returned pointer
will remain valid when mixed with other calls to [`as_ptr`], [`as_mut_ptr`],
and [`as_non_null`].
Note that calling other methods that materialize references to the slice,
or references to specific elements you are planning on accessing through this pointer,
may still invalidate this pointer.
See the second example below for how this guarantee can be used.

The method also guarantees that, as long as `T` is not zero-sized and the capacity is
nonzero, the pointer may be passed into [`dealloc`] with a layout of
`Layout::array::<T>(capacity)` in order to deallocate the backing memory. If this is done,
be careful not to run the destructor of the `Vec`, as dropping it will result in
double-frees. Wrapping the `Vec` in a [`ManuallyDrop`] is the typical way to achieve this.

# Examples

```
// Allocate vector big enough for 4 elements.
let size = 4;
let mut x: Vec<i32> = Vec::with_capacity(size);
let x_ptr = x.as_mut_ptr();

// Initialize elements via raw pointer writes, then set length.
unsafe {
    for i in 0..size {
        *x_ptr.add(i) = i as i32;
    }
    x.set_len(size);
}
assert_eq!(&*x, &[0, 1, 2, 3]);
```

Due to the aliasing guarantee, the following code is legal:

```rust
unsafe {
    let mut v = vec![0];
    let ptr1 = v.as_mut_ptr();
    ptr1.write(1);
    let ptr2 = v.as_mut_ptr();
    ptr2.write(2);
    // Notably, the write to `ptr2` did *not* invalidate `ptr1`:
    ptr1.write(3);
}
```

Deallocating a vector using [`Box`] (which uses [`dealloc`] internally):

```
use std::mem::{ManuallyDrop, MaybeUninit};

let mut v = ManuallyDrop::new(vec![0, 1, 2]);
let ptr = v.as_mut_ptr();
let capacity = v.capacity();
let slice_ptr: *mut [MaybeUninit<i32>] =
    std::ptr::slice_from_raw_parts_mut(ptr.cast(), capacity);
drop(unsafe { Box::from_raw(slice_ptr) });
```

[`as_mut_ptr`]: Vec::as_mut_ptr
[`as_ptr`]: Vec::as_ptr
[`as_non_null`]: Vec::as_non_null
[`dealloc`]: crate::alloc::GlobalAlloc::dealloc
[`ManuallyDrop`]: core::mem::ManuallyDrop
[didn't allocate]: self#memory-layout

## Vec::allocator

```rust
pub const fn allocator(&self) -> &A
```

Returns a reference to the underlying allocator.

## Vec::set_len

```rust
pub const unsafe fn set_len(&mut self, new_len: usize)
```

Forces the length of the vector to `new_len`.

This is a low-level operation that maintains none of the normal
invariants of the type. Normally changing the length of a vector
is done using one of the safe operations instead, such as
[`truncate`], [`resize`], [`extend`], or [`clear`].

[`truncate`]: Vec::truncate
[`resize`]: Vec::resize
[`extend`]: Extend::extend
[`clear`]: Vec::clear

# Safety

- `new_len` must be less than or equal to [`capacity()`].
- The elements at `old_len..new_len` must be initialized.

[`capacity()`]: Vec::capacity

# Examples

See [`spare_capacity_mut()`] for an example with safe
initialization of capacity elements and use of this method.

`set_len()` can be useful for situations in which the vector
is serving as a buffer for other code, particularly over FFI:

```no_run
# #![allow(dead_code)]
# // This is just a minimal skeleton for the doc example;
# // don't use this as a starting point for a real library.
# pub struct StreamWrapper { strm: *mut std::ffi::c_void }
# const Z_OK: i32 = 0;
# unsafe extern "C" {
#     fn deflateGetDictionary(
#         strm: *mut std::ffi::c_void,
#         dictionary: *mut u8,
#         dictLength: *mut usize,
#     ) -> i32;
# }
# impl StreamWrapper {
pub fn get_dictionary(&self) -> Option<Vec<u8>> {
    // Per the FFI method's docs, "32768 bytes is always enough".
    let mut dict = Vec::with_capacity(32_768);
    let mut dict_length = 0;
    // SAFETY: When `deflateGetDictionary` returns `Z_OK`, it holds that:
    // 1. `dict_length` elements were initialized.
    // 2. `dict_length` <= the capacity (32_768)
    // which makes `set_len` safe to call.
    unsafe {
        // Make the FFI call...
        let r = deflateGetDictionary(self.strm, dict.as_mut_ptr(), &mut dict_length);
        if r == Z_OK {
            // ...and update the length to what was initialized.
            dict.set_len(dict_length);
            Some(dict)
        } else {
            None
        }
    }
}
# }
```

While the following example is sound, there is a memory leak since
the inner vectors were not freed prior to the `set_len` call:

```
let mut vec = vec![vec![1, 0, 0],
                   vec![0, 1, 0],
                   vec![0, 0, 1]];
// SAFETY:
// 1. `old_len..0` is empty so no elements need to be initialized.
// 2. `0 <= capacity` always holds whatever `capacity` is.
unsafe {
    vec.set_len(0);
#   // FIXME(https://github.com/rust-lang/miri/issues/3670):
#   // use -Zmiri-disable-leak-check instead of unleaking in tests meant to leak.
#   vec.set_len(3);
}
```

Normally, here, one would use [`clear`] instead to correctly drop
the contents and thus not leak memory.

[`spare_capacity_mut()`]: Vec::spare_capacity_mut

## Vec::swap_remove

```rust
pub fn swap_remove(&mut self, index: usize) -> T
```

Removes an element from the vector and returns it.

The removed element is replaced by the last element of the vector.

This does not preserve ordering of the remaining elements, but is *O*(1).
If you need to preserve the element order, use [`remove`] instead.

[`remove`]: Vec::remove

# Panics

Panics if `index` is out of bounds.

# Examples

```
let mut v = vec!["foo", "bar", "baz", "qux"];

assert_eq!(v.swap_remove(1), "bar");
assert_eq!(v, ["foo", "qux", "baz"]);

assert_eq!(v.swap_remove(0), "foo");
assert_eq!(v, ["baz", "qux"]);
```

## Vec::insert

```rust
pub fn insert(&mut self, index: usize, element: T)
```

Inserts an element at position `index` within the vector, shifting all
elements after it to the right.

# Panics

Panics if `index > len`.

# Examples

```
let mut vec = vec!['a', 'b', 'c'];
vec.insert(1, 'd');
assert_eq!(vec, ['a', 'd', 'b', 'c']);
vec.insert(4, 'e');
assert_eq!(vec, ['a', 'd', 'b', 'c', 'e']);
```

# Time complexity

Takes *O*([`Vec::len`]) time. All items after the insertion index must be
shifted to the right. In the worst case, all elements are shifted when
the insertion index is 0.

## Vec::insert_mut

```rust
pub fn insert_mut(&mut self, index: usize, element: T) -> &mut T
```

Inserts an element at position `index` within the vector, shifting all
elements after it to the right, and returning a reference to the new
element.

# Panics

Panics if `index > len`.

# Examples

```
let mut vec = vec![1, 3, 5, 9];
let x = vec.insert_mut(3, 6);
*x += 1;
assert_eq!(vec, [1, 3, 5, 7, 9]);
```

# Time complexity

Takes *O*([`Vec::len`]) time. All items after the insertion index must be
shifted to the right. In the worst case, all elements are shifted when
the insertion index is 0.

## Vec::remove

```rust
pub fn remove(&mut self, index: usize) -> T
```

Removes and returns the element at position `index` within the vector,
shifting all elements after it to the left.

Note: Because this shifts over the remaining elements, it has a
worst-case performance of *O*(*n*). If you don't need the order of elements
to be preserved, use [`swap_remove`] instead. If you'd like to remove
elements from the beginning of the `Vec`, consider using
[`VecDeque::pop_front`] instead.

[`swap_remove`]: Vec::swap_remove
[`VecDeque::pop_front`]: crate::collections::VecDeque::pop_front

# Panics

Panics if `index` is out of bounds.

# Examples

```
let mut v = vec!['a', 'b', 'c'];
assert_eq!(v.remove(1), 'b');
assert_eq!(v, ['a', 'c']);
```

## Vec::retain

```rust
pub fn retain<F>(&mut self, mut f: F) where F: FnMut(&T) -> bool,
```

Retains only the elements specified by the predicate.

In other words, remove all elements `e` for which `f(&e)` returns `false`.
This method operates in place, visiting each element exactly once in the
original order, and preserves the order of the retained elements.

# Examples

```
let mut vec = vec![1, 2, 3, 4];
vec.retain(|&x| x % 2 == 0);
assert_eq!(vec, [2, 4]);
```

Because the elements are visited exactly once in the original order,
external state may be used to decide which elements to keep.

```
let mut vec = vec![1, 2, 3, 4, 5];
let keep = [false, true, true, false, true];
let mut iter = keep.iter();
vec.retain(|_| *iter.next().unwrap());
assert_eq!(vec, [2, 3, 5]);
```

## Vec::retain_mut

```rust
pub fn retain_mut<F>(&mut self, mut f: F) where F: FnMut(&mut T) -> bool,
```

Retains only the elements specified by the predicate, passing a mutable reference to it.

In other words, remove all elements `e` such that `f(&mut e)` returns `false`.
This method operates in place, visiting each element exactly once in the
original order, and preserves the order of the retained elements.

# Examples

```
let mut vec = vec![1, 2, 3, 4];
vec.retain_mut(|x| if *x <= 3 {
    *x += 1;
    true
} else {
    false
});
assert_eq!(vec, [2, 3, 4]);
```

## Vec::dedup_by_key

```rust
pub fn dedup_by_key<F, K>(&mut self, mut key: F) where F: FnMut(&mut T) -> K, K: PartialEq,
```

Removes all but the first of consecutive elements in the vector that resolve to the same
key.

If the vector is sorted, this removes all duplicates.

# Examples

```
let mut vec = vec![10, 20, 21, 30, 20];

vec.dedup_by_key(|i| *i / 10);

assert_eq!(vec, [10, 20, 30, 20]);
```

## Vec::dedup_by

```rust
pub fn dedup_by<F>(&mut self, mut same_bucket: F) where F: FnMut(&mut T, &mut T) -> bool,
```

Removes all but the first of consecutive elements in the vector that are
"equal" according to the given predicate function.

The predicate `same_bucket(x, p)` is passed references to two elements.
If it returns `true`, the element `x` is removed from the vector.

The element `p` occurs *before* `x` in the vector (`[.., p, .., x, ..]`),
so `same_bucket(x, p)` is receiving them in reversed order (unlike [`windows`]).

If the vector is sorted, this removes all duplicates. For more complicated predicates
however, the order (ascending vs. descending) can matter.

[`windows`]: slice::windows

# Examples

```
let mut vec = vec!["foo", "bar", "Bar", "baz", "bar"];
vec.dedup_by(|x, p| x.eq_ignore_ascii_case(p));
assert_eq!(vec, ["foo", "bar", "baz", "bar"]);
```

Both references passed to `same_bucket` are mutable.
This allows merging elements by mutating `p` and returning `true`:

```
let mut ranges = vec![1..2, 2..4, 2..5, 8..9];

// Sort ranges by start, and if equal, by end (lexicographically)
// Sorting in reverse instead (`x.start.cmp(&p.start)...`) would later fail
ranges.sort_unstable_by(|p, x| p.start.cmp(&x.start).then(p.end.cmp(&x.end)));

// Merge touching (`1..2` and `2..4`) and then overlapping (`1..4` and `2..5`) ranges
ranges.dedup_by(|x, p| {
    if p.end >= x.start {
        p.end = p.end.max(x.end);
        true
    } else {
        false
    }
});

assert_eq!(ranges, [1..5, 8..9]);
```

## Vec::pop

```rust
pub fn pop(&mut self) -> Option<T>
```

Removes the last element from a vector and returns it, or [`None`] if it
is empty.

If you'd like to pop the first element, consider using
[`VecDeque::pop_front`] instead.

[`VecDeque::pop_front`]: crate::collections::VecDeque::pop_front

# Examples

```
let mut vec = vec![1, 2, 3];
assert_eq!(vec.pop(), Some(3));
assert_eq!(vec, [1, 2]);
```

# Time complexity

Takes *O*(1) time.

## Vec::pop_if

```rust
pub fn pop_if(&mut self, predicate: impl FnOnce(&mut T) -> bool) -> Option<T>
```

Removes and returns the last element from a vector if the predicate
returns `true`, or [`None`] if the predicate returns false or the vector
is empty (the predicate will not be called in that case).

# Examples

```
let mut vec = vec![1, 2, 3, 4];
let pred = |x: &mut i32| *x % 2 == 0;

assert_eq!(vec.pop_if(pred), Some(4));
assert_eq!(vec, [1, 2, 3]);
assert_eq!(vec.pop_if(pred), None);
```

## Vec::append

```rust
pub fn append(&mut self, other: &mut Self)
```

Moves all the elements of `other` into `self`, leaving `other` empty.

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

```
let mut vec = vec![1, 2, 3];
let mut vec2 = vec![4, 5, 6];
vec.append(&mut vec2);
assert_eq!(vec, [1, 2, 3, 4, 5, 6]);
assert_eq!(vec2, []);
```

## Vec::drain

```rust
pub fn drain<R>(&mut self, range: R) -> Drain<'_, T, A> where A: AllocatorNightly, R: RangeBounds<usize>,
```

Removes the subslice indicated by the given range from the vector,
returning a double-ended iterator over the removed subslice.

If the iterator is dropped before being fully consumed,
it drops the remaining removed elements.

The returned iterator keeps a mutable borrow on the vector to optimize
its implementation.

# Panics

Panics if the range has `start_bound > end_bound`, or, if the range is
bounded on either end and past the length of the vector.

# Leaking

If the returned iterator goes out of scope without being dropped (due to
[`mem::forget`], for example), the vector may have lost and leaked
elements arbitrarily, including elements outside the range.

# Examples

```
let mut v = vec![1, 2, 3];
let u: Vec<_> = v.drain(1..).collect();
assert_eq!(v, &[1]);
assert_eq!(u, &[2, 3]);

// A full range clears the vector, like `clear()` does
v.drain(..);
assert_eq!(v, &[]);
```

## Vec::clear

```rust
pub fn clear(&mut self)
```

Clears the vector, removing all values.

Note that this method has no effect on the allocated capacity
of the vector.

# Examples

```
let mut v = vec![1, 2, 3];

v.clear();

assert!(v.is_empty());
```

## Vec::len

```rust
pub const fn len(&self) -> usize
```

Returns the number of elements in the vector, also referred to
as its 'length'.

# Examples

```
let a = vec![1, 2, 3];
assert_eq!(a.len(), 3);
```

## Vec::is_empty

```rust
pub const fn is_empty(&self) -> bool
```

Returns `true` if the vector contains no elements.

# Examples

```
let mut v = Vec::new();
assert!(v.is_empty());

v.push(1);
assert!(!v.is_empty());
```

## Vec::split_off

```rust
pub fn split_off(&mut self, at: usize) -> Self where A: Clone,
```

Splits the collection into two at the given index.

Returns a newly allocated vector containing the elements in the range
`[at, len)`. After the call, the original vector will be left containing
the elements `[0, at)` with its previous capacity unchanged.

- If you want to take ownership of the entire contents and capacity of
  the vector, see [`mem::take`] or [`mem::replace`].
- If you don't need the returned vector at all, see [`Vec::truncate`].
- If you want to take ownership of an arbitrary subslice, or you don't
  necessarily want to store the removed items in a vector, see [`Vec::drain`].

# Panics

Panics if `at > len`.

# Examples

```
let mut vec = vec!['a', 'b', 'c'];
let vec2 = vec.split_off(1);
assert_eq!(vec, ['a']);
assert_eq!(vec2, ['b', 'c']);
```

## Vec::resize_with

```rust
pub fn resize_with<F>(&mut self, new_len: usize, f: F) where F: FnMut() -> T,
```

Resizes the `Vec` in-place so that `len` is equal to `new_len`.

If `new_len` is greater than `len`, the `Vec` is extended by the
difference, with each additional slot filled with the result of
calling the closure `f`. The return values from `f` will end up
in the `Vec` in the order they have been generated.

If `new_len` is less than `len`, the `Vec` is simply truncated.

This method uses a closure to create new values on every push. If
you'd rather [`Clone`] a given value, use [`Vec::resize`]. If you
want to use the [`Default`] trait to generate values, you can
pass [`Default::default`] as the second argument.

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

```
let mut vec = vec![1, 2, 3];
vec.resize_with(5, Default::default);
assert_eq!(vec, [1, 2, 3, 0, 0]);

let mut vec = vec![];
let mut p = 1;
vec.resize_with(4, || { p *= 2; p });
assert_eq!(vec, [2, 4, 8, 16]);
```

## Vec::leak

```rust
pub fn leak<'a>(self) -> &'a mut [T] where A: 'a,
```

Consumes and leaks the `Vec`, returning a mutable reference to the contents,
`&'a mut [T]`.

Note that the type `T` must outlive the chosen lifetime `'a`. If the type
has only static references, or none at all, then this may be chosen to be
`'static`.

As of Rust 1.57, this method does not reallocate or shrink the `Vec`,
so the leaked allocation may include unused capacity that is not part
of the returned slice.

This function is mainly useful for data that lives for the remainder of
the program's life. Dropping the returned reference will cause a memory
leak.

# Examples

Simple usage:

```
let x = vec![1, 2, 3];
let static_ref: &'static mut [usize] = x.leak();
static_ref[0] += 1;
assert_eq!(static_ref, &[2, 2, 3]);
# // FIXME(https://github.com/rust-lang/miri/issues/3670):
# // use -Zmiri-disable-leak-check instead of unleaking in tests meant to leak.
# drop(unsafe { Box::from_raw(static_ref) });
```

## Vec::spare_capacity_mut

```rust
pub const fn spare_capacity_mut(&mut self) -> &mut [MaybeUninit<T>]
```

Returns the remaining spare capacity of the vector as a slice of
`MaybeUninit<T>`.

The returned slice can be used to fill the vector with data (e.g. by
reading from a file) before marking the data as initialized using the
[`set_len`] method.

[`set_len`]: Vec::set_len

# Examples

```
// Allocate vector big enough for 10 elements.
let mut v = Vec::with_capacity(10);

// Fill in the first 3 elements.
let uninit = v.spare_capacity_mut();
uninit[0].write(0);
uninit[1].write(1);
uninit[2].write(2);

// Mark the first 3 elements of the vector as being initialized.
unsafe {
    v.set_len(3);
}

assert_eq!(&v, &[0, 1, 2]);
```

## Vec::resize

```rust
pub fn resize(&mut self, new_len: usize, value: T)
```

Resizes the `Vec` in-place so that `len` is equal to `new_len`.

If `new_len` is greater than `len`, the `Vec` is extended by the
difference, with each additional slot filled with `value`.
If `new_len` is less than `len`, the `Vec` is simply truncated.

This method requires `T` to implement [`Clone`],
in order to be able to clone the passed value.
If you need more flexibility (or want to rely on [`Default`] instead of
[`Clone`]), use [`Vec::resize_with`].
If you only need to resize to a smaller size, use [`Vec::truncate`].

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

```
let mut vec = vec!["hello"];
vec.resize(3, "world");
assert_eq!(vec, ["hello", "world", "world"]);

let mut vec = vec!['a', 'b', 'c', 'd'];
vec.resize(2, '_');
assert_eq!(vec, ['a', 'b']);
```

## Vec::extend_from_slice

```rust
pub fn extend_from_slice(&mut self, other: &[T])
```

Clones and appends all elements in a slice to the `Vec`.

Iterates over the slice `other`, clones each element, and then appends
it to this `Vec`. The `other` slice is traversed in-order.

Note that this function is the same as [`extend`],
except that it also works with slice elements that are Clone but not Copy.
If Rust gets specialization this function may be deprecated.

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

```
let mut vec = vec![1];
vec.extend_from_slice(&[2, 3, 4]);
assert_eq!(vec, [1, 2, 3, 4]);
```

[`extend`]: Vec::extend

## Vec::extend_from_within

```rust
pub fn extend_from_within<R>(&mut self, src: R) where R: RangeBounds<usize>,
```

Given a range `src`, clones a slice of elements in that range and appends it to the end.

`src` must be a range that can form a valid subslice of the `Vec`.

# Panics

Panics if starting index is greater than the end index, if the index is
greater than the length of the vector, or if the new capacity exceeds
`isize::MAX` _bytes_.

# Examples

```
let mut characters = vec!['a', 'b', 'c', 'd', 'e'];
characters.extend_from_within(2..);
assert_eq!(characters, ['a', 'b', 'c', 'd', 'e', 'c', 'd', 'e']);

let mut numbers = vec![0, 1, 2, 3, 4];
numbers.extend_from_within(..2);
assert_eq!(numbers, [0, 1, 2, 3, 4, 0, 1]);

let mut strings = vec![String::from("hello"), String::from("world"), String::from("!")];
strings.extend_from_within(1..=2);
assert_eq!(strings, ["hello", "world", "!", "world", "!"]);
```

## Vec::into_flattened

```rust
pub fn into_flattened(self) -> Vec<T, A>
```

Takes a `Vec<[T; N]>` and flattens it into a `Vec<T>`.

# Panics

Panics if the length of the resulting vector would overflow a `usize`.

This is only possible when flattening a vector of arrays of zero-sized
types, and thus tends to be irrelevant in practice. If
`size_of::<T>() > 0`, this will never panic.

# Examples

```
let mut vec = vec![[1, 2, 3], [4, 5, 6], [7, 8, 9]];
assert_eq!(vec.pop(), Some([7, 8, 9]));

let mut flattened = vec.into_flattened();
assert_eq!(flattened.pop(), Some(6));
```

## Vec::dedup

```rust
pub fn dedup(&mut self)
```

Removes consecutive repeated elements in the vector according to the
[`PartialEq`] trait implementation.

If the vector is sorted, this removes all duplicates.

# Examples

```
let mut vec = vec![1, 2, 2, 3, 2];

vec.dedup();

assert_eq!(vec, [1, 2, 3, 2]);
```

## Vec::splice

```rust
pub fn splice<R, I>(&mut self, range: R, replace_with: I) -> Splice<'_, I::IntoIter, A> where A: AllocatorNightly, R: RangeBounds<usize>, I: IntoIterator<Item = T>,
```

Creates a splicing iterator that replaces the specified range in the vector
with the given `replace_with` iterator and yields the removed items.
`replace_with` does not need to be the same length as `range`.

`range` is removed even if the `Splice` iterator is not consumed before it is dropped.

It is unspecified how many elements are removed from the vector
if the `Splice` value is leaked.

The input iterator `replace_with` is only consumed when the `Splice` value is dropped.

This is optimal if:

* The tail (elements in the vector after `range`) is empty,
* or `replace_with` yields fewer or equal elements than `range`'s length
* or the lower bound of its `size_hint()` is exact.

Otherwise, a temporary vector is allocated and the tail is moved twice.

# Panics

Panics if the range has `start_bound > end_bound`, or, if the range is
bounded on either end and past the length of the vector.

# Examples

```
let mut v = vec![1, 2, 3, 4];
let new = [7, 8, 9];
let u: Vec<_> = v.splice(1..3, new).collect();
assert_eq!(v, [1, 7, 8, 9, 4]);
assert_eq!(u, [2, 3]);
```

Using `splice` to insert new items into a vector efficiently at a specific position
indicated by an empty range:

```
let mut v = vec![1, 5];
let new = [2, 3, 4];
v.splice(1..1, new);
assert_eq!(v, [1, 2, 3, 4, 5]);
```

## Vec::extract_if

```rust
pub fn extract_if<F, R>(&mut self, range: R, filter: F) -> ExtractIf<'_, T, F, A> where A: AllocatorNightly, F: FnMut(&mut T) -> bool, R: RangeBounds<usize>,
```

Creates an iterator which uses a closure to determine if an element in the range should be removed.

If the closure returns `true`, the element is removed from the vector
and yielded. If the closure returns `false`, or panics, the element
remains in the vector and will not be yielded.

Only elements that fall in the provided range are considered for extraction, but any elements
after the range will still have to be moved if any element has been extracted.

If the returned `ExtractIf` is not exhausted, e.g. because it is dropped without iterating
or the iteration short-circuits, then the remaining elements will be retained.
Use `extract_if().for_each(drop)` if you do not need the returned iterator,
or [`retain_mut`] with a negated predicate if you also do not need to restrict the range.

[`retain_mut`]: Vec::retain_mut

Using this method is equivalent to the following code:

```
# let some_predicate = |x: &mut i32| { *x % 2 == 1 };
# let mut vec = vec![0, 1, 2, 3, 4, 5, 6];
# let mut vec2 = vec.clone();
# let range = 1..5;
let mut i = range.start;
let end_items = vec.len() - range.end;
# let mut extracted = vec![];

while i < vec.len() - end_items {
    if some_predicate(&mut vec[i]) {
        let val = vec.remove(i);
        // your code here
#         extracted.push(val);
    } else {
        i += 1;
    }
}

# let extracted2: Vec<_> = vec2.extract_if(range, some_predicate).collect();
# assert_eq!(vec, vec2);
# assert_eq!(extracted, extracted2);
```

But `extract_if` is easier to use. `extract_if` is also more efficient,
because it can backshift the elements of the array in bulk.

The iterator also lets you mutate the value of each element in the
closure, regardless of whether you choose to keep or remove it.

# Panics

If `range` is out of bounds.

# Examples

Splitting a vector into even and odd values, reusing the original vector:

```
let mut numbers = vec![1, 2, 3, 4, 5, 6, 8, 9, 11, 13, 14, 15];

let evens = numbers.extract_if(.., |x| *x % 2 == 0).collect::<Vec<_>>();
let odds = numbers;

assert_eq!(evens, vec![2, 4, 6, 8, 14]);
assert_eq!(odds, vec![1, 3, 5, 9, 11, 13, 15]);
```

Using the range argument to only process a part of the vector:

```
let mut items = vec![0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2];
let ones = items.extract_if(7.., |x| *x == 1).collect::<Vec<_>>();
assert_eq!(items, vec![0, 0, 0, 0, 0, 0, 0, 2, 2, 2]);
assert_eq!(ones.len(), 3);
```