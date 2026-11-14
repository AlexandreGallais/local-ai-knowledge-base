# cnd_timedwait

| Defined in header `<threads.h>` |  |
| --- | --- |
| `int cnd_timedwait( cnd_t* restrict cond, mtx_t* restrict mutex, const struct timespec* restrict time_point );` | (since C11) |

Atomically unlocks the mutex pointed to by `mutex` and blocks on the condition variable pointed to by `cond` until the thread is signalled by `cnd_signal` or `cnd_broadcast`, or until the `TIME_UTC` based time point pointed to by `time_point` has been reached, or until a spurious wake-up occurs. The mutex is locked again before the function returns.

The behavior is undefined if the mutex is not already locked by the calling thread.

### Parameters

|  |  |  |
| --- | --- | --- |
| cond | - | pointer to the condition variable to block on |
| mutex | - | pointer to the mutex to unlock for the duration of the block |
| time_point | - | pointer to an object specifying timeout time to wait until |

### Return value

`thrd_success` if successful, `thrd_timedout` if the timeout time has been reached before the mutex is locked, or `thrd_error` if an error occurred.

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.3.5 The cnd_timedwait function (p: 276-277)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.3.5 The cnd_timedwait function (p: 379-380)

### See also

|  |  |
| --- | --- |
| cnd_wait (C11) | blocks on a condition variable (function) |
| C++ documentation for condition_variable::wait_until |  |
| C++ documentation for condition_variable_any::wait_until |  |
