# std::hermite, std::hermitef, std::hermitel

|  |  |
| --- | --- |
| `double hermite( unsigned int n, double x ); double hermite( unsigned int n, float x ); double hermite( unsigned int n, long double x ); float hermitef( unsigned int n, float x ); long double hermitel( unsigned int n, long double x );` | (1) |
| `double hermite( unsigned int n, IntegralType x );` | (2) |

1) Computes the (physicist's) Hermite polynomials of the degree `n` and argument `x`.

2) A set of overloads or a function template accepting an argument of any integral type. Equivalent to (1) after casting the argument to `double`.

As all special functions, `hermite` is only guaranteed to be available in `<cmath>` if `__STDCPP_MATH_SPEC_FUNCS__` is defined by the implementation to a value at least 201003L and if the user defines `__STDCPP_WANT_MATH_SPEC_FUNCS__` before including any standard library headers.

### Parameters

|  |  |  |
| --- | --- | --- |
| n | - | the degree of the polynomial |
| x | - | the argument, a value of a floating-point or integral type |

### Return value

If no errors occur, value of the order-`n`Hermite polynomial of `x`, that is (-1)n *e*x2 dn dxn *e*-x2 , is returned.

### Error handling

Errors may be reported as specified in math_errhandling.

- If the argument is NaN, NaN is returned and domain error is not reported.
- If `n` is greater or equal than 128, the behavior is implementation-defined.

### Notes

Implementations that do not support TR 29124 but support TR 19768, provide this function in the header `tr1/cmath` and namespace `std::tr1`.

An implementation of this function is also available in boost.math.

The Hermite polynomials are the polynomial solutions of the equation u,, - 2xu, = -2nu.

The first few are:

- hermite(0, x) = 1.
- hermite(1, x) = 2x.
- hermite(2, x) = 4x2 - 2.
- hermite(3, x) = 8x3 - 12x.
- hermite(4, x) = 16x4 - 48x2 + 12.

### Example

(works as shown with gcc 6.0)

```cpp
#define __STDCPP_WANT_MATH_SPEC_FUNCS__ 1
#include <cmath>
#include <iostream>

double H3(double x)
{
    return 8 * std::pow(x, 3) - 12 * x;
}

double H4(double x)
{
    return 16 * std::pow(x, 4) - 48 * x * x + 12;
}

int main()
{
    // spot-checks
    std::cout << std::hermite(3, 10) << '=' << H3(10) << '\n'
              << std::hermite(4, 10) << '=' << H4(10) << '\n';
}
```

Output:

```text
7880=7880
155212=155212
```

### See also

|  |  |
| --- | --- |
| laguerre, laguerref, laguerrel | Laguerre polynomials (function) |
| legendre, legendref, legendrel | Legendre polynomials (function) |

### External links

Weisstein, Eric W. ""Hermite Polynomial." From MathWorld--A Wolfram Web Resource.
