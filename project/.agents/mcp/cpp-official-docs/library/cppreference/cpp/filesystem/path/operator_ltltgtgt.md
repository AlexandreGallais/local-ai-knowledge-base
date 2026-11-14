# operator<<,>>(std::filesystem::path)

|  |  |  |
| --- | --- | --- |
| `template< class CharT, class Traits > friend std::basic_ostream<CharT,Traits>& operator<<( std::basic_ostream<CharT,Traits>& os, const path& p );` | (1) | (since C++17) |
| `template< class CharT, class Traits > friend std::basic_istream<CharT,Traits>& operator>>( std::basic_istream<CharT,Traits>& is, path& p );` | (2) | (since C++17) |

Performs stream input or output on the path `p`. `std::quoted` is used so that spaces do not cause truncation when later read by stream input operator.

These function templates are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when std::filesystem::path is an associated class of the arguments. This prevents undesirable conversions in the presence of a `using namespace std::filesystem;` *using-directive*.

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

operator<<

`template<class CharT, class Traits> friend std::basic_ostream<CharT,Traits>& operator<<(std::basic_ostream<CharT,Traits>& os, const path& p) { os << std::quoted(p.string<CharT,Traits>()); return os; }`

operator>>

`template<class CharT, class Traits> friend std::basic_istream<CharT,Traits>& operator>>(std::basic_istream<CharT,Traits>& is, path& p) { std::basic_string<CharT, Traits> t; is >> std::quoted(t); p = t; return is; }`

### Example

```cpp
#include <filesystem>
#include <iostream>

int main()
{
    std::cout << std::filesystem::current_path() << '\n';
    std::cout << std::filesystem::temp_directory_path() << '\n';
}
```

Possible output:

```text
"/home/user"
"/tmp"
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2989 | C++17 | allowed insertion of everything convertible to `path` in the presence of a *using-directive* | made hidden friend |
