# deduction guides for `std::ranges::common_view`

| Defined in header `<ranges>` |  |
| --- | --- |
| `template< class R > common_view( R&& ) -> common_view<views::all_t<R>>;` | (since C++20) |

The deduction guide is provided for `std::ranges::common_view` to allow deduction from `range`.

### Example

This section is incomplete Reason: no example
