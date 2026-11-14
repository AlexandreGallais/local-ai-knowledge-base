# atomic_init

| Defined in header `<stdatomic.h>` |  |
| --- | --- |
| `void atomic_init( volatile A* obj, C desired );` | (since C11) |

Initializes the default-constructed atomic object `obj` with the value `desired`. The function is not atomic: concurrent access from another thread, even through an atomic operation, is a data race.

This is a generic function defined for all atomic object types `A`. The argument is pointer to a volatile atomic type to accept addresses of both non-volatile and volatile (e.g. memory-mapped I/O) atomic objects, and volatile semantic is preserved when applying this operation to volatile atomic objects. `C` is the non-atomic type corresponding to `A`.

It is unspecified whether the name of a generic function is a macro or an identifier declared with external linkage. If a macro definition is suppressed in order to access an actual function (e.g. parenthesized like `(atomic_init)(...)`), or a program defines an external identifier with the name of a generic function, the behavior is undefined.

### Parameters

|  |  |  |
| --- | --- | --- |
| obj | - | pointer to an atomic object to initialize |
| desired | - | the value to initialize atomic object with |

### Return value

(none)

### Notes

`atomic_init` is the only way to initialize dynamically-allocated atomic objects. For example:

```c
_Atomic int *p = malloc(sizeof(_Atomic int));
atomic_init(p, 42);
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.17.2.2 The atomic_init generic function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.17.2.2 The atomic_init generic function (p: 201)

- C11 standard (ISO/IEC 9899:2011):

- 7.17.2.2 The atomic_init generic function (p: 274-275)

### See also

|  |  |
| --- | --- |
| ATOMIC_VAR_INIT (C11), (deprecated in C17), (removed in C23) | initializes a new atomic object (function macro) |
| C++ documentation for atomic_init |  |
