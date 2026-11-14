# std::ranges::concat_view<Views...>::*iterator*

|  |  |  |
| --- | --- | --- |
| `template< bool Const > class /*iterator*/` | (1) | (exposition only*) |
| Helper concepts |  |  |
| `template< bool Const, class... Rs > concept /*concat-is-random-access*/ = /* see description */;` | (2) | (exposition only*) |
| `template< bool Const, class... Rs > concept /*concat-is-bidirectional*/ = /* see description */;` | (3) | (exposition only*) |

1) `ranges::concat_view<Views...>::``iterator` is the type of the iterators returned by `begin()` and `end()` of `ranges::concat_view<Views...>`.

2) Let `Fs` be the pack that consists of all elements of `Rs` except the last element. Equivalent to

`template<bool Const, class... Rs> concept concat-is-random-access = // exposition only all-random-access <Const, Rs...> && (ranges::common_range<maybe-const <Const, Fs>> && ...);`.

3) Let `Fs` be the pack that consists of all elements of `Rs` except the last element. Equivalent to

`template<bool Const, class... Rs> concept concat-is-bidirectional = // exposition only all-bidirectional <Const, Rs...> && (ranges::common_range<maybe-const <Const, Fs>> && ...);`.

### Template parameters

Const - whether the iterator is a constant iterator

### Nested types

|  |  |
| --- | --- |
| Exposition-only types |  |
| Type | Definition |
| `base-iter` | `std::variant<ranges::iterator_t<``maybe-const` `<Const, Views>>...>` (exposition-only member type*) |
| Iterator property types |  |
| Type | Definition |
| `iterator_concept` | an iterator tag, see below |
| `iterator_category` (conditionally present) | an iterator tag, see below |
| `value_type` | `concat-value-t` `<``maybe-const` `<Const, Views>...>` |
| `difference_type` | `std::common_type_t<ranges::range_difference_t<``maybe-const` `<Const, Views>>...>` |

#### Determining the iterator concept

`iterator_concept` is defined as follows:

- If `concat-is-random-access <Const, Views...>` is modeled, `iterator_concept` denotes `std::random_access_iterator_tag`.
- Otherwise, if `concat-is-bidirectional <Const, Views...>` is modeled, `iterator_concept` denotes `std::bidirectional_iterator_tag`.
- Otherwise, if `all-forward <Const, Views...>` is modeled, `iterator_concept` denotes `std::forward_iterator_tag`.
- Otherwise, `iterator_concept` denotes `std::input_iterator_tag`.

#### Determining the iterator category

`iterator_category` is defined if and only if `all-forward <Const, Views...>` is modeled. In this case, it is defined as follows:

- If `std::is_reference_v<concat-reference-t <maybe-const <Const, Views>...>>` is `false`, `iterator_category` denotes `std::input_iterator_tag`.
- Otherwise, let `Cs` denote the pack of types `std::iterator_traits<ranges::iterator_t<``maybe-const` `<Const, Views>>>::iterator_category...`:
  - If `(std::derived_from<Cs, std::random_access_iterator_tag> && ...) && concat-is-random-access <Const, Views...>` is `true`, `iterator_category` denotes `std::random_access_iterator_tag`.
  - Otherwise, if `(std::derived_from<Cs, std::bidirectional_iterator_tag> && ...) && concat-is-bidirectional <Const, Views...>` is `true`, `iterator_category` denotes `std::bidirectional_iterator_tag`.
  - Otherwise, if `(std::derived_from<Cs, std::forward_iterator_tag> && ...)` is `true`, `iterator_category` denotes `std::forward_iterator_tag`.
  - Otherwise, `iterator_category` denotes `std::input_iterator_tag`.

### Data members

| Member | Definition |
| --- | --- |
| `maybe-const` `<Const, ranges::concat_view>*` `parent_` | a pointer to the parent `concat_view` (exposition-only member object*) |
| `base-iter` `it_` | an iterator into the current view (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs an iterator (public member function) |
| operator* | accesses the element (public member function) |
| operator[] | accesses an element by index (public member function) |
| operator++, operator++(int), operator--, operator--(int), operator+=, operator-= | advances or decrements the underlying iterator (public member function) |
| Exposition-only function templates |  |
| **satisfy** | replaces `it_` with the beginning of the next view, if `it_` is the end of current view (exposition-only member function*) |
| **prev** | decrements `it_` such that it points to the previous position (exposition-only member function*) |
| **advance-fwd** | advances the current position on given offset (exposition-only member function*) |
| **advance-bwd** | decrements the current position on given value (exposition-only member function*) |

### Non-member functions

|  |  |
| --- | --- |
| operator==, operator<, operator>, operator<=, operator>=, operator<=> (C++26) | compares the underlying iterators (function) |
| operator+, operator- (C++26) | performs iterator arithmetic (function) |
| iter_move (C++26) | casts the result of dereferencing the underlying iterator to its associated rvalue reference type (function) |
| iter_swap (C++26) | swaps the objects pointed to by two underlying iterators (function) |

### Example

The preliminary version can be checked out on Compiler Explorer.

```cpp
#include <iostream>
#include <iterator>
#include <ranges>

int main()
{
    namespace views = std::views;
    static constexpr int p[]{1, 2, 3};
    static constexpr auto e = {4, 5};
    auto t = views::iota(6, 9);
    auto cat = views::concat(p, e, t);
    auto dog = views::concat(cat, cat);
    for (auto i{dog.begin()}; i != std::default_sentinel; ++i)
        std::cout << *i << ' ';
    std::cout << '\n';
}
```

Output:

```text
1 2 3 4 5 6 7 8 1 2 3 4 5 6 7 8
```

### References

- C++26 standard (ISO/IEC 14882:2026):

- 26.7.18.3 Class template `concat_view::iterator` [range.concat.iterator]
