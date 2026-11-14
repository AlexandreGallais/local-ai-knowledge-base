# mtx_init

| Defined in header `<threads.h>` |  |
| --- | --- |
| `int mtx_init( mtx_t* mutex, int type );` | (since C11) |

Creates a new mutex object with `type`. The object pointed to by `mutex` is set to an identifier of the newly created mutex.

`type` must have one of the following values:

- `mtx_plain` - a simple, non-recursive mutex is created.
- `mtx_timed` - a non-recursive mutex, that supports timeout, is created.
- `mtx_plain | mtx_recursive` - a recursive mutex is created.
- `mtx_timed | mtx_recursive` - a recursive mutex, that supports timeout, is created.

### Parameters

|  |  |  |
| --- | --- | --- |
| mutex | - | pointer to the mutex to initialize |
| type | - | the type of the mutex |

### Return value

`thrd_success` if successful, `thrd_error` otherwise.

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.4.2 The mtx_init function (p: 277-278)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.4.2 The mtx_init function (p: 381)

### See also

C++ documentation for mutex

C++ documentation for timed_mutex

C++ documentation for recursive_mutex

C++ documentation for recursive_timed_mutex
