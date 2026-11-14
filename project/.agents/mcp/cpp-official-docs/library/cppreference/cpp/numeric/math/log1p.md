# std::log1p, std::log1pf, std::log1pl

| Defined in header `<cmath>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `float log1p ( float num ); double log1p ( double num ); long double log1p ( long double num );` |  | (until C++23) |
| `/*floating-point-type*/ log1p ( /*floating-point-type*/ num );` |  | (since C++23) (constexpr since C++26) |
| `float log1pf( float num );` | (2) | (since C++11) (constexpr since C++26) |
| `long double log1pl( long double num );` | (3) | (since C++11) (constexpr since C++26) |
| SIMD overload (since C++26) |  |  |
| Defined in header `<simd>` |  |  |
| `template< /*math-floating-point*/ V > constexpr /*deduced-simd-t*/<V> log1p ( const V& v_num );` | (S) | (since C++26) |
| Additional overloads (since C++11) |  |  |
| Defined in header `<cmath>` |  |  |
| `template< class Integer > double log1p ( Integer num );` | (A) | (constexpr since C++26) |

1-3) Computes the natural (base *e*) logarithm of `1 + num`. This function is more precise than the expression `std::log(1 + num)` if `num` is close to zero. The library provides overloads of `std::log1p` for all cv-unqualified floating-point types as the type of the parameter.(since C++23)

S) The SIMD overload performs an element-wise `std::log1p` on `v_num`. (See `math-floating-point` and `deduced-simd-t` for their definitions.) (since C++26)

A) Additional overloads are provided for all integer types, which are treated as `double`. (since C++11)

### Parameters

num - floating-point or integer value

### Return value

If no errors occur ln(1+num) is returned.

If a domain error occurs, an implementation-defined value is returned (NaN where supported).

If a pole error occurs, `-HUGE_VAL`, `-HUGE_VALF`, or `-HUGE_VALL` is returned.

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

Domain error occurs if `num` is less than -1.

Pole error may occur if `num` is -1.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If the argument is ±0, it is returned unmodified.
- If the argument is -1, -∞ is returned and `FE_DIVBYZERO` is raised.
- If the argument is less than -1, NaN is returned and `FE_INVALID` is raised.
- If the argument is +∞, +∞ is returned.
- If the argument is NaN, NaN is returned.

### Notes

The functions `std::expm1` and `std::log1p` are useful for financial calculations, for example, when calculating small daily interest rates: (1 + x)n - 1 can be expressed as `std::expm1(n * std::log1p(x))`. These functions also simplify writing accurate inverse hyperbolic functions.

The additional overloads are not required to be provided exactly as (A). They only need to be sufficient to ensure that for their argument `num` of integer type, `std::log1p(num)` has the same effect as `std::log1p(static_cast<double>(num))`.

### Example

```cpp
#include <cerrno>
#include <cfenv>
#include <cmath>
#include <cstring>
#include <iostream>
// #pragma STDC FENV_ACCESS ON

int main()
{
    std::cout << "log1p(0) = " << log1p(0) << '\n'
              << "Interest earned in 2 days on $100, compounded daily at 1%\n"
              << "    on a 30/360 calendar = "
              << 100 * expm1(2 * log1p(0.01 / 360)) << '\n'
              << "log(1+1e-16) = " << std::log(1 + 1e-16)
              << ", but log1p(1e-16) = " << std::log1p(1e-16) << '\n';

    // special values
    std::cout << "log1p(-0) = " << std::log1p(-0.0) << '\n'
              << "log1p(+Inf) = " << std::log1p(INFINITY) << '\n';

    // error handling
    errno = 0;
    std::feclearexcept(FE_ALL_EXCEPT);

    std::cout << "log1p(-1) = " << std::log1p(-1) << '\n';

    if (errno == ERANGE)
        std::cout << "    errno == ERANGE: " << std::strerror(errno) << '\n';
    if (std::fetestexcept(FE_DIVBYZERO))
        std::cout << "    FE_DIVBYZERO raised\n";
}
```

Possible output:

```text
log1p(0) = 0
Interest earned in 2 days on $100, compounded daily at 1%
    on a 30/360 calendar = 0.00555563
log(1+1e-16) = 0, but log1p(1e-16) = 1e-16
log1p(-0) = -0
log1p(+Inf) = inf
log1p(-1) = -inf
    errno == ERANGE: Result too large
    FE_DIVBYZERO raised
```

### See also

|  |  |
| --- | --- |
| log, logf, logl (C++11), (C++11) | computes natural (base e) logarithm (\({\small\ln{x}}\)ln(x)) (function) |
| log10, log10f, log10l (C++11), (C++11) | computes common (base 10) logarithm (\({\small\log_{10}{x}}\)log10(x)) (function) |
| log2, log2f, log2l (C++11), (C++11), (C++11) | base 2 logarithm of the given number (\({\small\log_{2}{x}}\)log2(x)) (function) |
| expm1, expm1f, expm1l (C++11), (C++11), (C++11) | returns e raised to the given power, minus 1 (\({\small e^x-1}\)ex-1) (function) |
| C documentation for log1p |  |
