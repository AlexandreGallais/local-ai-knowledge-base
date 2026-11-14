# std::expint, std::expintf, std::expintl

|  |  |
| --- | --- |
| `double expint( double arg ); double expint( float arg ); double expint( long double arg ); float expintf( float arg ); long double expintl( long double arg );` | (1) |
| `double expint( IntegralType arg );` | (2) |

1) Computes the exponential integral of `arg`.

2) A set of overloads or a function template accepting an argument of any integral type. Equivalent to (1) after casting the argument to `double`.

As all special functions, `expint` is only guaranteed to be available in `<cmath>` if `__STDCPP_MATH_SPEC_FUNCS__` is defined by the implementation to a value at least 201003L and if the user defines `__STDCPP_WANT_MATH_SPEC_FUNCS__` before including any standard library headers.

### Parameters

arg - value of a floating-point or Integral type

### Return value

If no errors occur, value of the exponential integral of `arg`, that is -∫∞ -arg *e*-t t d*t*, is returned.

### Error handling

Errors may be reported as specified in math_errhandling.

- If the argument is NaN, NaN is returned and domain error is not reported.
- If the argument is ±0, -∞ is returned.

### Notes

Implementations that do not support TR 29124 but support TR 19768, provide this function in the header `tr1/cmath` and namespace `std::tr1`.

An implementation of this function is also available in boost.math.

### Example

(works as shown with gcc 6.0)

```cpp
#define __STDCPP_WANT_MATH_SPEC_FUNCS__ 1
#include <cmath>
#include <iostream>

int main()
{
    std::cout << "Ei(0) = " << std::expint(0) << '\n'
              << "Ei(1) = " << std::expint(1) << '\n'
              << "Gompetz constant = " << -std::exp(1) * std::expint(-1) << '\n';
}
```

Output:

```text
Ei(0) = -inf
Ei(1) = 1.89512
Gompetz constant = 0.596347
```

### External links

Weisstein, Eric W. "Exponential Integral." From MathWorld--A Wolfram Web Resource.
