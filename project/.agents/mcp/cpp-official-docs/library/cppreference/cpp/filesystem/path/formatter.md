# std::formatter<std::filesystem::path>

| Defined in header `<filesystem>` |  |
| --- | --- |
| `template< class CharT > struct formatter<std::filesystem::path, CharT>;` | (since C++26) |

The template specialization of `std::formatter` for the `std::filesystem::path` class allows users to convert a pathname to its textual representation using formatting functions. This specialization is *debug-enabled*.

### Format specification

The syntax of format specifications path-format-spec is:

fill-and-align (optional) width (optional) `?`(optional) `g`(optional)

fill-and-align and width have the same meaning as in standard format specification.

The `?` option is used to format the pathname as an escaped string.

The `g` option is used to specify that the pathname is in generic-format representation.

### Member functions

|  |  |
| --- | --- |
| set_debug_format | enables to format the pathname as an escaped string (public member function) |
| parse | parses the format specifier as specified by path-format-spec (public member function) |
| format | writes the formatted output as specified by path-format-spec (public member function) |

## std::formatter<std::filesystem::path>::set_debug_format

`constexpr void set_debug_format();`

Allows the current object to format pathname as an escaped string.

## std::formatter<std::filesystem::path>::parse

`constexpr auto parse( std::basic_format_parse_context<CharT>& ctx ) -> std::basic_format_parse_context<CharT>::iterator;`

Parses the format specifiers as a path-format-spec and stores the parsed specifiers in the current object.

Returns an iterator past the end of the path-format-spec.

## std::formatter<std::filesystem::path>::format

`template< class FormatContext > auto format( const std::filesystem::path& p, FormatContext& ctx ) const -> FormatContext::iterator;`

Let `s` be `p.generic<std::filesystem::path::value_type>()` if the `g` option is used, otherwise `p.native()`. Writes `s` into `ctx.out()` as specified by path-format-spec.

For character transcoding of the pathname:

- The pathname is transcoded from the native encoding for wide character strings to UTF-8 with maximal subparts of ill-formed subsequences substituted with `U+FFFD` REPLACEMENT CHARACTER if
  - `std::is_same_v<CharT, char>` is `true`,
  - `std::is_same_v<typename path::value_type, wchar_t>` is `true`, and
  - ordinary literal encoding is UTF-8.
- Otherwise, no transcoding is performed if `std::is_same_v<typename path::value_type, CharT>` is `true`.
- Otherwise, transcoding is implementation-defined.

Returns an iterator past the end of the output range.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_format_path` | `202403L` | (C++26) | formatting support for `std::filesystem::path` |

### Example

This section is incomplete Reason: no example

### See also

formatter (C++20) defines formatting rules for a given type (class template)
