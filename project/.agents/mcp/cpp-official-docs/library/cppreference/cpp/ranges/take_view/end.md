# std::ranges::take_view<V>::end

|  |  |  |
| --- | --- | --- |
| `constexpr auto end() requires (!/*simple-view*/<V>);` | (1) | (since C++20) |
| `constexpr auto end() const requires ranges::range<const V>;` | (2) | (since C++20) |

Returns a sentinel or an iterator representing the end of the `take_view`. The end of the `take_view` is either one past the `count`th element in the underlying range, or the end of the underlying range if the latter has less than `count` elements.

1) Returns a `take_view::/*sentinel*/<false>`, a `std::default_sentinel_t`, or a `ranges::iterator_t<V>`.

2) Returns a `take_view::/*sentinel*/<true>`, a `std::default_sentinel_t`, or a `ranges::iterator_t<const V>`.

Overload (1) does not participate in overload resolution if `V` is a simple view (that is, if `V` and `const V` are views with the same iterator and sentinel types).

### Parameters

(none)

### Return value

The result depends on the concepts satisfied by possibly const-qualified underlying view type `Base`, that is `V` for (1) or `const V` for (2).

Let `base_` be the underlying view.

| The underlying view type satisfies ... |  | `random_access_range` |  |
| --- | --- | --- | --- |
| yes | no |  |  |
| `sized_range` | yes | `ranges::begin(base_) + ranges::range_difference_t<Base_>(this->size())` | `std::default_sentinel` |
| no | 1) `/*sentinel*/<false>{ranges::end(base_)}` 2) `/*sentinel*/<true>{ranges::end(base_)}` |  |  |

### Example

```cpp
#include <iostream>
#include <iterator>
#include <list>
#include <ranges>
#include <type_traits>
namespace ranges = std::ranges;
namespace views = std::views;

int main()
{
    const auto list1 = {3, 1, 4, 1, 5};
    const auto seq1{list1 | views::take(4)};
    static_assert(ranges::sized_range<decltype(seq1)> and
                  ranges::random_access_range<decltype(seq1)> and
                  std::is_same_v<decltype(seq1.end()), decltype(list1.end())>);
    for (auto it = seq1.begin(); it != seq1.end(); ++it)
        std::cout << *it << ' ';
    std::cout << '\n';

    std::list list2{2, 7, 1, 8, 2};
    const auto seq2{list2 | views::take(4)};
    static_assert(ranges::sized_range<decltype(seq2)> and
                  not ranges::random_access_range<decltype(seq2)> and
                  std::is_same_v<decltype(seq2.end()), std::default_sentinel_t>);
    for (auto it = seq2.begin(); it != std::default_sentinel; ++it)
        std::cout << *it << ' ';
    std::cout << '\n';
}
```

Output:

```text
3 1 4 1
2 7 1 8
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| P2393R1 | C++20 | implicit conversions between signed and unsigned integer-class types might fail | made explicit |

### See also

|  |  |
| --- | --- |
| begin | returns an iterator to the beginning (public member function) |
| counted_iterator (C++20) | iterator adaptor that tracks the distance to the end of the range (class template) |
| operator== (C++20) | compares a sentinel with an iterator returned from `take_view::begin` (function) |
