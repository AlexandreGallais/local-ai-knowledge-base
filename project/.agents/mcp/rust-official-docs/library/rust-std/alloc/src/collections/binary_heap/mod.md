---
title: "alloc::collections::binary_heap (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/collections/binary_heap/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::collections::binary_heap

A priority queue implemented with a binary heap.

Insertion and popping the largest element have *O*(log(*n*)) time complexity.
Checking the largest element is *O*(1). Converting a vector to a binary heap
can be done in-place, and has *O*(*n*) complexity. A binary heap can also be
converted to a sorted vector in-place, allowing it to be used for an *O*(*n* * log(*n*))
in-place heapsort.

#### Examples

This is a larger example that implements Dijkstra's algorithm
to solve the shortest path problem on a directed graph.
It shows how to use `BinaryHeap` with custom types.

```rust
use std::cmp::Ordering;
use std::collections::BinaryHeap;

#[derive(Copy, Clone, Eq, PartialEq)]
struct State {
    cost: usize,
    position: usize,
}

// The priority queue depends on `Ord`.
// Explicitly implement the trait so the queue becomes a min-heap
// instead of a max-heap.
impl Ord for State {
    fn cmp(&self, other: &Self) -> Ordering {
        // Notice that we flip the ordering on costs.
        // In case of a tie we compare positions - this step is necessary
        // to make implementations of `PartialEq` and `Ord` consistent.
        other.cost.cmp(&self.cost)
            .then_with(|| self.position.cmp(&other.position))
    }
}

// `PartialOrd` needs to be implemented as well.
impl PartialOrd for State {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

// Each node is represented as a `usize`, for a shorter implementation.
struct Edge {
    node: usize,
    cost: usize,
}

// Dijkstra's shortest path algorithm.

// Start at `start` and use `dist` to track the current shortest distance
// to each node. This implementation isn't memory-efficient as it may leave duplicate
// nodes in the queue. It also uses `usize::MAX` as a sentinel value,
// for a simpler implementation.
fn shortest_path(adj_list: &Vec<Vec<Edge>>, start: usize, goal: usize) -> Option<usize> {
    // dist[node] = current shortest distance from `start` to `node`
    let mut dist: Vec<_> = (0..adj_list.len()).map(|_| usize::MAX).collect();

    let mut heap = BinaryHeap::new();

    // We're at `start`, with a zero cost
    dist[start] = 0;
    heap.push(State { cost: 0, position: start });

    // Examine the frontier with lower cost nodes first (min-heap)
    while let Some(State { cost, position }) = heap.pop() {
        // Alternatively we could have continued to find all shortest paths
        if position == goal { return Some(cost); }

        // Important as we may have already found a better way
        if cost > dist[position] { continue; }

        // For each node we can reach, see if we can find a way with
        // a lower cost going through this node
        for edge in &adj_list[position] {
            let next = State { cost: cost + edge.cost, position: edge.node };

            // If so, add it to the frontier and continue
            if next.cost < dist[next.position] {
                heap.push(next);
                // Relaxation, we have now found a better way
                dist[next.position] = next.cost;
            }
        }
    }

    // Goal not reachable
    None
}

fn main() {
    // This is the directed graph we're going to use.
    // The node numbers correspond to the different states,
    // and the edge weights symbolize the cost of moving
    // from one node to another.
    // Note that the edges are one-way.
    //
    //                  7
    //          +-----------------+
    //          |                 |
    //          v   1        2    |  2
    //          0 -----> 1 -----> 3 ---> 4
    //          |        ^        ^      ^
    //          |        | 1      |      |
    //          |        |        | 3    | 1
    //          +------> 2 -------+      |
    //           10      |               |
    //                   +---------------+
    //
    // The graph is represented as an adjacency list where each index,
    // corresponding to a node value, has a list of outgoing edges.
    // Chosen for its efficiency.
    let graph = vec![
        // Node 0
        vec![Edge { node: 2, cost: 10 },
             Edge { node: 1, cost: 1 }],
        // Node 1
        vec![Edge { node: 3, cost: 2 }],
        // Node 2
        vec![Edge { node: 1, cost: 1 },
             Edge { node: 3, cost: 3 },
             Edge { node: 4, cost: 1 }],
        // Node 3
        vec![Edge { node: 0, cost: 7 },
             Edge { node: 4, cost: 2 }],
        // Node 4
        vec![]];

    assert_eq!(shortest_path(&graph, 0, 1), Some(1));
    assert_eq!(shortest_path(&graph, 0, 3), Some(3));
    assert_eq!(shortest_path(&graph, 3, 0), Some(7));
    assert_eq!(shortest_path(&graph, 0, 4), Some(5));
    assert_eq!(shortest_path(&graph, 4, 0), None);
}
```

## struct BinaryHeap

```rust
pub struct BinaryHeap< T, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

A priority queue implemented with a binary heap.

This will be a max-heap.

It is a logic error for an item to be modified in such a way that the
item's ordering relative to any other item, as determined by the `Ord`
trait, changes while it is in the heap. This is normally only possible
through interior mutability, global state, I/O, or unsafe code. The
behavior resulting from such a logic error is not specified, but will
be encapsulated to the `BinaryHeap` that observed the logic error and not
result in undefined behavior. This could include panics, incorrect results,
aborts, memory leaks, and non-termination.

As long as no elements change their relative order while being in the heap
as described above, the API of `BinaryHeap` guarantees that the heap
invariant remains intact i.e. its methods all behave as documented. For
example if a method is documented as iterating in sorted order, that's
guaranteed to work as long as elements in the heap have not changed order,
even in the presence of closures getting unwinded out of, iterators getting
leaked, and similar foolishness.

# Examples

```rust
use std::collections::BinaryHeap;

// Type inference lets us omit an explicit type signature (which
// would be `BinaryHeap<i32>` in this example).
let mut heap = BinaryHeap::new();

// We can use peek to look at the next item in the heap. In this case,
// there's no items in there yet so we get None.
assert_eq!(heap.peek(), None);

// Let's add some scores...
heap.push(1);
heap.push(5);
heap.push(2);

// Now peek shows the most important item in the heap.
assert_eq!(heap.peek(), Some(&5));

// We can check the length of a heap.
assert_eq!(heap.len(), 3);

// We can iterate over the items in the heap, although they are returned in
// a random order.
for x in &heap {
    println!("{x}");
}

// If we instead pop these scores, they should come back in order.
assert_eq!(heap.pop(), Some(5));
assert_eq!(heap.pop(), Some(2));
assert_eq!(heap.pop(), Some(1));
assert_eq!(heap.pop(), None);

// We can clear the heap of any remaining items.
heap.clear();

// The heap should now be empty.
assert!(heap.is_empty())
```

A `BinaryHeap` with a known list of items can be initialized from an array:

```rust
use std::collections::BinaryHeap;

let heap = BinaryHeap::from([1, 5, 2]);
```

## Min-heap

Either `core::cmp::Reverse` or a custom `Ord` implementation can be used to
make `BinaryHeap` a min-heap. This makes `heap.pop()` return the smallest
value instead of the greatest one.

```rust
use std::collections::BinaryHeap;
use std::cmp::Reverse;

let mut heap = BinaryHeap::new();

// Wrap values in `Reverse`
heap.push(Reverse(1));
heap.push(Reverse(5));
heap.push(Reverse(2));

// If we pop these scores now, they should come back in the reverse order.
assert_eq!(heap.pop(), Some(Reverse(1)));
assert_eq!(heap.pop(), Some(Reverse(2)));
assert_eq!(heap.pop(), Some(Reverse(5)));
assert_eq!(heap.pop(), None);
```

# Time complexity

| [push]  | [pop]         | [peek]/[peek\_mut] |
|---------|---------------|--------------------|
| *O*(1)~ | *O*(log(*n*)) | *O*(1)             |

The value for `push` is an expected cost; the method documentation gives a
more detailed analysis.

## struct PeekMut

```rust
pub struct PeekMut< 'a, T: 'a + Ord, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

Structure wrapping a mutable reference to the greatest item on a
`BinaryHeap`.

This `struct` is created by the `peek_mut` method on `BinaryHeap`. See
its documentation for more.

## PeekMut::pop

```rust
pub fn pop(mut this: PeekMut<'a, T, A>) -> T
```

Removes the peeked value from the heap and returns it.

## BinaryHeap::new

```rust
pub const fn new() -> BinaryHeap<T>
```

Creates an empty `BinaryHeap` as a max-heap.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;
let mut heap = BinaryHeap::new();
heap.push(4);
```

## BinaryHeap::with_capacity

```rust
pub fn with_capacity(capacity: usize) -> BinaryHeap<T>
```

Creates an empty `BinaryHeap` with at least the specified capacity.

The binary heap will be able to hold at least `capacity` elements without
reallocating. This method is allowed to allocate for more elements than
`capacity`. If `capacity` is zero, the binary heap will not allocate.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;
let mut heap = BinaryHeap::with_capacity(10);
heap.push(4);
```

## BinaryHeap::peek_mut

```rust
pub fn peek_mut(&mut self) -> Option<PeekMut<'_, T, A>>
```

Returns a mutable reference to the greatest item in the binary heap, or
`None` if it is empty.

Note: If the `PeekMut` value is leaked, some heap elements might get
leaked along with it, but the remaining elements will remain a valid
heap.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;
let mut heap = BinaryHeap::new();
assert!(heap.peek_mut().is_none());

heap.push(1);
heap.push(5);
heap.push(2);
if let Some(mut val) = heap.peek_mut() {
    *val = 0;
}
assert_eq!(heap.peek(), Some(&2));
```

# Time complexity

If the item is modified then the worst case time complexity is *O*(log(*n*)),
otherwise it's *O*(1).

## BinaryHeap::pop

```rust
pub fn pop(&mut self) -> Option<T>
```

Removes the greatest item from the binary heap and returns it, or `None` if it
is empty.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;
let mut heap = BinaryHeap::from([1, 3]);

assert_eq!(heap.pop(), Some(3));
assert_eq!(heap.pop(), Some(1));
assert_eq!(heap.pop(), None);
```

# Time complexity

The worst case cost of `pop` on a heap containing *n* elements is *O*(log(*n*)).

## BinaryHeap::push

```rust
pub fn push(&mut self, item: T)
```

Pushes an item onto the binary heap.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;
let mut heap = BinaryHeap::new();
heap.push(3);
heap.push(5);
heap.push(1);

assert_eq!(heap.len(), 3);
assert_eq!(heap.peek(), Some(&5));
```

# Time complexity

The expected cost of `push`, averaged over every possible ordering of
the elements being pushed, and over a sufficiently large number of
pushes, is *O*(1). This is the most meaningful cost metric when pushing
elements that are *not* already in any sorted pattern.

The time complexity degrades if elements are pushed in predominantly
ascending order. In the worst case, elements are pushed in ascending
sorted order and the amortized cost per push is *O*(log(*n*)) against a heap
containing *n* elements.

The worst case cost of a *single* call to `push` is *O*(*n*). The worst case
occurs when capacity is exhausted and needs a resize. The resize cost
has been amortized in the previous figures.

## BinaryHeap::into_sorted_vec

```rust
pub fn into_sorted_vec(mut self) -> Vec<T, A>
```

Consumes the `BinaryHeap` and returns a vector in sorted
(ascending) order.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;

let mut heap = BinaryHeap::from([1, 2, 4, 5, 7]);
heap.push(6);
heap.push(3);

let vec = heap.into_sorted_vec();
assert_eq!(vec, [1, 2, 3, 4, 5, 6, 7]);
```

## BinaryHeap::append

```rust
pub fn append(&mut self, other: &mut Self)
```

Moves all the elements of `other` into `self`, leaving `other` empty.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;

let mut a = BinaryHeap::from([-10, 1, 2, 3, 3]);
let mut b = BinaryHeap::from([-20, 5, 43]);

a.append(&mut b);

assert_eq!(a.into_sorted_vec(), [-20, -10, 1, 2, 3, 3, 5, 43]);
assert!(b.is_empty());
```

## BinaryHeap::retain

```rust
pub fn retain<F>(&mut self, mut f: F) where F: FnMut(&T) -> bool,
```

Retains only the elements specified by the predicate.

In other words, remove all elements `e` for which `f(&e)` returns
`false`. The elements are visited in unsorted (and unspecified) order.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;

let mut heap = BinaryHeap::from([-10, -5, 1, 2, 4, 13]);

heap.retain(|x| x % 2 == 0); // only keep even numbers

assert_eq!(heap.into_sorted_vec(), [-10, 2, 4])
```

## BinaryHeap::iter

```rust
pub fn iter(&self) -> Iter<'_, T>
```

Returns an iterator visiting all values in the underlying vector, in
arbitrary order.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;
let heap = BinaryHeap::from([1, 2, 3, 4]);

// Print 1, 2, 3, 4 in arbitrary order
for x in heap.iter() {
    println!("{x}");
}
```

## BinaryHeap::peek

```rust
pub fn peek(&self) -> Option<&T>
```

Returns the greatest item in the binary heap, or `None` if it is empty.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;
let mut heap = BinaryHeap::new();
assert_eq!(heap.peek(), None);

heap.push(1);
heap.push(5);
heap.push(2);
assert_eq!(heap.peek(), Some(&5));

```

# Time complexity

Cost is *O*(1) in the worst case.

## BinaryHeap::capacity

```rust
pub fn capacity(&self) -> usize
```

Returns the number of elements the binary heap can hold without reallocating.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;
let mut heap = BinaryHeap::with_capacity(100);
assert!(heap.capacity() >= 100);
heap.push(4);
```

## BinaryHeap::reserve_exact

```rust
pub fn reserve_exact(&mut self, additional: usize)
```

Reserves the minimum capacity for at least `additional` elements more than
the current length. Unlike `reserve`, this will not
deliberately over-allocate to speculatively avoid frequent allocations.
After calling `reserve_exact`, capacity will be greater than or equal to
`self.len() + additional`. Does nothing if the capacity is already
sufficient.

# Panics

Panics if the new capacity overflows `usize`.

# Examples

Basic usage:

```rust
use std::collections::BinaryHeap;
let mut heap = BinaryHeap::new();
heap.reserve_exact(100);
assert!(heap.capacity() >= 100);
heap.push(4);
```
