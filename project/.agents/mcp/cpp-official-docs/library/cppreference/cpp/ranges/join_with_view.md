# std::ranges::views::join_with, std::ranges::join_with_view

| Defined in header `<ranges>` |  |  |
| --- | --- | --- |
| `template< ranges::input_range V, ranges::forward_range Pattern > requires ranges::view<V> && ranges::input_range<ranges::range_reference_t<V>> && ranges::view<Pattern> && /*concatable*/<ranges::range_reference_t<V>, Pattern> class join_with_view : ranges::view_interface<join_with_view<V, Pattern>>` | (1) | (since C++23) |
| `namespace views { inline constexpr /* unspecified */ join_with = /* unspecified */; }` | (2) | (since C++23) |
| Call signature |  |  |
| `template< ranges::viewable_range R, class Pattern > requires /* see below */ constexpr ranges::view auto join_with( R&& r, Pattern&& pattern );` |  | (since C++23) |
| `template< class Pattern > constexpr /* range adaptor closure */ join_with( Pattern&& pattern );` |  | (since C++23) |

1) A range adaptor that represents `view` consisting of the sequence obtained from flattening a view of ranges, with every element of the delimiter inserted in between elements of the view. The delimiter can be a single element or a view of elements.

For the definition of `/*concatable*/`, see `std::ranges::concat_view`.

2) RangeAdaptorObject. The expression `views::join_with(e, f)` is expression-equivalent to `join_with_view(e, f)` for any suitable subexpressions `e` and `f`.

`join_with_view` models `input_range`.

`join_with_view` models `forward_range` when:

- `ranges::range_reference_t<V>` is a reference, and
- `V` and `ranges::range_reference_t<V>` each model `forward_range`.

`join_with_view` models `bidirectional_range` when:

- `ranges::range_reference_t<V>` is a reference,
- `V`, `ranges::range_reference_t<V>`, and `Pattern` each models `bidirectional_range`, and
- `ranges::range_reference_t<V>` and `Pattern` each model `common_range`.

`join_with_view` models `common_range` when:

- `ranges::range_reference_t<V>` is a reference, and
- `V` and `ranges::range_reference_t<V>` each model `forward_range` and `common_range`.

### Nested types

| Type | Definition |
| --- | --- |
| `InnerRng` | `ranges::range_reference_t<V>` (exposition-only member type*) |

### Data members

| Member | Definition |
| --- | --- |
| `V` `base_` | the underlying (adapted) view (exposition-only member object*) |
| `Pattern` `pattern_` | the pattern object (exposition-only member object*) |
| `non-propagating-cache` `<ranges::iterator_t<V>>` `outer_it_` (present only if `V` does not model `forward_range`) | the cache of the outer iterator (exposition-only member object*) |
| `non-propagating-cache` `<std::remove_cv_t<``InnerRng` `>>` `inner_` (present only if `std::is_reference_v<InnerRng >` is `false`) | the cache of the inner range (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `join_with_view` (public member function) |
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

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_ranges_join_with` | `202202L` | (C++23) | `std::ranges::join_with_view` |

### Example

```cpp
#include <iostream>
#include <ranges>
#include <string_view>
#include <vector>

int main()
{
    using namespace std::literals;

    std::vector v{"This"sv, "is"sv, "a"sv, "test."sv};
    auto joined = v | std::views::join_with(' ');

    for (auto c : joined)
        std::cout << c;
    std::cout << '\n';
}
```

Output:

```text
This is a test.
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 4074 | C++23 | `join_with_view` was underconstrained | updated the constraints |

### See also

|  |  |
| --- | --- |
| ranges::join_view, views::join (C++20) | a `view` consisting of the sequence obtained from flattening a `view` of `range`s (class template) (range adaptor object) |
| ranges::concat_view, views::concat (C++26) | a `view` consisting of concatenation of the adapted views (class template) (customization point object) |
