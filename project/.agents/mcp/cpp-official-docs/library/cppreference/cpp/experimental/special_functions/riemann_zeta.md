# std::riemann_zeta, std::riemann_zetaf, std::riemann_zetal

|  |  |
| --- | --- |
| `double riemann_zeta( double arg ); double riemann_zeta( float arg ); double riemann_zeta( long double arg ); float riemann_zetaf( float arg ); long double riemann_zetal( long double arg );` | (1) |
| `double riemann_zeta( IntegralType arg );` | (2) |

1) Computes the Riemann zeta function of `arg`.

2) A set of overloads or a function template accepting an argument of any integral type. Equivalent to (1) after casting the argument to `double`.

As all special functions, `riemann_zeta` is only guaranteed to be available in `<cmath>` if `__STDCPP_MATH_SPEC_FUNCS__` is defined by the implementation to a value at least 201003L and if the user defines `__STDCPP_WANT_MATH_SPEC_FUNCS__` before including any standard library headers.

### Parameters

arg - value of a floating-point or integral type

### Return value

If no errors occur, value of the Riemann zeta function of `arg`, ζ(arg), defined for the entire real axis:

- For arg > 1, Σ∞ n=1n-arg .
- For 0 ≤ arg ≤ 1, 1 1 - 21-arg Σ∞ n=1(-1)n-1 n-arg .
- For arg < 0, 2arg πarg-1 sin( πarg 2 )Γ(1 − arg)ζ(1 − arg).

### Error handling

Errors may be reported as specified in math_errhandling.

- If the argument is NaN, NaN is returned and domain error is not reported.

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
    // spot checks for well-known values
    std::cout << "ζ(-1) = " << std::riemann_zeta(-1) << '\n'
              << "ζ(0) = " << std::riemann_zeta(0) << '\n'
              << "ζ(1) = " << std::riemann_zeta(1) << '\n'
              << "ζ(0.5) = " << std::riemann_zeta(0.5) << '\n'
              << "ζ(2) = " << std::riemann_zeta(2) << ' '
              << "(π²/6 = " << std::pow(std::acos(-1), 2) / 6 << ")\n";
}
```

Output:

```text
ζ(-1) = -0.0833333
ζ(0) = -0.5
ζ(1) = inf
ζ(0.5) = -1.46035
ζ(2) = 1.64493 (π²/6 = 1.64493)
```

### External links

Weisstein, Eric W. "Riemann Zeta Function." From MathWorld--A Wolfram Web Resource.
