# operator<<,>>(std::experimental::filesystem::path)

|  |  |  |
| --- | --- | --- |
| `template< class CharT, class Traits > std::basic_ostream<CharT,Traits>& operator<<( std::basic_ostream<CharT,Traits>& os, const path& p );` | (1) | (filesystem TS) |
| `template< class CharT, class Traits > std::basic_istream<CharT,Traits>& operator>>( std::basic_istream<CharT,Traits>& is, path& p );` | (2) | (filesystem TS) |

Performs stream input or output on the path `p`. `std::quoted` is used so that spaces do not cause truncation when later read by stream input operator.

### Parameters

|  |  |  |
| --- | --- | --- |
| os | - | stream to perform output on |
| is | - | stream to perform input on |
| p | - | path to insert or extract |

### Return value

1) `os`

2) `is`

### Exceptions

May throw implementation-defined exceptions.

### Possible implementation

First version

`template<class CharT, class Traits> std::basic_ostream<CharT,Traits>& operator<<(std::basic_ostream<CharT,Traits>& os, const path& p) { os << std::quoted(p.string<CharT,Traits>()); return os; }`

Second version

`template<class CharT, class Traits> std::basic_istream<CharT,Traits>& operator>>(std::basic_istream<CharT,Traits>& is, path& p) { std::basic_string<CharT, Traits> t; is >> std::quoted(t); p = t; return is; }`

### Example

This section is incomplete Reason: no example
