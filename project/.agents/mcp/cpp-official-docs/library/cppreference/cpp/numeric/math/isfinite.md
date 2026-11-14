# std::isfinite

| Defined in header `<cmath>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `bool isfinite( float num ); bool isfinite( double num ); bool isfinite( long double num );` |  | (since C++11) (until C++23) |
| `constexpr bool isfinite( /*floating-point-type*/ num );` |  | (since C++23) |
| SIMD overload (since C++26) |  |  |
| Defined in header `<simd>` |  |  |
| `template< /*math-floating-point*/ V > constexpr typename /*deduced-simd-t*/<V>::mask_type isfinite ( const V& v_num );` | (S) | (since C++26) |
| Additional overloads |  |  |
| Defined in header `<cmath>` |  |  |
| `template< class Integer > bool isfinite( Integer num );` | (A) | (since C++11) (constexpr since C++23) |

1) Determines if the given floating point number `num` has finite value i.e. it is normal, subnormal or zero, but not infinite or NaN. The library provides overloads for all cv-unqualified floating-point types as the type of the parameter `num`.(since C++23)

S) The SIMD overload performs an element-wise `std::isfinite` on `v_num`. (See `math-floating-point` and `deduced-simd-t` for their definitions.) (since C++26)

A) Additional overloads are provided for all integer types, which are treated as `double`.

### Parameters

|  |  |  |
| --- | --- | --- |
| num | - | floating-point or integer value |
| v_num | - | a data-parallel object of `std::basic_simd` specialization where its element type is a floating-point type |

### Return value

1) `true` if `num` has finite value, `false` otherwise.

S) A data-parallel mask object where the ith element equals `true` if `v_num[i]` has finite value or `false` otherwise for all `i` in the range `[``​0​``,``v_num.size()``)`.

### Notes

The additional overloads are not required to be provided exactly as (A). They only need to be sufficient to ensure that for their argument `num` of integer type, `std::isfinite(num)` has the same effect as `std::isfinite(static_cast<double>(num))`.

### Examples

```cpp
#include <cfloat>
#include <cmath>
#include <iostream>

int main()
{
    std::cout << std::boolalpha
              << "isfinite(NaN) = " << std::isfinite(NAN) << '\n'
              << "isfinite(Inf) = " << std::isfinite(INFINITY) << '\n'
              << "isfinite(-Inf) = " << std::isfinite(-INFINITY) << '\n'
              << "isfinite(HUGE_VAL) = " << std::isfinite(HUGE_VAL) << '\n'
              << "isfinite(0.0) = " << std::isfinite(0.0) << '\n'
              << "isfinite(exp(800)) = " << std::isfinite(std::exp(800)) << '\n'
              << "isfinite(DBL_MIN/2.0) = " << std::isfinite(DBL_MIN / 2.0) << '\n';
}
```

Output:

```text
isfinite(NaN) = false
isfinite(Inf) = false
isfinite(-Inf) = false
isfinite(HUGE_VAL) = false
isfinite(0.0) = true
isfinite(exp(800)) = false
isfinite(DBL_MIN/2.0) = true
```

### See also

|  |  |
| --- | --- |
| fpclassify (C++11) | categorizes the given floating-point value (function) |
| isinf (C++11) | checks if the given number is infinite (function) |
| isnan (C++11) | checks if the given number is NaN (function) |
| isnormal (C++11) | checks if the given number is normal (function) |
| C documentation for isfinite |  |
