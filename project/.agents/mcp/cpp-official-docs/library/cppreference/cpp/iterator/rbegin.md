# std::rbegin, std::crbegin

| Defined in header `<array>` |  |  |
| --- | --- | --- |
| Defined in header `<deque>` |  |  |
| Defined in header `<flat_map>` |  |  |
| Defined in header `<flat_set>` |  |  |
| Defined in header `<forward_list>` |  |  |
| Defined in header `<inplace_vector>` |  |  |
| Defined in header `<iterator>` |  |  |
| Defined in header `<list>` |  |  |
| Defined in header `<map>` |  |  |
| Defined in header `<regex>` |  |  |
| Defined in header `<set>` |  |  |
| Defined in header `<span>` |  |  |
| Defined in header `<string>` |  |  |
| Defined in header `<string_view>` |  |  |
| Defined in header `<unordered_map>` |  |  |
| Defined in header `<unordered_set>` |  |  |
| Defined in header `<vector>` |  |  |
| `template< class C > auto rbegin( C& c ) -> decltype(c.rbegin());` | (1) | (since C++14) (constexpr since C++17) |
| `template< class C > auto rbegin( const C& c ) -> decltype(c.rbegin());` | (2) | (since C++14) (constexpr since C++17) |
| `template< class T, std::size_t N > std::reverse_iterator<T*> rbegin( T (&array)[N] );` | (3) | (since C++14) (constexpr since C++17) |
| `template< class T > std::reverse_iterator<const T*> rbegin( std::initializer_list<T> il );` | (4) | (since C++14) (constexpr since C++17) |
| `template< class C > auto crbegin( const C& c ) -> decltype(std::rbegin(c));` | (5) | (since C++14) (constexpr since C++17) |

Returns an iterator to the reverse-beginning of the given range.

1,2) Returns `c.rbegin()`, which is typically an iterator to the reverse-beginning of the sequence represented by `c`.

1) If `C` is a standard Container, returns a `C::reverse_iterator` object.

2) If `C` is a standard Container, returns a `C::const_reverse_iterator` object.

3) Returns a `std::reverse_iterator<T*>` object to the reverse-beginning of `array`.

4) Returns a `std::reverse_iterator<const T*>` object to the reverse-beginning of `il`.

5) Returns `std::rbegin(c)`, with `c` always treated as const-qualified.

If `C` is a standard Container, returns a `C::const_reverse_iterator` object.

range-rbegin-rend.svg

### Parameters

|  |  |  |
| --- | --- | --- |
| c | - | a container or view with a `rbegin` member function |
| array | - | an array of arbitrary type |
| il | - | an `std::initializer_list` |

### Return value

1,2) `c.rbegin()`

3) `std::reverse_iterator<T*>(array + N)`

4) `std::reverse_iterator<const T*>(il.end())`

5) `c.rbegin()`

### Exceptions

May throw implementation-defined exceptions.

### Overloads

Custom overloads of `rbegin` may be provided for classes and enumerations that do not expose a suitable `rbegin()` member function, yet can be iterated.

Overloads of `rbegin` found by argument-dependent lookup can be used to customize the behavior of `std::ranges::rbegin` and `std::ranges::crbegin`. (since C++20)

### Notes

The overload for `std::initializer_list` is necessary because it does not have a member function `rbegin`.

### Example

```cpp
#include <iostream>
#include <iterator>
#include <vector>

int main()
{
    std::vector<int> v = {3, 1, 4};
    auto vi = std::rbegin(v); // the type of “vi” is std::vector<int>::reverse_iterator
    std::cout << "*vi = " << *vi << '\n';

    *std::rbegin(v) = 42; // OK: after assignment v[2] == 42
//  *std::crbegin(v) = 13; // error: the location is read-only

    int a[] = {-5, 10, 15};
    auto ai = std::rbegin(a); // the type of “ai” is std::reverse_iterator<int*>
    std::cout << "*ai = " << *ai << '\n';

    auto il = {3, 1, 4};
    // the type of “it” below is std::reverse_iterator<int const*>:
    for (auto it = std::rbegin(il); it != std::rend(il); ++it)
        std::cout << *it << ' ';
    std::cout << '\n';
}
```

Output:

```text
*vi = 4
*ai = 15
4 1 3
```

### See also

|  |  |
| --- | --- |
| begin, cbegin (C++11), (C++14) | returns an iterator to the beginning of a container or array (function template) |
| end, cend (C++11), (C++14) | returns an iterator to the end of a container or array (function template) |
| rend, crend (C++14) | returns a reverse end iterator for a container or array (function template) |
| ranges::rbegin (C++20) | returns a reverse iterator to a range (customization point object) |
| ranges::crbegin (C++20) | returns a reverse iterator to a read-only range (customization point object) |
