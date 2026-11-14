# std::experimental::basic_string_view<CharT,Traits>::basic_string_view

|  |  |  |
| --- | --- | --- |
| `constexpr basic_string_view() noexcept;` | (1) | (library fundamentals TS) |
| `constexpr basic_string_view( const basic_string_view& other ) noexcept = default;` | (2) | (library fundamentals TS) |
| `template<class Allocator> basic_string_view( const std::basic_string<CharT, Traits, Allocator>& str ) noexcept;` | (3) | (library fundamentals TS) |
| `constexpr basic_string_view( const CharT* s, size_type count );` | (4) | (library fundamentals TS) |
| `constexpr basic_string_view( const CharT* s );` | (5) | (library fundamentals TS) |

1) Default constructor. Constructs an empty `basic_string_view`.

2) Copy constructor. Constructs a view of the same content as `other`.

3) Constructs a view of the first `str.size()` characters of the character array starting with the element pointed by `str.data()`.

4) Constructs a view of the first `count` characters of the character array starting with the element pointed by `s`. `s` can contain null characters. The behavior is undefined if `[``s``,``s + count``)` is not a valid range (even though the constructor may not access any of the elements of this range).

5) Constructs a view of the null-terminated character string pointed to by `s`, not including the terminating null character. The length of the view is determined as if by `Traits::length(s)`. The behavior is undefined if `[``s``,``s + Traits::length(s)``)` is not a valid range (even though the constructor may not access any of the elements of this range).

### Parameters

|  |  |  |
| --- | --- | --- |
| other | - | another view to initialize the view with |
| str | - | a C++ string object to initialize view with |
| s | - | pointer to a character array or a C string to initialize the view with |
| count | - | number of characters to include in the view |

### Exceptions

4,5) Throws nothing.

### Complexity

1-4) Constant.

5) Linear in length of `s`.

### Example

```cpp
#include <experimental/string_view>
#include <iostream>

int main()
{
    std::string cppstr = "Foo";
    char array[3] = {'B', 'a', 'r'};

    std::experimental::string_view cppstr_v(cppstr);
    std::experimental::string_view array_v(array, sizeof array);

    std::experimental::wstring_view wcstr_v = L"xyzzy";

    std::cout << cppstr_v << '\n'
              << array_v << '\n'
              << wcstr_v.size() << '\n';
}
```

Output:

```text
Foo
Bar
5
```

### See also

operator= assigns a view (public member function)
