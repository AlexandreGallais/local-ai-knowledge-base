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

The "default" usage of this type as a queue is to use [`push_back`] to add to
the queue, and [`pop_front`] to remove from the queue. [`extend`] and [`append`]
push onto the back in this manner, and iterating over `VecDeque` goes front
to back.

A `VecDeque` with a known list of items can be initialized from an array:

```
use std::collections::VecDeque;

let deq = VecDeque::from([-1, 0, 1]);
```

Since `VecDeque` is a ring buffer, its elements are not necessarily contiguous
in memory. If you want to access the elements as a single slice, such as for
efficient sorting, you can use [`make_contiguous`]. It rotates the `VecDeque`
so that its elements do not wrap, and returns a mutable slice to the
now-contiguous element sequence.

[`push_back`]: VecDeque::push_back
[`pop_front`]: VecDeque::pop_front
[`extend`]: VecDeque::extend
[`append`]: VecDeque::append
[`make_contiguous`]: VecDeque::make_contiguous

## VecDeque::new

```rust
pub const fn new() -> VecDeque<T>
```

Creates an empty deque.

# Examples

```
use std::collections::VecDeque;

let deque: VecDeque<u32> = VecDeque::new();
```

## VecDeque::with_capacity

```rust
pub fn with_capacity(capacity: usize) -> VecDeque<T>
```

Creates an empty deque with space for at least `capacity` elements.

# Examples

```
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

```
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

```
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

```
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

```
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
capacity can not be relied upon to be precisely minimal. Prefer [`reserve`] if future
insertions are expected.

# Panics

Panics if the new capacity overflows `usize`.

# Examples

```
use std::collections::VecDeque;

let mut buf: VecDeque<i32> = [1].into();
buf.reserve_exact(10);
assert!(buf.capacity() >= 11);
```

[`reserve`]: VecDeque::reserve

## VecDeque::reserve

```rust
pub fn reserve(&mut self, additional: usize)
```

Reserves capacity for at least `additional` more elements to be inserted in the given
deque. The collection may reserve more space to speculatively avoid frequent reallocations.

# Panics

Panics if the new capacity overflows `usize`.

# Examples

```
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
minimal. Prefer [`try_reserve`] if future insertions are expected.

[`try_reserve`]: VecDeque::try_reserve

# Errors

If the capacity overflows `usize`, or the allocator reports a failure, then an error
is returned.

# Examples

```
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
# process_data(&[1, 2, 3]).expect("reserving capacity for 12 bytes should never fail");
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

```
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
# process_data(&[1, 2, 3]).expect("reserving capacity for 12 bytes should never fail");
```

## VecDeque::shrink_to_fit

```rust
pub fn shrink_to_fit(&mut self)
```

Shrinks the capacity of the deque as much as possible.

It will drop down as close as possible to the length but the allocator may still inform the
deque that there is space for a few more elements.

# Examples

```
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

```
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

```
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

```
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

```
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

```
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

If [`make_contiguous`] was previously called, all elements of the
deque will be in the first slice and the second slice will be empty.
Otherwise, the exact split point depends on implementation details
and is not guaranteed.

[`make_contiguous`]: VecDeque::make_contiguous

# Examples

```
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

If [`make_contiguous`] was previously called, all elements of the
deque will be in the first slice and the second slice will be empty.
Otherwise, the exact split point depends on implementation details
and is not guaranteed.

[`make_contiguous`]: VecDeque::make_contiguous

# Examples

```
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

```
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

```
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

```
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

```
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
[`mem::forget`], for example), the deque may have lost and leaked
elements arbitrarily, including elements outside the range.

# Examples

```
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

```
use std::collections::VecDeque;

let mut deque = VecDeque::new();
deque.push_back(1);
deque.clear();
assert!(deque.is_empty());
```

## VecDeque::contains

```rust
pub fn contains(&self, x: &T) -> bool where T: PartialEq<T>,
```

Returns `true` if the deque contains an element equal to the
given value.

This operation is *O*(*n*).

Note that if you have a sorted `VecDeque`, [`binary_search`] may be faster.

[`binary_search`]: VecDeque::binary_search

# Examples

```
use std::collections::VecDeque;

let mut deque: VecDeque<u32> = VecDeque::new();

deque.push_back(0);
deque.push_back(1);

assert_eq!(deque.contains(&1), true);
assert_eq!(deque.contains(&10), false);
```

## VecDeque::front

```rust
pub fn front(&self) -> Option<&T>
```

Provides a reference to the front element, or `None` if the deque is
empty.

# Examples

```
use std::collections::VecDeque;

let mut d = VecDeque::new();
assert_eq!(d.front(), None);

d.push_back(1);
d.push_back(2);
assert_eq!(d.front(), Some(&1));
```

## VecDeque::front_mut

```rust
pub fn front_mut(&mut self) -> Option<&mut T>
```

Provides a mutable reference to the front element, or `None` if the
deque is empty.

# Examples

```
use std::collections::VecDeque;

let mut d = VecDeque::new();
assert_eq!(d.front_mut(), None);

d.push_back(1);
d.push_back(2);
match d.front_mut() {
    Some(x) => *x = 9,
    None => (),
}
assert_eq!(d.front(), Some(&9));
```

## VecDeque::back

```rust
pub fn back(&self) -> Option<&T>
```

Provides a reference to the back element, or `None` if the deque is
empty.

# Examples

```
use std::collections::VecDeque;

let mut d = VecDeque::new();
assert_eq!(d.back(), None);

d.push_back(1);
d.push_back(2);
assert_eq!(d.back(), Some(&2));
```

## VecDeque::back_mut

```rust
pub fn back_mut(&mut self) -> Option<&mut T>
```

Provides a mutable reference to the back element, or `None` if the
deque is empty.

# Examples

```
use std::collections::VecDeque;

let mut d = VecDeque::new();
assert_eq!(d.back(), None);

d.push_back(1);
d.push_back(2);
match d.back_mut() {
    Some(x) => *x = 9,
    None => (),
}
assert_eq!(d.back(), Some(&9));
```

## VecDeque::pop_front

```rust
pub fn pop_front(&mut self) -> Option<T>
```

Removes the first element and returns it, or `None` if the deque is
empty.

# Examples

```
use std::collections::VecDeque;

let mut d = VecDeque::new();
d.push_back(1);
d.push_back(2);

assert_eq!(d.pop_front(), Some(1));
assert_eq!(d.pop_front(), Some(2));
assert_eq!(d.pop_front(), None);
```

## VecDeque::pop_back

```rust
pub fn pop_back(&mut self) -> Option<T>
```

Removes the last element from the deque and returns it, or `None` if
it is empty.

# Examples

```
use std::collections::VecDeque;

let mut buf = VecDeque::new();
assert_eq!(buf.pop_back(), None);
buf.push_back(1);
buf.push_back(3);
assert_eq!(buf.pop_back(), Some(3));
```

## VecDeque::pop_front_if

```rust
pub fn pop_front_if(&mut self, predicate: impl FnOnce(&mut T) -> bool) -> Option<T>
```

Removes and returns the first element from the deque if the predicate
returns `true`, or [`None`] if the predicate returns false or the deque
is empty (the predicate will not be called in that case).

# Examples

```
use std::collections::VecDeque;

let mut deque: VecDeque<i32> = vec![0, 1, 2, 3, 4].into();
let pred = |x: &mut i32| *x % 2 == 0;

assert_eq!(deque.pop_front_if(pred), Some(0));
assert_eq!(deque, [1, 2, 3, 4]);
assert_eq!(deque.pop_front_if(pred), None);
```

## VecDeque::pop_back_if

```rust
pub fn pop_back_if(&mut self, predicate: impl FnOnce(&mut T) -> bool) -> Option<T>
```

Removes and returns the last element from the deque if the predicate
returns `true`, or [`None`] if the predicate returns false or the deque
is empty (the predicate will not be called in that case).

# Examples

```
use std::collections::VecDeque;

let mut deque: VecDeque<i32> = vec![0, 1, 2, 3, 4].into();
let pred = |x: &mut i32| *x % 2 == 0;

assert_eq!(deque.pop_back_if(pred), Some(4));
assert_eq!(deque, [0, 1, 2, 3]);
assert_eq!(deque.pop_back_if(pred), None);
```

## VecDeque::push_front

```rust
pub fn push_front(&mut self, value: T)
```

Prepends an element to the deque.

# Examples

```
use std::collections::VecDeque;

let mut d = VecDeque::new();
d.push_front(1);
d.push_front(2);
assert_eq!(d.front(), Some(&2));
```

## VecDeque::push_front_mut

```rust
pub fn push_front_mut(&mut self, value: T) -> &mut T
```

Prepends an element to the deque, returning a reference to it.

# Examples

```
use std::collections::VecDeque;

let mut d = VecDeque::from([1, 2, 3]);
let x = d.push_front_mut(8);
*x -= 1;
assert_eq!(d.front(), Some(&7));
```

## VecDeque::push_back

```rust
pub fn push_back(&mut self, value: T)
```

Appends an element to the back of the deque.

# Examples

```
use std::collections::VecDeque;

let mut buf = VecDeque::new();
buf.push_back(1);
buf.push_back(3);
assert_eq!(3, *buf.back().unwrap());
```

## VecDeque::push_back_mut

```rust
pub fn push_back_mut(&mut self, value: T) -> &mut T
```

Appends an element to the back of the deque, returning a reference to it.

# Examples

```
use std::collections::VecDeque;

let mut d = VecDeque::from([1, 2, 3]);
let x = d.push_back_mut(9);
*x += 1;
assert_eq!(d.back(), Some(&10));
```

## VecDeque::swap_remove_front

```rust
pub fn swap_remove_front(&mut self, index: usize) -> Option<T>
```

Removes an element from anywhere in the deque and returns it,
replacing it with the first element.

This does not preserve ordering, but is *O*(1).

Returns `None` if `index` is out of bounds.

Element at index 0 is the front of the queue.

# Examples

```
use std::collections::VecDeque;

let mut buf = VecDeque::new();
assert_eq!(buf.swap_remove_front(0), None);
buf.push_back(1);
buf.push_back(2);
buf.push_back(3);
assert_eq!(buf, [1, 2, 3]);

assert_eq!(buf.swap_remove_front(2), Some(3));
assert_eq!(buf, [2, 1]);
```

## VecDeque::swap_remove_back

```rust
pub fn swap_remove_back(&mut self, index: usize) -> Option<T>
```

Removes an element from anywhere in the deque and returns it,
replacing it with the last element.

This does not preserve ordering, but is *O*(1).

Returns `None` if `index` is out of bounds.

Element at index 0 is the front of the queue.

# Examples

```
use std::collections::VecDeque;

let mut buf = VecDeque::new();
assert_eq!(buf.swap_remove_back(0), None);
buf.push_back(1);
buf.push_back(2);
buf.push_back(3);
assert_eq!(buf, [1, 2, 3]);

assert_eq!(buf.swap_remove_back(0), Some(1));
assert_eq!(buf, [3, 2]);
```

## VecDeque::insert

```rust
pub fn insert(&mut self, index: usize, value: T)
```

Inserts an element at `index` within the deque, shifting all elements
with indices greater than or equal to `index` towards the back.

Element at index 0 is the front of the queue.

# Panics

Panics if `index` is strictly greater than the deque's length.

# Examples

```
use std::collections::VecDeque;

let mut vec_deque = VecDeque::new();
vec_deque.push_back('a');
vec_deque.push_back('b');
vec_deque.push_back('c');
assert_eq!(vec_deque, &['a', 'b', 'c']);

vec_deque.insert(1, 'd');
assert_eq!(vec_deque, &['a', 'd', 'b', 'c']);

vec_deque.insert(4, 'e');
assert_eq!(vec_deque, &['a', 'd', 'b', 'c', 'e']);
```

## VecDeque::insert_mut

```rust
pub fn insert_mut(&mut self, index: usize, value: T) -> &mut T
```

Inserts an element at `index` within the deque, shifting all elements
with indices greater than or equal to `index` towards the back, and
returning a reference to it.

Element at index 0 is the front of the queue.

# Panics

Panics if `index` is strictly greater than the deque's length.

# Examples

```
use std::collections::VecDeque;

let mut vec_deque = VecDeque::from([1, 2, 3]);

let x = vec_deque.insert_mut(1, 5);
*x += 7;
assert_eq!(vec_deque, &[1, 12, 2, 3]);
```

## VecDeque::remove

```rust
pub fn remove(&mut self, index: usize) -> Option<T>
```

Removes and returns the element at `index` from the deque.
Whichever end is closer to the removal point will be moved to make
room, and all the affected elements will be moved to new positions.
Returns `None` if `index` is out of bounds.

Element at index 0 is the front of the queue.

# Examples

```
use std::collections::VecDeque;

let mut buf = VecDeque::new();
buf.push_back('a');
buf.push_back('b');
buf.push_back('c');
assert_eq!(buf, ['a', 'b', 'c']);

assert_eq!(buf.remove(1), Some('b'));
assert_eq!(buf, ['a', 'c']);
```

## VecDeque::split_off

```rust
pub fn split_off(&mut self, at: usize) -> Self where A: Clone,
```

Splits the deque into two at the given index.

Returns a newly allocated `VecDeque`. `self` contains elements `[0, at)`,
and the returned deque contains elements `[at, len)`.

Note that the capacity of `self` does not change.

Element at index 0 is the front of the queue.

# Panics

Panics if `at > len`.

# Examples

```
use std::collections::VecDeque;

let mut buf: VecDeque<_> = ['a', 'b', 'c'].into();
let buf2 = buf.split_off(1);
assert_eq!(buf, ['a']);
assert_eq!(buf2, ['b', 'c']);
```

## VecDeque::append

```rust
pub fn append(&mut self, other: &mut Self)
```

Moves all the elements of `other` into `self`, leaving `other` empty.

# Panics

Panics if the new number of elements in self overflows a `usize`.

# Examples

```
use std::collections::VecDeque;

let mut buf: VecDeque<_> = [1, 2].into();
let mut buf2: VecDeque<_> = [3, 4].into();
buf.append(&mut buf2);
assert_eq!(buf, [1, 2, 3, 4]);
assert_eq!(buf2, []);
```

## VecDeque::retain

```rust
pub fn retain<F>(&mut self, mut f: F) where F: FnMut(&T) -> bool,
```

Retains only the elements specified by the predicate.

In other words, remove all elements `e` for which `f(&e)` returns false.
This method operates in place, visiting each element exactly once in the
original order, and preserves the order of the retained elements.

# Examples

```
use std::collections::VecDeque;

let mut buf = VecDeque::new();
buf.extend(1..5);
buf.retain(|&x| x % 2 == 0);
assert_eq!(buf, [2, 4]);
```

Because the elements are visited exactly once in the original order,
external state may be used to decide which elements to keep.

```
use std::collections::VecDeque;

let mut buf = VecDeque::new();
buf.extend(1..6);

let keep = [false, true, true, false, true];
let mut iter = keep.iter();
buf.retain(|_| *iter.next().unwrap());
assert_eq!(buf, [2, 3, 5]);
```

## VecDeque::retain_mut

```rust
pub fn retain_mut<F>(&mut self, mut f: F) where F: FnMut(&mut T) -> bool,
```

Retains only the elements specified by the predicate.

In other words, remove all elements `e` for which `f(&mut e)` returns false.
This method operates in place, visiting each element exactly once in the
original order, and preserves the order of the retained elements.

# Examples

```
use std::collections::VecDeque;

let mut buf = VecDeque::new();
buf.extend(1..5);
buf.retain_mut(|x| if *x % 2 == 0 {
    *x += 1;
    true
} else {
    false
});
assert_eq!(buf, [3, 5]);
```

## VecDeque::resize_with

```rust
pub fn resize_with(&mut self, new_len: usize, generator: impl FnMut() -> T)
```

Modifies the deque in-place so that `len()` is equal to `new_len`,
either by removing excess elements from the back or by appending
elements generated by calling `generator` to the back.

# Examples

```
use std::collections::VecDeque;

let mut buf = VecDeque::new();
buf.push_back(5);
buf.push_back(10);
buf.push_back(15);
assert_eq!(buf, [5, 10, 15]);

buf.resize_with(5, Default::default);
assert_eq!(buf, [5, 10, 15, 0, 0]);

buf.resize_with(2, || unreachable!());
assert_eq!(buf, [5, 10]);

let mut state = 100;
buf.resize_with(5, || { state += 1; state });
assert_eq!(buf, [5, 10, 101, 102, 103]);
```

## VecDeque::make_contiguous

```rust
pub fn make_contiguous(&mut self) -> &mut [T]
```

Rearranges the internal storage of this deque so it is one contiguous
slice, which is then returned.

This method does not allocate and does not change the order of the
inserted elements. As it returns a mutable slice, this can be used to
sort a deque.

Once the internal storage is contiguous, the [`as_slices`] and
[`as_mut_slices`] methods will return the entire contents of the
deque in a single slice.

[`as_slices`]: VecDeque::as_slices
[`as_mut_slices`]: VecDeque::as_mut_slices

# Examples

Sorting the content of a deque.

```
use std::collections::VecDeque;

let mut buf = VecDeque::with_capacity(15);

buf.push_back(2);
buf.push_back(1);
buf.push_front(3);

// sorting the deque
buf.make_contiguous().sort();
assert_eq!(buf.as_slices(), (&[1, 2, 3] as &[_], &[] as &[_]));

// sorting it in reverse order
buf.make_contiguous().sort_by(|a, b| b.cmp(a));
assert_eq!(buf.as_slices(), (&[3, 2, 1] as &[_], &[] as &[_]));
```

Getting immutable access to the contiguous slice.

```rust
use std::collections::VecDeque;

let mut buf = VecDeque::new();

buf.push_back(2);
buf.push_back(1);
buf.push_front(3);

buf.make_contiguous();
if let (slice, &[]) = buf.as_slices() {
    // we can now be sure that `slice` contains all elements of the deque,
    // while still having immutable access to `buf`.
    assert_eq!(buf.len(), slice.len());
    assert_eq!(slice, &[3, 2, 1] as &[_]);
}
```

## VecDeque::rotate_left

```rust
pub fn rotate_left(&mut self, n: usize)
```

Rotates the double-ended queue `n` places to the left.

Equivalently,
- Rotates item `n` into the first position.
- Pops the first `n` items and pushes them to the end.
- Rotates `len() - n` places to the right.

# Panics

If `n` is greater than `len()`. Note that `n == len()`
does _not_ panic and is a no-op rotation.

# Complexity

Takes `*O*(min(n, len() - n))` time and no extra space.

# Examples

```
use std::collections::VecDeque;

let mut buf: VecDeque<_> = (0..10).collect();

buf.rotate_left(3);
assert_eq!(buf, [3, 4, 5, 6, 7, 8, 9, 0, 1, 2]);

for i in 1..10 {
    assert_eq!(i * 3 % 10, buf[0]);
    buf.rotate_left(3);
}
assert_eq!(buf, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
```

## VecDeque::rotate_right

```rust
pub fn rotate_right(&mut self, n: usize)
```

Rotates the double-ended queue `n` places to the right.

Equivalently,
- Rotates the first item into position `n`.
- Pops the last `n` items and pushes them to the front.
- Rotates `len() - n` places to the left.

# Panics

If `n` is greater than `len()`. Note that `n == len()`
does _not_ panic and is a no-op rotation.

# Complexity

Takes `*O*(min(n, len() - n))` time and no extra space.

# Examples

```
use std::collections::VecDeque;

let mut buf: VecDeque<_> = (0..10).collect();

buf.rotate_right(3);
assert_eq!(buf, [7, 8, 9, 0, 1, 2, 3, 4, 5, 6]);

for i in 1..10 {
    assert_eq!(0, buf[i * 3 % 10]);
    buf.rotate_right(3);
}
assert_eq!(buf, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
```

## VecDeque::binary_search

```rust
pub fn binary_search(&self, x: &T) -> Result<usize, usize> where T: Ord,
```

Binary searches this `VecDeque` for a given element.
If the `VecDeque` is not sorted, the returned result is unspecified and
meaningless.

If the value is found then [`Result::Ok`] is returned, containing the
index of the matching element. If there are multiple matches, then any
one of the matches could be returned. If the value is not found then
[`Result::Err`] is returned, containing the index where a matching
element could be inserted while maintaining sorted order.

See also [`binary_search_by`], [`binary_search_by_key`], and [`partition_point`].

[`binary_search_by`]: VecDeque::binary_search_by
[`binary_search_by_key`]: VecDeque::binary_search_by_key
[`partition_point`]: VecDeque::partition_point

# Examples

Looks up a series of four elements. The first is found, with a
uniquely determined position; the second and third are not
found; the fourth could match any position in `[1, 4]`.

```
use std::collections::VecDeque;

let deque: VecDeque<_> = [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55].into();

assert_eq!(deque.binary_search(&13),  Ok(9));
assert_eq!(deque.binary_search(&4),   Err(7));
assert_eq!(deque.binary_search(&100), Err(13));
let r = deque.binary_search(&1);
assert!(matches!(r, Ok(1..=4)));
```

If you want to insert an item to a sorted deque, while maintaining
sort order, consider using [`partition_point`]:

```
use std::collections::VecDeque;

let mut deque: VecDeque<_> = [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55].into();
let num = 42;
let idx = deque.partition_point(|&x| x <= num);
// If `num` is unique, `s.partition_point(|&x| x < num)` (with `<`) is equivalent to
// `s.binary_search(&num).unwrap_or_else(|x| x)`, but using `<=` may allow `insert`
// to shift less elements.
deque.insert(idx, num);
assert_eq!(deque, &[0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 42, 55]);
```

## VecDeque::binary_search_by

```rust
pub fn binary_search_by<'a, F>(&'a self, mut f: F) -> Result<usize, usize> where F: FnMut(&'a T) -> Ordering,
```

Binary searches this `VecDeque` with a comparator function.

The comparator function should return an order code that indicates
whether its argument is `Less`, `Equal` or `Greater` the desired
target.
If the `VecDeque` is not sorted or if the comparator function does not
implement an order consistent with the sort order of the underlying
`VecDeque`, the returned result is unspecified and meaningless.

If the value is found then [`Result::Ok`] is returned, containing the
index of the matching element. If there are multiple matches, then any
one of the matches could be returned. If the value is not found then
[`Result::Err`] is returned, containing the index where a matching
element could be inserted while maintaining sorted order.

See also [`binary_search`], [`binary_search_by_key`], and [`partition_point`].

[`binary_search`]: VecDeque::binary_search
[`binary_search_by_key`]: VecDeque::binary_search_by_key
[`partition_point`]: VecDeque::partition_point

# Examples

Looks up a series of four elements. The first is found, with a
uniquely determined position; the second and third are not
found; the fourth could match any position in `[1, 4]`.

```
use std::collections::VecDeque;

let deque: VecDeque<_> = [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55].into();

assert_eq!(deque.binary_search_by(|x| x.cmp(&13)),  Ok(9));
assert_eq!(deque.binary_search_by(|x| x.cmp(&4)),   Err(7));
assert_eq!(deque.binary_search_by(|x| x.cmp(&100)), Err(13));
let r = deque.binary_search_by(|x| x.cmp(&1));
assert!(matches!(r, Ok(1..=4)));
```

## VecDeque::binary_search_by_key

```rust
pub fn binary_search_by_key<'a, B, F>(&'a self, b: &B, mut f: F) -> Result<usize, usize> where F: FnMut(&'a T) -> B, B: Ord,
```

Binary searches this `VecDeque` with a key extraction function.

Assumes that the deque is sorted by the key, for instance with
[`make_contiguous().sort_by_key()`] using the same key extraction function.
If the deque is not sorted by the key, the returned result is
unspecified and meaningless.

If the value is found then [`Result::Ok`] is returned, containing the
index of the matching element. If there are multiple matches, then any
one of the matches could be returned. If the value is not found then
[`Result::Err`] is returned, containing the index where a matching
element could be inserted while maintaining sorted order.

See also [`binary_search`], [`binary_search_by`], and [`partition_point`].

[`make_contiguous().sort_by_key()`]: VecDeque::make_contiguous
[`binary_search`]: VecDeque::binary_search
[`binary_search_by`]: VecDeque::binary_search_by
[`partition_point`]: VecDeque::partition_point

# Examples

Looks up a series of four elements in a slice of pairs sorted by
their second elements. The first is found, with a uniquely
determined position; the second and third are not found; the
fourth could match any position in `[1, 4]`.

```
use std::collections::VecDeque;

let deque: VecDeque<_> = [(0, 0), (2, 1), (4, 1), (5, 1),
         (3, 1), (1, 2), (2, 3), (4, 5), (5, 8), (3, 13),
         (1, 21), (2, 34), (4, 55)].into();

assert_eq!(deque.binary_search_by_key(&13, |&(a, b)| b),  Ok(9));
assert_eq!(deque.binary_search_by_key(&4, |&(a, b)| b),   Err(7));
assert_eq!(deque.binary_search_by_key(&100, |&(a, b)| b), Err(13));
let r = deque.binary_search_by_key(&1, |&(a, b)| b);
assert!(matches!(r, Ok(1..=4)));
```

## VecDeque::partition_point

```rust
pub fn partition_point<P>(&self, mut pred: P) -> usize where P: FnMut(&T) -> bool,
```

Returns the index of the partition point according to the given predicate
(the index of the first element of the second partition).

The deque is assumed to be partitioned according to the given predicate.
This means that all elements for which the predicate returns true are at the start of the deque
and all elements for which the predicate returns false are at the end.
For example, `[7, 15, 3, 5, 4, 12, 6]` is partitioned under the predicate `x % 2 != 0`
(all odd numbers are at the start, all even at the end).

If the deque is not partitioned, the returned result is unspecified and meaningless,
as this method performs a kind of binary search.

See also [`binary_search`], [`binary_search_by`], and [`binary_search_by_key`].

[`binary_search`]: VecDeque::binary_search
[`binary_search_by`]: VecDeque::binary_search_by
[`binary_search_by_key`]: VecDeque::binary_search_by_key

# Examples

```
use std::collections::VecDeque;

let deque: VecDeque<_> = [1, 2, 3, 3, 5, 6, 7].into();
let i = deque.partition_point(|&x| x < 5);

assert_eq!(i, 4);
assert!(deque.iter().take(i).all(|&x| x < 5));
assert!(deque.iter().skip(i).all(|&x| !(x < 5)));
```

If you want to insert an item to a sorted deque, while maintaining
sort order:

```
use std::collections::VecDeque;

let mut deque: VecDeque<_> = [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55].into();
let num = 42;
let idx = deque.partition_point(|&x| x < num);
deque.insert(idx, num);
assert_eq!(deque, &[0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 42, 55]);
```

## VecDeque::resize

```rust
pub fn resize(&mut self, new_len: usize, value: T)
```

Modifies the deque in-place so that `len()` is equal to new_len,
either by removing excess elements from the back or by appending clones of `value`
to the back.

# Examples

```
use std::collections::VecDeque;

let mut buf = VecDeque::new();
buf.push_back(5);
buf.push_back(10);
buf.push_back(15);
assert_eq!(buf, [5, 10, 15]);

buf.resize(2, 0);
assert_eq!(buf, [5, 10]);

buf.resize(5, 20);
assert_eq!(buf, [5, 10, 20, 20, 20]);
```