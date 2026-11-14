# tss_create

| Defined in header `<threads.h>` |  |
| --- | --- |
| `int tss_create( tss_t* tss_key, tss_dtor_t destructor );` | (since C11) |

Creates new thread-specific storage key and stores it in the object pointed to by `tss_key`. Although the same key value may be used by different threads, the values bound to the key by `tss_set` are maintained on a per-thread basis and persist for the life of the calling thread.

The value `NULL` is associated with the newly created key in all existing threads, and upon thread creation, the values associated with all TSS keys is initialized to `NULL`.

If `destructor` is not a null pointer, then also associates the destructor which is called when the storage is released by `thrd_exit` (but not by `tss_delete` and not at program termination by `exit`).

A call to `tss_create` from within a thread-specific storage destructor results in undefined behavior.

### Parameters

|  |  |  |
| --- | --- | --- |
| tss_key | - | pointer to memory location to store the new thread-specific storage key |
| destructor | - | pointer to a function to call at thread exit |

### Notes

The POSIX equivalent of this function is `pthread_key_create`.

### Return value

`thrd_success` if successful, `thrd_error` otherwise.

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

- 7.26.6.1 The tss_create function (p: 281-282)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.6.1 The tss_create function (p: 386)
