# std::numeric_limits<T>::max_exponent

|  |  |
| --- | --- |
| `static const int max_exponent;` | (until C++11) |
| `static constexpr int max_exponent;` | (since C++11) |

The value of `std::numeric_limits<T>::max_exponent` is the largest positive number `n` such that \(\scriptsize r^{n-1}\)rn-1 , where `r` is `std::numeric_limits<T>::radix`, is a representable finite value of the floating-point type `T`.

### Standard specializations

| `T` | value of `std::numeric_limits<T>::max_exponent` |
| --- | --- |
| `/* non-specialized */` | `​0​` |
| `bool` | `​0​` |
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
| `float` | `FLT_MAX_EXP` |
| `double` | `DBL_MAX_EXP` |
| `long double` | `LDBL_MAX_EXP` |

### Example

Demonstrates the relationships of `max_exponent`, `max_exponent10`, and `max()` for the type `float`:

```cpp
#include <iostream>
#include <limits>

int main()
{
    std::cout << "max() = " << std::numeric_limits<float>::max() << '\n'
              << "max_exponent10 = " << std::numeric_limits<float>::max_exponent10 << '\n'
              << std::hexfloat << '\n'
              << "max() = " << std::numeric_limits<float>::max() << '\n'
              << "max_exponent = " << std::numeric_limits<float>::max_exponent << '\n';
}
```

Output:

```text
max() = 3.40282e+38
max_exponent10 = 38

max() = 0x1.fffffep+127
max_exponent = 128
```

### See also

|  |  |
| --- | --- |
| min_exponent10 [static] | the smallest negative power of ten that is a valid normalized floating-point value (public static member constant) |
| min_exponent [static] | one more than the smallest negative power of the radix that is a valid normalized floating-point value (public static member constant) |
| max_exponent10 [static] | the largest integer power of 10 that is a valid finite floating-point value (public static member constant) |
