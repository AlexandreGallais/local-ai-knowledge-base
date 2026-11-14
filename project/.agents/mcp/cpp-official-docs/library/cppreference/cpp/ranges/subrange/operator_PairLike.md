# std::ranges::subrange<I,S,K>::operator PairLike

|  |  |  |
| --- | --- | --- |
| `template< /*different-from*/<subrange> PairLike > requires /*pair-like-convertible-from*/<PairLike, const I&, const S&> constexpr operator PairLike() const;` | (1) | (since C++20) |
| Helper concepts |  |  |
| `template< class T > concept /*pair-like*/ = /* see description */;` | (2) | (exposition only*) |
| `template< class T, class U, class V > concept /*pair-like-convertible-from*/ = /* see description */;` | (3) | (exposition only*) |

1) Converts `subrange` to a pair-like type.

For the definition of `/*different-from*/`, see `different-from` .

2) Determines whether a type is *pair-like* .

|  |  |
| --- | --- |
| Equivalent to: `template< class T > concept /*pair-like*/ = !std::is_reference_v<T> && requires(T t) { typename std::tuple_size<T>::type; requires std::derived_from<std::tuple_size<T>, std::integral_constant<std::size_t, 2>>; typename std::tuple_element_t<0, std::remove_const_t<T>>; typename std::tuple_element_t<1, std::remove_const_t<T>>; { std::get<0>(t) } -> std::convertible_to< const std::tuple_element_t<0, T>&>; { std::get<1>(t) } -> std::convertible_to< const std::tuple_element_t<1, T>&>; };` | (until C++23) |
| This concept is equivalent to the library-wide exposition-only concept `pair-like`. | (since C++23) |

3) Determines whether a pair-like type can be constructed from two values of possibly different given types.

|  |  |
| --- | --- |
| Equivalent to: `template< class T, class U, class V > concept /*pair-like-convertible-from*/ = !ranges::range<T> && /*pair-like*/<T> && std::constructible_from<T, U, V> && /*convertible-to-non-slicing*/<U, std::tuple_element_t<0, T>> && std::convertible_to<V, std::tuple_element_t<1, T>>;` | (until C++23) |
| Equivalent to: `template< class T, class U, class V > concept /*pair-like-convertible-from*/ = !ranges::range<T> && !std::is_reference_v<T> && /*pair-like*/<T> && std::constructible_from<T, U, V> && /*convertible-to-non-slicing*/<U, std::tuple_element_t<0, T>> && std::convertible_to<V, std::tuple_element_t<1, T>>;` | (since C++23) |

### Return value

`PairLike(begin_ , end_ )`

### Notes

Following types in the standard library are pair-like:

- `std::pair<T, U>`
- `std::tuple<T, U>`
- `std::array<T, 2>`
- `std::ranges::subrange<I, S, K>`

`std::complex<T>` (since C++26)

A program-defined type derived from one of these types can be a pair-like type, if `std::tuple_size` and `std::tuple_element` are correctly specialized for it, and calls to `std::get<0>` and `std::get<1>` for its value are well-formed. (until C++23)

Since `subrange` specializations are `range` types, conversion to them are not performed via this conversion function.

`std::array` specializations cannot be converted from `subrange`, since they are `range` types.

### Example

```cpp
#include <iostream>
#include <ranges>
#include <string>
#include <utility>

using striter = std::string::const_iterator;

using legacy_strview = std::pair<striter, striter>;

void legacy_print(legacy_strview p)
{
    for (; p.first != p.second; ++p.first)
        std::cout << *p.first << ' ';
    std::cout << '\n';
}

int main()
{
    std::string dat{"ABCDE"};
    for (auto v{std::ranges::subrange{dat}}; v; v = {v.begin(), v.end() - 1})
    {
        /*...*/
        legacy_print(legacy_strview{v});
    }
}
```

Output:

```text
A B C D E
A B C D
A B C
A B
A
```

### See also

*tuple-like, pair-like* (C++23) specifies that a type implemented the *tuple protocol* (`std::get`, `std::tuple_element`, `std::tuple_size`) (exposition-only concept*)
