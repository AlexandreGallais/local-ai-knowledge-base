# std::experimental::basic_string_view<CharT,Traits>::find_last_of

|  |  |  |
| --- | --- | --- |
| `constexpr size_type find_last_of(basic_string_view v, size_type pos = npos) const noexcept;` | (1) | (library fundamentals TS) |
| `constexpr size_type find_last_of(CharT c, size_type pos = npos) const noexcept;` | (2) | (library fundamentals TS) |
| `constexpr size_type find_last_of(const CharT* s, size_type pos, size_type count) const;` | (3) | (library fundamentals TS) |
| `constexpr size_type find_last_of(const CharT* s, size_type pos = npos) const;` | (4) | (library fundamentals TS) |

Finds the last character equal to any of the characters in the given character sequence.

1) Finds the last occurence of any of the characters of `v` in this view, starting at position `pos`.

2) Equivalent to `find_last_of(basic_string_view(&c, 1), pos)`.

3) Equivalent to `find_last_of(basic_string_view(s, count), pos)`.

4) Equivalent to `find_last_of(basic_string_view(s), pos)`.

### Parameters

|  |  |  |
| --- | --- | --- |
| v | - | view to search for |
| pos | - | position at which to start the search |
| count | - | length of the string of characters to search for |
| s | - | pointer to a string of characters to search for |
| ch | - | character to search for |

### Return value

Position of the last occurrence of any character of the substring, or `npos` if no such character is found.

### Complexity

O(`size()` * `v.size()`) at worst.

### See also

|  |  |
| --- | --- |
| find | find characters in the view (public member function) |
| rfind | find the last occurrence of a substring (public member function) |
| find_first_of | find first occurrence of characters (public member function) |
| find_first_not_of | find first absence of characters (public member function) |
| find_last_not_of | find last absence of characters (public member function) |
