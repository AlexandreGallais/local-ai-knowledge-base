# std::move_iterator

| Defined in header `<iterator>` |  |
| --- | --- |
| `template< class Iter > class move_iterator;` | (since C++11) |

`std::move_iterator` is an iterator adaptor which behaves exactly like the underlying iterator (which must be at least a LegacyInputIterator or model `input_iterator`(since C++20), or stronger iterator concept(since C++23)), except that dereferencing converts the value returned by the underlying iterator into an rvalue. If this iterator is used as an input iterator, the effect is that the values are moved from, rather than copied from.

### Nested types

|  |  |
| --- | --- |
| Type Definition `iterator_type` `Iter` `iterator_category` `std::iterator_traits<Iter>::iterator_category` `value_type` `std::iterator_traits<Iter>::value_type` `difference_type` `std::iterator_traits<Iter>::difference_type` `pointer` `Iter` `reference` the rvalue reference version of `std::iterator_traits<Iter>::reference` if `std::iterator_traits<Iter>::reference` is a reference type `std::iterator_traits<Iter>::reference` otherwise | (until C++20) |
| Type Definition `iterator_type` `Iter` `iterator_category` (conditionally present) undefined if `std::iterator_traits<Iter>::iterator_category` is invalid or does not denote a type `std::random_access_iterator_tag` if `std::iterator_traits<Iter>::iterator_category` models `std::derived_from<std::random_access_iterator_tag>` `std::iterator_traits<Iter>::iterator_category` otherwise `iterator_concept` `std::input_iterator_tag` (until C++23) `std::random_access_iterator_tag` if `Iter` models `std::random_access_iterator` `std::bidirectional_iterator_tag` if `Iter` only models `std::bidirectional_iterator` `std::forward_iterator_tag` if `Iter` only models `std::forward_iterator` `std::input_iterator_tag` otherwise (since C++23) `value_type` `std::iter_value_t<Iter>` `difference_type` `std::iter_difference_t<Iter>` `pointer` `Iter` `reference` `std::iter_rvalue_reference_t<Iter>` | (since C++20) |

### Data members

| Member | Description |
| --- | --- |
| `Iter` `current` | the underlying iterator (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) (C++11) | constructs a new iterator adaptor (public member function) |
| operator= (C++11) | assigns another iterator adaptor (public member function) |
| base (C++11) | accesses the underlying iterator (public member function) |
| operator*, operator-> (C++11), (C++11)(deprecated in C++20) | accesses the pointed-to element (public member function) |
| operator[] (C++11) | accesses an element by index (public member function) |
| operator++, operator++(int), operator+=, operator+, operator--, operator--(int), operator-=, operator- (C++11) | advances or decrements the iterator (public member function) |

### Non-member functions

|  |  |
| --- | --- |
| operator==, operator!=, operator<, operator<=, operator>, operator>=, operator<=> (C++11), (C++11)(removed in C++20), (C++11), (C++11), (C++11), (C++11), (C++20) | compares the underlying iterators (function template) |
| operator==(std::move_sentinel) (C++20) | compares the underlying iterator and the underlying sentinel (function template) |
| operator+ (C++11) | advances the iterator (function template) |
| operator- (C++11) | computes the distance between two iterator adaptors (function template) |
| operator-(std::move_sentinel) (C++20) | computes the distance between the underlying iterator and the underlying sentinel (function template) |
| iter_move (C++20) | casts the result of dereferencing the underlying iterator to its associated rvalue reference type (function) |
| iter_swap (C++20) | swaps the objects pointed to by two underlying iterators (function template) |
| make_move_iterator (C++11) | creates a `std::move_iterator` of type inferred from the argument (function template) |

### Helper templates

`template< class Iterator1, class Iterator2 > requires (!std::sized_sentinel_for<Iterator1, Iterator2>) constexpr bool disable_sized_sentinel_for <std::move_iterator<Iterator1>, std::move_iterator<Iterator2>> = true;` (since C++20)

This partial specialization of `std::disable_sized_sentinel_for` prevents specializations of `move_iterator` from satisfying `sized_sentinel_for` if their underlying iterators do not satisfy the concept.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_move_iterator_concept` | `202207L` | (C++23) | Make `std::move_iterator<T*>` a random access iterator |

### Example

```cpp
#include <algorithm>
#include <iomanip>
#include <iostream>
#include <iterator>
#include <ranges>
#include <string>
#include <string_view>
#include <vector>

void print(const std::string_view rem, const auto& v)
{
    std::cout << rem;
    for (const auto& s : v)
        std::cout << std::quoted(s) << ' ';
    std::cout << '\n';
};

int main()
{
    std::vector<std::string> v{"this", "_", "is", "_", "an", "_", "example"};
    print("Old contents of the vector: ", v);
    std::string concat;
    for (auto begin = std::make_move_iterator(v.begin()),
              end = std::make_move_iterator(v.end());
         begin != end; ++begin)
    {
        std::string temp{*begin}; // moves the contents of *begin to temp
        concat += temp;
    }

    // Starting from C++17, which introduced class template argument deduction,
    // the constructor of std::move_iterator can be used directly:
    // std::string concat = std::accumulate(std::move_iterator(v.begin()),
    //                                      std::move_iterator(v.end()),
    //                                      std::string());

    print("New contents of the vector: ", v);
    print("Concatenated as string: ", std::ranges::single_view(concat));
}
```

Possible output:

```text
Old contents of the vector: "this" "_" "is" "_" "an" "_" "example"
New contents of the vector: "" "" "" "" "" "" ""
Concatenated as string: "this_is_an_example"
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2106 | C++11 | dereferencing a `move_iterator` could return a dangling reference if the dereferencing the underlying iterator returns a prvalue | returns the object instead |
| LWG 3736 | C++20 | `move_iterator` was missing `disable_sized_sentinel_for` specialization | added |
| P2259R1 | C++20 | member `iterator_category` was defined even if `std::iterator_traits<Iter>::iterator_category` is not defined | `iterator_category` is not defined in this case |

### See also

|  |  |
| --- | --- |
| make_move_iterator (C++11) | creates a `std::move_iterator` of type inferred from the argument (function template) |
| move_sentinel (C++20) | sentinel adaptor for `std::move_iterator` (class template) |
