# deduction guides for `std::ranges::take_view`

| Defined in header `<ranges>` |  |
| --- | --- |
| `template< class R > take_view( R&&, ranges::range_difference_t<R> ) -> take_view<views::all_t<R>>;` | (since C++20) |

The deduction guide is provided for `std::ranges::take_view` to allow deduction from `range` and number of elements.

### Example

This section is incomplete Reason: no example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3447 | C++20 | the template parameter `R` is constrained with `range` | `R` is unconstrained (but `range_difference_t` requires `range`) |
