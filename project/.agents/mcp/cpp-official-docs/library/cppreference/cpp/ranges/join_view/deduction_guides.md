# deduction guides for `std::ranges::join_view`

`template<class R> explicit join_view(R&&) -> join_view<views::all_t<R>>;` (since C++20)

The deduction guide is provided for `std::ranges::join_view` to allow deduction from `range`.

### Example

This section is incomplete Reason: no example
