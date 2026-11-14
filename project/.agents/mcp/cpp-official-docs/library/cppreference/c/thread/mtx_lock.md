# mtx_lock

| Defined in header `<threads.h>` |  |
| --- | --- |
| `int mtx_lock( mtx_t* mutex );` | (since C11) |

Blocks the current thread until the mutex pointed to by `mutex` is locked.

The behavior is undefined if the current thread has already locked the mutex and the mutex is not recursive.

Prior calls to `mtx_unlock` on the same mutex *synchronize-with* this operation, and all lock/unlock operations on any given mutex form a single total order (similar to the modification order of an atomic)

### Parameters

mutex - pointer to the mutex to lock

### Return value

`thrd_success` if successful, `thrd_error` otherwise.

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.4.3 The mtx_lock function (p: 278)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.4.3 The mtx_lock function (p: 381)

### See also

|  |  |
| --- | --- |
| mtx_timedlock (C11) | blocks until locks a mutex or times out (function) |
| mtx_trylock (C11) | locks a mutex or returns without blocking if already locked (function) |
| mtx_unlock (C11) | unlocks a mutex (function) |
| C++ documentation for mutex::lock |  |
| C++ documentation for timed_mutex::lock |  |
| C++ documentation for recursive_mutex::lock |  |
| C++ documentation for recursive_timed_mutex::lock |  |
