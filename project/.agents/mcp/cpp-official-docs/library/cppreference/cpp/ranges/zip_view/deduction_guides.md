# deduction guides for `std::ranges::zip_view`

`template< class... Rs > zip_view( Rs&&... ) -> zip_view<views::all_t<Rs>...>;` (since C++23)

The deduction guide is provided for `std::ranges::zip_view` to allow deduction from `range`s.

### Example

This section is incomplete Reason: example
