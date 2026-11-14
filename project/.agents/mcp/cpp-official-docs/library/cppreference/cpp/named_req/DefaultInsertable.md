# C++ named requirements: DefaultInsertable (since C++11)

Specifies that an object of the type can be default-constructed in-place by a given allocator.

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

If the expression `std::allocator_traits<A>::construct(m, p)` is well-formed, `T` is DefaultInsertable into `X`.

### Notes

By default, this will value-initialize the object, as by `::new((void*)p) T()`(until C++20)`std::construct_at(p)`(since C++20).

If value-initialization is undesirable, for example, if the object is of non-class type and zeroing out is not needed, it can be avoided by providing a custom `Allocator::construct`.

Although it is required that customized `construct` is used when constructing elements of `std::basic_string` until C++23, all implementations only used the default mechanism. The requirement is corrected by P1072R10 to match existing practice.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| N3346 | C++11 | the requirements CopyInsertable and MoveInsertable are present, but DefaultInsertable was missing | added the requirement |

### See also

DefaultConstructible

CopyInsertable

MoveInsertable

EmplaceConstructible

Erasable
