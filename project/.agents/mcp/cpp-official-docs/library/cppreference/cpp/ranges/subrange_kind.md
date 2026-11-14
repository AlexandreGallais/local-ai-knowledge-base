# std::ranges::subrange_kind

| Defined in header `<ranges>` |  |
| --- | --- |
| `enum class subrange_kind : bool { unsized, sized };` | (since C++20) |

Specifies if a `std::ranges::subrange` models `std::ranges::sized_range` or not.

### Constants

| Name | Explanation |
| --- | --- |
| `unsized` | specifies that the `subrange` does not model `sized_range` |
| `sized` | specifies that the `subrange` does model `sized_range` |
