# std::basic_regex

| Defined in header `<regex>` |  |
| --- | --- |
| `template< class CharT, class Traits = std::regex_traits<CharT> > class basic_regex;` | (since C++11) |

The class template `basic_regex` provides a general framework for holding regular expressions.

Several typedefs for common character types are provided:

| Defined in header `<regex>` |  |
| --- | --- |
| Type | Definition |
| `std::regex` | `std::basic_regex<char>` |
| `std::wregex` | `std::basic_regex<wchar_t>` |

### Member types

| Member type | Definition |
| --- | --- |
| `value_type` | `CharT` |
| `traits_type` | `Traits` |
| `string_type` | `Traits::string_type` |
| `locale_type` | `Traits::locale_type` |
| `flag_type` | `std::regex_constants::syntax_option_type` |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs the regex object (public member function) |
| (destructor) | destructs the regex object (public member function) |
| operator= | assigns the contents (public member function) |
| assign | assigns the contents (public member function) |
| Observers |  |
| mark_count | returns the number of marked sub-expressions within the regular expression (public member function) |
| flags | returns the syntax flags (public member function) |
| Locale |  |
| getloc | get locale information (public member function) |
| imbue | set locale information (public member function) |
| Modifiers |  |
| swap | swaps the contents (public member function) |
| Constants |  |

The member constants in `basic_regex` are duplicates of the `syntax_option_type` constants defined in the namespace `std::regex_constants`.

### Non-member functions

std::swap(std::basic_regex) (C++11) specializes the `std::swap` algorithm (function template)

### Deduction guides(since C++17)
