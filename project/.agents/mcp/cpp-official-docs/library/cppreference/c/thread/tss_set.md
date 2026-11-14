# tss_set

| Defined in header `<threads.h>` |  |
| --- | --- |
| `int tss_set( tss_t tss_id, void *val );` | (since C11) |

Sets the value of the thread-specific storage identified by `tss_id` for the current thread to `val`. Different threads may set different values to the same key.

The destructor, if available, is not invoked.

### Parameters

|  |  |  |
| --- | --- | --- |
| tss_id | - | thread-specific storage key, obtained from `tss_create` and not deleted by `tss_delete` |
| val | - | value to set thread-specific storage to |

### Return value

`thrd_success` if successful, `thrd_error` otherwise.

### Notes

The POSIX equivalent of this function is `pthread_setspecific`.

Typically TSS is used to store pointers to blocks of dynamically allocated memory that have been reserved for use by the calling thread.

`tss_set` may be called in the TSS destructor. If the destructor exits with non-NULL value in the TSS storage, it will be retried by `thrd_exit` up to `TSS_DTOR_ITERATIONS` times, after which the storage will be lost.

### Example

This section is incomplete Reason: improve, perhaps look for POSIX examples for inspiration

```c
int thread_func(void *arg) {
    tss_t key;
    if (thrd_success == tss_create(&key, free)) {
        tss_set(key, malloc(4)); // stores a pointer on TSS
        // ...
    }
} // calls free() for the pointer stored on TSS
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.6.4 The tss_set function (p: 282-283)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.6.4 The tss_set function (p: 387)

### See also

tss_get (C11) reads from thread-specific storage (function)
