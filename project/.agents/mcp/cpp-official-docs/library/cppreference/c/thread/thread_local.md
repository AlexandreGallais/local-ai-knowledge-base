# thread_local

| Defined in header `<threads.h>` |  |
| --- | --- |
| `#define thread_local _Thread_local` | (since C11) (removed in C23) |

Convenience macro which can be used to specify that an object has thread-local storage duration.

### Notes

Since C23, `thread_local` is itself a keyword, which may also be a predefined macro, so `<threads.h>` no longer provides it.

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.1/3 thread_local (p: 274)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.1/3 thread_local (p: 376)

### See also

C++ documentation for thread_local
