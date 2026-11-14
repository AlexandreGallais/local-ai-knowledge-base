# std::basic_string<CharT,Traits,Allocator>::append

|  |  |  |
| --- | --- | --- |
| `basic_string& append( size_type count, CharT ch );` | (1) | (constexpr since C++20) |
| `basic_string& append( const CharT* s, size_type count );` | (2) | (constexpr since C++20) |
| `basic_string& append( const CharT* s );` | (3) | (constexpr since C++20) |
| `template< class SV > basic_string& append( const SV& t );` | (4) | (since C++17) (constexpr since C++20) |
| `template< class SV > basic_string& append( const SV& t, size_type pos, size_type count = npos );` | (5) | (since C++17) (constexpr since C++20) |
| `basic_string& append( const basic_string& str );` | (6) | (constexpr since C++20) |
|  | (7) |  |
| `basic_string& append( const basic_string& str, size_type pos, size_type count );` |  | (until C++14) |
| `basic_string& append( const basic_string& str, size_type pos, size_type count = npos );` |  | (since C++14) (constexpr since C++20) |
| `template< class InputIt > basic_string& append( InputIt first, InputIt last );` | (8) | (constexpr since C++20) |
| `basic_string& append( std::initializer_list<CharT> ilist );` | (9) | (since C++11) (constexpr since C++20) |

Appends additional characters to the string.

1) Appends `count` copies of character `ch`.

2) Appends characters in the range `[``s``,``s + count``)`.

If `[``s``,``s + count``)` is not a valid range, the behavior is undefined.

3) Equivalent to `return append(s, Traits::length(s));`.

4,5) Appends characters in a string view `sv` constructed from `t`.

- If only `t` is provided, all characters in `sv` are appended.
- If `pos` is also provided:
  - If `count` is `npos`, all characters in `sv` starting from `pos` are appended.
  - Otherwise, the `std::min(count, sv.size() - pos)` characters in `sv` starting from `pos` are appended.

These overloads participate in overload resolution only if all following conditions are satisfied:

- `std::is_convertible_v<const SV&, std::basic_string_view<CharT, Traits>>` is `true`.
- `std::is_convertible_v<const SV&, const CharT*>` is `false`.

4) Equivalent to `std::basic_string_view<CharT, Traits> sv = t; return append(sv.data(), sv.size());`.

5) Equivalent to `std::basic_string_view<CharT, Traits> sv = t; return append(sv.substr(pos, count));`.

6,7) Appends characters in another string `str`.

- If only `str` is provided, all characters in it are appended.
- If `pos` is also provided:
  - If `count` is `npos`, all characters in `str` starting from `pos` are appended.
  - Otherwise, the `std::min(count, str.size() - pos)` characters in `str` starting from `pos` are appended.

6) Equivalent to `return append(str.data(), str.size());`.

7) Equivalent to `return append(std::basic_string_view<CharT, Traits> (str).substr(pos, count));`. (since C++20)

8) Equivalent to `return append(basic_string(first, last, get_allocator()));`.

|  |  |
| --- | --- |
| This overload has the same effect as overload (1) if `InputIt` is an integral type. | (until C++11) |
| This overload participates in overload resolution only if `InputIt` satisfies the requirements of LegacyInputIterator. | (since C++11) |

9) Equivalent to `return append(ilist.begin(), ilist.size());`.

### Parameters

|  |  |  |
| --- | --- | --- |
| count | - | number of characters to append |
| ch | - | character value to append |
| s | - | pointer to the character string to append |
| t | - | object convertible to `std::basic_string_view` with the characters to append |
| pos | - | the index of the first character to append |
| str | - | string to append |
| first, last | - | range of characters to append |
| ilist | - | initializer list with the characters to append |

### Return value

`*this`

### Complexity

There are no standard complexity guarantees, typical implementations behave similar to `std::vector::insert()`.

### Exceptions

If the operation would cause `size()` to exceed `max_size()`, throws `std::length_error`.

5) If `pos > sv.size()` is `true`, throws `std::out_of_range`.

7) If `pos > str.size()` is `true`, throws `std::out_of_range`.

If an exception is thrown for any reason, this function has no effect (strong exception safety guarantee).

### Example

```cpp
#include <cassert>
#include <string>

int main()
{
    std::string str = "std::string";
    const char* cptr = "C-string";
    const char carr[] = "range";

    std::string result;

    // 1) Append a char 3 times.
    // Note: This is the only overload accepting “CharT”s.
    result.append(3, '*');
    assert(result == "***");

    // 2) Append a fixed-length C-string
    result.append(cptr, 5);
    assert(result == "***C-str");

    // 3) Append a null-terminated C-string
    // Note: Because “append” returns *this, we can chain calls together.
    result.append(1, ' ').append(cptr);
    assert(result == "***C-str C-string");

    // 6) Append a whole string
    result.append(1, ' ').append(str);
    assert(result == "***C-str C-string std::string");

    // 7) Append part of a string
    result.append(str, 3, 2);
    assert(result == "***C-str C-string std::string::");

    // 8) Append range
    result.append(&carr[2], &carr[3]);
    assert(result == "***C-str C-string std::string::n");

    // 9) Append initializer list
    result.append({'p', 'o', 's'});
    assert(result == "***C-str C-string std::string::npos");
}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 847 | C++98 | there was no exception safety guarantee | added strong exception safety guarantee |
| LWG 2250 | C++98 | the behavior of overload (7) was undefined if `pos > str.size()` is `true` | always throws an exception in this case |
| LWG 2788 | C++98 | overload (8) used a default constructed allocator to construct the temporary string | obtains the allocator from `get_allocator()` |
| LWG 2946 | C++17 | overload (4) causes ambiguity in some cases | avoided by making it a template |

### See also

|  |  |
| --- | --- |
| append_range (C++23) | appends a range of characters to the end (public member function) |
| operator+= | appends characters to the end (public member function) |
| strcat | concatenates two strings (function) |
| strncat | concatenates a certain amount of characters of two strings (function) |
| wcscat | appends a copy of one wide string to another (function) |
| wcsncat | appends a certain amount of wide characters from one wide string to another (function) |
