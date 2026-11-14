---
title: "alloc::vec::in_place_collect"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/vec/in_place_collect.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::vec::in_place_collect

Inplace iterate-and-collect specialization for `Vec`

Note: This documents Vec internals, some of the following sections explain implementation
details and are best read together with the source of this module.

The specialization in this module applies to iterators in the shape of
`source.adapter().adapter().adapter().collect::<Vec>()`
where `source` is an owning iterator obtained from `Vec<T>`, `Box<[T]>` (by conversion to `Vec`)
or `BinaryHeap<T>`, the adapters guarantee to consume enough items per step to make room
for the results (represented by `InPlaceIterable`), provide transitive access to `source`
(via `SourceIter`) and thus the underlying allocation.
And finally there are alignment and size constraints to consider, this is currently ensured via
const eval instead of trait bounds in the specialized `SpecFromIter` implementation.

By extension some other collections which use `collect::<Vec<_>>()` internally in their
`FromIterator` implementation benefit from this too.

Access to the underlying source goes through a further layer of indirection via the private
trait `AsVecIntoIter` to hide the implementation detail that other collections may use
`vec::IntoIter` internally.

In-place iteration depends on the interaction of several unsafe traits, implementation
details of multiple parts in the iterator pipeline and often requires holistic reasoning
across multiple structs since iterators are executed cooperatively rather than having
a central evaluator/visitor struct executing all iterator components.

#### Reading from and writing to the same allocation

By its nature collecting in place means that the reader and writer side of the iterator
use the same allocation. Since `try_fold()` (used in `SpecInPlaceCollect`) takes a
reference to the iterator for the duration of the iteration that means we can't interleave
the step of reading a value and getting a reference to write to. Instead raw pointers must be
used on the reader and writer side.

That writes never clobber a yet-to-be-read items is ensured by the `InPlaceIterable` requirements.

#### Layout constraints

When recycling an allocation between different types we must uphold the `Allocator` contract
which means that the input and output Layouts have to "fit".

To complicate things further `InPlaceIterable` supports splitting or merging items into smaller/
larger ones to enable (de)aggregation of arrays.

Ultimately each step of the iterator must free up enough *bytes* in the source to make room
for the next output item.
If `T` and `U` have the same size no fixup is needed.
If `T`'s size is a multiple of `U`'s we can compensate by multiplying the capacity accordingly.
Otherwise the input capacity (and thus layout) in bytes may not be representable by the output
`Vec`. In that case `alloc.shrink()` is used to update the allocation's layout.

Alignments of `T` must be the same or larger than `U`. Since alignments are always a power
of two _larger_ implies _is a multiple of_.

See `in_place_collectible()` for the current conditions.

Additionally this specialization doesn't make sense for ZSTs as there is no reallocation to
avoid and it would make pointer arithmetic more difficult.

#### Drop- and panic-safety

Iteration can panic, requiring dropping the already written parts but also the remainder of
the source. Iteration can also leave some source items unconsumed which must be dropped.
All those drops in turn can panic which then must either leak the allocation or abort to avoid
double-drops.

This is handled by the `InPlaceDrop` guard for sink items (`U`) and by
`vec::IntoIter::forget_allocation_drop_remaining()` for remaining source items (`T`).

If dropping any remaining source item (`T`) panics then `InPlaceDstDataSrcBufDrop` will handle dropping
the already collected sink items (`U`) and freeing the allocation.

#### O(1) collect

The main iteration itself is further specialized when the iterator implements
`TrustedRandomAccessNoCoerce` to let the optimizer see that it is a counted loop with a single
[induction variable]. This can turn some iterators into a noop, i.e. it reduces them from O(n) to
O(1). This particular optimization is quite fickle and doesn't always work, see [#79308]

Since unchecked accesses through that trait do not advance the read pointer of `IntoIter`
this would interact unsoundly with the requirements about dropping the tail described above.
But since the normal `Drop` implementation of `IntoIter` would suffer from the same problem it
is only correct for `TrustedRandomAccessNoCoerce` to be implemented when the items don't
have a destructor. Thus that implicit requirement also makes the specialization safe to use for
in-place collection.
Note that this safety concern is about the correctness of `impl Drop for IntoIter`,
not the guarantees of `InPlaceIterable`.

#### Adapter implementations

The invariants for adapters are documented in `SourceIter` and `InPlaceIterable`, but
getting them right can be rather subtle for multiple, sometimes non-local reasons.
For example `InPlaceIterable` would be valid to implement for `Peekable`, except
that it is stateful, cloneable and `IntoIter`'s clone implementation shortens the underlying
allocation which means if the iterator has been peeked and then gets cloned there no longer is
enough room, thus breaking an invariant ([#85322]).

#### Examples

Some cases that are optimized by this specialization, more can be found in the `Vec`
benchmarks:

```rust
/// Converts a usize vec into an isize one.
pub fn cast(vec: Vec<usize>) -> Vec<isize> {
  // Does not allocate, free or panic. On optlevel>=2 it does not loop.
  // Of course this particular case could and should be written with `into_raw_parts` and
  // `from_raw_parts` instead.
  vec.into_iter().map(|u| u as isize).collect()
}
```

```rust
/// Drops remaining items in `src` and if the layouts of `T` and `U` match it
/// returns an empty Vec backed by the original allocation. Otherwise it returns a new
/// empty vec.
pub fn recycle_allocation<T, U>(src: Vec<T>) -> Vec<U> {
  src.into_iter().filter_map(|_| None).collect()
}
```

```rust
let vec = vec![13usize; 1024];
let _ = vec.into_iter()
  .enumerate()
  .filter_map(|(idx, val)| if idx % 2 == 0 { Some(val+idx) } else {None})
  .collect::<Vec<_>>();

// is equivalent to the following, but doesn't require bounds checks

let mut vec = vec![13usize; 1024];
let mut write_idx = 0;
for idx in 0..vec.len() {
   if idx % 2 == 0 {
      vec[write_idx] = vec[idx] + idx;
      write_idx += 1;
   }
}
vec.truncate(write_idx);
```
