---
title: "alloc::vec (part 1 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/vec/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::vec

A contiguous growable array type with heap-allocated contents, written
`Vec<T>`.

Vectors have *O*(1) indexing, amortized *O*(1) push (to the end) and
*O*(1) pop (from the end).

Vectors ensure they never allocate more than `isize::MAX` bytes.

#### Examples

You can explicitly create a `Vec` with `Vec::new`:

```rust
let v: Vec<i32> = Vec::new();
```

...or by using the `vec!` macro:

```rust
let v: Vec<i32> = vec![];

let v = vec![1, 2, 3, 4, 5];

let v = vec![0; 10]; // ten zeroes
```

You can `push` values onto the end of a vector (which will grow the vector
as needed):

```rust
let mut v = vec![1, 2];

v.push(3);
```

Popping values works in much the same way:

```rust
let mut v = vec![1, 2];

let two = v.pop();
```

Vectors also support indexing (through the `Index` and `IndexMut` traits):

```rust
let mut v = vec![1, 2, 3];
let three = v[2];
v[1] = v[1] + 5;
```

#### Memory layout

A `Vec` conceptually consists of a raw pointer `ptr` to the start of the allocation, a
length `len`, a capacity `cap`, and an allocator `alloc`.
While the exact fields and their order are not specified, a `Vec` can be converted to and
from these parts using `Vec::into_raw_parts_with_allocator`, `Vec::from_raw_parts_in`,
`Vec::into_raw_parts`, and `Vec::from_raw_parts`, as well as their `NonNull`-based
versions.

The parts of a `Vec` have the following invariants:

* If `size_of::<T>()` and `cap` are non-zero, then:
  - `ptr` must point to the start of a memory block [*currently allocated*] via `alloc`.
  - `Layout::array::<T>(cap)` must [*fit*] the memory block of `ptr`. In particular,
    * `T` must have the same alignment as the `Layout` `ptr` was allocated with, and
    * `size_of::<T>() * cap` must be at least the size of the `Layout` `ptr` was
      allocated with, and at most the size of the allocation returned the allocator.
  - `size_of::<T>() * cap` must be at most `isize::MAX`.
    See the safety documentation of `pointer::offset`.
* If `size_of::<T>()` or `cap` is zero, then `ptr` must be any sufficiently aligned non-null pointer.

  NOTE: `ptr` will not be passed to the allocator for deallocation by the destructor of `Vec`
  in this case. Thus, it is unwise to use a pointer acquired from the allocator for this, as
  overallocated memory may end up being leaked. Use `ptr::dangling` instead.
* The following must always be satisfied:
  - `len` needs to be less than or equal to `cap`.
  - At `ptr`, there are at least `len` valid values of type `T`, laid out contiguously
    (like an array). These values are considered owned by the `Vec`.

It is sound to create a `Vec` from parts that satisfy these invariants.

Conversely, the memory backing `ptr` obtained from `Vec::as_mut_ptr` or
`Vec::into_raw_parts_with_allocator`-like methods may be deallocated
using the allocator, with layout `Layout::array::<T>(cap)`, provided
that `size_of::<T>()` or `cap` is non-zero.
To automatically handle the case where the allocation is zero-sized,
it is recommended to use `Vec::from_raw_parts_in`, instead of manually
deallocating.

## struct Vec

```rust
pub struct Vec< T, #[stable(feature = "allocator_api", since = "1.100.0")] A: Allocator = Global, >
```

A contiguous growable array type, written as `Vec<T>`, short for 'vector'.

# Examples

```rust
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

The `vec!` macro is provided for convenient initialization:

```rust
let mut vec1 = vec![1, 2, 3];
vec1.push(4);
let vec2 = Vec::from([1, 2, 3, 4]);
assert_eq!(vec1, vec2);
```

It can also initialize each element of a `Vec<T>` with a given value.
This may be more efficient than performing allocation and initialization
in separate steps, especially when initializing a vector of zeros:

```rust
let vec = vec![0; 5];
assert_eq!(vec, [0, 0, 0, 0, 0]);

// The following is equivalent, but potentially slower:
let mut vec = Vec::with_capacity(5);
vec.resize(5, 0);
assert_eq!(vec, [0, 0, 0, 0, 0]);
```

For more information, see
Capacity and Reallocation.

Use a `Vec<T>` as an efficient stack:

```rust
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
`Index` trait. An example will be more explicit:

```rust
let v = vec![0, 2, 4, 6];
println!("{}", v[1]); // it will display '2'
```

However be careful: if you try to access an index which isn't in the `Vec`,
your software will panic! You cannot do this:

```rust
let v = vec![0, 2, 4, 6];
println!("{}", v[6]); // it will panic!
```

Use `get` and `get_mut` if you want to check whether the index is in
the `Vec`.

# Slicing

A `Vec` can be mutable. On the other hand, slices are read-only objects.
To get a slice, use `&`. Example:

```rust
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

In Rust, it's more common to pass <example-value> as arguments rather than vectors
when you just want to provide read access. The same goes for `String` and
`&str`.

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
can be slow. For this reason, it is recommended to use `Vec::with_capacity`
whenever possible to specify how big the vector is expected to get.

# Guarantees

The following section is to be read as an addendum of the
memory layout section.

Due to its incredibly fundamental nature, `Vec` makes a lot of guarantees
about its design. This ensures that it's as low-overhead as possible in
the general case, and can be correctly manipulated in primitive ways
by unsafe code.

A vector containing the elements `'a'` and `'b'` with capacity 4 can be
visualized as below. The top part is the `Vec` struct, it contains a
pointer to the head of the allocation in the heap, length and capacity.
The bottom part is the allocation on the heap, a contiguous memory block.

```
            ptr      len  capacity
       +--------+--------+--------+
       | 0x0123 |      2 |      4 |
       +--------+--------+--------+
            |
            v
Heap   +--------+--------+--------+--------+
       |    'a' |    'b' | uninit | uninit |
       +--------+--------+--------+--------+
```rust

- **uninit** represents memory that is not initialized, see `MaybeUninit`.
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
and then filling it back up to the same `len` should incur no calls to
the allocator. If you wish to free up unused memory, use
`shrink_to_fit` or `shrink_to`.

`push` and `insert` will never (re)allocate if the reported capacity is
sufficient. `push` and `insert` *will* (re)allocate if
<code>[len] == [capacity]</code>. That is, the reported capacity is completely
accurate, and can be relied on. It can even be used to manually free the memory
allocated by a `Vec` if desired. Bulk insertion methods *may* reallocate, even
when not necessary.

`Vec` does not guarantee any particular growth strategy when reallocating
when full, nor when `reserve` is called. The current strategy is basic
and it may prove desirable to use a non-constant growth factor. Whatever
strategy is used will of course guarantee *O*(1) amortized `push`.

It is guaranteed, in order to respect the intentions of the programmer, that
all of `vec![e_1, e_2, ..., e_n]`, `vec![x; n]`, and `Vec::with_capacity(n)` produce a `Vec`
that requests an allocation of the exact size needed for precisely `n` elements from the allocator,
and no other size (such as, for example: a size rounded up to the nearest power of 2).
The allocator will return an allocation that is at least as large as requested, but it may be larger.

It is guaranteed that the `Vec::capacity` method returns a value that is at least the requested capacity
and not more than the allocated capacity.

The method `Vec::shrink_to_fit` will attempt to discard excess capacity an allocator has given to a `Vec`.
If <code>[len] == [capacity]</code>, then a `Vec<T>` can be converted
to and from a [`Box<[T]>`][owned slice] without reallocating or moving the elements.
`Vec` exploits this fact as much as reasonable when implementing common conversions
such as `into_boxed_slice`.

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

`get`: slice::get
`get_mut`: slice::get_mut
`String`: crate::string::String
`&str`: type@str
`shrink_to_fit`: Vec::shrink_to_fit
`shrink_to`: Vec::shrink_to
[capacity]: Vec::capacity
`capacity`: Vec::capacity
`Vec::capacity`: Vec::capacity
[size_of::\<T>]: size_of
[len]: Vec::len
`len`: Vec::len
`push`: Vec::push
`insert`: Vec::insert
`reserve`: Vec::reserve
`Vec::with_capacity(n)`: Vec::with_capacity
`MaybeUninit`: core::mem::MaybeUninit
[owned slice]: Box
`into_boxed_slice`: Vec::into_boxed_slice

## Vec::new

```rust
pub const fn new() -> Self
```

Constructs a new, empty `Vec<T>`.

The vector will not allocate until elements are pushed onto it.

# Examples

```rust
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
always use the `capacity` method after construction.

For `Vec<T>` where `T` is a zero-sized type, the vector
[will not allocate], and the capacity will always be `usize::MAX`.

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

```rust
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
