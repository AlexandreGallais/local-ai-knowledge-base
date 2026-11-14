# CLOCKS_PER_SEC

Defined in header `<time.h>`

`#define CLOCKS_PER_SEC /* implementation-defined */`

Expands to an expression (not necessarily a compile-time constant) of type `clock_t` equal to the number of clock ticks per second, as returned by `clock()`.

### Notes

POSIX defines `CLOCKS_PER_SEC` as `1'000'000`, regardless of the actual precision of `clock`.

Until standardized as `CLOCKS_PER_SEC` in C89, this macro was sometimes known by its IEEE std 1003.1-1988 name `CLK_TCK`: that name was not included in C89 and was removed from POSIX itself in 1996 over ambiguity with `_SC_CLK_TCK`, which gives number of clocks per second for the function `times`).

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.27.1/2 Components of time (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.27.1/2 Components of time (p: 284)

- C11 standard (ISO/IEC 9899:2011):

- 7.27.1/2 Components of time (p: 388)

- C99 standard (ISO/IEC 9899:1999):

- 7.23.1/2 Components of time (p: 338)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.12.1 Components of time

### See also

|  |  |
| --- | --- |
| clock | returns raw processor clock time since the program is started (function) |
| clock_t | processor time since era type (typedef) |
| C++ documentation for CLOCKS_PER_SEC |  |
