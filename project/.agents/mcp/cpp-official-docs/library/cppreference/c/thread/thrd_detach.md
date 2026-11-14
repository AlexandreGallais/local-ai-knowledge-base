# thrd_detach

| Defined in header `<threads.h>` |  |
| --- | --- |
| `int thrd_detach( thrd_t thr );` | (since C11) |

Detaches the thread identified by `thr` from the current environment. The resources held by the thread will be freed automatically once the thread exits.

### Parameters

thr - identifier of the thread to detach

### Return value

`thrd_success` if successful, `thrd_error` otherwise.

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.5.3 The thrd_detach function (p: 280)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.5.3 The thrd_detach function (p: 383-384)

### See also

|  |  |
| --- | --- |
| thrd_join (C11) | blocks until a thread terminates (function) |
| C++ documentation for detach |  |
