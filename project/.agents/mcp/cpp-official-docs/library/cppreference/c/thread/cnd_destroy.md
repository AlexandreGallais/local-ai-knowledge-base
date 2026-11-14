# cnd_destroy

| Defined in header `<threads.h>` |  |
| --- | --- |
| `void cnd_destroy( cnd_t* cond );` | (since C11) |

Destroys the condition variable pointed to by `cond`.

If there are threads waiting on `cond`, the behavior is undefined.

### Parameters

cond - pointer to the condition variable to destroy

### Return value

(none)

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.3.2 The cnd_destroy function (p: 276)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.3.2 The cnd_destroy function (p: 378-379)

### See also

C++ documentation for ~condition_variable

C++ documentation for ~condition_variable_any
