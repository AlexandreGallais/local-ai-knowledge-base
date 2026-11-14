# cnd_wait

| Defined in header `<threads.h>` |  |
| --- | --- |
| `int cnd_wait( cnd_t* cond, mtx_t* mutex );` | (since C11) |

Atomically unlocks the mutex pointed to by `mutex` and blocks on the condition variable pointed to by `cond` until the thread is signalled by `cnd_signal` or `cnd_broadcast`, or until a spurious wake-up occurs. The mutex is locked again before the function returns.

The behavior is undefined if the mutex is not already locked by the calling thread.

### Parameters

|  |  |  |
| --- | --- | --- |
| cond | - | pointer to the condition variable to block on |
| mutex | - | pointer to the mutex to unlock for the duration of the block |

### Return value

`thrd_success` if successful, `thrd_error` otherwise.

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.3.6 The cnd_wait function (p: 277)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.3.6 The cnd_wait function (p: 380)

### See also

|  |  |
| --- | --- |
| cnd_timedwait (C11) | blocks on a condition variable, with a timeout (function) |
| C++ documentation for condition_variable::wait |  |
| C++ documentation for condition_variable_any::wait |  |
