# std::char_traits<char>::to_char_type, std::char_traits<wchar_t>::to_char_type, std::char_traits<char8_t>::to_char_type, std::char_traits<char16_t>::to_char_type, std::char_traits<char32_t>::to_char_type

`static char_type to_char_type( int_type c );` (constexpr since C++11) (noexcept since C++11)

Converts `c` to `char_type`. If there is no equivalent `char_type` value (such as when `c` is a copy of the `eof()` value), the result is unspecified.

See CharTraits for the general requirements on character traits for `X::to_char_type`.

### Parameters

c - value to convert

### Return value

A value equivalent to `c`.

### Complexity

Constant.
