# std::format_kind

| Defined in header `<format>` |  |  |
| --- | --- | --- |
| `template< class R > constexpr /* unspecified */ format_kind = /* unspecified */;` | (1) | (since C++23) |
| `template< ranges::input_range R > requires std::same_as<R, std::remove_cvref_t<R>> constexpr range_format format_kind<R> = /* see description */;` | (2) | (since C++23) |

The variable template `format_kind` selects an appropriate `std::range_format` for a range `R`.

`std::format_kind<R>` is defined as follows:

- If `std::same_as<std::remove_cvref_t<ranges::range_reference_t<R>>, R>` is `true`, `std::format_kind<R>` is `std::range_format::disabled`.
- Otherwise, if `R::key_type` is valid and denotes a type:
  - If `R::mapped_type` is valid and denotes a type, let `U` be `std::remove_cvref_t<ranges::range_reference_t<R>>`.

If either `U` is a specialization of `std::pair` or `U` is a specialization of `std::tuple` and `std::tuple_size_v<U> == 2`, `std::format_kind<R>` is `std::range_format::map`.

- Otherwise, `std::format_kind<R>` is `std::range_format::set`.

- Otherwise, `std::format_kind<R>` is `std::range_format::sequence`.

A program that instantiates a primary template of the `format_kind` variable template is ill-formed.

Given a cv-unqualified program-defined type `T` that models `input_range`, a program can specialize `format_kind` for `T`. Such specializations are usable in constant expressions, and have type `const std::range_format`.

### Possible implementation

`namespace detail { template< typename > constexpr bool is_pair_or_tuple_2 = false; template< typename T, typename U > constexpr bool is_pair_or_tuple_2<std::pair<T, U>> = true; template< typename T, typename U > constexpr bool is_pair_or_tuple_2<std::tuple<T, U>> = true; template < typename T > requires std::is_reference_v<T> \|\| std::is_const_v<T> constexpr bool is_pair_or_tuple_2<T> = is_pair_or_tuple_2<std::remove_cvref_t<T>>; } template< class R > constexpr range_format format_kind = [] { static_assert(false, "instantiating a primary template is not allowed"); return range_format::disabled; }(); template< ranges::input_range R > requires std::same_as<R, std::remove_cvref_t<R>> constexpr range_format format_kind<R> = [] { if constexpr (std::same_as<std::remove_cvref_t<std::ranges::range_reference_t<R>>, R>) return range_format::disabled; else if constexpr (requires { typename R::key_type; }) { if constexpr (requires { typename R::mapped_type; } && detail::is_pair_or_tuple_2<std::ranges::range_reference_t<R>>) return range_format::map; else return range_format::set; } else return range_format::sequence; }();`

### Example

```cpp
#include <filesystem>
#include <format>
#include <map>
#include <set>
#include <vector>

struct A {};

static_assert(std::format_kind<std::vector<int>> == std::range_format::sequence);
static_assert(std::format_kind<std::map<int>> == std::range_format::map);
static_assert(std::format_kind<std::set<int>> == std::range_format::set);
static_assert(std::format_kind<std::filesystem::path> == std::range_format::disabled);
// ill-formed:
// static_assert(std::format_kind<A> == std::range_format::disabled);

int main() {}
```

### See also

range_format (C++23) specifies how a range should be formatted (enum)
