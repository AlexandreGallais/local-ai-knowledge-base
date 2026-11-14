# std::weakly_incrementable

| Defined in header `<iterator>` |  |
| --- | --- |
| `template< class I > concept weakly_incrementable = std::movable<I> && requires(I i) { typename std::iter_difference_t<I>; requires /*is-signed-integer-like*/<std::iter_difference_t<I>>; { ++i } -> std::same_as<I&>; // not required to be equality-preserving i++; // not required to be equality-preserving };` | (since C++20) |

For the definition of `/*is-signed-integer-like*/`, see `is-integer-like` .

This concept specifies requirements on types that can be incremented with the pre- and post-increment operators, but those increment operations are not necessarily equality-preserving, and the type itself is not required to be `std::equality_comparable`.

For `std::weakly_incrementable` types, `a == b` does not imply that `++a == ++b`. Algorithms on weakly incrementable types must be single-pass algorithms. These algorithms can be used with istreams as the source of the input data through `std::istream_iterator`.

### Semantic requirements

For an object `i` of type `I`, `I` models `std::weakly_incrementable` only if all following conditions are satisfied:

- The expressions `++i` and `i++` have the same domain.
- If `i` is incrementable, then both `++i` and `i++` advance `i`.
- If `i` is incrementable, then `std::addressof(++i) == std::addressof(i)`.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| P2325R3 | C++20 | `default_initializable` was required | not required |

### See also

incrementable (C++20) specifies that the increment operation on a **`weakly_incrementable`** type is equality-preserving and that the type is `equality_comparable` (concept)
