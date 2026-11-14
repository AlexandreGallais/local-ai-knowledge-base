# thrd_exit

| Defined in header `<threads.h>` |  |
| --- | --- |
| `_Noreturn void thrd_exit( int res );` | (since C11) (until C23) |
| `[[noreturn]] void thrd_exit( int res );` | (since C23) |

First, for every thread-specific storage key which was created with a non-null destructor and for which the associated value is non-null (see `tss_create`), `thrd_exit` sets the value associated with the key to `NULL` and then invokes the destructor with the previous value of the key. The order in which the destructors are invoked is unspecified.

If, after this, there remain keys with both non-null destructors and values (e.g. if a destructor executed `tss_set`), the process is repeated up to `TSS_DTOR_ITERATIONS` times.

Finally, the `thrd_exit` function terminates execution of the calling thread and sets its result code to `res`.

If the last thread in the program is terminated with `thrd_exit`, the entire program terminates as if by calling `exit` with `EXIT_SUCCESS` as the argument (so the functions registered by `atexit` are executed in the context of that last thread)

### Parameters

res - the result value to return

### Return value

(none)

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.5.5 The thrd_exit function (p: 280)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.5.5 The thrd_exit function (p: 384)

### See also

|  |  |
| --- | --- |
| thrd_join (C11) | blocks until a thread terminates (function) |
| thrd_detach (C11) | detaches a thread (function) |
