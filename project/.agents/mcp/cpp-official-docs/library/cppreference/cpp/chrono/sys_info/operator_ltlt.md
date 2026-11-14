# std::chrono::operator<< (std::chrono::sys_info)

| Defined in header `<chrono>` |  |
| --- | --- |
| `template< class CharT, class Traits > std::basic_ostream<CharT, Traits>& operator<<( std::basic_ostream<CharT, Traits>& os, const std::chrono::sys_info& r );` | (since C++20) |

Inserts a textual representation of `r` into `os`. The exact format is unspecified.

### Return value

`os`
