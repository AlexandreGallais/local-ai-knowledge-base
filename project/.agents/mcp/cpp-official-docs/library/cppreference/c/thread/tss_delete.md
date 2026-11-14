# tss_delete

| Defined in header `<threads.h>` |  |
| --- | --- |
| `void tss_delete( tss_t tss_id );` | (since C11) |

Destroys the thread-specific storage identified by `tss_id`.

The destructor, if one was registered by `tss_create`, is not called (they are only called at thread exit, either by `thrd_exit` or by returning from the thread function), it is the responsibility of the programmer to ensure that every thread that is aware of `tss_id` performed all necessary cleanup, before the call to `tss_delete` is made.

If `tss_delete` is called while another thread is executing destructors for `tss_id`, it's unspecified whether this changes the number of invocations to the associated destructor.

If `tss_delete` is called while the calling thread is executing destructors, then the destructor associated with `tss_id` will not be executed again on this thread.

### Parameters

tss_id - thread-specific storage key previously returned by `tss_create` and not yet deleted by `tss_delete`

### Return value

(none)

### Notes

The POSIX equivalent of this function is `pthread_key_delete`.

The reason `tss_delete` never calls destructors is that the destructors (called at thread exit) are normally intended to be executed by the same thread that originally set the value (via `tss_set`) that the destructor will be dealing with, and may even rely on the values of that or other thread-specific data as seen by that thread. The thread executing `tss_delete` has no access to other threads' TSS. Even if it were possible to call the destructor for each thread's own value associated with `tss_id`, `tss_delete` would have to synchronize with every thread if only to examine whether the value of this TSS in that thread is null (destructors are only called against non-null values).

### Example

This section is incomplete Reason: no example

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.6.2 The tss_delete function (p: 282)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.6.2 The tss_delete function (p: 386)
