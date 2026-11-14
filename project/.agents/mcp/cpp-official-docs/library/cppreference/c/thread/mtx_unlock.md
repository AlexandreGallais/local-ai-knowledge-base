# mtx_unlock

| Defined in header `<threads.h>` |  |
| --- | --- |
| `int mtx_unlock( mtx_t *mutex );` | (since C11) |

Unlocks the mutex pointed to by `mutex`.

The behavior is undefined if the mutex is not locked by the calling thread.

This function *synchronizes-with* subsequent `mtx_lock`, `mtx_trylock`, or `mtx_timedlock` on the same mutex. All lock/unlock operations on any given mutex form a single total order (similar to the modification order of an atomic).

### Parameters

mutex - pointer to the mutex to unlock

### Return value

`thrd_success` if successful, `thrd_error` otherwise.

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.4.6 The mtx_unlock function (p: 279)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.4.6 The mtx_unlock function (p: 382)

### See also

|  |  |
| --- | --- |
| mtx_lock (C11) | blocks until locks a mutex (function) |
| mtx_timedlock (C11) | blocks until locks a mutex or times out (function) |
| mtx_trylock (C11) | locks a mutex or returns without blocking if already locked (function) |
| C++ documentation for mutex::unlock |  |
| C++ documentation for timed_mutex::unlock |  |
| C++ documentation for recursive_mutex::unlock |  |
| C++ documentation for recursive_timed_mutex::unlock |  |
