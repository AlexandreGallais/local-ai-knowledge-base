# std::experimental::ranges::Sentinel

| Defined in header `<experimental/ranges/iterator>` |  |
| --- | --- |
| `template< class S, class I > concept bool Sentinel = Semiregular<S> && Iterator<I> && WeaklyEqualityComparableWith<S, I>;` | (ranges TS) |

The `Sentinel` concept specifies the relationship between an `Iterator` type and a `Semiregular` type whose values denote a range.

Let `s` and `i` be values of type `S` and `I`, respectively, such that `[``i``,``s``)` denotes a range. `Sentinel<S, I>` is satisfied only if:

- `i == s` is well-defined.
- If `bool(i != s)` then `i` is dereferenceable and `[``++i``,``s``)` denotes a range.

The domain of `==` can change over time. Given an iterator `i` and sentinel `s` such that `[``i``,``s``)` denotes a range and `i != s`, `[``i``,``s``)` is not required to continue to denote a range after incrementing any iterator equal to `i` (and so `i == s` is no longer required to be well-defined after such an increment).
