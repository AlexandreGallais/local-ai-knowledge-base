---
title: "alloc::collections::binary_heap (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/collections/binary_heap/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::collections::binary_heap (part 2 of 2)

## BinaryHeap::reserve

```rust
pub fn reserve(&mut self, additional: usize)
```

Reserves capacity for at least `additional` elements more than the
current length. The allocator may reserve more space to speculatively
avoid frequent allocations. After calling `reserve`,
capacity will be greater than or equal to `self.len() + additional`.
Does nothing if capacity is already sufficient.

# Panics

Panics if the new capacity overflows `usize`.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;
let mut heap = BinaryHeap::new();
heap.reserve(100);
assert!(heap.capacity() >= 100);
heap.push(4);
```

## BinaryHeap::try_reserve_exact

```rust
pub fn try_reserve_exact(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Tries to reserve the minimum capacity for at least `additional` elements
more than the current length. Unlike `try_reserve`, this will not
deliberately over-allocate to speculatively avoid frequent allocations.
After calling `try_reserve_exact`, capacity will be greater than or
equal to `self.len() + additional` if it returns `Ok(())`.
Does nothing if the capacity is already sufficient.

Note that the allocator may give the collection more space than it
requests. Therefore, capacity can not be relied upon to be precisely
minimal. Prefer `try_reserve` if future insertions are expected.

# Errors

If the capacity overflows, or the allocator reports a failure, then an error
is returned.

# Examples

```rust
use std::collections::BinaryHeap;
use std::collections::TryReserveError;

fn find_max_slow(data: &[u32]) -> Result<Option<u32>, TryReserveError> {
    let mut heap = BinaryHeap::new();

    // Pre-reserve the memory, exiting if we can't
    heap.try_reserve_exact(data.len())?;

    // Now we know this can't OOM in the middle of our complex work
    heap.extend(data.iter());

    Ok(heap.pop())
}
```

## BinaryHeap::try_reserve

```rust
pub fn try_reserve(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Tries to reserve capacity for at least `additional` elements more than the
current length. The allocator may reserve more space to speculatively
avoid frequent allocations. After calling `try_reserve`, capacity will be
greater than or equal to `self.len() + additional` if it returns
`Ok(())`. Does nothing if capacity is already sufficient. This method
preserves the contents even if an error occurs.

# Errors

If the capacity overflows, or the allocator reports a failure, then an error
is returned.

# Examples

```rust
use std::collections::BinaryHeap;
use std::collections::TryReserveError;

fn find_max_slow(data: &[u32]) -> Result<Option<u32>, TryReserveError> {
    let mut heap = BinaryHeap::new();

    // Pre-reserve the memory, exiting if we can't
    heap.try_reserve(data.len())?;

    // Now we know this can't OOM in the middle of our complex work
    heap.extend(data.iter());

    Ok(heap.pop())
}
```

## BinaryHeap::shrink_to_fit

```rust
pub fn shrink_to_fit(&mut self)
```

Discards as much additional capacity as possible.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;
let mut heap: BinaryHeap<i32> = BinaryHeap::with_capacity(100);

assert!(heap.capacity() >= 100);
heap.shrink_to_fit();
assert!(heap.capacity() == 0);
```

## BinaryHeap::shrink_to

```rust
pub fn shrink_to(&mut self, min_capacity: usize)
```

Discards capacity with a lower bound.

The capacity will remain at least as large as both the length
and the supplied value.

If the current capacity is less than the lower limit, this is a no-op.

# Examples

```rust
use std::collections::BinaryHeap;
let mut heap: BinaryHeap<i32> = BinaryHeap::with_capacity(100);

assert!(heap.capacity() >= 100);
heap.shrink_to(10);
assert!(heap.capacity() >= 10);
```

## BinaryHeap::as_slice

```rust
pub fn as_slice(&self) -> &[T]
```

Returns a slice of all values in the underlying vector, in arbitrary
order.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;
use std::io::{self, Write};

let heap = BinaryHeap::from([1, 2, 3, 4, 5, 6, 7]);

io::sink().write(heap.as_slice()).unwrap();
```

## BinaryHeap::into_vec

```rust
pub fn into_vec(self) -> Vec<T, A>
```

Consumes the `BinaryHeap` and returns the underlying vector
in arbitrary order.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;
let heap = BinaryHeap::from([1, 2, 3, 4, 5, 6, 7]);
let vec = heap.into_vec();

// Will print in some order
for x in vec {
    println!("{x}");
}
```

## BinaryHeap::len

```rust
pub fn len(&self) -> usize
```

Returns the length of the binary heap.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;
let heap = BinaryHeap::from([1, 3]);

assert_eq!(heap.len(), 2);
```

## BinaryHeap::is_empty

```rust
pub fn is_empty(&self) -> bool
```

Checks if the binary heap is empty.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;
let mut heap = BinaryHeap::new();

assert!(heap.is_empty());

heap.push(3);
heap.push(5);
heap.push(1);

assert!(!heap.is_empty());
```

## BinaryHeap::drain

```rust
pub fn drain(&mut self) -> Drain<'_, T, A> where A: AllocatorNightly, // needed for the `Vec::drain` call
```

Clears the binary heap, returning an iterator over the removed elements
in arbitrary order. If the iterator is dropped before being fully
consumed, it drops the remaining elements in arbitrary order.

The returned iterator keeps a mutable borrow on the heap to optimize
its implementation.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;
let mut heap = BinaryHeap::from([1, 3]);

assert!(!heap.is_empty());

for x in heap.drain() {
    println!("{x}");
}

assert!(heap.is_empty());
```

## BinaryHeap::clear

```rust
pub fn clear(&mut self) where A: AllocatorNightly,
```

Drops all items from the binary heap.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;
let mut heap = BinaryHeap::from([1, 3]);

assert!(!heap.is_empty());

heap.clear();

assert!(heap.is_empty());
```

## struct Iter

```rust
pub struct Iter<'a, T: 'a>
```

An iterator over the elements of a `BinaryHeap`.

This `struct` is created by `BinaryHeap::iter()`. See its
documentation for more.

## ::IntoIter

```rust
pub struct IntoIter< T, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

An owning iterator over the elements of a `BinaryHeap`.

This `struct` is created by `BinaryHeap::into_iter()`
(provided by the `IntoIterator` trait). See its documentation for more.

## ::Drain

```rust
pub struct Drain< 'a, T: 'a, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

A draining iterator over the elements of a `BinaryHeap`.

This `struct` is created by `BinaryHeap::drain()`. See its
documentation for more.
