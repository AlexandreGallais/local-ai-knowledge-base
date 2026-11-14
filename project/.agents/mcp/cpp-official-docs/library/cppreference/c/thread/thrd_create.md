# thrd_create

| Defined in header `<threads.h>` |  |
| --- | --- |
| `int thrd_create( thrd_t *thr, thrd_start_t func, void *arg );` | (since C11) |

Creates a new thread executing the function `func`. The function is invoked as `func(arg)`.

If successful, the object pointed to by `thr` is set to the identifier of the new thread.

The completion of this function *synchronizes-with* the beginning of the thread.

### Parameters

|  |  |  |
| --- | --- | --- |
| thr | - | pointer to memory location to put the identifier of the new thread |
| func | - | function to execute |
| arg | - | argument to pass to the function |

### Return value

`thrd_success` if the creation of the new thread was successful. Otherwise returns `thrd_nomem` if there was insufficient amount of memory or `thrd_error` if another error occurred.

### Notes

The thread identifiers may be reused for new threads once the thread has finished and joined or detached.

The type `thrd_start_t` is a typedef of `int(*)(void*)`, which differs from the POSIX equivalent `void*(*)(void*)`

All thread-specific storage values (see `tss_create`) are initialized to `NULL`.

Return from the function `func` is equivalent to calling `thrd_exit` with the argument equal to the return value of `func`.

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.5.1 The thrd_create function (p: 279)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.5.1 The thrd_create function (p: 383)

### See also

|  |  |
| --- | --- |
| thrd_detach (C11) | detaches a thread (function) |
| thrd_join (C11) | blocks until a thread terminates (function) |
| C++ documentation for thread |  |
