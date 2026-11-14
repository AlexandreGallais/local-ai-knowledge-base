# TSS_DTOR_ITERATIONS

| Defined in header `<threads.h>` |  |
| --- | --- |
| `#define TSS_DTOR_ITERATIONS /* unspecified */` | (since C11) |

Expands to a positive integral constant expression defining the maximum number of times a destructor for thread-local storage pointer will be called by `thrd_exit`.

This constant is equivalent to the POSIX `PTHREAD_DESTRUCTOR_ITERATIONS`.

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.1/3 TSS_DTOR_ITERATIONS (p: 274)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.1/3 TSS_DTOR_ITERATIONS (p: 376)
