# deduction guides for `std::ranges::chunk_view`

| Defined in header `<ranges>` |  |
| --- | --- |
| `template< class R > chunk_view( R&&, ranges::range_difference_t<R> ) -> chunk_view<views::all_t<R>>;` | (since C++23) |

The deduction guide is provided for `ranges::chunk_view` only if `V` models the `input_range`. This guide allows deduction from `range` and number of elements.

### Example

This section is incomplete Reason: no example
