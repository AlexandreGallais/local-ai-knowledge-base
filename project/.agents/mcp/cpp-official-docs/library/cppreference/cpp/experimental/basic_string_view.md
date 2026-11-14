# std::experimental::basic_string_view

| Defined in header `<experimental/string_view>` |  |
| --- | --- |
| `template< class CharT, class Traits = std::char_traits<CharT> > class basic_string_view;` | (library fundamentals TS) |

The class template `basic_string_view` describes an object that can refer to a constant contiguous sequence of `char`-like objects with the first element of the sequence at position zero.

A typical implementation holds only two members: a pointer to constant `CharT` and a size.

Several typedefs for common character types are provided:

| Defined in header `<experimental/string_view>` |  |
| --- | --- |
| Type | Definition |
| `std::experimental::string_view` | `std::experimental::basic_string_view<char>` |
| `std::experimental::wstring_view` | `std::experimental::basic_string_view<wchar_t>` |
| `std::experimental::u16string_view` | `std::experimental::basic_string_view<char16_t>` |
| `std::experimental::u32string_view` | `std::experimental::basic_string_view<char32_t>` |

### Template parameters

|  |  |  |
| --- | --- | --- |
| CharT | - | character type |
| Traits | - | traits class specifying the operations on the character type |

### Member types

| Member type | Definition |
| --- | --- |
| `traits_type` | `Traits` |
| `value_type` | `CharT` |
| `pointer` | `CharT*` |
| `const_pointer` | `const CharT*` |
| `reference` | `CharT&` |
| `const_reference` | `const CharT&` |
| `const_iterator` | implementation-defined LegacyRandomAccessIterator |
| `iterator` | `const_iterator` |
| `reverse_iterator` | `const_reverse_iterator` |
| `const_reverse_iterator` | `std::reverse_iterator<const_iterator>` |
| `size_type` | `std::size_t` |
| `difference_type` | `std::ptrdiff_t` |

Note: `iterator` and `const_iterator` are the same type because string views are views into constant character sequences.

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `basic_string_view` (public member function) |
| operator= | assigns a view (public member function) |
| Iterators |  |
| begin, cbegin | returns an iterator to the beginning (public member function) |
| end, cend | returns an iterator to the end (public member function) |
| rbegin, crbegin | returns a reverse iterator to the beginning (public member function) |
| rend, crend | returns a reverse iterator to the end (public member function) |
| Element access |  |
| operator[] | access specified character (public member function) |
| at | access specified character with bounds checking (public member function) |
| front | accesses the first character (public member function) |
| back | accesses the last character (public member function) |
| data | returns a pointer to the first character of a view (public member function) |
| Capacity |  |
| size, length | returns the number of characters (public member function) |
| max_size | returns the maximum number of characters (public member function) |
| empty | checks whether the view is empty (public member function) |
| Modifiers |  |
| remove_prefix | shrinks the view by moving its start forward (public member function) |
| remove_suffix | shrinks the view by moving its end backward (public member function) |
| swap | swaps the contents (public member function) |
| Operations |  |
| to_string, operator basic_string | creates a string from the view (public member function) |
| copy | copies characters (public member function) |
| substr | returns a substring (public member function) |
| compare | compares two views (public member function) |
| find | find characters in the view (public member function) |
| rfind | find the last occurrence of a substring (public member function) |
| find_first_of | find first occurrence of characters (public member function) |
| find_last_of | find last occurrence of characters (public member function) |
| find_first_not_of | find first absence of characters (public member function) |
| find_last_not_of | find last absence of characters (public member function) |
| Constants |  |
| npos [static] | special value. The exact meaning depends on the context (public static member constant) |

### Non-member functions

|  |  |
| --- | --- |
| operator==, operator!=, operator<, operator>, operator<=, operator>= | lexicographically compares two views (function template) |
| Input/output |  |
| operator<< | performs stream output on views (function template) |

### Helper classes

std::hash<std::experimental::string_view>, std::hash<std::experimental::wstring_view>, std::hash<std::experimental::u16string_view>, std::hash<std::experimental::u32string_view> hash support for views (class template specialization)

### Feature test macros

__cpp_lib_experimental_string_view a value of at least `201411` indicates that basic_string_view template is supported (macro constant)
