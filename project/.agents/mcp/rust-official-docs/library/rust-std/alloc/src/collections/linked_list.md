# alloc::collections::linked_list

A doubly-linked list with owned nodes.

The `LinkedList` allows pushing and popping elements at either end
in constant time.

NOTE: It is almost always better to use [`Vec`] or [`VecDeque`] because
array-based containers are generally faster,
more memory efficient, and make better use of CPU cache.

[`Vec`]: crate::vec::Vec
[`VecDeque`]: super::vec_deque::VecDeque

## struct LinkedList

```rust
pub struct LinkedList< T, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

A doubly-linked list with owned nodes.

The `LinkedList` allows pushing and popping elements at either end
in constant time.

A `LinkedList` with a known list of items can be initialized from an array:
```
use std::collections::LinkedList;

let list = LinkedList::from([1, 2, 3]);
```

NOTE: It is almost always better to use [`Vec`] or [`VecDeque`] because
array-based containers are generally faster,
more memory efficient, and make better use of CPU cache.

[`Vec`]: crate::vec::Vec
[`VecDeque`]: super::vec_deque::VecDeque

## struct Iter

```rust
pub struct Iter<'a, T: 'a>
```

An iterator over the elements of a `LinkedList`.

This `struct` is created by [`LinkedList::iter()`]. See its
documentation for more.

## struct IterMut

```rust
pub struct IterMut<'a, T: 'a>
```

A mutable iterator over the elements of a `LinkedList`.

This `struct` is created by [`LinkedList::iter_mut()`]. See its
documentation for more.

## struct IntoIter

```rust
pub struct IntoIter< T, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

An owning iterator over the elements of a `LinkedList`.

This `struct` is created by the [`into_iter`] method on [`LinkedList`]
(provided by the [`IntoIterator`] trait). See its documentation for more.

[`into_iter`]: LinkedList::into_iter

## LinkedList::new

```rust
pub const fn new() -> Self
```

Creates an empty `LinkedList`.

# Examples

```
use std::collections::LinkedList;

let list: LinkedList<u32> = LinkedList::new();
```

## LinkedList::append

```rust
pub fn append(&mut self, other: &mut Self)
```

Moves all elements from `other` to the end of the list.

This reuses all the nodes from `other` and moves them into `self`. After
this operation, `other` becomes empty.

This operation should compute in *O*(1) time and *O*(1) memory.

# Examples

```
use std::collections::LinkedList;

let mut list1 = LinkedList::new();
list1.push_back('a');

let mut list2 = LinkedList::new();
list2.push_back('b');
list2.push_back('c');

list1.append(&mut list2);

let mut iter = list1.iter();
assert_eq!(iter.next(), Some(&'a'));
assert_eq!(iter.next(), Some(&'b'));
assert_eq!(iter.next(), Some(&'c'));
assert!(iter.next().is_none());

assert!(list2.is_empty());
```

## LinkedList::iter

```rust
pub fn iter(&self) -> Iter<'_, T>
```

Provides a forward iterator.

# Examples

```
use std::collections::LinkedList;

let mut list: LinkedList<u32> = LinkedList::new();

list.push_back(0);
list.push_back(1);
list.push_back(2);

let mut iter = list.iter();
assert_eq!(iter.next(), Some(&0));
assert_eq!(iter.next(), Some(&1));
assert_eq!(iter.next(), Some(&2));
assert_eq!(iter.next(), None);
```

## LinkedList::iter_mut

```rust
pub fn iter_mut(&mut self) -> IterMut<'_, T>
```

Provides a forward iterator with mutable references.

# Examples

```
use std::collections::LinkedList;

let mut list: LinkedList<u32> = LinkedList::new();

list.push_back(0);
list.push_back(1);
list.push_back(2);

for element in list.iter_mut() {
    *element += 10;
}

let mut iter = list.iter();
assert_eq!(iter.next(), Some(&10));
assert_eq!(iter.next(), Some(&11));
assert_eq!(iter.next(), Some(&12));
assert_eq!(iter.next(), None);
```

## LinkedList::is_empty

```rust
pub fn is_empty(&self) -> bool
```

Returns `true` if the `LinkedList` is empty.

This operation should compute in *O*(1) time.

# Examples

```
use std::collections::LinkedList;

let mut dl = LinkedList::new();
assert!(dl.is_empty());

dl.push_front("foo");
assert!(!dl.is_empty());
```

## LinkedList::len

```rust
pub fn len(&self) -> usize
```

Returns the length of the `LinkedList`.

This operation should compute in *O*(1) time.

# Examples

```
use std::collections::LinkedList;

let mut dl = LinkedList::new();

dl.push_front(2);
assert_eq!(dl.len(), 1);

dl.push_front(1);
assert_eq!(dl.len(), 2);

dl.push_back(3);
assert_eq!(dl.len(), 3);
```

## LinkedList::clear

```rust
pub fn clear(&mut self)
```

Removes all elements from the `LinkedList`.

This operation should compute in *O*(*n*) time.

# Examples

```
use std::collections::LinkedList;

let mut dl = LinkedList::new();

dl.push_front(2);
dl.push_front(1);
assert_eq!(dl.len(), 2);
assert_eq!(dl.front(), Some(&1));

dl.clear();
assert_eq!(dl.len(), 0);
assert_eq!(dl.front(), None);
```

## LinkedList::contains

```rust
pub fn contains(&self, x: &T) -> bool where T: PartialEq<T>,
```

Returns `true` if the `LinkedList` contains an element equal to the
given value.

This operation should compute linearly in *O*(*n*) time.

# Examples

```
use std::collections::LinkedList;

let mut list: LinkedList<u32> = LinkedList::new();

list.push_back(0);
list.push_back(1);
list.push_back(2);

assert_eq!(list.contains(&0), true);
assert_eq!(list.contains(&10), false);
```

## LinkedList::front

```rust
pub fn front(&self) -> Option<&T>
```

Provides a reference to the front element, or `None` if the list is
empty.

This operation should compute in *O*(1) time.

# Examples

```
use std::collections::LinkedList;

let mut dl = LinkedList::new();
assert_eq!(dl.front(), None);

dl.push_front(1);
assert_eq!(dl.front(), Some(&1));
```

## LinkedList::front_mut

```rust
pub fn front_mut(&mut self) -> Option<&mut T>
```

Provides a mutable reference to the front element, or `None` if the list
is empty.

This operation should compute in *O*(1) time.

# Examples

```
use std::collections::LinkedList;

let mut dl = LinkedList::new();
assert_eq!(dl.front(), None);

dl.push_front(1);
assert_eq!(dl.front(), Some(&1));

match dl.front_mut() {
    None => {},
    Some(x) => *x = 5,
}
assert_eq!(dl.front(), Some(&5));
```

## LinkedList::back

```rust
pub fn back(&self) -> Option<&T>
```

Provides a reference to the back element, or `None` if the list is
empty.

This operation should compute in *O*(1) time.

# Examples

```
use std::collections::LinkedList;

let mut dl = LinkedList::new();
assert_eq!(dl.back(), None);

dl.push_back(1);
assert_eq!(dl.back(), Some(&1));
```

## LinkedList::back_mut

```rust
pub fn back_mut(&mut self) -> Option<&mut T>
```

Provides a mutable reference to the back element, or `None` if the list
is empty.

This operation should compute in *O*(1) time.

# Examples

```
use std::collections::LinkedList;

let mut dl = LinkedList::new();
assert_eq!(dl.back(), None);

dl.push_back(1);
assert_eq!(dl.back(), Some(&1));

match dl.back_mut() {
    None => {},
    Some(x) => *x = 5,
}
assert_eq!(dl.back(), Some(&5));
```

## LinkedList::push_front

```rust
pub fn push_front(&mut self, elt: T)
```

Adds an element to the front of the list.

This operation should compute in *O*(1) time.

# Examples

```
use std::collections::LinkedList;

let mut dl = LinkedList::new();

dl.push_front(2);
assert_eq!(dl.front().unwrap(), &2);

dl.push_front(1);
assert_eq!(dl.front().unwrap(), &1);
```

## LinkedList::push_front_mut

```rust
pub fn push_front_mut(&mut self, elt: T) -> &mut T
```

Adds an element to the front of the list, returning a reference to it.

This operation should compute in *O*(1) time.

# Examples

```
use std::collections::LinkedList;

let mut dl = LinkedList::from([1, 2, 3]);

let ptr = dl.push_front_mut(2);
*ptr += 4;
assert_eq!(dl.front().unwrap(), &6);
```

## LinkedList::pop_front

```rust
pub fn pop_front(&mut self) -> Option<T>
```

Removes the first element and returns it, or `None` if the list is
empty.

This operation should compute in *O*(1) time.

# Examples

```
use std::collections::LinkedList;

let mut d = LinkedList::new();
assert_eq!(d.pop_front(), None);

d.push_front(1);
d.push_front(3);
assert_eq!(d.pop_front(), Some(3));
assert_eq!(d.pop_front(), Some(1));
assert_eq!(d.pop_front(), None);
```

## LinkedList::push_back

```rust
pub fn push_back(&mut self, elt: T)
```

Adds an element to the back of the list.

This operation should compute in *O*(1) time.

# Examples

```
use std::collections::LinkedList;

let mut d = LinkedList::new();
d.push_back(1);
d.push_back(3);
assert_eq!(3, *d.back().unwrap());
```

## LinkedList::push_back_mut

```rust
pub fn push_back_mut(&mut self, elt: T) -> &mut T
```

Adds an element to the back of the list, returning a reference to it.

This operation should compute in *O*(1) time.

# Examples

```
use std::collections::LinkedList;

let mut dl = LinkedList::from([1, 2, 3]);

let ptr = dl.push_back_mut(2);
*ptr += 4;
assert_eq!(dl.back().unwrap(), &6);
```

## LinkedList::pop_back

```rust
pub fn pop_back(&mut self) -> Option<T>
```

Removes the last element from a list and returns it, or `None` if
it is empty.

This operation should compute in *O*(1) time.

# Examples

```
use std::collections::LinkedList;

let mut d = LinkedList::new();
assert_eq!(d.pop_back(), None);
d.push_back(1);
d.push_back(3);
assert_eq!(d.pop_back(), Some(3));
```

## LinkedList::split_off

```rust
pub fn split_off(&mut self, at: usize) -> LinkedList<T, A> where A: AllocatorClone,
```

Splits the list into two at the given index. Returns everything after the given index,
including the index.

This operation should compute in *O*(*n*) time.

# Panics

Panics if `at > len`.

# Examples

```
use std::collections::LinkedList;

let mut d = LinkedList::new();

d.push_front(1);
d.push_front(2);
d.push_front(3);

let mut split = d.split_off(2);

assert_eq!(split.pop_front(), Some(1));
assert_eq!(split.pop_front(), None);
```

## LinkedList::extract_if

```rust
pub fn extract_if<F>(&mut self, filter: F) -> ExtractIf<'_, T, F, A> where F: FnMut(&mut T) -> bool,
```

Creates an iterator which uses a closure to determine if an element should be removed.

If the closure returns `true`, the element is removed from the list and
yielded. If the closure returns `false`, or panics, the element remains
in the list and will not be yielded.

If the returned `ExtractIf` is not exhausted, e.g. because it is dropped without iterating
or the iteration short-circuits, then the remaining elements will be retained.
Use `extract_if().for_each(drop)` if you do not need the returned iterator.

The iterator also lets you mutate the value of each element in the
closure, regardless of whether you choose to keep or remove it.

# Examples

Splitting a list into even and odd values, reusing the original list:

```
use std::collections::LinkedList;

let mut numbers: LinkedList<u32> = LinkedList::new();
numbers.extend(&[1, 2, 3, 4, 5, 6, 8, 9, 11, 13, 14, 15]);

let evens = numbers.extract_if(|x| *x % 2 == 0).collect::<LinkedList<_>>();
let odds = numbers;

assert_eq!(evens.into_iter().collect::<Vec<_>>(), vec![2, 4, 6, 8, 14]);
assert_eq!(odds.into_iter().collect::<Vec<_>>(), vec![1, 3, 5, 9, 11, 13, 15]);
```

## struct ExtractIf

```rust
pub struct ExtractIf< 'a, T: 'a, F: 'a, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

This `struct` is created by the [`extract_if`] method on [`LinkedList`].

[`extract_if`]: LinkedList::extract_if