# mtx_destroy

| Defined in header `<threads.h>` |  |
| --- | --- |
| `void mtx_destroy( mtx_t *mutex );` | (since C11) |

Destroys the mutex pointed to by `mutex`.

If there are threads waiting on `mutex`, the behavior is undefined.

### Parameters

mutex - pointer to the mutex to destroy

### Return value

(none)

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.4.1 The mtx_destroy function (p: 277)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.4.1 The mtx_destroy function (p: 380)

### See also

C++ documentation for ~mutex

C++ documentation for ~timed_mutex

C++ documentation for ~recursive_mutex

C++ documentation for ~recursive_timed_mutex
