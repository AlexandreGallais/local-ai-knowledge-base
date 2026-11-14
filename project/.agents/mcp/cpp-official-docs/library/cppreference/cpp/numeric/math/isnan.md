# std::isnan

| Defined in header `<cmath>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `bool isnan( float num ); bool isnan( double num ); bool isnan( long double num );` |  | (since C++11) (until C++23) |
| `constexpr bool isnan( /*floating-point-type*/ num );` |  | (since C++23) |
| SIMD overload (since C++26) |  |  |
| Defined in header `<simd>` |  |  |
| `template< /*math-floating-point*/ V > constexpr typename /*deduced-simd-t*/<V>::mask_type isnan ( const V& v_num );` | (S) | (since C++26) |
| Additional overloads |  |  |
| Defined in header `<cmath>` |  |  |
| `template< class Integer > bool isnan( Integer num );` | (A) | (since C++11) (constexpr since C++23) |

1) Determines if the given floating point number `num` is a not-a-number (NaN) value. The library provides overloads for all cv-unqualified floating-point types as the type of the parameter `num`.(since C++23)

S) The SIMD overload performs an element-wise `std::isnan` on `v_num`. (See `math-floating-point` and `deduced-simd-t` for their definitions.) (since C++26)

A) Additional overloads are provided for all integer types, which are treated as `double`.

### Parameters

|  |  |  |
| --- | --- | --- |
| num | - | floating-point or integer value |
| v_num | - | a data-parallel object of `std::basic_simd` specialization where its element type is a floating-point type |

### Return value

1) `true` if `num` is a NaN, `false` otherwise.

S) A data-parallel mask object where the ith element equals `true` if `v_num[i]` is a NaN or `false` otherwise for all `i` in the range `[``​0​``,``v_num.size()``)`.

### Notes

There are many different NaN values with different sign bits and payloads, see `std::nan` and `std::numeric_limits::quiet_NaN`.

NaN values never compare equal to themselves or to other NaN values. Copying a NaN is not required, by IEEE-754, to preserve its bit representation (sign and payload), though most implementation do.

Another way to test if a floating-point value is NaN is to compare it with itself: `bool is_nan(double x) { return x != x; }`.

GCC and Clang support a `-ffinite-math` option (additionally implied by `-ffast-math`), which allows the respective compiler to assume the nonexistence of special IEEE-754 floating point values such as NaN, infinity, or negative zero. In other words, `std::isnan` is assumed to always return `false` under this option.

The additional overloads are not required to be provided exactly as (A). They only need to be sufficient to ensure that for their argument `num` of integer type, `std::isnan(num)` has the same effect as `std::isnan(static_cast<double>(num))`.

### Example

```cpp
#include <cfloat>
#include <cmath>
#include <iostream>

int main()
{
    std::cout << std::boolalpha
              << "isnan(NaN) = " << std::isnan(NAN) << '\n'
              << "isnan(Inf) = " << std::isnan(INFINITY) << '\n'
              << "isnan(0.0) = " << std::isnan(0.0) << '\n'
              << "isnan(DBL_MIN/2.0) = " << std::isnan(DBL_MIN / 2.0) << '\n'
              << "isnan(0.0 / 0.0)   = " << std::isnan(0.0 / 0.0) << '\n'
              << "isnan(Inf - Inf)   = " << std::isnan(INFINITY - INFINITY) << '\n';
}
```

Output:

```text
isnan(NaN) = true
isnan(Inf) = false
isnan(0.0) = false
isnan(DBL_MIN/2.0) = false
isnan(0.0 / 0.0)   = true
isnan(Inf - Inf)   = true
```

### See also

|  |  |
| --- | --- |
| nan, nanf, nanl (C++11), (C++11), (C++11) | not-a-number (NaN) (function) |
| fpclassify (C++11) | categorizes the given floating-point value (function) |
| isfinite (C++11) | checks if the given number has finite value (function) |
| isinf (C++11) | checks if the given number is infinite (function) |
| isnormal (C++11) | checks if the given number is normal (function) |
| isunordered (C++11) | checks if two floating-point values are unordered (function) |
| C documentation for isnan |  |
