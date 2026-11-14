# std::begin, std::cbegin

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
| `template< class C > auto begin( C& c ) -> decltype(c.begin());` | (1) | (since C++11) (constexpr since C++17) |
| `template< class C > auto begin( const C& c ) -> decltype(c.begin());` | (2) | (since C++11) (constexpr since C++17) |
| `template< class T, std::size_t N > T* begin( T (&array)[N] );` | (3) | (since C++11) (noexcept since C++14) (constexpr since C++14) |
| `template< class C > constexpr auto cbegin( const C& c ) noexcept(/* see below */) -> decltype(std::begin(c));` | (4) | (since C++14) |

Returns an iterator to the beginning of the given range.

1,2) Returns `c.begin()`, which is typically an iterator to the beginning of the sequence represented by `c`.

1) If `C` is a standard Container, returns a `C::iterator` object.

2) If `C` is a standard Container, returns a `C::const_iterator` object.

3) Returns a pointer to the beginning of `array`.

4) Returns `std::begin(c)`, with `c` always treated as const-qualified.

If `C` is a standard Container, returns a `C::const_iterator` object.

range-begin-end.svg

### Parameters

|  |  |  |
| --- | --- | --- |
| c | - | a container or view with a `begin` member function |
| array | - | an array of arbitrary type |

### Return value

1,2) `c.begin()`

3) `array`

4) `c.begin()`

### Exceptions

4)

`noexcept` specification:

`noexcept(noexcept(std::begin(c)))`

### Overloads

Custom overloads of `begin` may be provided for classes and enumerations that do not expose a suitable `begin()` member function, yet can be iterated. The following overloads are already provided by the standard library:

|  |  |
| --- | --- |
| std::begin(std::initializer_list) (C++11) | overloads `std::begin` (function template) |
| std::begin(std::valarray) (C++11) | overloads `std::begin` (function template) |
| begin(std::filesystem::directory_iterator), end(std::filesystem::directory_iterator) (C++17) | range-based for loop support (function) |
| begin(std::filesystem::recursive_directory_iterator), end(std::filesystem::recursive_directory_iterator) | range-based for loop support (function) |

Similar to the use of `swap` (described in Swappable), typical use of the `begin` function in generic context is an equivalent of `using std::begin; begin(arg);`, which allows both the ADL-selected overloads for user-defined types and the standard library function templates to appear in the same overload set.

```cpp
template<typename Container, typename Function>
void for_each(Container&& cont, Function f)
{
    using std::begin;
    auto it = begin(cont);
    using std::end;
    auto end_it = end(cont);
    while (it != end_it)
    {
        f(*it);
        ++it;
    }
}
```

Overloads of `begin` found by argument-dependent lookup can be used to customize the behavior of `std::ranges::begin`, `std::ranges::cbegin`, and other customization pointer objects depending on `std::ranges::begin`. (since C++20)

### Notes

The non-array overloads exactly reflect the behavior of `C::begin`. Their effects may be surprising if the member function does not have a reasonable implementation.

`std::cbegin` is introduced for unification of member and non-member range accesses. See also LWG issue 2128.

If `C` is a shallow-const view, `std::cbegin` may return a mutable iterator. Such behavior is unexpected for some users. See also P2276 and P2278.

### Example

```cpp
#include <iostream>
#include <iterator>
#include <vector>

int main()
{
    std::vector<int> v = {3, 1, 4};
    auto vi = std::begin(v);
    std::cout << std::showpos << *vi << '\n';

    int a[] = {-5, 10, 15};
    auto ai = std::begin(a);
    std::cout << *ai << '\n';
}
```

Output:

```text
+3
-5
```

### See also

|  |  |
| --- | --- |
| end, cend (C++11), (C++14) | returns an iterator to the end of a container or array (function template) |
| ranges::begin (C++20) | returns an iterator to the beginning of a range (customization point object) |
| ranges::cbegin (C++20) | returns an iterator to the beginning of a read-only range (customization point object) |
