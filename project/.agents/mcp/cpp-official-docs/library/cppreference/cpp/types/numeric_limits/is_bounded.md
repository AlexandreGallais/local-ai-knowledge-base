# std::numeric_limits<T>::is_bounded

|  |  |
| --- | --- |
| `static const bool is_bounded;` | (until C++11) |
| `static constexpr bool is_bounded;` | (since C++11) |

The value of `std::numeric_limits<T>::is_bounded` is `true` for all arithmetic types `T` that represent a finite set of values. While all fundamental types are bounded, this constant would be `false` in a specialization of `std::numeric_limits` for a library-provided arbitrary precision arithmetic type.

### Standard specializations

| `T` | value of `std::numeric_limits<T>::is_bounded` |
| --- | --- |
| `/* non-specialized */` | `false` |
| `bool` | `true` |
| `char` | `true` |
| `signed char` | `true` |
| `unsigned char` | `true` |
| `wchar_t` | `true` |
| `char8_t` (since C++20) | `true` |
| `char16_t` (since C++11) | `true` |
| `char32_t` (since C++11) | `true` |
| `short` | `true` |
| `unsigned short` | `true` |
| `int` | `true` |
| `unsigned int` | `true` |
| `long` | `true` |
| `unsigned long` | `true` |
| `long long` (since C++11) | `true` |
| `unsigned long long` (since C++11) | `true` |
| `float` | `true` |
| `double` | `true` |
| `long double` | `true` |

### See also

|  |  |
| --- | --- |
| is_integer [static] | identifies integer types (public static member constant) |
| is_signed [static] | identifies signed types (public static member constant) |
| is_exact [static] | identifies exact types (public static member constant) |
