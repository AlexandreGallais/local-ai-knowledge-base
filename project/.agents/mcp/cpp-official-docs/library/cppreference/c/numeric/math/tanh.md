# tanh, tanhf, tanhl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float tanhf( float arg );` | (1) | (since C99) |
| `double tanh( double arg );` | (2) |  |
| `long double tanhl( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define tanh( arg )` | (4) | (since C99) |

1-3) Computes the hyperbolic tangent of `arg`.

4) Type-generic macro: If the argument has type `long double`, `tanhl` is called. Otherwise, if the argument has integer type or the type `double`, `tanh` is called. Otherwise, `tanhf` is called. If the argument is complex, then the macro invokes the corresponding complex function (`ctanhf`, `ctanh`, `ctanhl`).

### Parameters

arg - floating-point value representing a hyperbolic angle

### Return value

If no errors occur, the hyperbolic tangent of `arg` (tanh(arg), or earg -e-arg earg +e-arg ) is returned.

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If the argument is ±0, ±0 is returned.
- If the argument is ±∞, ±1 is returned.
- If the argument is NaN, NaN is returned.

### Notes

POSIX specifies that in case of underflow, `arg` is returned unmodified, and if that is not supported, an implementation-defined value no greater than `DBL_MIN`, `FLT_MIN`, and `LDBL_MIN` is returned.

### Example

```c
#include <math.h>
#include <stdio.h>

int main(void)
{
    printf("tanh(1) = %f\ntanh(-1) = %f\n", tanh(1), tanh(-1));
    printf("tanh(0.1)*sinh(0.2)-cosh(0.2) = %f\n", tanh(0.1) * sinh(0.2) - cosh(0.2));
    // special values
    printf("tanh(+0) = %f\ntanh(-0) = %f\n", tanh(0.0), tanh(-0.0));
}
```

Output:

```text
tanh(1) = 0.761594
tanh(-1) = -0.761594
tanh(0.1)*sinh(0.2)-cosh(0.2) = -1.000000
tanh(+0) = 0.000000
tanh(-0) = -0.000000
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.5.6 The tanh functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.2.6 The tanh functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.5.6 The tanh functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.2.6 The tanh functions (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.5.6 The tanh functions (p: 242)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.2.6 The tanh functions (p: 520)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.5.6 The tanh functions (p: 222-223)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.2.6 The tanh functions (p: 457)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.5.3.3 The tanh function

### See also

|  |  |
| --- | --- |
| sinh, sinhf, sinhl (C99), (C99) | computes hyperbolic sine (\({\small\sinh{x} }\)sinh(x)) (function) |
| cosh, coshf, coshl (C99), (C99) | computes hyperbolic cosine (\({\small\cosh{x} }\)cosh(x)) (function) |
| atanh, atanhf, atanhl (C99), (C99), (C99) | computes inverse hyperbolic tangent (\({\small\operatorname{artanh}{x} }\)artanh(x)) (function) |
| ctanh, ctanhf, ctanhl (C99), (C99), (C99) | computes the complex hyperbolic tangent (function) |
| C++ documentation for tanh |  |
