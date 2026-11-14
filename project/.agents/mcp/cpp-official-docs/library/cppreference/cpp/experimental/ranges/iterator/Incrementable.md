# std::experimental::ranges::Incrementable

| Defined in header `<experimental/ranges/iterator>` |  |
| --- | --- |
| `template< class I > concept bool Incrementable = Regular<I> && WeaklyIncrementable<I> && requires(I i) { { i++ } -> Same<I>&&; };` | (ranges TS) |

The concept `Incrementable<I>` specifies the requirements on a type that can be incremented (with the pre- and post-increment operators). The increment operations (including those required by `WeaklyIncrementable`) are required to be equality-preserving, and the type is required to be `EqualityComparable`.

Let `a` and `b` be incrementable objects of type `I`. `Incrementable<I>` is satisfied only if:

- If `bool(a == b)` then `bool(a++ == b)`.
- If `bool(a == b)` then `bool(void(a++), a) == ++b)`.

### Equality preservation

An expression is *equality preserving* if it results in equal outputs given equal inputs.

- The inputs to an expression consist of its operands.
- The outputs of an expression consist of its result and all operands modified by the expression (if any).

Every expression required to be equality preserving is further required to be *stable*: two evaluations of such an expression with the same input objects must have equal outputs absent any explicit intervening modification of those input objects.

Unless noted otherwise, every expression used in a *requires-expression* is required to be equality preserving and stable, and the evaluation of the expression may only modify its non-constant operands. Operands that are constant must not be modified.

### Notes

The requirement that `a` equals `b` implies `++a` equals `++b` allows the use of multi-pass algorithms with `Incrementable` types.
