# std::experimental::ranges::Iterator

| Defined in header `<experimental/ranges/iterator>` |  |
| --- | --- |
| `template< class I > concept bool Iterator = requires(I i) { { *i } -> auto&&; // Requires: i is dereferenceable } && WeaklyIncrementable<I>;` | (ranges TS) |

The `Iterator` concept forms the basis of the iterator concept taxonomy; every iterator satisfies the `Iterator` requirements.

### Equality preservation

An expression is *equality preserving* if it results in equal outputs given equal inputs.

- The inputs to an expression consist of its operands.
- The outputs of an expression consist of its result and all operands modified by the expression (if any).

Every expression required to be equality preserving is further required to be *stable*: two evaluations of such an expression with the same input objects must have equal outputs absent any explicit intervening modification of those input objects.

Unless noted otherwise, every expression used in a *requires-expression* is required to be equality preserving and stable, and the evaluation of the expression may only modify its non-constant operands. Operands that are constant must not be modified.

### Notes

`Iterator` itself only specifies operations for dereferencing and incrementing an iterator. Most algorithms will require additional operations, for example:

- comparing iterators with sentinels (see `Sentinel`);
- reading values from an iterator (see `Readable` and `InputIterator`);
- writing values to an iterator (see `Writable` and `OutputIterator`);
- a richer set of iterator movements (see `ForwardIterator`, `BidirectionalIterator`, `RandomAccessIterator`).

The `-> auto&&` constraint implies that the result type of the deference cannot be `void`.
