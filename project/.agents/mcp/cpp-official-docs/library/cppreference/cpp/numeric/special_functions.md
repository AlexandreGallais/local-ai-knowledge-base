# Mathematical special functions (since C++17)

The Mathematical Special Functions library was originally part of Library TR1 ISO/IEC TR 19768:2007, then published as an independent ISO standard, ISO/IEC 29124:2010, and finally merged to ISO C++ as of C++17.

See Mathematical special functions for the ISO/IEC 29124:2010 version of this library.

### Functions

| Defined in header `<cmath>` |  |
| --- | --- |
| assoc_laguerre, assoc_laguerref, assoc_laguerrel (C++17), (C++17), (C++17) | associated Laguerre polynomials (function) |
| assoc_legendre, assoc_legendref, assoc_legendrel (C++17), (C++17), (C++17) | associated Legendre polynomials (function) |
| beta, betaf, betal (C++17), (C++17), (C++17) | beta function (function) |
| comp_ellint_1, comp_ellint_1f, comp_ellint_1l (C++17), (C++17), (C++17) | (complete) elliptic integral of the first kind (function) |
| comp_ellint_2, comp_ellint_2f, comp_ellint_2l (C++17), (C++17), (C++17) | (complete) elliptic integral of the second kind (function) |
| comp_ellint_3, comp_ellint_3f, comp_ellint_3l (C++17), (C++17), (C++17) | (complete) elliptic integral of the third kind (function) |
| cyl_bessel_i, cyl_bessel_if, cyl_bessel_il (C++17), (C++17), (C++17) | regular modified cylindrical Bessel functions (function) |
| cyl_bessel_j, cyl_bessel_jf, cyl_bessel_jl (C++17), (C++17), (C++17) | cylindrical Bessel functions (of the first kind) (function) |
| cyl_bessel_k, cyl_bessel_kf, cyl_bessel_kl (C++17), (C++17), (C++17) | irregular modified cylindrical Bessel functions (function) |
| cyl_neumann, cyl_neumannf, cyl_neumannl (C++17), (C++17), (C++17) | cylindrical Neumann functions (function) |
| ellint_1, ellint_1f, ellint_1l (C++17), (C++17), (C++17) | (incomplete) elliptic integral of the first kind (function) |
| ellint_2, ellint_2f, ellint_2l (C++17), (C++17), (C++17) | (incomplete) elliptic integral of the second kind (function) |
| ellint_3, ellint_3f, ellint_3l (C++17), (C++17), (C++17) | (incomplete) elliptic integral of the third kind (function) |
| expint, expintf, expintl (C++17), (C++17), (C++17) | exponential integral (function) |
| hermite, hermitef, hermitel (C++17), (C++17), (C++17) | Hermite polynomials (function) |
| legendre, legendref, legendrel (C++17), (C++17), (C++17) | Legendre polynomials (function) |
| laguerre, laguerref, laguerrel (C++17), (C++17), (C++17) | Laguerre polynomials (function) |
| riemann_zeta, riemann_zetaf, riemann_zetal (C++17), (C++17), (C++17) | Riemann zeta function (function) |
| sph_bessel, sph_besself, sph_bessell (C++17), (C++17), (C++17) | spherical Bessel functions (of the first kind) (function) |
| sph_legendre, sph_legendref, sph_legendrel (C++17), (C++17), (C++17) | spherical associated Legendre functions (function) |
| sph_neumann, sph_neumannf, sph_neumannl (C++17), (C++17), (C++17) | spherical Neumann functions (function) |

### Notes

The `float` and `long double` overloads for math special functions without the "`f`" or "`l`" suffix are present in the final draft of ISO/IEC 29124:2010 (N3060), but absent in the published C++17/20 standard (see LWG issue 3234). These overloads were not provided by MSVC STL until VS 2022 17.3.

These functions are unrelated to special member functions of class types.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_math_special_functions` | `201603L` | (C++17) | Mathematical special functions |

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3234 (P1467R9) | C++17 | additional overloads for math special functions were missing | these overloads are required |

### References

- C++23 standard (ISO/IEC 14882:2024):

- 28.7.6 Mathematical special functions [sf.cmath]

- C++20 standard (ISO/IEC 14882:2020):

- 26.8.6 Mathematical special functions [sf.cmath]

- C++17 standard (ISO/IEC 14882:2017):

- 29.9.5 Mathematical special functions [sf.cmath]
