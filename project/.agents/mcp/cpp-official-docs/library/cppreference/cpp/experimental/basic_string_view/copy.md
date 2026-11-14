# std::experimental::basic_string_view<CharT,Traits>::copy

`size_type copy( CharT* dest, size_type count, size_type pos = 0) const;` (library fundamentals TS)

Copies the substring `[pos, pos + rcount)` to the character string pointed to by `dest`, where `rcount` is the smaller of `count` and `size() - pos`.

### Parameters

|  |  |  |
| --- | --- | --- |
| dest | - | pointer to the destination character string |
| pos | - | position of the first character |
| count | - | requested substring length |

### Return value

Number of characters copied

### Exceptions

`std::out_of_range` if `pos > size()`.

### Complexity

Linear in `rcount`.

### See also

substr returns a substring (public member function)
