# std::layout_stride::mapping<Extents>::*mapping-traits*

|  |  |  |
| --- | --- | --- |
| `static constexpr bool is_unique() noexcept;` | (1) | (since C++23) |
| `constexpr bool is_exhaustive() const noexcept;` | (2) | (since C++23) |
| `static constexpr bool is_strided() noexcept;` | (3) | (since C++23) |
| `static constexpr bool is_always_unique() noexcept;` | (4) | (since C++23) |
| `static constexpr bool is_always_exhaustive() noexcept;` | (5) | (since C++23) |
| `static constexpr bool is_always_strided() noexcept;` | (6) | (since C++23) |

Every instance of every specialization of `mapping` is unique and strided.

The mapping is exhaustive if one of the following conditions is `true`:

- `rank_` is `​0​`, or
- there exists a permutation `p` of the integers in the range `[``​0​``,``rank_``)` such that:

- `stride(p[0])` equals `1` and
- `stride(p[i])` equals `stride(p[i - 1]) * extents().extent(p[i - 1])`

for all `i` in `[``1``,``rank_``)`, where `p[i]` is the ith element of `p`.

(`rank_` is an exposition-only static member constant defined in `std::layout_stride::mapping`.)

See LayoutMapping for the semantics of these predicate mapping traits.

### Parameters

(none)

### Return value

1,3-4,6) `true`

2) `true` if the mapping is exhaustive (see above)

5) `false`

### Example

This section is incomplete Reason: no example

### See also

This section is incomplete
