# std::experimental::filesystem::path::generic_string,generic_wstring,generic_u8string,...

|  |  |  |
| --- | --- | --- |
| `template< class CharT, class Traits = std::char_traits<CharT>, class Alloc = std::allocator<CharT> > std::basic_string<CharT,Traits,Alloc> generic_string( const Alloc& a = Alloc() ) const;` | (1) | (filesystem TS) |
|  | (2) | (filesystem TS) |
| `std::string generic_string() const;` |  |  |
| `std::wstring generic_wstring() const;` |  |  |
| `std::string generic_u8string() const;` |  |  |
| `std::u16string generic_u16string() const;` |  |  |
| `std::u32string generic_u32string() const;` |  |  |

Returns the internal pathname in generic pathname format, converted to specific string type. Conversion, if any, is specified in todo. The `/` character is used as the directory separator.

1) All memory allocations are performed by `a`.

2) The encoding in the case of `u8string()` is always UTF-8.

### Parameters

|  |  |  |
| --- | --- | --- |
| a | - | allocator to construct the string with |
| - `CharT` must be one of the encoded character types (`char`, `wchar_t`, `char16_t` and `char32_t`) |  |  |

### Return value

The internal pathname in generic pathname format, converted to specified string type.

### Exceptions

May throw implementation-defined exceptions.

### See also

string, wstring, u8string, u16string, u32string returns the path in native pathname format converted to a string (public member function)
