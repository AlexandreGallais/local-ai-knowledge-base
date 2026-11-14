# std::experimental::basic_string_view<CharT,Traits>::rfind

|  |  |  |
| --- | --- | --- |
| `constexpr size_type rfind(basic_string_view v, size_type pos = npos) const noexcept;` | (1) | (library fundamentals TS) |
| `constexpr size_type rfind(CharT c, size_type pos = npos) const noexcept;` | (2) | (library fundamentals TS) |
| `constexpr size_type rfind(const CharT* s, size_type pos, size_type count) const;` | (3) | (library fundamentals TS) |
| `constexpr size_type rfind(const CharT* s, size_type pos = npos) const;` | (4) | (library fundamentals TS) |

Finds the last substring equal to the given character sequence.

1) Finds the last occurence of `v` in this view, starting at position `pos`.

2) Equivalent to `rfind(basic_string_view(&c, 1), pos)`.

3) Equivalent to `rfind(basic_string_view(s, count), pos)`.

4) Equivalent to `rfind(basic_string_view(s), pos)`.

### Parameters

|  |  |  |
| --- | --- | --- |
| v | - | view to search for |
| pos | - | position at which to start the search |
| count | - | length of substring to search for |
| s | - | pointer to a character string to search for |
| ch | - | character to search for |

### Return value

Position of the first character of the found substring or `npos` if no such substring is found.

### Complexity

O(`size()` * `v.size()`) at worst.

### See also

|  |  |
| --- | --- |
| find | find characters in the view (public member function) |
| find_first_of | find first occurrence of characters (public member function) |
| find_last_of | find last occurrence of characters (public member function) |
| find_first_not_of | find first absence of characters (public member function) |
| find_last_not_of | find last absence of characters (public member function) |
