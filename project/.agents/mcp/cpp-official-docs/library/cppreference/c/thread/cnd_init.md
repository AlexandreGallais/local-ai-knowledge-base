# cnd_init

| Defined in header `<threads.h>` |  |
| --- | --- |
| `int cnd_init( cnd_t* cond );` | (since C11) |

Initializes new condition variable. The object pointed to by `cond` will be set to value that identifies the condition variable.

### Parameters

cond - pointer to a variable to store identifier of the condition variable to

### Return value

`thrd_success` if the condition variable was successfully created. Otherwise returns `thrd_nomem` if there was insufficient amount of memory or `thrd_error` if another error occurred.

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.3.3 The cnd_init function (p: 276)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.3.3 The cnd_init function (p: 379)

### See also

C++ documentation for condition_variable

C++ documentation for condition_variable_any
