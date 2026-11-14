# std::numeric_limits<T>::is_integer

|  |  |
| --- | --- |
| `static const bool is_integer;` | (until C++11) |
| `static constexpr bool is_integer;` | (since C++11) |

The value of `std::numeric_limits<T>::is_integer` is `true` for all integer arithmetic types `T` and `false` otherwise. This constant is meaningful for all specializations.

### Standard specializations

| `T` | value of `std::numeric_limits<T>::is_integer` |
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
| `float` | `false` |
| `double` | `false` |
| `long double` | `false` |

### Example

```cpp
#include <cstddef>
#include <cstdint>
#include <limits>

static_assert
(
        std::numeric_limits<bool>::is_integer
    &&  std::numeric_limits<std::size_t>::is_integer
    &&  std::numeric_limits<std::int32_t>::is_integer
    &&  std::numeric_limits<std::int64_t>::is_integer
    &&  std::numeric_limits<decltype(42)>::is_integer
    && !std::numeric_limits<int*>::is_integer
    && !std::numeric_limits<float>::is_integer
    && !std::numeric_limits<double>::is_integer
    && !std::numeric_limits<long double>::is_integer
    && !std::numeric_limits<decltype([](){})>::is_integer // P0315R4
);

int main() {}
```

### See also

|  |  |
| --- | --- |
| is_integral (C++11) | checks if a type is an integral type (class template) |
| is_signed [static] | identifies signed types (public static member constant) |
| is_exact [static] | identifies exact types (public static member constant) |
| is_bounded [static] | identifies types that represent a finite set of values (public static member constant) |
