# cnd_broadcast

| Defined in header `<threads.h>` |  |
| --- | --- |
| `int cnd_broadcast( cnd_t *cond );` | (since C11) |

Unblocks all threads that are blocked on condition variable `cond` at the time of the call. If no threads are blocked on `cond`, the function does nothing and returns `thrd_success`.

### Parameters

cond - pointer to a condition variable

### Return value

`thrd_success` if successful, `thrd_error` otherwise.

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.3.1 The cnd_broadcast function (p: 275-276)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.3.1 The cnd_broadcast function (p: 378)

### See also

|  |  |
| --- | --- |
| cnd_signal (C11) | unblocks one thread blocked on a condition variable (function) |
| C++ documentation for condition_variable::notify_all |  |
| C++ documentation for condition_variable_any::notify_all |  |
