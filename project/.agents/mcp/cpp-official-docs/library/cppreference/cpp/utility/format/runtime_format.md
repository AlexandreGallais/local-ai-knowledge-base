# std::runtime_format

| Defined in header `<format>` |  |  |
| --- | --- | --- |
| `/*runtime-format-string*/<char> runtime_format( std::string_view fmt ) noexcept;` | (1) | (since C++26) |
| `/*runtime-format-string*/<wchar_t> runtime_format( std::wstring_view fmt ) noexcept;` | (2) | (since C++26) |

Returns an object that stores a runtime format string directly usable in user-oriented formatting functions and can be implicitly converted to `std::basic_format_string`.

### Parameters

fmt - a string view

### Return value

An object holding the runtime format string of the exposition-only type:

## **Class template** `runtime-format-string` `<CharT>`

`template< class CharT > struct /*runtime-format-string*/;` (exposition only*)

#### Member objects

The returned object contains an exposition-only non-static data member `str` of type `std::basic_string_view<CharT>`.

#### Constructors and assignments

|  |  |
| --- | --- |
| `/*runtime-format-string*/( std::basic_string_view<CharT> s ) noexcept;` | (1) |
| `/*runtime-format-string*/( const /*runtime-format-string*/& ) = delete;` | (2) |
| `/*runtime-format-string*/& operator=( const /*runtime-format-string*/& ) = delete;` | (3) |

1) Initializes `str` with `s`.

2) Copy constructor is explicitly deleted. The type is neither copyable nor movable.

3) The assignment is explicitly deleted.

### Notes

Since the return type of `runtime_format` is neither copyable nor movable, an attempt of passing `runtime_fmt` as glvalue inhibits the construction of `std::basic_format_string` which results in program ill-formed. To construct `std::basic_format_string` with `runtime_format`, the returned value of `runtime_format` is passed directly on `std::basic_format_string` as prvalue where copy elision is guaranteed.

```cpp
auto runtime_fmt = std::runtime_format("{}");

auto s0 = std::format(runtime_fmt, 1); // error
auto s1 = std::format(std::move(runtime_fmt), 1); // still error
auto s2 = std::format(std::runtime_format("{}"), 1); // ok
```

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_format` | `202311L` | (C++26) | Runtime format strings |

### Example

```cpp
#include <format>
#include <print>
#include <string>
#include <string_view>

int main()
{
    std::print("Hello {}!\n", "world");

    std::string fmt;
    for (int i{}; i != 3; ++i)
    {
        fmt += "{} "; // constructs the formatting string
        std::print("{} : ", fmt);
        std::println(std::runtime_format(fmt), "alpha", 'Z', 3.14, "unused");
    }
}
```

Output:

```text
Hello world!
{}  : alpha
{} {}  : alpha Z
{} {} {}  : alpha Z 3.14
```

### See also

|  |  |
| --- | --- |
| format (C++20) | stores formatted representation of the arguments in a new string (function template) |
| vformat (C++20) | non-template variant of `std::format` using type-erased argument representation (function) |
| basic_format_string, format_string, wformat_string (C++20), (C++20), (C++20) | class template that performs compile-time format string checks at construction time (class template) |
