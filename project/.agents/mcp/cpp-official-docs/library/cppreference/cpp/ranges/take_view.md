# std::ranges::views::take, std::ranges::take_view

| Defined in header `<ranges>` |  |  |
| --- | --- | --- |
| `template< ranges::view V > class take_view : public ranges::view_interface<take_view<V>>` | (1) | (since C++20) |
| `namespace views { inline constexpr /* unspecified */ take = /* unspecified */; }` | (2) | (since C++20) |
| Call signature |  |  |
| `template< ranges::viewable_range R > requires /* see below */ constexpr ranges::view auto take( R&& r, ranges::range_difference_t<R> count );` |  | (since C++20) |
| `template< class DifferenceType > constexpr /* range adaptor closure */ take( DifferenceType&& count );` |  | (since C++20) |

1) A range adaptor that represents `view` of the elements from an underlying sequence, starting at the beginning and ending at a given bound.

2) `views::take` is a RangeAdaptorObject. The expression `views::take(e, f)` results in a view that represents the first `f` elements from `e`. The result is not necessarily a `take_view`.

`views::take(e, f)` is expression-equivalent to (where `T` is `std::remove_cvref_t<decltype((e))>` and `D` is `ranges::range_difference_t<decltype((e))>`):

- `((void)f, decay-copy(e))`, if `T` is a `ranges::empty_view`, except that the evaluations of `e` and `f` are indeterminately sequenced;
- `U(ranges::begin(e), ranges::begin(e) + std::min<D>(ranges::distance(e), f))`, if `T` is a specialization of `std::span`, `std::basic_string_view`, or `ranges::subrange` that models both `random_access_range` and `sized_range`, where `U` is

- `std::span<typename T::element_type>`, if `T` is a specialization of `std::span`;
- `T`, if `T` is a specialization of `std::basic_string_view`;
- `ranges::subrange<ranges::iterator_t<T>>`, if `T` is a specialization of `ranges::subrange`;

- `ranges::iota_view(*ranges::begin(e), *(ranges::begin(e) + std::min<D>(ranges::distance(e), f)))`, if `T` is a specialization of `ranges::iota_view` that models both `random_access_range` and `sized_range`;

otherwise, if `T` is a specialization of `ranges::repeat_view`: `views::repeat(*e.value_, std::min<D>(ranges::distance(e), f))`, if `T` models `sized_range`; is such case `e` is evaluated only once; `views::repeat(*e.value_, static_cast<D>(e))` otherwise; (since C++23)

- otherwise, `take_view(e, f)`.

In all cases, `decltype((f))` must model `std::convertible_to<D>`.

`take_view` models the concepts `contiguous_range`, `random_access_range`, `bidirectional_range`, `forward_range`, `input_range`, and `sized_range` when the underlying view `V` models respective concepts. It models `common_range` when the underlying view `V` models both `random_access_range` and `sized_range`.

### Data members

| Member name | Definition |
| --- | --- |
| `base_` (private) | the underlying `view` of type `V` (exposition-only member object*) |
| `count_` (private) | the number of elements to take, of type `ranges::range_difference_t<V>` (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `take_view` (public member function) |
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

### Nested classes

*sentinel* (C++20) the sentinel type (exposition-only member class template*)

### Helper templates

`template< class T > constexpr bool enable_borrowed_range<std::ranges::take_view<T>> = ranges::enable_borrowed_range<T>;` (since C++20)

This specialization of `std::ranges::enable_borrowed_range` makes `take_view` satisfy `borrowed_range` when the underlying view satisfies it.

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <ranges>

int main()
{
    namespace views = std::views;
    auto print = [](char x){ std::cout << x; };

    for (const char nums[]{'1', '2', '3'};
         int n : views::iota(0, 5))
    {
        std::cout << "take(" << n << "): ";
        // safely takes only upto min(n, nums.size()) elements:
        std::ranges::for_each(nums | views::take(n), print);
        std::cout << '\n';
    }
}
```

Output:

```text
take(0):
take(1): 1
take(2): 12
take(3): 123
take(4): 123
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3407 | C++20 | `views::take` sometimes failed to construct a sized random access range | the result type is adjusted so that construction is always valid |
| LWG 3494 | C++20 | `take_view` was never a `borrowed_range` | it is a `borrowed_range` if its underlying view is |

### See also

|  |  |
| --- | --- |
| views::counted (C++20) | creates a subrange from an iterator and a count (customization point object) |
| ranges::take_while_view, views::take_while (C++20) | a `view` consisting of the initial elements of another `view`, until the first element on which a predicate returns `false` (class template) (range adaptor object) |
| ranges::copy_n (C++20) | copies a number of elements to a new location (algorithm function object) |
