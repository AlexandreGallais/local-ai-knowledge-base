# std::numeric_limits<T>::quiet_NaN

|  |  |
| --- | --- |
| `static T quiet_NaN() throw();` | (until C++11) |
| `static constexpr T quiet_NaN() noexcept;` | (since C++11) |

Returns the special value "quiet not-a-number", as represented by the floating-point type `T`. Only meaningful if `std::numeric_limits<T>::has_quiet_NaN == true`. In IEEE 754, the most common binary representation of floating-point numbers, any value with all bits of the exponent set and at least one bit of the fraction set represents a NaN. It is implementation-defined which values of the fraction represent quiet or signaling NaNs, and whether the sign bit is meaningful.

### Return value

| `T` | `std::numeric_limits<T>::quiet_NaN()` |
| --- | --- |
| `/* non-specialized */` | `T()` |
| `bool` | `false` |
| `char` | `​0​` |
| `signed char` | `​0​` |
| `unsigned char` | `​0​` |
| `wchar_t` | `​0​` |
| `char8_t` (since C++20) | `​0​` |
| `char16_t` (since C++11) | `​0​` |
| `char32_t` (since C++11) | `​0​` |
| `short` | `​0​` |
| `unsigned short` | `​0​` |
| `int` | `​0​` |
| `unsigned int` | `​0​` |
| `long` | `​0​` |
| `unsigned long` | `​0​` |
| `long long` (since C++11) | `​0​` |
| `unsigned long long` (since C++11) | `​0​` |
| `float` | implementation-defined (may be `NAN`) |
| `double` | implementation-defined |
| `long double` | implementation-defined |

### Notes

A NaN never compares equal to itself. Copying a NaN may not preserve its bit representation.

### Example

Several ways to generate a NaN (the output string is compiler-specific):

```cpp
#include <iostream>
#include <limits>
#include <cmath>

int main()
{
    std::cout << std::numeric_limits<double>::quiet_NaN()     << ' ' // nan
              << std::numeric_limits<double>::signaling_NaN() << ' ' // nan
              << std::acos(2)    << ' '   // nan
              << std::tgamma(-1) << ' '   // nan
              << std::log(-1)    << ' '   // nan
              << std::sqrt(-1)   << ' '   // -nan
              << 0 / 0.0         << '\n'; // -nan

    std::cout << "NaN == NaN? " << std::boolalpha
              << ( std::numeric_limits<double>::quiet_NaN() ==
                   std::numeric_limits<double>::quiet_NaN() ) << '\n';
}
```

Possible output:

```text
nan nan nan nan nan -nan -nan
NaN == NaN? false
```

### See also

|  |  |
| --- | --- |
| has_quiet_NaN [static] | identifies floating-point types that can represent the special value "quiet not-a-number" (NaN) (public static member constant) |
| signaling_NaN [static] | returns a signaling NaN value of the given floating-point type (public static member function) |
| nan, nanf, nanl (C++11), (C++11), (C++11) | not-a-number (NaN) (function) |
| isnan (C++11) | checks if the given number is NaN (function) |
