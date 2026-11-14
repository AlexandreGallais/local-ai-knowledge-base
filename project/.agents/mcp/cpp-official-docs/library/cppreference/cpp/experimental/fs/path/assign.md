# std::experimental::filesystem::path::assign

|  |  |  |
| --- | --- | --- |
| `template< class Source > path& assign( const Source& source );` | (1) | (filesystem TS) |
| `template< class InputIt > path& assign( InputIt first, InputIt last );` | (2) | (filesystem TS) |

Assigns the contents to the `path` object.

1) Assigns the range of `source`.

This section is incomplete

2) Assigns the pathname identified by range `[``first``,``last``)`.

### Parameters

|  |  |  |
| --- | --- | --- |
| source | - | a range to assign |
| first, last | - | a range to assign |
| Type requirements |  |  |
| - `InputIt` must meet the requirements of LegacyInputIterator. |  |  |
| - The value type of `InputIt` must be one of the encoded character types (`char`, `wchar_t`, `char16_t` and `char32_t`). |  |  |

### Return value

`*this`

### Exceptions

This section is incomplete

### See also

operator= assigns another path (public member function)
