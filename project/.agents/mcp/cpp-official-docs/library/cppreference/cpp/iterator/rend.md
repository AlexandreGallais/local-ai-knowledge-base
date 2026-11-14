# std::rend, std::crend

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
| `template< class C > auto rend( C& c ) -> decltype(c.rend());` | (1) | (since C++14) (constexpr since C++17) |
| `template< class C > auto rend( const C& c ) -> decltype(c.rend());` | (2) | (since C++14) (constexpr since C++17) |
| `template< class T, std::size_t N > std::reverse_iterator<T*> rend( T (&array)[N] );` | (3) | (since C++14) (constexpr since C++17) |
| `template< class T > std::reverse_iterator<const T*> rend( std::initializer_list<T> il );` | (4) | (since C++14) (constexpr since C++17) |
| `template< class C > auto crend( const C& c ) -> decltype(std::rend(c));` | (5) | (since C++14) (constexpr since C++17) |

Returns an iterator to the reverse-end of the given range.

1,2) Returns `c.rend()`, which is typically an iterator one past the reverse-end of the sequence represented by `c`.

1) If `C` is a standard Container, returns a `C::reverse_iterator` object.

2) If `C` is a standard Container, returns a `C::const_reverse_iterator` object.

3) Returns an `std::reverse_iterator<T*>` object to the reverse-end of `array`.

4) Returns an `std::reverse_iterator<const T*>` object to the reverse-end of `il`.

5) Returns `std::end(c)`, with `c` always treated as const-qualified.

If `C` is a standard Container, returns a `C::const_reverse_iterator` object.

range-rbegin-rend.svg

### Parameters

|  |  |  |
| --- | --- | --- |
| c | - | a container or view with a `rend` member function |
| array | - | an array of arbitrary type |
| il | - | an `std::initializer_list` |

### Return value

1,2) `c.rend()`

3) `std::reverse_iterator<T*>(array)`

4) `std::reverse_iterator<const T*>(il.begin())`

5) `c.rend()`

### Exceptions

May throw implementation-defined exceptions.

### Overloads

Custom overloads of `rend` may be provided for classes and enumerations that do not expose a suitable `rend()` member function, yet can be iterated.

Overloads of `rend` found by argument-dependent lookup can be used to customize the behavior of `std::ranges::rend` and `std::ranges::crend`. (since C++20)

### Notes

The overload for `std::initializer_list` is necessary because it does not have a member function `rend`.

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <iterator>
#include <vector>

int main()
{
    int a[]{4, 6, -3, 9, 10};
    std::cout << "C-style array `a` backwards: ";
    std::copy(std::rbegin(a), std::rend(a), std::ostream_iterator<int>(std::cout, " "));

    auto il = {3, 1, 4};
    std::cout << "\nstd::initializer_list `il` backwards: ";
    std::copy(std::rbegin(il), std::rend(il), std::ostream_iterator<int>(std::cout, " "));

    std::vector<int> v{4, 6, -3, 9, 10};
    std::cout << "\nstd::vector `v` backwards: ";
    std::copy(std::rbegin(v), std::rend(v), std::ostream_iterator<int>(std::cout, " "));
    std::cout << '\n';
}
```

Output:

```text
C-style array `a` backwards: 10 9 -3 6 4
std::initializer_list `il` backwards: 4 1 3
std::vector `v` backwards: 10 9 -3 6 4
```

### See also

|  |  |
| --- | --- |
| end, cend (C++11), (C++14) | returns an iterator to the end of a container or array (function template) |
| rbegin, crbegin (C++14) | returns a reverse iterator to the beginning of a container or array (function template) |
| begin, cbegin (C++11), (C++14) | returns an iterator to the beginning of a container or array (function template) |
| ranges::rend (C++20) | returns a reverse end iterator to a range (customization point object) |
| ranges::crend (C++20) | returns a reverse end iterator to a read-only range (customization point object) |
