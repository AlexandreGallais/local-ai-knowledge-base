# mtx_timedlock

| Defined in header `<threads.h>` |  |
| --- | --- |
| `int mtx_timedlock( mtx_t *restrict mutex, const struct timespec *restrict time_point );` | (since C11) |

Blocks the current thread until the mutex pointed to by `mutex` is locked or until the `TIME_UTC` based absolute calendar time point pointed to by `time_point` has been reached.

Since this function takes an absolute time, if a duration is required, the calendar time point must be calculated manually.

The behavior is undefined if the current thread has already locked the mutex and the mutex is not recursive.

The behavior is undefined if the mutex does not support timeout.

Prior calls to `mtx_unlock` on the same mutex *synchronize-with* this operation (if this operation succeeds), and all lock/unlock operations on any given mutex form a single total order (similar to the modification order of an atomic)

### Parameters

|  |  |  |
| --- | --- | --- |
| mutex | - | pointer to the mutex to lock |
| time_point | - | pointer to the absolute calendar time until which to wait for the timeout |

### Return value

`thrd_success` if successful, `thrd_timedout` if the timeout time has been reached before the mutex is locked, `thrd_error` if an error occurs.

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.4.4 The mtx_timedlock function (p: 278)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.4.4 The mtx_timedlock function (p: 381-382)

### See also

|  |  |
| --- | --- |
| timespec (C11) | time in seconds and nanoseconds (struct) |
| mtx_lock (C11) | blocks until locks a mutex (function) |
| mtx_trylock (C11) | locks a mutex or returns without blocking if already locked (function) |
| mtx_unlock (C11) | unlocks a mutex (function) |
| C++ documentation for timed_mutex::try_lock_until |  |
| C++ documentation for recursive_timed_mutex::try_lock_until |  |

### External links

GNU GCC Libc Manual: ISO-C-Mutexes
