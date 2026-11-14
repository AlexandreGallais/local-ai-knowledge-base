# mtx_plain, mtx_recursive, mtx_timed

| Defined in header `<threads.h>` |  |
| --- | --- |
| `enum { mtx_plain = /* unspecified */, mtx_recursive = /* unspecified */, mtx_timed = /* unspecified */ };` | (since C11) |

When passed to `mtx_init`, identifies the type of a mutex to create.

| Constant | Explanation |
| --- | --- |
| `mtx_plain` | plain mutex |
| `mtx_recursive` | recursive mutex |
| `mtx_timed` | timed mutex |

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.1/5 mtx_plain, mtx_recursive, mtx_timed (p: 274-275)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.1/5 mtx_plain, mtx_recursive, mtx_timed (p: 377)

### See also

mtx_init (C11) creates a mutex (function)
