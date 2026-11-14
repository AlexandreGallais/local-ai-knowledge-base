# thrd_equal

| Defined in header `<threads.h>` |  |
| --- | --- |
| `int thrd_equal( thrd_t lhs, thrd_t rhs );` | (since C11) |

Checks whether `lhs` and `rhs` refer to the same thread.

### Parameters

lhs, rhs - threads to compare

### Return value

Non-zero value if `lhs` and `rhs` refer to the same value, `​0​` otherwise.

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.5.4 The thrd_equal function (p: 280)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.5.4 The thrd_equal function (p: 384)

### See also

C++ documentation for operator_cmp
