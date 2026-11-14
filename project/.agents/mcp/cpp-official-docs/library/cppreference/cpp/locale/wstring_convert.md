# std::wstring_convert

| Defined in header `<locale>` |  |
| --- | --- |
| `template< class Codecvt, class Elem = wchar_t, class Wide_alloc = std::allocator<Elem>, class Byte_alloc = std::allocator<char> > class wstring_convert;` | (since C++11) (deprecated in C++17) (removed in C++26) |

Class template `std::wstring_convert` performs conversions between byte string `std::string` and wide string `std::basic_string<Elem>`, using an individual code conversion facet `Codecvt`. `std::wstring_convert` assumes ownership of the conversion facet, and cannot use a facet managed by a locale.

The standard facets suitable for use with `std::wstring_convert` are `std::codecvt_utf8` for UTF-8/UCS-2 and UTF-8/UCS-4 conversions and `std::codecvt_utf8_utf16` for UTF-8/UTF-16 conversions.

### Nested types

| Type | Definition |
| --- | --- |
| `byte_string` | `std::basic_string<char, std::char_traits<char>, Byte_alloc>` |
| `wide_string` | `std::basic_string<Elem, std::char_traits<Elem>, Wide_alloc>` |
| `state_type` | `typename Codecvt::state_type` |
| `int_type` | `typename wide_string::traits_type::int_type` |

### Data members

| Member | Description |
| --- | --- |
| `byte_string` `byte_err_string` | the byte string to display on errors (exposition-only member object*) |
| `wide_string` `wide_err_string` | the wide string to display on errors (exposition-only member object*) |
| `Codecvt*` `cvtptr` | a pointer to the allocated conversion object (exposition-only member object*) |
| `state_type` `cvtstate` | the conversion state object (exposition-only member object*) |
| `std::size_t` `cvtcount` | the conversion count (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a new `wstring_convert` (public member function) |
| operator= | the copy assignment operator is deleted (public member function) |
| (destructor) | destructs the `wstring_convert` and its conversion facet (public member function) |
| from_bytes | converts a byte string into a wide string (public member function) |
| to_bytes | converts a wide string into a byte string (public member function) |
| converted | returns the number of characters successfully converted (public member function) |
| state | returns the current conversion state (public member function) |

### See also

| Character conversions | locale-defined multibyte (UTF-8, GB18030) | UTF-8 | UTF-16 |
| --- | --- | --- | --- |
| UTF-16 | `mbrtoc16` / `c16rtomb` (with C11's DR488) | `codecvt``<char16_t,char,mbstate_t>` `codecvt_utf8_utf16``<char16_t>` `codecvt_utf8_utf16``<char32_t>` `codecvt_utf8_utf16``<wchar_t>` | N/A |
| UCS-2 | `c16rtomb` (without C11's DR488) | `codecvt_utf8``<char16_t>` | `codecvt_utf16``<char16_t>` |
| UTF-32 | `mbrtoc32` / `c32rtomb` | `codecvt``<char32_t,char,mbstate_t>` `codecvt_utf8``<char32_t>` | `codecvt_utf16``<char32_t>` |
| system `wchar_t`: UTF-32 (non-Windows) UCS-2 (Windows) | `mbsrtowcs` / `wcsrtombs` `use_facet``<``codecvt` `<wchar_t,char,mbstate_t>>`(`locale`) | `codecvt_utf8``<wchar_t>` | `codecvt_utf16``<wchar_t>` |

|  |  |
| --- | --- |
| wbuffer_convert (C++11), (deprecated in C++17), (removed in C++26) | performs conversion between a byte stream buffer and a wide stream buffer (class template) |
| codecvt_utf8 (C++11), (deprecated in C++17), (removed in C++26) | converts between UTF-8 and UCS-2/UCS-4 (class template) |
| codecvt_utf8_utf16 (C++11), (deprecated in C++17), (removed in C++26) | converts between UTF-8 and UTF-16 (class template) |
