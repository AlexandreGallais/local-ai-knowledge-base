# std::ranges::views::join, std::ranges::join_view

| Defined in header `<ranges>` |  |  |
| --- | --- | --- |
| `template< ranges::input_range V > requires ranges::view<V> and ranges::input_range<ranges::range_reference_t<V>> class join_view : public ranges::view_interface<join_view<V>>` | (1) | (since C++20) |
| `namespace views { inline constexpr /* unspecified */ join = /* unspecified */; }` | (2) | (since C++20) |
| Call signature |  |  |
| `template< ranges::viewable_range R > requires /* see below */ constexpr ranges::view auto join( R&& r );` |  | (since C++20) |

1) A range adaptor that represents `view` consisting of the sequence obtained from flattening a view of ranges.

2) RangeAdaptorObject (and also RangeAdaptorClosureObject). The expression `views::join(e)` is expression-equivalent to `join_view<views::all_t<decltype((e))>>{e}` for any suitable subexpressions `e`.

`join_view` models `input_range`.

`join_view` models `forward_range` when:

- `ranges::range_reference_t<V>` is a reference type, and
- `V` and `ranges::range_reference_t<V>` each model `forward_range`.

`join_view` models `bidirectional_range` when:

- `ranges::range_reference_t<V>` is a reference type,
- `V` models `bidirectional_range`, and
- `ranges::range_reference_t<V>` models both `bidirectional_range` and `common_range`.

`join_view` models `common_range` when:

- `ranges::range_reference_t<V>` is a reference type, and
- `V` and `ranges::range_reference_t<V>` each model `forward_range` and `common_range`.

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `join_view` (public member function) |
| base | returns a copy of the underlying (adapted) view (public member function) |
| begin | returns an iterator to the beginning (public member function) |
| end | returns an iterator or a sentinel to the end (public member function) |
| Inherited from `std::ranges::view_interface` |  |
| empty | returns whether the derived view is empty. Provided if it satisfies `sized_range` or `forward_range`. (public member function of `std::ranges::view_interface<D>`) |
| cbegin (C++23) | returns a constant iterator to the beginning of the range. (public member function of `std::ranges::view_interface<D>`) |
| cend (C++23) | returns a sentinel for the constant iterator of the range. (public member function of `std::ranges::view_interface<D>`) |
| operator bool | returns whether the derived view is not empty. Provided if `ranges::empty` is applicable to it. (public member function of `std::ranges::view_interface<D>`) |
| front | returns the first element in the derived view. Provided if it satisfies `forward_range`. (public member function of `std::ranges::view_interface<D>`) |
| back | returns the last element in the derived view. Provided if it satisfies `bidirectional_range` and `common_range`. (public member function of `std::ranges::view_interface<D>`) |

### Deduction guides

### Nested classes

|  |  |
| --- | --- |
| *iterator* | the iterator type (exposition-only member class template*) |
| *sentinel* | the sentinel type (exposition-only member class template*) |

### Notes

Before P2328R1 was adopted, the inner range type (`ranges::range_reference_t<V>`) cannot be a container type (but can be reference to container). For example, it was not allowed to join a `transform_view` of `std::string` prvalue.

```cpp
struct Person { int age; std::string name; };

auto f(std::vector<Person>& v) {
//  return v | std::views::transform([](auto& p){ return p.name; })
//           | std::views::join; // error before P2328R1
    return v | std::views::transform([](auto& p) -> std::string& { return p.name; })
             | std::views::join; // OK
}
```

### Example

```cpp
#include <iostream>
#include <ranges>
#include <string_view>
#include <vector>

int main()
{
    using namespace std::literals;

    const auto bits = {"https:"sv, "//"sv, "cppreference"sv, "."sv, "com"sv};
    for (char const c : bits | std::views::join)
        std::cout << c;
    std::cout << '\n';

    const std::vector<std::vector<int>> v{{1, 2}, {3, 4, 5}, {6}, {7, 8, 9}};
    auto jv = std::ranges::join_view(v);
    for (int const e : jv)
        std::cout << e << ' ';
    std::cout << '\n';
}
```

Output:

```text
https://cppreference.com
1 2 3 4 5 6 7 8 9
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3474 | C++20 | `views::join(e)` returned a copy of `e` when `e` is a `join_view` | returns a nested `join_view` |
| P2328R1 | C++20 | non-view `range` prvalues could not be joined by `join_view` | made joinable |

### See also

|  |  |
| --- | --- |
| ranges::join_with_view, views::join_with (C++23) | a `view` consisting of the sequence obtained from flattening a view of ranges, with the delimiter in between elements (class template) (range adaptor object) |
| ranges::concat_view, views::concat (C++26) | a `view` consisting of concatenation of the adapted views (class template) (customization point object) |
