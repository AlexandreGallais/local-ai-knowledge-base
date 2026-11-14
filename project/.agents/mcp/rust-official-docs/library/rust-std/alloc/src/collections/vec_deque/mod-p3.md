---
title: "alloc::collections::vec_deque (part 3 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/collections/vec_deque/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::collections::vec_deque (part 3 of 3)

## VecDeque::binary_search

```rust
pub fn binary_search(&self, x: &T) -> Result<usize, usize> where T: Ord,
```

Binary searches this `VecDeque` for a given element.
If the `VecDeque` is not sorted, the returned result is unspecified and
meaningless.

If the value is found then `Result::Ok` is returned, containing the
index of the matching element. If there are multiple matches, then any
one of the matches could be returned. If the value is not found then
`Result::Err` is returned, containing the index where a matching
element could be inserted while maintaining sorted order.

See also `binary_search_by`, `binary_search_by_key`, and `partition_point`.

# Examples

Looks up a series of four elements. The first is found, with a
uniquely determined position; the second and third are not
found; the fourth could match any position in `[1, 4]`.

```rust
use std::collections::VecDeque;

let deque: VecDeque<_> = [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55].into();

assert_eq!(deque.binary_search(&13),  Ok(9));
assert_eq!(deque.binary_search(&4),   Err(7));
assert_eq!(deque.binary_search(&100), Err(13));
let r = deque.binary_search(&1);
assert!(matches!(r, Ok(1..=4)));
```

If you want to insert an item to a sorted deque, while maintaining
sort order, consider using `partition_point`:

```rust
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

If the value is found then `Result::Ok` is returned, containing the
index of the matching element. If there are multiple matches, then any
one of the matches could be returned. If the value is not found then
`Result::Err` is returned, containing the index where a matching
element could be inserted while maintaining sorted order.

See also `binary_search`, `binary_search_by_key`, and `partition_point`.

# Examples

Looks up a series of four elements. The first is found, with a
uniquely determined position; the second and third are not
found; the fourth could match any position in `[1, 4]`.

```rust
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

Binary searches this `VecDeque` with a key <example-value> function.

Assumes that the deque is sorted by the key, for instance with
`make_contiguous().sort_by_key()` using the same key <example-value> function.
If the deque is not sorted by the key, the returned result is
unspecified and meaningless.

If the value is found then `Result::Ok` is returned, containing the
index of the matching element. If there are multiple matches, then any
one of the matches could be returned. If the value is not found then
`Result::Err` is returned, containing the index where a matching
element could be inserted while maintaining sorted order.

See also `binary_search`, `binary_search_by`, and `partition_point`.

# Examples

Looks up a series of four elements in a slice of pairs sorted by
their second elements. The first is found, with a uniquely
determined position; the second and third are not found; the
fourth could match any position in `[1, 4]`.

```rust
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

See also `binary_search`, `binary_search_by`, and `binary_search_by_key`.

# Examples

```rust
use std::collections::VecDeque;

let deque: VecDeque<_> = [1, 2, 3, 3, 5, 6, 7].into();
let i = deque.partition_point(|&x| x < 5);

assert_eq!(i, 4);
assert!(deque.iter().take(i).all(|&x| x < 5));
assert!(deque.iter().skip(i).all(|&x| !(x < 5)));
```

If you want to insert an item to a sorted deque, while maintaining
sort order:

```rust
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

```rust
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
