# std::data

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
| `template< class C > constexpr auto data( C& c ) -> decltype(c.data());` | (1) | (since C++17) |
| `template< class C > constexpr auto data( const C& c ) -> decltype(c.data());` | (2) | (since C++17) |
| `template< class T, std::size_t N > constexpr T* data( T (&array)[N] ) noexcept;` | (3) | (since C++17) |
| `template< class E > constexpr const E* data( std::initializer_list<E> il ) noexcept;` | (4) | (since C++17) |

Returns a pointer to the block of memory containing the elements of the range.

1,2) Returns `c.data()`.

3) Returns `array`.

4) Returns `il.begin()`.

### Parameters

|  |  |  |
| --- | --- | --- |
| c | - | a container or view with a `data()` member function |
| array | - | an array of arbitrary type |
| il | - | an `std::initializer_list` |

### Return value

1,2) `c.data()`

3) `array`

4) `il.begin()`

### Exceptions

1) May throw implementation-defined exceptions.

### Notes

The overload for `std::initializer_list` is necessary because it does not have a member function `data`.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_nonmember_container_access` | `201411L` | (C++17) | `std::size()`, `std::data()`, and `std::empty()` |

### Possible implementation

First version

`template<class C> constexpr auto data(C& c) -> decltype(c.data()) { return c.data(); }`

Second version

`template<class C> constexpr auto data(const C& c) -> decltype(c.data()) { return c.data(); }`

Third version

`template<class T, std::size_t N> constexpr T* data(T (&array)[N]) noexcept { return array; }`

Fourth version

`template<class E> constexpr const E* data(std::initializer_list<E> il) noexcept { return il.begin(); }`

### Example

```cpp
#include <cstring>
#include <iostream>
#include <string>

int main()
{
    std::string s{"Hello world!\n"};

    char a[20]; // storage for a C-style string
    std::strcpy(a, std::data(s));
//  [s.data(), s.data() + s.size()] is guaranteed to be an NTBS since C++11

    std::cout << a;
}
```

Output:

```text
Hello world!
```

### See also

|  |  |
| --- | --- |
| ranges::data (C++20) | obtains a pointer to the beginning of a contiguous range (customization point object) |
| ranges::cdata (C++20) | obtains a pointer to the beginning of a read-only contiguous range (customization point object) |
