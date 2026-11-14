---
title: "alloc::vec (part 4 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/vec/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::vec (part 4 of 5)

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
will remain valid when mixed with other calls to `as_ptr`, `as_mut_ptr`,
and `as_non_null`.
Note that calling other methods that materialize references to the slice,
or references to specific elements you are planning on accessing through this pointer,
may still invalidate this pointer.
See the second example below for how this guarantee can be used.

The method also guarantees that, as long as `T` is not zero-sized and the capacity is
nonzero, the pointer may be passed into `dealloc` with a layout of
`Layout::array::<T>(capacity)` in order to deallocate the backing memory. If this is done,
be careful not to run the destructor of the `Vec`, as dropping it will result in
double-frees. Wrapping the `Vec` in a `ManuallyDrop` is the typical way to achieve this.

# Examples

```rust
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

Deallocating a vector using `Box` (which uses `dealloc` internally):

```rust
use std::mem::{ManuallyDrop, MaybeUninit};

let mut v = ManuallyDrop::new(vec![0, 1, 2]);
let ptr = v.as_mut_ptr();
let capacity = v.capacity();
let slice_ptr: *mut [MaybeUninit<i32>] =
    std::ptr::slice_from_raw_parts_mut(ptr.cast(), capacity);
drop(unsafe { Box::from_raw(slice_ptr) });
```

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
`truncate`, `resize`, `extend`, or `clear`.

# Safety

- `new_len` must be less than or equal to `capacity()`.
- The elements at `old_len..new_len` must be initialized.

# Examples

See `spare_capacity_mut()` for an example with safe
initialization of capacity elements and use of this method.

`set_len()` can be useful for situations in which the vector
is serving as a buffer for other code, particularly over FFI:

```rust
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
```

While the following example is sound, there is a memory leak since
the inner vectors were not freed prior to the `set_len` call:

```rust
let mut vec = vec![vec![1, 0, 0],
                   vec![0, 1, 0],
                   vec![0, 0, 1]];
// SAFETY:
// 1. `old_len..0` is empty so no elements need to be initialized.
// 2. `0 <= capacity` always holds whatever `capacity` is.
unsafe {
    vec.set_len(0);
}
```

Normally, here, one would use `clear` instead to correctly drop
the contents and thus not leak memory.

## Vec::swap_remove

```rust
pub fn swap_remove(&mut self, index: usize) -> T
```

Removes an element from the vector and returns it.

The removed element is replaced by the last element of the vector.

This does not preserve ordering of the remaining elements, but is *O*(1).
If you need to preserve the element order, use `remove` instead.

# Panics

Panics if `index` is out of bounds.

# Examples

```rust
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

```rust
let mut vec = vec!['a', 'b', 'c'];
vec.insert(1, 'd');
assert_eq!(vec, ['a', 'd', 'b', 'c']);
vec.insert(4, 'e');
assert_eq!(vec, ['a', 'd', 'b', 'c', 'e']);
```

# Time complexity

Takes *O*(`Vec::len`) time. All items after the insertion index must be
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

```rust
let mut vec = vec![1, 3, 5, 9];
let x = vec.insert_mut(3, 6);
*x += 1;
assert_eq!(vec, [1, 3, 5, 7, 9]);
```

# Time complexity

Takes *O*(`Vec::len`) time. All items after the insertion index must be
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
to be preserved, use `swap_remove` instead. If you'd like to remove
elements from the beginning of the `Vec`, consider using
`VecDeque::pop_front` instead.

# Panics

Panics if `index` is out of bounds.

# Examples

```rust
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

```rust
let mut vec = vec![1, 2, 3, 4];
vec.retain(|&x| x % 2 == 0);
assert_eq!(vec, [2, 4]);
```

Because the elements are visited exactly once in the original order,
external state may be used to decide which elements to keep.

```rust
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

```rust
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

```rust
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
so `same_bucket(x, p)` is receiving them in reversed order (unlike `windows`).

If the vector is sorted, this removes all duplicates. For more complicated predicates
however, the order (ascending vs. descending) can matter.

# Examples

```rust
let mut vec = vec!["foo", "bar", "Bar", "baz", "bar"];
vec.dedup_by(|x, p| x.eq_ignore_ascii_case(p));
assert_eq!(vec, ["foo", "bar", "baz", "bar"]);
```

Both references passed to `same_bucket` are mutable.
This allows merging elements by mutating `p` and returning `true`:

```rust
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

Removes the last element from a vector and returns it, or `None` if it
is empty.

If you'd like to pop the first element, consider using
`VecDeque::pop_front` instead.

# Examples

```rust
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
returns `true`, or `None` if the predicate returns false or the vector
is empty (the predicate will not be called in that case).

# Examples

```rust
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

```rust
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
`mem::forget`, for example), the vector may have lost and leaked
elements arbitrarily, including elements outside the range.

# Examples

```rust
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

```rust
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

```rust
let a = vec![1, 2, 3];
assert_eq!(a.len(), 3);
```

## Vec::is_empty

```rust
pub const fn is_empty(&self) -> bool
```

Returns `true` if the vector contains no elements.

# Examples

```rust
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
  the vector, see `mem::take` or `mem::replace`.
- If you don't need the returned vector at all, see `Vec::truncate`.
- If you want to take ownership of an arbitrary subslice, or you don't
  necessarily want to store the removed items in a vector, see `Vec::drain`.

# Panics

Panics if `at > len`.

# Examples

```rust
let mut vec = vec!['a', 'b', 'c'];
let vec2 = vec.split_off(1);
assert_eq!(vec, ['a']);
assert_eq!(vec2, ['b', 'c']);
```
