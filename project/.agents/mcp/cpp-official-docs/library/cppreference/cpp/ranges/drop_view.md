# std::ranges::views::drop, std::ranges::drop_view

| Defined in header `<ranges>` |  |  |
| --- | --- | --- |
| `template< ranges::view V > class drop_view : public ranges::view_interface<drop_view<V>>` | (1) | (since C++20) |
| `namespace views { inline constexpr /* unspecified */ drop = /* unspecified */; }` | (2) | (since C++20) |
| Call signature |  |  |
| `template< ranges::viewable_range R > requires /* see below */ constexpr ranges::view auto drop( R&& r, ranges::range_difference_t<R> count );` |  | (since C++20) |
| `template< class DifferenceType > constexpr /* range adaptor closure */ drop( DifferenceType&& count );` |  | (since C++20) |

1) A range adaptor consisting of elements of the underlying sequence, skipping the first *N* elements.

2) RangeAdaptorObject. Given `T` is `std::remove_cvref_t<decltype((e))>` and `D` is `ranges::range_difference_t<decltype((e))>`), the expression `views::drop(e, f)` is expression-equivalent to:

- `((void)f, decay-copy(e))`, if `T` is a `ranges::empty_view`, except that the evaluations of `e` and `f` are indeterminately sequenced;
- otherwise, `T(ranges::begin(e) + inc, ranges::end(e), /*to-unsigned-like*/(ranges::distance(e) - inc))`, if `T` is a specialization of `ranges::subrange` that models both `random_access_range` and `sized_range`, and `T` needs to store the size (see `ranges::subrange::subrange()` for details), where `inc` is `std::min<D>(ranges::distance(e), f)`;
- otherwise, `U(ranges::begin(e) + inc, ranges::end(e))`, if `T` is a specialization of `std::span`, `std::basic_string_view`, `ranges::iota_view`, or `ranges::subrange` that models both `random_access_range` and `sized_range`, where `U` is

- `std::span<typename T::element_type>`, if `T` is a specialization of `std::span`;
- `T` otherwise;

otherwise, if `T` is a specialization of `ranges::repeat_view`: `views::repeat(*e.value_, ranges::distance(e) - inc)`, if `T` models `sized_range`; in such case `e` is evaluated only once; `((void)e, auto(f))` otherwise, except that the evaluations of `e` and `f` are indeterminately sequenced; (since C++23)

- otherwise, `drop_view(e, f)`.

In all cases, `decltype((f))` must model `std::convertible_to<D>`.

`drop_view` models the concepts `contiguous_range`, `random_access_range`, `bidirectional_range`, `forward_range`, `input_range`, `common_range`, and `sized_range` when the underlying view `V` models respective concepts.

### Data members

| Member name | Definition |
| --- | --- |
| `base_` (private) | the underlying (adapted) `view` of type `V` (exposition-only member object*) |
| `count_` (private) | the number of elements to skip, of type `ranges::range_difference_t<V>` (exposition-only member object*) |
| `cache_` (private) (conditionally present) | TODO: mention L4$ (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `drop_view` (public member function) |
| base | returns a copy of the underlying (adapted) view (public member function) |
| begin | returns an iterator to the beginning (public member function) |
| end | returns an iterator or a sentinel to the end (public member function) |
| size | returns the number of elements. Provided only if the underlying (adapted) range satisfies `sized_range`. (public member function) |
| Inherited from `std::ranges::view_interface` |  |
| empty | returns whether the derived view is empty. Provided if it satisfies `sized_range` or `forward_range`. (public member function of `std::ranges::view_interface<D>`) |
| cbegin (C++23) | returns a constant iterator to the beginning of the range. (public member function of `std::ranges::view_interface<D>`) |
| cend (C++23) | returns a sentinel for the constant iterator of the range. (public member function of `std::ranges::view_interface<D>`) |
| operator bool | returns whether the derived view is not empty. Provided if `ranges::empty` is applicable to it. (public member function of `std::ranges::view_interface<D>`) |
| data | gets the address of derived view's data. Provided if its iterator type satisfies `contiguous_iterator`. (public member function of `std::ranges::view_interface<D>`) |
| front | returns the first element in the derived view. Provided if it satisfies `forward_range`. (public member function of `std::ranges::view_interface<D>`) |
| back | returns the last element in the derived view. Provided if it satisfies `bidirectional_range` and `common_range`. (public member function of `std::ranges::view_interface<D>`) |
| operator[] | returns the `n`th element in the derived view. Provided if it satisfies `random_access_range`. (public member function of `std::ranges::view_interface<D>`) |

### Deduction guides

### Helper templates

`template< class T > constexpr bool enable_borrowed_range<std::ranges::drop_view<T>> = ranges::enable_borrowed_range<T>;` (since C++20)

This specialization of `ranges::enable_borrowed_range` makes `drop_view` satisfy `borrowed_range` when the underlying view satisfies it.

### Example

```cpp
#include <iostream>
#include <ranges>

int main()
{
    const auto nums = {1, 2, 3, 4, 5, 6, 7};

    std::cout << "drop " << 2 << ": ";
    for (int i : std::ranges::drop_view{nums, 2})
        std::cout << i << ' ';
    std::cout << '\n';

    std::cout << "drop " << 3 << ": ";
    for (int i : nums | std::views::drop(3))
        std::cout << i << ' ';
    std::cout << '\n';

    std::cout << "drop " << 4 << ": ";
    for (int i : std::views::iota(1, 8) | std::views::drop(4))
        std::cout << i << ' ';
    std::cout << '\n';

    // Note that dropping more than the number of elements is OK:
    for (int dp : {5, 6, 7, 890, 100500})
    {
        std::cout << "drop " << dp << ": ";
        for (int i : std::views::iota(1, 8) | std::views::drop(dp))
            std::cout << i << ' ';
        std::cout << '\n';
    }
}
```

Output:

```text
drop 2: 3 4 5 6 7
drop 3: 4 5 6 7
drop 4: 5 6 7
drop 5: 6 7
drop 6: 7
drop 7:
drop 890:
drop 100500:
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3407 | C++20 | `views::drop` sometimes fails to construct a sized random access range | the construction is adjusted so that it is always valid |
| LWG 3494 | C++20 | `drop_view` was never a `borrowed_range` | it is a `borrowed_range` if its underlying view is |

### See also

ranges::drop_while_view, views::drop_while (C++20) a `view` consisting of the elements of another `view`, skipping the initial subsequence of elements until the first element where the predicate returns `false` (class template) (range adaptor object)
