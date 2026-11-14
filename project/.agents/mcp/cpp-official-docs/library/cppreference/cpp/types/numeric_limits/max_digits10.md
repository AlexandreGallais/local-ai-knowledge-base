# std::numeric_limits<T>::max_digits10

`static constexpr int max_digits10` (since C++11)

The value of `std::numeric_limits<T>::max_digits10` is the number of base-10 digits that are necessary to uniquely represent all distinct values of the type `T`, such as necessary for serialization/deserialization to text. This constant is meaningful for all floating-point types.

### Standard specializations

| `T` | Value of `std::numeric_limits<T>::max_digits10` |
| --- | --- |
| `/* non-specialized */` | `​0​` |
| `bool` | `​0​` |
| `char` | `​0​` |
| `signed char` | `​0​` |
| `unsigned char` | `​0​` |
| `wchar_t` | `​0​` |
| `char8_t` (since C++20) | `​0​` |
| `char16_t` | `​0​` |
| `char32_t` | `​0​` |
| `short` | `​0​` |
| `unsigned short` | `​0​` |
| `int` | `​0​` |
| `unsigned int` | `​0​` |
| `long` | `​0​` |
| `unsigned long` | `​0​` |
| `long long` | `​0​` |
| `unsigned long long` | `​0​` |
| `float` | `FLT_DECIMAL_DIG` or `std::ceil(std::numeric_limits<float>::digits * std::log10(2) + 1)` |
| `double` | `DBL_DECIMAL_DIG` or `std::ceil(std::numeric_limits<double>::digits * std::log10(2) + 1)` |
| `long double` | `DECIMAL_DIG` or `LDBL_DECIMAL_DIG` or `std::ceil(std::numeric_limits<long double>::digits * std::log10(2) + 1)` |

### Notes

Unlike most mathematical operations, the conversion of a floating-point value to text and back is *exact* as long as at least `max_digits10` were used (`9` for `float`, `17` for `double`): it is guaranteed to produce the same floating-point value, even though the intermediate text representation is not exact. It may take over a hundred decimal digits to represent the precise value of a `float` in decimal notation.

### Example

```cpp
#include <cmath>
#include <iomanip>
#include <iostream>
#include <limits>
#include <sstream>

int main()
{
    float value = 10.0000086;

    constexpr auto digits10 = std::numeric_limits<decltype(value)>::digits10;
    constexpr auto max_digits10 = std::numeric_limits<decltype(value)>::max_digits10;
    constexpr auto submax_digits10 = max_digits10 - 1;

    std::cout << "float:\n"
                 "       digits10 is " << digits10 << " digits\n"
                 "   max_digits10 is " << max_digits10 << " digits\n"
                 "submax_digits10 is " << submax_digits10 << " digits\n\n";

    const auto original_precision = std::cout.precision();
    for (auto i = 0; i < 5; ++i)
    {
        std::cout
            << "   max_digits10: " << std::setprecision(max_digits10) << value << "\n"
               "submax_digits10: " << std::setprecision(submax_digits10) << value
            << "\n\n";

        value = std::nextafter(value, std::numeric_limits<decltype(value)>::max());
    }
    std::cout.precision(original_precision);
}
```

Output:

```text
float:
       digits10 is 6 digits
   max_digits10 is 9 digits
submax_digits10 is 8 digits

   max_digits10: 10.0000086
submax_digits10: 10.000009

   max_digits10: 10.0000095
submax_digits10: 10.00001

   max_digits10: 10.0000105
submax_digits10: 10.00001

   max_digits10: 10.0000114
submax_digits10: 10.000011

   max_digits10: 10.0000124
submax_digits10: 10.000012
```

### See also

|  |  |
| --- | --- |
| radix [static] | the radix or integer base used by the representation of the given type (public static member constant) |
| digits [static] | number of `radix` digits that can be represented without change (public static member constant) |
| digits10 [static] | number of decimal digits that can be represented without change (public static member constant) |
| min_exponent [static] | one more than the smallest negative power of the radix that is a valid normalized floating-point value (public static member constant) |
| max_exponent [static] | one more than the largest integer power of the radix that is a valid finite floating-point value (public static member constant) |
