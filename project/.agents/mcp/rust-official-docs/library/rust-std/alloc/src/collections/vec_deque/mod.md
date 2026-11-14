---
title: "alloc::collections::vec_deque (part 1 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/collections/vec_deque/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::collections::vec_deque

A double-ended queue (deque) implemented with a growable ring buffer.

This queue has *O*(1) amortized inserts and removals from both ends of the
container. It also has *O*(1) indexing like a vector. The contained elements
are not required to be copyable, and the queue will be sendable if the
contained type is sendable.

## struct VecDeque

```rust
pub struct VecDeque< T, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

A double-ended queue implemented with a growable ring buffer.

The "default" usage of this type as a queue is to use `push_back` to add to
the queue, and `pop_front` to remove from the queue. `extend` and `append`
push onto the back in this manner, and iterating over `VecDeque` goes front
to back.

A `VecDeque` with a known list of items can be initialized from an array:

```rust
use std::collections::VecDeque;

let deq = VecDeque::from([-1, 0, 1]);
```

Since `VecDeque` is a ring buffer, its elements are not necessarily contiguous
in memory. If you want to access the elements as a single slice, such as for
efficient sorting, you can use `make_contiguous`. It rotates the `VecDeque`
so that its elements do not wrap, and returns a mutable slice to the
now-contiguous element sequence.

## VecDeque::new

```rust
pub const fn new() -> VecDeque<T>
```

Creates an empty deque.

# Examples

```rust
use std::collections::VecDeque;

let deque: VecDeque<u32> = VecDeque::new();
```

## VecDeque::with_capacity

```rust
pub fn with_capacity(capacity: usize) -> VecDeque<T>
```

Creates an empty deque with space for at least `capacity` elements.

# Examples

```rust
use std::collections::VecDeque;

let deque: VecDeque<i32> = VecDeque::with_capacity(10);
```

## VecDeque::get

```rust
pub fn get(&self, index: usize) -> Option<&T>
```

Provides a reference to the element at the given index.

Element at index 0 is the front of the queue.

# Examples

```rust
use std::collections::VecDeque;

let mut buf = VecDeque::new();
buf.push_back(3);
buf.push_back(4);
buf.push_back(5);
buf.push_back(6);
assert_eq!(buf.get(1), Some(&4));
```

## VecDeque::get_mut

```rust
pub fn get_mut(&mut self, index: usize) -> Option<&mut T>
```

Provides a mutable reference to the element at the given index.

Element at index 0 is the front of the queue.

# Examples

```rust
use std::collections::VecDeque;

let mut buf = VecDeque::new();
buf.push_back(3);
buf.push_back(4);
buf.push_back(5);
buf.push_back(6);
assert_eq!(buf[1], 4);
if let Some(elem) = buf.get_mut(1) {
    *elem = 7;
}
assert_eq!(buf[1], 7);
```

## VecDeque::swap

```rust
pub fn swap(&mut self, i: usize, j: usize)
```

Swaps elements at indices `i` and `j`.

`i` and `j` may be equal.

Element at index 0 is the front of the queue.

# Panics

Panics if either index is out of bounds.

# Examples

```rust
use std::collections::VecDeque;

let mut buf = VecDeque::new();
buf.push_back(3);
buf.push_back(4);
buf.push_back(5);
assert_eq!(buf, [3, 4, 5]);
buf.swap(0, 2);
assert_eq!(buf, [5, 4, 3]);
```

## VecDeque::capacity

```rust
pub fn capacity(&self) -> usize
```

Returns the number of elements the deque can hold without
reallocating.

# Examples

```rust
use std::collections::VecDeque;

let buf: VecDeque<i32> = VecDeque::with_capacity(10);
assert!(buf.capacity() >= 10);
```

## VecDeque::reserve_exact

```rust
pub fn reserve_exact(&mut self, additional: usize)
```

Reserves the minimum capacity for at least `additional` more elements to be inserted in the
given deque. Does nothing if the capacity is already sufficient.

Note that the allocator may give the collection more space than it requests. Therefore
capacity can not be relied upon to be precisely minimal. Prefer `reserve` if future
insertions are expected.

# Panics

Panics if the new capacity overflows `usize`.

# Examples

```rust
use std::collections::VecDeque;

let mut buf: VecDeque<i32> = [1].into();
buf.reserve_exact(10);
assert!(buf.capacity() >= 11);
```

## VecDeque::reserve

```rust
pub fn reserve(&mut self, additional: usize)
```

Reserves capacity for at least `additional` more elements to be inserted in the given
deque. The collection may reserve more space to speculatively avoid frequent reallocations.

# Panics

Panics if the new capacity overflows `usize`.

# Examples

```rust
use std::collections::VecDeque;

let mut buf: VecDeque<i32> = [1].into();
buf.reserve(10);
assert!(buf.capacity() >= 11);
```

## VecDeque::try_reserve_exact

```rust
pub fn try_reserve_exact(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Tries to reserve the minimum capacity for at least `additional` more elements to
be inserted in the given deque. After calling `try_reserve_exact`,
capacity will be greater than or equal to `self.len() + additional` if
it returns `Ok(())`. Does nothing if the capacity is already sufficient.

Note that the allocator may give the collection more space than it
requests. Therefore, capacity can not be relied upon to be precisely
minimal. Prefer `try_reserve` if future insertions are expected.

# Errors

If the capacity overflows `usize`, or the allocator reports a failure, then an error
is returned.

# Examples

```rust
use std::collections::TryReserveError;
use std::collections::VecDeque;

fn process_data(data: &[u32]) -> Result<VecDeque<u32>, TryReserveError> {
    let mut output = VecDeque::new();

    // Pre-reserve the memory, exiting if we can't
    output.try_reserve_exact(data.len())?;

    // Now we know this can't OOM(Out-Of-Memory) in the middle of our complex work
    output.extend(data.iter().map(|&val| {
        val * 2 + 5 // very complicated
    }));

    Ok(output)
}
```

## VecDeque::try_reserve

```rust
pub fn try_reserve(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Tries to reserve capacity for at least `additional` more elements to be inserted
in the given deque. The collection may reserve more space to speculatively avoid
frequent reallocations. After calling `try_reserve`, capacity will be
greater than or equal to `self.len() + additional` if it returns
`Ok(())`. Does nothing if capacity is already sufficient. This method
preserves the contents even if an error occurs.

# Errors

If the capacity overflows `usize`, or the allocator reports a failure, then an error
is returned.

# Examples

```rust
use std::collections::TryReserveError;
use std::collections::VecDeque;

fn process_data(data: &[u32]) -> Result<VecDeque<u32>, TryReserveError> {
    let mut output = VecDeque::new();

    // Pre-reserve the memory, exiting if we can't
    output.try_reserve(data.len())?;

    // Now we know this can't OOM in the middle of our complex work
    output.extend(data.iter().map(|&val| {
        val * 2 + 5 // very complicated
    }));

    Ok(output)
}
```

## VecDeque::shrink_to_fit

```rust
pub fn shrink_to_fit(&mut self)
```

Shrinks the capacity of the deque as much as possible.

It will drop down as close as possible to the length but the allocator may still inform the
deque that there is space for a few more elements.

# Examples

```rust
use std::collections::VecDeque;

let mut buf = VecDeque::with_capacity(15);
buf.extend(0..4);
assert_eq!(buf.capacity(), 15);
buf.shrink_to_fit();
assert!(buf.capacity() >= 4);
```

## VecDeque::shrink_to

```rust
pub fn shrink_to(&mut self, min_capacity: usize)
```

Shrinks the capacity of the deque with a lower bound.

The capacity will remain at least as large as both the length
and the supplied value.

If the current capacity is less than the lower limit, this is a no-op.

# Examples

```rust
use std::collections::VecDeque;

let mut buf = VecDeque::with_capacity(15);
buf.extend(0..4);
assert_eq!(buf.capacity(), 15);
buf.shrink_to(6);
assert!(buf.capacity() >= 6);
buf.shrink_to(0);
assert!(buf.capacity() >= 4);
```

## VecDeque::truncate

```rust
pub fn truncate(&mut self, len: usize)
```

Shortens the deque, keeping the first `len` elements and dropping
the rest.

If `len` is greater or equal to the deque's current length, this has
no effect.

# Examples

```rust
use std::collections::VecDeque;

let mut buf = VecDeque::new();
buf.push_back(5);
buf.push_back(10);
buf.push_back(15);
assert_eq!(buf, [5, 10, 15]);
buf.truncate(1);
assert_eq!(buf, [5]);
```

## VecDeque::retain_back

```rust
pub fn retain_back(&mut self, len: usize)
```

Shortens the deque, keeping the last `len` elements and dropping
the rest.

If `len` is greater or equal to the deque's current length, this has
no effect.

# Examples

```rust
use std::collections::VecDeque;

let mut buf = VecDeque::new();
buf.push_front(5);
buf.push_front(10);
buf.push_front(15);
assert_eq!(buf, [15, 10, 5]);
assert_eq!(buf.as_slices(), (&[15, 10, 5][..], &[][..]));
buf.retain_back(1);
assert_eq!(buf.as_slices(), (&[5][..], &[][..]));
```

## VecDeque::iter

```rust
pub fn iter(&self) -> Iter<'_, T>
```

Returns a front-to-back iterator.

# Examples

```rust
use std::collections::VecDeque;

let mut buf = VecDeque::new();
buf.push_back(5);
buf.push_back(3);
buf.push_back(4);
let b: &[_] = &[&5, &3, &4];
let c: Vec<&i32> = buf.iter().collect();
assert_eq!(&c[..], b);
```

## VecDeque::iter_mut

```rust
pub fn iter_mut(&mut self) -> IterMut<'_, T>
```

Returns a front-to-back iterator that returns mutable references.

# Examples

```rust
use std::collections::VecDeque;

let mut buf = VecDeque::new();
buf.push_back(5);
buf.push_back(3);
buf.push_back(4);
for num in buf.iter_mut() {
    *num = *num - 2;
}
let b: &[_] = &[&mut 3, &mut 1, &mut 2];
assert_eq!(&buf.iter_mut().collect::<Vec<&mut i32>>()[..], b);
```

## VecDeque::as_slices

```rust
pub fn as_slices(&self) -> (&[T], &[T])
```

Returns a pair of slices which contain, in order, the contents of the
deque.

If `make_contiguous` was previously called, all elements of the
deque will be in the first slice and the second slice will be empty.
Otherwise, the exact split point depends on implementation details
and is not guaranteed.

# Examples

```rust
use std::collections::VecDeque;

let mut deque = VecDeque::new();

deque.push_back(0);
deque.push_back(1);
deque.push_back(2);

let expected = [0, 1, 2];
let (front, back) = deque.as_slices();
assert_eq!(&expected[..front.len()], front);
assert_eq!(&expected[front.len()..], back);

deque.push_front(10);
deque.push_front(9);

let expected = [9, 10, 0, 1, 2];
let (front, back) = deque.as_slices();
assert_eq!(&expected[..front.len()], front);
assert_eq!(&expected[front.len()..], back);
```

## VecDeque::as_mut_slices

```rust
pub fn as_mut_slices(&mut self) -> (&mut [T], &mut [T])
```

Returns a pair of slices which contain, in order, the contents of the
deque.

If `make_contiguous` was previously called, all elements of the
deque will be in the first slice and the second slice will be empty.
Otherwise, the exact split point depends on implementation details
and is not guaranteed.

# Examples

```rust
use std::collections::VecDeque;

let mut deque = VecDeque::new();

deque.push_back(0);
deque.push_back(1);

deque.push_front(10);
deque.push_front(9);

// Since the split point is not guaranteed, we may need to update
// either slice.
let mut update_nth = |index: usize, val: u32| {
    let (front, back) = deque.as_mut_slices();
    if index > front.len() - 1 {
        back[index - front.len()] = val;
    } else {
        front[index] = val;
    }
};

update_nth(0, 42);
update_nth(2, 24);

let v: Vec<_> = deque.into();
assert_eq!(v, [42, 10, 24, 1]);
```

## VecDeque::len

```rust
pub fn len(&self) -> usize
```

Returns the number of elements in the deque.

# Examples

```rust
use std::collections::VecDeque;

let mut deque = VecDeque::new();
assert_eq!(deque.len(), 0);
deque.push_back(1);
assert_eq!(deque.len(), 1);
```

## VecDeque::is_empty

```rust
pub fn is_empty(&self) -> bool
```

Returns `true` if the deque is empty.

# Examples

```rust
use std::collections::VecDeque;

let mut deque = VecDeque::new();
assert!(deque.is_empty());
deque.push_front(1);
assert!(!deque.is_empty());
```

## VecDeque::range

```rust
pub fn range<R>(&self, range: R) -> Iter<'_, T> where R: RangeBounds<usize>,
```

Creates an iterator that covers the specified range in the deque.

# Panics

Panics if the range has `start_bound > end_bound`, or, if the range is
bounded on either end and past the length of the deque.

# Examples

```rust
use std::collections::VecDeque;

let deque: VecDeque<_> = [1, 2, 3].into();
let range = deque.range(2..).copied().collect::<VecDeque<_>>();
assert_eq!(range, [3]);

// A full range covers all contents
let all = deque.range(..);
assert_eq!(all.len(), 3);
```

## VecDeque::range_mut

```rust
pub fn range_mut<R>(&mut self, range: R) -> IterMut<'_, T> where R: RangeBounds<usize>,
```

Creates an iterator that covers the specified mutable range in the deque.

# Panics

Panics if the range has `start_bound > end_bound`, or, if the range is
bounded on either end and past the length of the deque.

# Examples

```rust
use std::collections::VecDeque;

let mut deque: VecDeque<_> = [1, 2, 3].into();
for v in deque.range_mut(2..) {
  *v *= 2;
}
assert_eq!(deque, [1, 2, 6]);

// A full range covers all contents
for v in deque.range_mut(..) {
  *v *= 2;
}
assert_eq!(deque, [2, 4, 12]);
```

## VecDeque::drain

```rust
pub fn drain<R>(&mut self, range: R) -> Drain<'_, T, A> where R: RangeBounds<usize>,
```

Removes the specified range from the deque in bulk, returning all
removed elements as an iterator. If the iterator is dropped before
being fully consumed, it drops the remaining removed elements.

The returned iterator keeps a mutable borrow on the queue to optimize
its implementation.

# Panics

Panics if the range has `start_bound > end_bound`, or, if the range is
bounded on either end and past the length of the deque.

# Leaking

If the returned iterator goes out of scope without being dropped (due to
`mem::forget`, for example), the deque may have lost and leaked
elements arbitrarily, including elements outside the range.

# Examples

```rust
use std::collections::VecDeque;

let mut deque: VecDeque<_> = [1, 2, 3].into();
let drained = deque.drain(2..).collect::<VecDeque<_>>();
assert_eq!(drained, [3]);
assert_eq!(deque, [1, 2]);

// A full range clears all contents, like `clear()` does
deque.drain(..);
assert!(deque.is_empty());
```

## VecDeque::clear

```rust
pub fn clear(&mut self)
```

Clears the deque, removing all values.

# Examples

```rust
use std::collections::VecDeque;

let mut deque = VecDeque::new();
deque.push_back(1);
deque.clear();
assert!(deque.is_empty());
```
