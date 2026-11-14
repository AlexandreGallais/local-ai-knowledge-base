# std::comp_ellint_2, std::comp_ellint_2f, std::comp_ellint_2l

|  |  |
| --- | --- |
| `double comp_ellint_2( double arg ); double comp_ellint_2( float arg ); double comp_ellint_2( long double arg ); float comp_ellint_2f( float arg ); long double comp_ellint_2l( long double arg );` | (1) |
| `double comp_ellint_2( IntegralType arg );` | (2) |

1) Computes the complete elliptic integral of the second kind of `arg`.

2) A set of overloads or a function template accepting an argument of any integral type. Equivalent to (1) after casting the argument to `double`.

As all special functions, `comp_ellint_2` is only guaranteed to be available in `<cmath>` if `__STDCPP_MATH_SPEC_FUNCS__` is defined by the implementation to a value at least 201003L and if the user defines `__STDCPP_WANT_MATH_SPEC_FUNCS__` before including any standard library headers.

### Parameters

arg - value of a floating-point or integral type

### Return value

If no errors occur, value of the complete elliptic integral of the second kind of `arg`, that is `ellint_2(arg, π/2)`, is returned.

### Error handling

Errors may be reported as specified in math_errhandling.

- If the argument is NaN, NaN is returned and domain error is not reported.
- If |arg| > 1, a domain error may occur.

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
    double hpi = std::acos(-1) / 2;
    std::cout << "E(0) = " << std::comp_ellint_2(0) << '\n'
              << "π/2 = " << hpi << '\n'
              << "E(0.5) = " << std::comp_ellint_2(0.5) << '\n'
              << "E(0.5, π/2) = " << std::ellint_2(0.5, hpi) << '\n';
}
```

Output:

```text
E(0) = 1.5708
π/2 = 1.5708
E(0.5) = 1.46746
E(0.5, π/2) = 1.46746
```

### External links

Weisstein, Eric W. "Complete Elliptic Integral of the Second Kind." From MathWorld--A Wolfram Web Resource.

### See also

ellint_2, ellint_2f, ellint_2l (incomplete) elliptic integral of the second kind (function)
