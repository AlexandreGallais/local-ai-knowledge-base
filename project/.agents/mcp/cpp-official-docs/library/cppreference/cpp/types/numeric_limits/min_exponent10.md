# std::numeric_limits<T>::min_exponent10

|  |  |
| --- | --- |
| `static const int min_exponent10;` | (until C++11) |
| `static constexpr int min_exponent10;` | (since C++11) |

The value of `std::numeric_limits<T>::min_exponent10` is the lowest negative number `n` such that \(\scriptsize 10^n\)10n is a valid normalized value of the floating-point type `T`.

### Standard specializations

| `T` | value of `std::numeric_limits<T>::min_exponent10` |
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
| `float` | `FLT_MIN_10_EXP` |
| `double` | `DBL_MIN_10_EXP` |
| `long double` | `LDBL_MIN_10_EXP` |

### Example

Demonstrates the relationships of `min_exponent`, `min_exponent10`, `min()`, and `radix` for the type `float`:

```cpp
#include <iostream>
#include <limits>

int main()
{
    std::cout << "min() = " << std::numeric_limits<float>::min() << '\n'
              << "min_exponent10 = " << std::numeric_limits<float>::min_exponent10 << '\n'
              << std::hexfloat << '\n'
              << "min() = " << std::numeric_limits<float>::min() << '\n'
              << "min_exponent = " << std::numeric_limits<float>::min_exponent << '\n';
}
```

Output:

```text
min() = 1.17549e-38
min_exponent10 = -37

min() = 0x1p-126
min_exponent = -125
```

### See also

|  |  |
| --- | --- |
| min_exponent [static] | one more than the smallest negative power of the radix that is a valid normalized floating-point value (public static member constant) |
| max_exponent [static] | one more than the largest integer power of the radix that is a valid finite floating-point value (public static member constant) |
| max_exponent10 [static] | the largest integer power of 10 that is a valid finite floating-point value (public static member constant) |
