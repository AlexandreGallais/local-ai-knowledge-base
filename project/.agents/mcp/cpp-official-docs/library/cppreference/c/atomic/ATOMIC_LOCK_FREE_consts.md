# ATOMIC_*_LOCK_FREE

| Defined in header `<stdatomic.h>` |  |
| --- | --- |
| `#define ATOMIC_BOOL_LOCK_FREE /* implementation-defined */ #define ATOMIC_CHAR_LOCK_FREE /* implementation-defined */ #define ATOMIC_CHAR16_T_LOCK_FREE /* implementation-defined */ #define ATOMIC_CHAR32_T_LOCK_FREE /* implementation-defined */ #define ATOMIC_WCHAR_T_LOCK_FREE /* implementation-defined */ #define ATOMIC_SHORT_LOCK_FREE /* implementation-defined */ #define ATOMIC_INT_LOCK_FREE /* implementation-defined */ #define ATOMIC_LONG_LOCK_FREE /* implementation-defined */ #define ATOMIC_LLONG_LOCK_FREE /* implementation-defined */ #define ATOMIC_POINTER_LOCK_FREE /* implementation-defined */` | (since C11) |
| `#define ATOMIC_CHAR8_T_LOCK_FREE /* implementation-defined */` | (since C23) |

Expands to preprocessor constant expressions that evaluate to either `0`, `1`, or `2` which indicate the lock-free property of the corresponding atomic types (both signed and unsigned).

| Value | Explanation |
| --- | --- |
| `0` | The atomic type is never lock-free |
| `1` | The atomic type is sometimes lock-free |
| `2` | The atomic type is always lock-free |

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.17.1/3 atomic lock-free macros (p: 200)

- C11 standard (ISO/IEC 9899:2011):

- 7.17.1/3 atomic lock-free macros (p: 273)
