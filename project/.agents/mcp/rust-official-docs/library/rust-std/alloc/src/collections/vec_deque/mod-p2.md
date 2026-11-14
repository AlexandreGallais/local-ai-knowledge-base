---
title: "alloc::collections::vec_deque (part 2 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/collections/vec_deque/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::collections::vec_deque (part 2 of 3)

## VecDeque::contains

```rust
pub fn contains(&self, x: &T) -> bool where T: PartialEq<T>,
```

Returns `true` if the deque contains an element equal to the
given value.

This operation is *O*(*n*).

Note that if you have a sorted `VecDeque`, `binary_search` may be faster.

# Examples

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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
returns `true`, or `None` if the predicate returns false or the deque
is empty (the predicate will not be called in that case).

# Examples

```rust
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
returns `true`, or `None` if the predicate returns false or the deque
is empty (the predicate will not be called in that case).

# Examples

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
use std::collections::VecDeque;

let mut buf = VecDeque::new();
buf.extend(1..5);
buf.retain(|&x| x % 2 == 0);
assert_eq!(buf, [2, 4]);
```

Because the elements are visited exactly once in the original order,
external state may be used to decide which elements to keep.

```rust
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

```rust
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

```rust
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

Once the internal storage is contiguous, the `as_slices` and
`as_mut_slices` methods will return the entire contents of the
deque in a single slice.

# Examples

Sorting the content of a deque.

```rust
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

```rust
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

```rust
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
