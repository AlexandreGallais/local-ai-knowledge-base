# operator<<(std::experimental::basic_string_view)

| Defined in header `<experimental/string_view>` |  |
| --- | --- |
| `template <class CharT, class Traits> std::basic_ostream<CharT, Traits>& operator<<(std::basic_ostream<CharT, Traits>& os, std::basic_string_view <CharT, Traits> v);` | (library fundamentals TS) |

Equivalent to `os << v.to_string()`.

### Parameters

|  |  |  |
| --- | --- | --- |
| os | - | a character output stream |
| v | - | the view to be inserted |

### Return value

`os`
