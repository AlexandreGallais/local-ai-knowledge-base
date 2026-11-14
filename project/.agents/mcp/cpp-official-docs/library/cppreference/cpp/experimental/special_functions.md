# Mathematical special functions

The Mathematical Special Functions library, ISO/IEC 29124:2010, specifies extensions to the C++ standard library that include mathematical special functions (originally part of ISO/IEC TR 19768:2007).

This special functions in this library are implemented in boost.math, which is currently available on more compilers and platforms than implementations of this standard. At the time of this writing (1/2016) the only compiler that announced direct support is gcc, for version 6.1.

### Non-member functions

| Defined in header `<cmath>` |  |
| --- | --- |
| assoc_laguerre, assoc_laguerref, assoc_laguerrel | associated Laguerre polynomials (function) |
| assoc_legendre, assoc_legendref, assoc_legendrel | associated Legendre polynomials (function) |
| beta, betaf, betal | beta function (function) |
| comp_ellint_1, comp_ellint_1f, comp_ellint_1l | (complete) elliptic integral of the first kind (function) |
| comp_ellint_2, comp_ellint_2f, comp_ellint_2l | (complete) elliptic integral of the second kind (function) |
| comp_ellint_3, comp_ellint_3f, comp_ellint_3l | (complete) elliptic integral of the third kind (function) |
| cyl_bessel_i, cyl_bessel_if, cyl_bessel_il | regular modified cylindrical Bessel functions (function) |
| cyl_bessel_j, cyl_bessel_jf, cyl_bessel_jl | cylindrical Bessel functions (of the first kind) (function) |
| cyl_bessel_k, cyl_bessel_kf, cyl_bessel_kl | irregular modified cylindrical Bessel functions (function) |
| cyl_neumann, cyl_neumannf, cyl_neumannl | cylindrical Neumann functions (function) |
| ellint_1, ellint_1f, ellint_1l | (incomplete) elliptic integral of the first kind (function) |
| ellint_2, ellint_2f, ellint_2l | (incomplete) elliptic integral of the second kind (function) |
| ellint_3, ellint_3f, ellint_3l | (incomplete) elliptic integral of the third kind (function) |
| expint, expintf, expintl | exponential integral (function) |
| hermite, hermitef, hermitel | Hermite polynomials (function) |
| legendre, legendref, legendrel | Legendre polynomials (function) |
| laguerre, laguerref, laguerrel | Laguerre polynomials (function) |
| riemann_zeta, riemann_zetaf, riemann_zetal | Riemann zeta function (function) |
| sph_bessel, sph_besself, sph_bessell | spherical Bessel functions (of the first kind) (function) |
| sph_legendre, sph_legendref, sph_legendrel | spherical associated Legendre functions (function) |
| sph_neumann, sph_neumannf, sph_neumannl | spherical Neumann functions (function) |

### Macros

__STDCPP_MATH_SPEC_FUNCS__ a value of at least `201003L` indicates that ISO/IEC 29124:2010 is supported (macro constant)
