# deduction guides for `std::ranges::zip_transform_view`

`template< class F, class... Rs > zip_transform_view( F, Rs&&... ) -> zip_transform_view<F, views::all_t<Rs>...>;` (since C++23)

The deduction guide is provided for `std::ranges::zip_transform_view` to allow deduction from transformation function and `range`s.

### Example

This section is incomplete Reason: example
