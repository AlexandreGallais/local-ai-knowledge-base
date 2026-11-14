# std::experimental::ranges::Range

| Defined in header `<experimental/ranges/range>` |  |
| --- | --- |
| `template< class T > concept bool Range = requires(T&& t) { ranges::begin(t); /* not necessarily equality-preserving (see below) */ ranges::end(t); };` | (ranges TS) |

Given an lvalue `t` of type `std::remove_reference_t<T>`, `Range<T>` is satisfied only if

- `[``ranges::begin(t)``,``ranges::end(t)``)` denotes a range; and
- both `ranges::begin(t)` and `ranges::end(t)` are amortized constant time and non-modifying.
- If `ranges::iterator_t<T>` satisfies `ForwardIterator`, `ranges::begin(t)` is equality preserving.
