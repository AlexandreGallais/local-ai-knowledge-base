# deduction guides for `std::ranges::stride_view`

| Defined in header `<ranges>` |  |
| --- | --- |
| `template< class R > stride_view( R&&, ranges::range_difference_t<R> ) -> stride_view<views::all_t<R>>;` | (since C++23) |

The deduction guide is provided for `std::ranges::stride_view` to allow deduction from `range` and number of elements.

### Example

This section is incomplete Reason: no example
