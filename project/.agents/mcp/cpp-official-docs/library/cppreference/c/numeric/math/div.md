# div, ldiv, lldiv, imaxdiv

| Defined in header `<stdlib.h>` |  |  |
| --- | --- | --- |
| `div_t div( int x, int y );` | (1) |  |
| `ldiv_t ldiv( long x, long y );` | (2) |  |
| `lldiv_t lldiv( long long x, long long y );` | (3) | (since C99) |
| Defined in header `<inttypes.h>` |  |  |
| `imaxdiv_t imaxdiv( intmax_t x, intmax_t y );` | (4) | (since C99) |

Computes both the quotient and the remainder of the division of the numerator `x` by the denominator `y`.

|  |  |
| --- | --- |
| Computes quotient and remainder simultaneously. The quotient is the algebraic quotient with any fractional part discarded (truncated towards zero). The remainder is such that `quot * y + rem == x`. | (until C99) |
| Computes the quotient (the result of the expression `x / y`) and remainder (the result of the expression `x % y`) simultaneously. | (since C99) |

### Parameters

x, y - integer values

### Return value

If both the remainder and the quotient can be represented as objects of the corresponding type (`int`, `long`, `long long`, `intmax_t`, respectively), returns both as an object of type `div_t`, `ldiv_t`, `lldiv_t`, `imaxdiv_t` defined as follows:

## div_t

```c
struct div_t { int quot; int rem; };
```

or

```c
struct div_t { int rem; int quot; };
```

## ldiv_t

```c
struct ldiv_t { long quot; long rem; };
```

or

```c
struct ldiv_t { long rem; long quot; };
```

## lldiv_t

```c
struct lldiv_t { long long quot; long long rem; };
```

or

```c
struct lldiv_t { long long rem; long long quot; };
```

## imaxdiv_t

```c
struct imaxdiv_t { intmax_t quot; intmax_t rem; };
```

or

```c
struct imaxdiv_t { intmax_t rem; intmax_t quot; };
```

If either the remainder or the quotient cannot be represented, the behavior is undefined.

### Notes

Until C99, the rounding direction of the quotient and the sign of the remainder in the built-in division and remainder operators was implementation-defined if either of the operands was negative, but it was well-defined in `div` and `ldiv`.

On many platforms, a single CPU instruction obtains both the quotient and the remainder, and this function may leverage that, although compilers are generally able to merge nearby `/` and `%` where suitable.

### Example

```c
#include <assert.h>
#include <limits.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>

void reverse(char* first, char* last)
{
    for (--last; first < last; ++first, --last)
    {
        char c = *last;
        *last = *first;
        *first = c;
    }
}

// returns empty buffer in case of buffer overflow
char* itoa(int n, int base, char* buf, size_t buf_size)
{
    assert(2 <= base && base <= 16 && buf && buf_size);
    div_t dv = {.quot = n};
    char* p = buf;
    do
    {
        if (!--buf_size)
            return (*buf = '\0'), buf;
        dv = div(dv.quot, base);
        *p++ = "0123456789abcdef"[abs(dv.rem)];
    }
    while(dv.quot);
    if (n < 0)
        *p++ = '-';
    *p = '\0';
    reverse(buf, p);
    return buf;
}

int main(void)
{
    char buf[16];
    printf("%s\n", itoa(0, 2, buf, sizeof buf));
    printf("%s\n", itoa(007, 3, buf, sizeof buf));
    printf("%s\n", itoa(12346, 10, buf, sizeof buf));
    printf("%s\n", itoa(-12346, 10, buf, sizeof buf));
    printf("%s\n", itoa(-42, 2, buf, sizeof buf));
    printf("%s\n", itoa(INT_MAX, 16, buf, sizeof buf));
    printf("%s\n", itoa(INT_MIN, 16, buf, sizeof buf));
}
```

Possible output:

```text
0
21
12346
-12346
-101010
7fffffff
-80000000
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.8.2.2 The imaxdiv function (p: TBD)

- 7.22.6.2 The div, ldiv and lldiv functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.8.2.2 The imaxdiv function (p: 159)

- 7.22.6.2 The div, ldiv and lldiv functions (p: 259)

- C11 standard (ISO/IEC 9899:2011):

- 7.8.2.2 The imaxdiv function (p: 219)

- 7.22.6.2 The div, ldiv and lldiv functions (p: 356)

- C99 standard (ISO/IEC 9899:1999):

- 7.8.2.2 The imaxdiv function (p: 200)

- 7.20.6.2 The div, ldiv and lldiv functions (p: 320)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.10 div_t, ldiv_t

- 4.10.6.2 The div function

- 4.10.6.4 The ldiv function

### See also

|  |  |
| --- | --- |
| fmod, fmodf, fmodl (C99), (C99) | computes remainder of the floating-point division operation (function) |
| remainder, remainderf, remainderl (C99), (C99), (C99) | computes signed remainder of the floating-point division operation (function) |
| remquo, remquof, remquol (C99), (C99), (C99) | computes signed remainder as well as the three last bits of the division operation (function) |
| C++ documentation for div |  |

### External links

|  |  |
| --- | --- |
| 1. | Euclidean division — From Wikipedia. |
| 2. | Modulo (and Truncated division) — From Wikipedia. |
