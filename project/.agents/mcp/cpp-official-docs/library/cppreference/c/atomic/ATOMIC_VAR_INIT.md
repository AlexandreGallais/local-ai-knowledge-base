# ATOMIC_VAR_INIT

| Defined in header `<stdatomic.h>` |  |
| --- | --- |
| `#define ATOMIC_VAR_INIT(value) /* unspecified */` | (since C11) (deprecated in C17) (removed in C23) |

Expands to an expression that can be used to initialize an atomic variable of the same type as `value`.

The initial value of atomic object of automatic storage duration that is not explicitly initialized is indeterminate. The default (zero) initialization of static and thread-local variables produces a valid value however.

When initializing an atomic variable, any concurrent access, even through an atomic operation, is a data race (it may happen if the address is immediately passed to another thread with a `memory_order_relaxed` operation).

### Notes

This macro was a part of early draft design for C11 atomic types. It is not needed in C11, and is deprecated in C17 and removed in C23.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| DR 485 | C11 | the specification was redundant and contradictory to the core language | fixed |

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.17.2.1 The ATOMIC_VAR_INIT macro (p: 201)

- C11 standard (ISO/IEC 9899:2011):

- 7.17.2.1 The ATOMIC_VAR_INIT macro (p: 274)

### See also

|  |  |
| --- | --- |
| ATOMIC_FLAG_INIT (C11) | initializes a new `atomic_flag` (macro constant) |
| C++ documentation for ATOMIC_VAR_INIT |  |
