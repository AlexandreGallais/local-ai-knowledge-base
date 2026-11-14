# std::literals::string_literals::operator""s

| Defined in header `<string>` |  |  |
| --- | --- | --- |
| `std::string operator""s( const char* str, std::size_t len );` | (1) | (since C++14) (constexpr since C++20) |
| `constexpr std::u8string operator""s( const char8_t* str, std::size_t len );` | (2) | (since C++20) |
| `std::u16string operator""s( const char16_t* str, std::size_t len );` | (3) | (since C++14) (constexpr since C++20) |
| `std::u32string operator""s( const char32_t* str, std::size_t len );` | (4) | (since C++14) (constexpr since C++20) |
| `std::wstring operator""s( const wchar_t* str, std::size_t len );` | (5) | (since C++14) (constexpr since C++20) |

Forms a string literal of the desired type.

1) Returns `std::string{str, len}`.

2) Returns `std::u8string{str, len}`.

3) Returns `std::u16string{str, len}`.

4) Returns `std::u32string{str, len}`.

5) Returns `std::wstring{str, len}`.

### Parameters

|  |  |  |
| --- | --- | --- |
| str | - | pointer to the beginning of the raw character array literal |
| len | - | length of the raw character array literal |

### Return value

The string literal.

### Notes

These operators are declared in the namespace `std::literals::string_literals`, where both `literals` and `string_literals` are inline namespaces. Access to these operators can be gained with any of the following `using` directives:

- `using namespace std::literals`
- `using namespace std::string_literals`
- `using namespace std::literals::string_literals`

`std::chrono::duration` also defines `operator""s` to represent literal seconds, but it is an arithmetic literal: `10.0s` and `10s` are ten seconds, but `"10"s` is a string.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_string_udls` | `201304L` | (C++14) | User-defined literals for string types |

### Example

```cpp
#include <iostream>
#include <string>

void print_with_zeros(const auto note, const std::string& s)
{
    std::cout << note;
    for (const char c : s)
        c ? std::cout << c : std::cout << "₀";
    std::cout << " (size = " << s.size() << ")\n";
}

int main()
{
    using namespace std::string_literals;

    std::string s1 = "abc\0\0def";
    std::string s2 = "abc\0\0def"s;
    print_with_zeros("s1: ", s1);
    print_with_zeros("s2: ", s2);

    std::cout << "abcdef"s.substr(1,4) << '\n';
}
```

Output:

```text
s1: abc (size = 3)
s2: abc₀₀def (size = 8)
bcde
```

### See also

|  |  |
| --- | --- |
| (constructor) | constructs a `basic_string` (public member function) |
| operator""sv (C++17) | creates a string view of a character array literal (function) |
