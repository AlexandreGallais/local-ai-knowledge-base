# std::experimental::basic_string_view<CharT,Traits>::find

|  |  |  |
| --- | --- | --- |
| `constexpr size_type find(basic_string_view v, size_type pos = 0) const noexcept;` | (1) | (library fundamentals TS) |
| `constexpr size_type find(CharT c, size_type pos = 0) const noexcept;` | (2) | (library fundamentals TS) |
| `constexpr size_type find(const CharT* s, size_type pos, size_type count) const;` | (3) | (library fundamentals TS) |
| `constexpr size_type find(const CharT* s, size_type pos = 0) const;` | (4) | (library fundamentals TS) |

Finds the first substring equal to the given character sequence.

1) Finds the first occurence of `v` in this view, starting at position `pos`.

2) Equivalent to `find(basic_string_view(&c, 1), pos)`.

3) Equivalent to `find(basic_string_view(s, count), pos)`.

4) Equivalent to `find(basic_string_view(s), pos)`.

### Parameters

|  |  |  |
| --- | --- | --- |
| v | - | view to search for |
| pos | - | position at which to start the search |
| count | - | length of substring to search for |
| s | - | pointer to a character string to search for |
| ch | - | character to search for |

### Return value

Position of the first character of the found substring, or `npos` if no such substring is found.

### Complexity

O(`size()` * `v.size()`) at worst.

### See also

|  |  |
| --- | --- |
| rfind | find the last occurrence of a substring (public member function) |
| find_first_of | find first occurrence of characters (public member function) |
| find_last_of | find last occurrence of characters (public member function) |
| find_first_not_of | find first absence of characters (public member function) |
| find_last_not_of | find last absence of characters (public member function) |
