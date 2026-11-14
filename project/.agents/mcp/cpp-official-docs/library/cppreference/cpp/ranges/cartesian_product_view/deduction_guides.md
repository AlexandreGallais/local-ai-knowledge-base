# deduction guides for `std::ranges::cartesian_product_view`

| Defined in header `<ranges>` |  |
| --- | --- |
| `template< class... Rs > cartesian_product_view( Rs&&... ) -> cartesian_product_view<views::all_t<Rs>...>;` | (since C++23) |

The deduction guide is provided for `std::ranges::cartesian_product_view` to allow deduction from `range`s.

### Example

This section is incomplete Reason: no example
