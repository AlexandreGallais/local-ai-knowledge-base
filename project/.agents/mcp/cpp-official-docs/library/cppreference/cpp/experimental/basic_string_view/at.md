# std::experimental::basic_string_view<CharT,Traits>::at

`constexpr const_reference at(size_type pos) const;` (library fundamentals TS)

Returns a reference to the character at specified location `pos`. Bounds checking is performed, exception of type `std::out_of_range` will be thrown on invalid access.

### Parameters

pos - position of the character to return

### Return value

Reference to the requested character.

### Exceptions

Throws `std::out_of_range` if `pos >= size()`.

### Complexity

Constant.

### See also

operator[] access specified character (public member function)
