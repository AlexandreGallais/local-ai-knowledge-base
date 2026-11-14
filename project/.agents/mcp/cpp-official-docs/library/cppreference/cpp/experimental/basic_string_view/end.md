# std::experimental::basic_string_view<CharT,Traits>::end, std::experimental::basic_string_view<CharT,Traits>::cend

|  |  |
| --- | --- |
| `constexpr const_iterator end() const noexcept;` | (library fundamentals TS) |
| `constexpr const_iterator cend() const noexcept;` | (library fundamentals TS) |

Returns an iterator to the character following the last character of the view. This character acts as a placeholder, attempting to access it results in undefined behavior.

range-begin-end.svg

### Parameters

(none)

### Return value

`const_iterator` to the character following the last character.

### Complexity

Constant

### See also

begin, cbegin returns an iterator to the beginning (public member function)
