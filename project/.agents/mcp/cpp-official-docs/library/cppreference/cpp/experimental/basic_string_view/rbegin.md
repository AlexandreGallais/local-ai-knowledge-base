# std::experimental::basic_string_view<CharT,Traits>::rbegin, std::experimental::basic_string_view<CharT,Traits>::crbegin

|  |  |
| --- | --- |
| `constexpr const_reverse_iterator rbegin() const noexcept;` | (library fundamentals TS) |
| `constexpr const_reverse_iterator crbegin() const noexcept;` | (library fundamentals TS) |

Returns a reverse iterator to the first character of the reversed view. It corresponds to the last character of the non-reversed view.

range-rbegin-rend.svg

### Parameters

(none)

### Return value

`const_reverse_iterator` to the first character

### Complexity

Constant

### See also

rend, crend returns a reverse iterator to the end (public member function)
