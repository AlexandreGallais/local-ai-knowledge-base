# kill_dependency

| Defined in header `<stdatomic.h>` |  |
| --- | --- |
| `A kill_dependency( A y );` | (since C11) |

Informs the compiler that the dependency tree started by an `memory_order_consume` atomic load operation does not extend past the return value of `kill_dependency`; that is, the argument does not carry a dependency into the return value.

The function is implemented as a macro. `A` is the type of `y`.

### Parameters

y - the expression whose return value is to be removed from a dependency tree

### Return value

Returns `y`, no longer a part of a dependency tree.

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.17.3.1 The kill_dependency macro (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.17.3.1 The kill_dependency macro (p: 203-204)

- C11 standard (ISO/IEC 9899:2011):

- 7.17.3.1 The kill_dependency macro (p: 278)

### See also

C++ documentation for kill_dependency
