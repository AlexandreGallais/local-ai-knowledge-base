# Common mathematical functions

### Functions

| Defined in header `<cstdlib>` |  |
| --- | --- |
| abs(int), labs, llabs (C++11) | computes absolute value of an integral value (\(\small{\|x\|}\)\|x\|) (function) |
| div(int), ldiv, lldiv (C++11) | computes quotient and remainder of integer division (function) |
| Defined in header `<cinttypes>` |  |
| abs(std::intmax_t), imaxabs (C++11), (C++11) | computes absolute value of an integral value (\(\small{\|x\|}\)\|x\|) (function) |
| div(std::intmax_t), imaxdiv (C++11), (C++11) | computes quotient and remainder of integer division (function) |
| Defined in header `<cmath>` |  |
| Basic operations |  |
| abs(float), fabs, fabsf, fabsl (C++11), (C++11) | absolute value of a floating point value (\(\small{\|x\|}\)\|x\|) (function) |
| fmod, fmodf, fmodl (C++11), (C++11) | remainder of the floating point division operation (function) |
| remainder, remainderf, remainderl (C++11), (C++11), (C++11) | signed remainder of the division operation (function) |
| remquo, remquof, remquol (C++11), (C++11), (C++11) | signed remainder as well as the three last bits of the division operation (function) |
| fma, fmaf, fmal (C++11), (C++11), (C++11) | fused multiply-add operation (function) |
| fmax, fmaxf, fmaxl (C++11), (C++11), (C++11) | larger of two floating-point values (function) |
| fmin, fminf, fminl (C++11), (C++11), (C++11) | smaller of two floating point values (function) |
| fdim, fdimf, fdiml (C++11), (C++11), (C++11) | positive difference of two floating point values (\({\small\max{(0, x-y)}}\)max(0, x-y)) (function) |
| nan, nanf, nanl (C++11), (C++11), (C++11) | not-a-number (NaN) (function) |
| Exponential functions |  |
| exp, expf, expl (C++11), (C++11) | returns e raised to the given power (\({\small e^x}\)ex) (function) |
| exp2, exp2f, exp2l (C++11), (C++11), (C++11) | returns 2 raised to the given power (\({\small 2^x}\)2x) (function) |
| expm1, expm1f, expm1l (C++11), (C++11), (C++11) | returns e raised to the given power, minus 1 (\({\small e^x-1}\)ex-1) (function) |
| log, logf, logl (C++11), (C++11) | computes natural (base e) logarithm (\({\small\ln{x}}\)ln(x)) (function) |
| log10, log10f, log10l (C++11), (C++11) | computes common (base 10) logarithm (\({\small\log_{10}{x}}\)log10(x)) (function) |
| log2, log2f, log2l (C++11), (C++11), (C++11) | base 2 logarithm of the given number (\({\small\log_{2}{x}}\)log2(x)) (function) |
| log1p, log1pf, log1pl (C++11), (C++11), (C++11) | natural logarithm (to base e) of 1 plus the given number (\({\small\ln{(1+x)}}\)ln(1+x)) (function) |
| Power functions |  |
| pow, powf, powl (C++11), (C++11) | raises a number to the given power (\(\small{x^y}\)xy) (function) |
| sqrt, sqrtf, sqrtl (C++11), (C++11) | computes square root (\(\small{\sqrt{x}}\)√x) (function) |
| cbrt, cbrtf, cbrtl (C++11), (C++11), (C++11) | computes cube root (\(\small{\sqrt[3]{x}}\)3√x) (function) |
| hypot, hypotf, hypotl (C++11), (C++11), (C++11) | computes hypotenuse \(\scriptsize{\sqrt{x^2+y^2}}\)√x2 +y2 and \(\scriptsize{\sqrt{x^2+y^2+z^2}}\)√x2 +y2 +z2 (since C++17) (function) |
| Trigonometric functions |  |
| sin, sinf, sinl (C++11), (C++11) | computes sine (\({\small\sin{x}}\)sin(x)) (function) |
| cos, cosf, cosl (C++11), (C++11) | computes cosine (\({\small\cos{x}}\)cos(x)) (function) |
| tan, tanf, tanl (C++11), (C++11) | computes tangent (\({\small\tan{x}}\)tan(x)) (function) |
| asin, asinf, asinl (C++11), (C++11) | computes arc sine (\({\small\arcsin{x}}\)arcsin(x)) (function) |
| acos, acosf, acosl (C++11), (C++11) | computes arc cosine (\({\small\arccos{x}}\)arccos(x)) (function) |
| atan, atanf, atanl (C++11), (C++11) | computes arc tangent (\({\small\arctan{x}}\)arctan(x)) (function) |
| atan2, atan2f, atan2l (C++11), (C++11) | arc tangent, using signs to determine quadrants (function) |
| Hyperbolic functions |  |
| sinh, sinhf, sinhl (C++11), (C++11) | computes hyperbolic sine (\({\small\sinh{x}}\)sinh(x)) (function) |
| cosh, coshf, coshl (C++11), (C++11) | computes hyperbolic cosine (\({\small\cosh{x}}\)cosh(x)) (function) |
| tanh, tanhf, tanhl (C++11), (C++11) | computes hyperbolic tangent (\({\small\tanh{x}}\)tanh(x)) (function) |
| asinh, asinhf, asinhl (C++11), (C++11), (C++11) | computes the inverse hyperbolic sine (\({\small\operatorname{arsinh}{x}}\)arsinh(x)) (function) |
| acosh, acoshf, acoshl (C++11), (C++11), (C++11) | computes the inverse hyperbolic cosine (\({\small\operatorname{arcosh}{x}}\)arcosh(x)) (function) |
| atanh, atanhf, atanhl (C++11), (C++11), (C++11) | computes the inverse hyperbolic tangent (\({\small\operatorname{artanh}{x}}\)artanh(x)) (function) |
| Error and gamma functions |  |
| erf, erff, erfl (C++11), (C++11), (C++11) | error function (function) |
| erfc, erfcf, erfcl (C++11), (C++11), (C++11) | complementary error function (function) |
| tgamma, tgammaf, tgammal (C++11), (C++11), (C++11) | gamma function (function) |
| lgamma, lgammaf, lgammal (C++11), (C++11), (C++11) | natural logarithm of the gamma function (function) |
| Nearest integer floating point operations |  |
| ceil, ceilf, ceill (C++11), (C++11) | nearest integer not less than the given value (function) |
| floor, floorf, floorl (C++11), (C++11) | nearest integer not greater than the given value (function) |
| trunc, truncf, truncl (C++11), (C++11), (C++11) | nearest integer not greater in magnitude than the given value (function) |
| round, roundf, roundl, lround, lroundf, lroundl, llround, llroundf, llroundl (C++11), (C++11), (C++11), (C++11), (C++11), (C++11), (C++11), (C++11), (C++11) | nearest integer, rounding away from zero in halfway cases (function) |
| nearbyint, nearbyintf, nearbyintl (C++11), (C++11), (C++11) | nearest integer using current rounding mode (function) |
| rint, rintf, rintl, lrint, lrintf, lrintl, llrint, llrintf, llrintl (C++11), (C++11), (C++11), (C++11), (C++11), (C++11), (C++11), (C++11), (C++11) | nearest integer using current rounding mode with exception if the result differs (function) |
| Floating point manipulation functions |  |
| frexp, frexpf, frexpl (C++11), (C++11) | decomposes a number into significand and base-2 exponent (function) |
| ldexp, ldexpf, ldexpl (C++11), (C++11) | multiplies a number by 2 raised to an integral power (function) |
| modf, modff, modfl (C++11), (C++11) | decomposes a number into integer and fractional parts (function) |
| scalbn, scalbnf, scalbnl, scalbln, scalblnf, scalblnl (C++11), (C++11), (C++11), (C++11), (C++11), (C++11) | multiplies a number by `FLT_RADIX` raised to a power (function) |
| ilogb, ilogbf, ilogbl (C++11), (C++11), (C++11) | extracts exponent of the number (function) |
| logb, logbf, logbl (C++11), (C++11), (C++11) | extracts exponent of the number (function) |
| nextafter, nextafterf, nextafterl, nexttoward, nexttowardf, nexttowardl (C++11), (C++11), (C++11), (C++11), (C++11), (C++11) | next representable floating-point value towards the given value (function) |
| copysign, copysignf, copysignl (C++11), (C++11), (C++11) | copies the sign of a floating point value (function) |
| Classification and comparison |  |
| fpclassify (C++11) | categorizes the given floating-point value (function) |
| isfinite (C++11) | checks if the given number has finite value (function) |
| isinf (C++11) | checks if the given number is infinite (function) |
| isnan (C++11) | checks if the given number is NaN (function) |
| isnormal (C++11) | checks if the given number is normal (function) |
| signbit (C++11) | checks if the given number is negative (function) |
| isgreater (C++11) | checks if the first floating-point argument is greater than the second (function) |
| isgreaterequal (C++11) | checks if the first floating-point argument is greater or equal than the second (function) |
| isless (C++11) | checks if the first floating-point argument is less than the second (function) |
| islessequal (C++11) | checks if the first floating-point argument is less or equal than the second (function) |
| islessgreater (C++11) | checks if the first floating-point argument is less or greater than the second (function) |
| isunordered (C++11) | checks if two floating-point values are unordered (function) |

### Types

| Defined in header `<cstdlib>` |  |
| --- | --- |
| div_t | structure type, returned by `std::div` (typedef) |
| ldiv_t | structure type, returned by `std::ldiv` (typedef) |
| lldiv_t (C++11) | structure type, returned by `std::lldiv` (typedef) |
| Defined in header `<cinttypes>` |  |
| imaxdiv_t (C++11) | structure type, returned by `std::imaxdiv` (typedef) |
| Defined in header `<cmath>` |  |
| float_t (C++11) | most efficient floating-point type at least as wide as `float` (typedef) |
| double_t (C++11) | most efficient floating-point type at least as wide as `double` (typedef) |

### Macro constants

| Defined in header `<cmath>` |  |
| --- | --- |
| HUGE_VALF, HUGE_VAL, HUGE_VALL (C++11), (C++11) | indicates the overflow value for `float`, `double` and `long double` respectively (macro constant) |
| INFINITY (C++11) | evaluates to positive infinity or the value guaranteed to overflow a `float` (macro constant) |
| NAN (C++11) | evaluates to a quiet NaN of type `float` (macro constant) |
| math_errhandling, MATH_ERRNO, MATH_ERREXCEPT (C++11), (C++11), (C++11) | defines the error handling mechanism used by the common mathematical functions (macro constant) |
| Classification |  |
| FP_NORMAL, FP_SUBNORMAL, FP_ZERO, FP_INFINITE, FP_NAN (C++11), (C++11), (C++11), (C++11), (C++11) | indicates a floating-point category (macro constant) |

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_constexpr_cmath` | `202202L` | (C++23) | Constexpr for FP environment agnostic mathematical functions in `<cmath>` and `<cstdlib>` |
| `202306L` | (C++26) | Constexpr for most mathematical functions in `<cmath>` |  |

### See also

**Mathematical special functions**

C documentation for Common mathematical functions
