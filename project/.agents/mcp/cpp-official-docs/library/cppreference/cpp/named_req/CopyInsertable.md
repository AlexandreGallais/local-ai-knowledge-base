# C++ named requirements: CopyInsertable (since C++11)

Specifies that an object of the type can be copy-constructed in-place by a given allocator.

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
| `v` | an expression denoting an lvalue of type `T` / `const T`, or an rvalue of type `const T` |
| `expr` | `std::allocator_traits<A>::construct(m, p, v)` |

`T` is CopyInsertable into `X` if all following conditions are satisfied:

- `T` is MoveInsertable into `X`.
- `expr` is well-formed.
- Evaluating `expr` does not change the value of `v`.
- Right after the evaluation of `expr`, the value of `v` is equivalent to `*p`.

### Notes

If `A` is `std::allocator<T>`, then this will call placement `new`, as by `::new((void*)p) T(v)`(until C++20)`std::construct_at(p, v)`(since C++20).

Although it is required that customized `construct` is used when constructing elements of `std::basic_string` until C++23, all implementations only used the default mechanism. The requirement is corrected by P1072R10 to match existing practice.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2177 | C++11 | evaluting `expr` did not have any postcondition | added |
| LWG 3957 | C++11 | `v` could denote an rvalue of type `T` | excluded |
