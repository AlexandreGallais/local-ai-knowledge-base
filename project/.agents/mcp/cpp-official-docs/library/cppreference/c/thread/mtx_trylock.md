# mtx_trylock

| Defined in header `<threads.h>` |  |
| --- | --- |
| `int mtx_trylock( mtx_t *mutex );` | (since C11) |

Tries to lock the mutex pointed to by `mutex` without blocking. Returns immediately if the mutex is already locked.

Prior calls to `mtx_unlock` on the same mutex *synchronize-with* this operation (if this operation succeeds), and all lock/unlock operations on any given mutex form a single total order (similar to the modification order of an atomic)

### Parameters

mutex - pointer to the mutex to lock

### Return value

`thrd_success` if successful, `thrd_busy` if the mutex has already been locked or due to a spurious failure to acquire an available mutex, `thrd_error` if an error occurs.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| DR 470 | C11 | `mtx_trylock` was not allowed to fail spuriously | allowed |

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.4.5 The mtx_trylock function (p: 278-279)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.4.5 The mtx_trylock function (p: 382)

### See also

|  |  |
| --- | --- |
| mtx_lock (C11) | blocks until locks a mutex (function) |
| mtx_timedlock (C11) | blocks until locks a mutex or times out (function) |
| mtx_unlock (C11) | unlocks a mutex (function) |
| C++ documentation for mutex::try_lock |  |
| C++ documentation for timed_mutex::try_lock |  |
| C++ documentation for recursive_mutex::try_lock |  |
| C++ documentation for recursive_timed_mutex::try_lock |  |
