# C++ named requirements: MoveInsertable (since C++11)

Specifies that an object of the type can be constructed into uninitialized storage from an rvalue of that type by a given allocator.

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
| Expression | Definition |
| `rv` | an expression denoting an rvalue of type `T` |
| `expr` | `std::allocator_traits<A>::construct(m, p, rv)` |

`T` is MoveInsertable into `X` if all following conditions are satisfied:

- `expr` is well-formed.
- Right after the evaluation of `expr`, the value of `*p` is equivalent to the value of `rv` before the evaluation.

### Notes

If `A` is `std::allocator<T>`, then this will call placement `new`, as by `::new((void*)p) T(rv)`(until C++20)`std::construct_at(p, rv)`(since C++20). This effectively requires `T` to be move constructible.

If `std::allocator<T>` or a similar allocator is used, a class does not have to implement a move constructor to satisfy this type requirement: a copy constructor that takes a `const T&` argument can bind rvalue expressions. If a MoveInsertable class implements a move constructor, it may also implement move semantics to take advantage of the fact that the value of `rv` after construction is unspecified.

Although it is required that customized `construct` is used when constructing elements of `std::basic_string` until C++23, all implementations only used the default mechanism. The requirement is corrected by P1072R10 to match existing practice.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2177 | C++11 | evaluting `expr` did not have any postcondition | added |

### See also

CopyInsertable
