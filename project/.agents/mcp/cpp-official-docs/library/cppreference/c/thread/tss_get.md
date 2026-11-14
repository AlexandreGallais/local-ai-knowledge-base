# tss_get

| Defined in header `<threads.h>` |  |
| --- | --- |
| `void *tss_get( tss_t tss_key );` | (since C11) |

Returns the value held in thread-specific storage for the current thread identified by `tss_key`. Different threads may get different values identified by the same key.

On thread startup (see `thrd_create`), the values associated with all TSS keys are NULL. Different value may be placed in the thread-specific storage with `tss_set`.

### Parameters

tss_key - thread-specific storage key, obtained from `tss_create` and not deleted by `tss_delete`

### Return value

The value on success, `NULL` on failure.

### Notes

The POSIX equivalent for this function is `pthread_getspecific`.

### Example

This section is incomplete Reason: no example

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.6.3 The tss_get function (p: 282)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.6.3 The tss_get function (p: 386)

### See also

tss_set (C11) write to thread-specific storage (function)
