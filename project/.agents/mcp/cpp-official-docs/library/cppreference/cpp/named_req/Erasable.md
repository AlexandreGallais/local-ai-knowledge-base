# C++ named requirements: Erasable (since C++11)

Specifies that an object of the type can be destroyed by a given Allocator.

### Requirements

Given the following types, values and expressions:

| Type | Definition |
| --- | --- |
| `T` | an object type |
| `A` | an allocator type |
| `X` | a container type satisfying all following conditions: `X::value_type` is the same as `T`. `X::allocator_type` is the same as `std::allocator_traits<A>::rebind_alloc<T>`. |
| Value | Definition |
| `m` | an lvalue of type `A` |
| `p` | a pointer of type `T*` |

If the expression `std::allocator_traits<A>::destroy(m, p)` is well-formed, `T` is Erasable from `X`.

### Notes

All standard library containers require that their value types satisfy Erasable.

|  |  |
| --- | --- |
| With the default allocator, this requirement is equivalent to the validity of `p->~T()`, which accepts class types with accessible destructors and all scalar types, but rejects array types, function types, reference types, and `void`. | (until C++20) |
| With the default allocator, this requirement is equivalent to the validity of `std::destroy_at(p)`, which accepts class types with accessible destructors and all scalar types, as well as arrays thereof. | (since C++20) |

Although it is required that customized `destroy` is used when destroying elements of `std::basic_string` until C++23, all implementations only used the default mechanism. The requirement is corrected by P1072R10 to match existing practice.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| N3346 | C++11 | there was no requirement to specify whether a type whose objects can be destroyed using allocators | added the requirement |

### See also

CopyInsertable

MoveInsertable

EmplaceConstructible

Destructible
