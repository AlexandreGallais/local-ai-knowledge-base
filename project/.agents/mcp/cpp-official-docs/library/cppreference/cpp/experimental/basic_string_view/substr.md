# std::experimental::basic_string_view<CharT,Traits>::substr

`constexpr basic_string_view substr(size_type pos = 0, size_type count = npos ) const;`

Returns a view of the substring `[pos, pos + rcount)`, where `rcount` is the smaller of `count` and `size() - pos`.

### Parameters

|  |  |  |
| --- | --- | --- |
| pos | - | position of the first character |
| count | - | requested length |

### Return value

View of the substring `[pos, pos + rcount)`.

### Exceptions

`std::out_of_range` if `pos > size()`

### Complexity

Constant.

### See also

|  |  |
| --- | --- |
| copy | copies characters (public member function) |
| find | find characters in the view (public member function) |
