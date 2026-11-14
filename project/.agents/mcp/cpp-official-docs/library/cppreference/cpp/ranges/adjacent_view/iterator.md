# std::ranges::adjacent_view<V,N>::*iterator*

`template< bool Const > class /*iterator*/` (since C++23) (exposition only*)

The return type of `adjacent_view::begin`, and of `adjacent_view::end` when the underlying view `V` is a `common_range`.

The type `/*iterator*/<true>` is returned by the const-qualified overloads. The type `/*iterator*/<false>` is returned by the non-const-qualified overloads.

### Member types

| Member type | Definition |
| --- | --- |
| `Base` (private) | `const V` if `Const` is `true`, otherwise `V`. (exposition-only member type*) |
| `iterator_category` | `std::input_iterator_tag` |
| `iterator_concept` | `std::random_access_iterator_tag`, if `Base` models `random_access_range`. Otherwise, `std::bidirectional_iterator_tag`, if `Base` models `bidirectional_range`. Otherwise, `std::forward_iterator_tag`. |
| `value_type` | `std::tuple</*REPEAT*/(ranges::range_value_t<Base>, N)...>;` |
| `difference_type` | `ranges::range_difference_t<Base>` |

### Data members

| Member object | Definition |
| --- | --- |
| `current_` (private) | `std::array<ranges::iterator_t<Base>, N>`. (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs an iterator (public member function) |
| operator* | accesses the element (public member function) |
| operator[] | accesses an element by index (public member function) |
| operator++, operator++(int), operator--, operator--(int), operator+=, operator-= | advances or decrements the underlying iterators (public member function) |

### Non-member functions

|  |  |
| --- | --- |
| operator==, operator<, operator>, operator<=, operator>=, operator<=> (C++23) | compares the underlying iterators (function) |
| operator+, operator- (C++23) | performs iterator arithmetic (function) |
| iter_move (C++23) | casts the result of dereferencing the underlying iterator to its associated rvalue reference type (function) |
| iter_swap (C++23) | swaps the objects pointed to by two underlying iterators (function) |

### Example

```cpp
#include <cassert>
#include <concepts>
#include <list>
#include <ranges>
#include <tuple>
#include <utility>
#include <vector>

int main()
{
    auto v = std::vector{0, 1, 2, 3, 4, 5};
    auto i = (v | std::views::adjacent<3>).begin();
    using I = decltype(i);
    static_assert(std::same_as<I::value_type, std::tuple<int, int, int>>);
    static_assert(std::same_as<I::iterator_concept, std::random_access_iterator_tag>);
    // some of available operators:
    ++i; i++; --i; i--; i += 2; i -= 2;
    assert(i[2] == std::tuple(2, 3, 4));
    using DI = decltype(*i);
    static_assert(std::same_as<DI, std::tuple<int&, int&, int&>>);
    std::get<1>(*i) = 42; // modifies v[1] via iterator i
    assert(v[1] == 42);

    auto l = std::list{0, 1, 2, 3, 4, 5};
    auto j = (l | std::views::adjacent<3>).begin();
    using J = decltype(j);
    static_assert(std::same_as<J::value_type, std::tuple<int, int, int>>);
    static_assert(std::same_as<J::iterator_concept, std::bidirectional_iterator_tag>);
    ++j; --j; j++; j--; // some of available operators
    // j += 2; j -= 2;       // error: these operator are not available
    // std::ignore() = j[1]; //        for bidirectional iterator
}
```

### References

- C++23 standard (ISO/IEC 14882:2024):

- 26.7.25.3 Class template adjacent_view::iterator [range.adjacent.iterator]

### See also
