# thrd_join

| Defined in header `<threads.h>` |  |
| --- | --- |
| `int thrd_join( thrd_t thr, int *res );` | (since C11) |

Blocks the current thread until the thread identified by `thr` finishes execution.

If `res` is not a null pointer, the result code of the thread is put to the location pointed to by `res`.

The termination of the thread *synchronizes-with* the completion of this function.

The behavior is undefined if the thread was previously detached or joined by another thread.

### Parameters

|  |  |  |
| --- | --- | --- |
| thr | - | identifier of the thread to join |
| res | - | location to put the result code to |

### Return value

`thrd_success` if successful, `thrd_error` otherwise.

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.5.6 The thrd_join function (p: 280-281)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.5.6 The thrd_join function (p: 384-385)

### See also

|  |  |
| --- | --- |
| thrd_detach (C11) | detaches a thread (function) |
| thrd_exit (C11) | terminates the calling thread (function) |
| C++ documentation for join |  |
