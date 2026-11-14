# atomic_is_lock_free

| Defined in header `<stdatomic.h>` |  |
| --- | --- |
| `_Bool atomic_is_lock_free( const volatile A* obj );` | (since C11) |

Determines if the atomic operations on all objects of the type `A` (the type of the object pointed to by `obj`) are lock-free. In any given program execution, the result of calling `atomic_is_lock_free` is the same for all pointers of the same type.

This is a generic function defined for all atomic object types `A`. The argument is pointer to a volatile atomic type to accept addresses of both non-volatile and volatile (e.g. memory-mapped I/O) atomic objects, and volatile semantic is preserved when applying this operation to volatile atomic objects.

It is unspecified whether the name of a generic function is a macro or an identifier declared with external linkage. If a macro definition is suppressed in order to access an actual function (e.g. parenthesized like `(atomic_is_lock_free)(...)`), or a program defines an external identifier with the name of a generic function, the behavior is undefined.

### Parameters

obj - pointer to the atomic object to inspect

### Return value

`true` if the operations on all objects of the type `A` are lock-free, `false` otherwise.

### Example

```c
#include <stdio.h>
#include <stdatomic.h>

_Atomic struct A { int a[100]; } a;
_Atomic struct B { int x, y; } b;
int main(void)
{
    printf("_Atomic struct A is lock free? %s\n",
            atomic_is_lock_free(&a) ? "true" : "false");
    printf("_Atomic struct B is lock free? %s\n",
            atomic_is_lock_free(&b) ? "true" : "false");
}
```

Possible output:

```text
_Atomic struct A is lock free? false
_Atomic struct B is lock free? true
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| DR 465 | C11 | this function was per-object | this functions is per-type |

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.17.5.1 The atomic_is_lock_free generic function (p: 205)

- C11 standard (ISO/IEC 9899:2011):

- 7.17.5.1 The atomic_is_lock_free generic function (p: 280)

### See also

|  |  |
| --- | --- |
| ATOMIC_BOOL_LOCK_FREE, ATOMIC_CHAR_LOCK_FREE, ATOMIC_CHAR16_T_LOCK_FREE, ATOMIC_CHAR32_T_LOCK_FREE, ATOMIC_WCHAR_T_LOCK_FREE, ATOMIC_SHORT_LOCK_FREE, ATOMIC_INT_LOCK_FREE, ATOMIC_LONG_LOCK_FREE, ATOMIC_LLONG_LOCK_FREE, ATOMIC_POINTER_LOCK_FREE (C11) | indicates that the given atomic type is lock-free (macro constant) |
| C++ documentation for atomic_is_lock_free |  |
