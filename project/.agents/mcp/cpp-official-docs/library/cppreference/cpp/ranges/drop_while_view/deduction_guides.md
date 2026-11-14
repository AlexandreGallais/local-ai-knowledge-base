# deduction guides for `std::ranges::drop_while_view`

| Defined in header `<ranges>` |  |
| --- | --- |
| `template< class R, class Pred > drop_while_view( R&&, Pred ) -> drop_while_view<views::all_t<R>, Pred>;` | (since C++20) |

The deduction guide is provided for `std::ranges::drop_while_view` to allow deduction from `range` and predicate.

### Example

This section is incomplete Reason: no example
