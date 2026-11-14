# std::holds_alternative

| Defined in header `<variant>` |  |
| --- | --- |
| `template< class T, class... Types > constexpr bool holds_alternative( const std::variant<Types...>& v ) noexcept;` | (since C++17) |

Checks if the variant `v` holds the alternative `T`. The call is ill-formed if `T` does not appear exactly once in `Types...`

### Parameters

v - variant to examine

### Return value

`true` if the variant currently holds the alternative `T`, `false` otherwise.

### Example

```cpp
#include <cassert>
#include <string>
#include <variant>

int main()
{
    std::variant<int, std::string> v = "abc";
    assert(not std::holds_alternative<int>(v));
    assert(std::holds_alternative<std::string>(v));
}
```

### See also

|  |  |
| --- | --- |
| index | returns the zero-based index of the alternative held by the `variant` (public member function) |
| get(std::variant) (C++17) | reads the value of the variant given the index or the type (if the type is unique), throws on error (function template) |
