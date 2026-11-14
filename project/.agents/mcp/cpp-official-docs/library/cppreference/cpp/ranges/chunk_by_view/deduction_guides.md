# deduction guides for `std::ranges::chunk_by_view`

`template< class R, class Pred > chunk_by_view( R&&, Pred ) -> chunk_by_view<views::all_t<R>, Pred>;` (since C++23)

The deduction guide is provided for `std::ranges::chunk_by_view` to allow deduction from `range` and predicate function.

### Example

This section is incomplete Reason: no example
