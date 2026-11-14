# std::ranges::views::adjacent, std::ranges::adjacent_view, std::ranges::views::pairwise

| Defined in header `<ranges>` |  |  |
| --- | --- | --- |
| `template< ranges::forward_range V, std::size_t N > requires ranges::view<V> && (N > 0) class adjacent_view : public ranges::view_interface<adjacent_view<V, N>>` | (1) | (since C++23) |
| `namespace views { template< std::size_t N > constexpr /* unspecified */ adjacent = /* unspecified */ ; }` | (2) | (since C++23) |
| `namespace views { inline constexpr auto pairwise = adjacent<2>; }` | (3) | (since C++23) |
| Call signature |  |  |
| `template< ranges::viewable_range R > requires /* see below */ constexpr ranges::view auto adjacent<N>( R&& r );` |  | (since C++23) |

1) `adjacent_view` is a range adaptor that takes a `view`, and produces a `view` whose `i`*th* element (a "window") is a `std::tuple` that holds `N` references to the elements of the original view, from `i`*th* up to `i + N - 1`*th* inclusively.

Let `S` be the size of the original view. Then the size of produced view is:

- `S - N + 1`, if `S >= N`,
- `​0​` otherwise, and the resulting view is empty.

2) The name `views::adjacent<N>` denotes a RangeAdaptorObject. Given a subexpression `e` and a constant expression `N`, the expression `views::adjacent<N>(e)` is expression-equivalent to

- `((void)e, auto(views::empty<tuple<>>))` if `N` is equal to `​0​` and `decltype((e))` models `forward_range`,
- `adjacent_view<views::all_t<decltype((e))>, N>(e)` otherwise.

3) The name `views::pairwise` denotes a RangeAdaptorObject that behaves exactly as `views::adjacent<2>`.

`adjacent_view` always models `forward_range`, and models `bidirectional_range`, `random_access_range`, or `sized_range` if adapted `view` type models the corresponding concept.

### Data members

| Member name | Definition |
| --- | --- |
| `base_` (private) | the underlying `view` of type `V`. (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `adjacent_view` (public member function) |
| begin | returns an iterator to the beginning (public member function) |
| end | returns an iterator or a sentinel to the end (public member function) |
| size | returns the number of elements. Provided only if the underlying (adapted) range satisfies `sized_range`. (public member function) |
| Inherited from `std::ranges::view_interface` |  |
| empty | returns whether the derived view is empty. Provided if it satisfies `sized_range` or `forward_range`. (public member function of `std::ranges::view_interface<D>`) |
| cbegin (C++23) | returns a constant iterator to the beginning of the range. (public member function of `std::ranges::view_interface<D>`) |
| cend (C++23) | returns a sentinel for the constant iterator of the range. (public member function of `std::ranges::view_interface<D>`) |
| operator bool | returns whether the derived view is not empty. Provided if `ranges::empty` is applicable to it. (public member function of `std::ranges::view_interface<D>`) |
| front | returns the first element in the derived view. Provided if it satisfies `forward_range`. (public member function of `std::ranges::view_interface<D>`) |
| back | returns the last element in the derived view. Provided if it satisfies `bidirectional_range` and `common_range`. (public member function of `std::ranges::view_interface<D>`) |
| operator[] | returns the `n`th element in the derived view. Provided if it satisfies `random_access_range`. (public member function of `std::ranges::view_interface<D>`) |

### Deduction guides

(none)

### Nested classes

|  |  |
| --- | --- |
| *iterator* | the iterator type (exposition-only member class template*) |
| *sentinel* | the sentinel type used when `adjacent_view` is not a `common_range` (exposition-only member class template*) |

### Helper templates

`template< class V, size_t N > constexpr bool ranges::enable_borrowed_range<adjacent_view<V, N>> = ranges::enable_borrowed_range<V>;` (since C++23)

This specialization of `ranges::enable_borrowed_range` makes `adjacent_view` satisfy `borrowed_range` when the underlying view satisfies it.

### Notes

`views::adjacent` only accepts forward ranges even when `N` is `0`.

There are similarities between `ranges::adjacent_view` and `ranges::slide_view`:

- Both create a "sliding window" of size `N`.
- Both have the same size `S - N + 1`, where `S` is the size of an adapted `view` such that `S >= N > 0`.

The following table shows the differences between these adaptors:

| View adaptor | `value_type` | The window size `N` |
| --- | --- | --- |
| `ranges::adjacent_view` | `std::tuple` | A template parameter |
| `ranges::slide_view` | `ranges::range` | A runtime argument |

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_ranges_zip` | `202110L` | (C++23) | `ranges::zip_view`, `ranges::zip_transform_view`, `ranges::adjacent_view`, `ranges::adjacent_transform_view` |

### Example

```cpp
#include <array>
#include <format>
#include <iostream>
#include <ranges>
#include <tuple>

int main()
{
    constexpr std::array v{1, 2, 3, 4, 5, 6};
    std::cout << "v = [1 2 3 4 5 6]\n";

    for (int i{}; std::tuple t : v | std::views::adjacent<3>)
    {
        auto [t0, t1, t2] = t;
        std::cout << std::format("e = {:<{}}[{} {} {}]\n", "", 2 * i++, t0, t1, t2);
    }
}
```

Output:

```text
v = [1 2 3 4 5 6]
e = [1 2 3]
e =   [2 3 4]
e =     [3 4 5]
e =       [4 5 6]
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 4098 | C++23 | `views::adjacent<0>` used to accept input-only ranges | made rejected |

### References

- C++23 standard (ISO/IEC 14882:2024):

- 26.7.25 Adjacent view [range.adjacent]

### See also

|  |  |
| --- | --- |
| ranges::adjacent_transform_view, views::adjacent_transform (C++23) | a `view` consisting of results of application of a transformation function to adjacent elements of the adapted view (class template) (range adaptor object) |
| ranges::slide_view, views::slide (C++23) | a `view` whose Mth element is a `view` over the Mth through (M + N - 1)th elements of another `view` (class template) (range adaptor object) |
| ranges::chunk_view, views::chunk (C++23) | a range of `view`s that are `N`-sized non-overlapping successive chunks of the elements of another `view` (class template) (range adaptor object) |
| ranges::stride_view, views::stride (C++23) | a `view` consisting of elements of another `view`, advancing over N elements at a time (class template) (range adaptor object) |
