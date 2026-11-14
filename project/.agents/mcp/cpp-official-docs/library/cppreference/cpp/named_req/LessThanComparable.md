# C++ named requirements: LessThanComparable

The type must work with `<` operator and the result should have standard semantics.

### Requirements

The type `T` satisfies LessThanComparable if given expressions `a`, `b` and `c` of type `T` or `const T`(since C++11), the following expression is valid and has its specified effects:

| Expression | Type | Effects |
| --- | --- | --- |
| `a < b` | meets BooleanTestable (until C++20) | Establishes strict weak ordering relation with the following properties: For all `a`, `!(a < a)` yields `true`. If `a < b`, then `!(b < a)`. If `a < b` and `b < c`, then `a < c`. Defining `equiv(a, b)` as `!(a < b) && !(b < a)`, if `equiv(a, b)` and `equiv(b, c)`, then `equiv(a, c)`. |
| models `boolean-testable` (since C++20) |  |  |

### Notes

To satisfy this requirement, types that do not have built-in comparison operators have to provide a user-defined `operator<`.

For the types that are both EqualityComparable and LessThanComparable, the C++ standard library makes a distinction between

- *Equality*, which is the value of the expression `a == b` and
- *Equivalence*, which is the value of the expression `!(a < b) && !(b < a)`.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2114 (P2167R3) | C++98 | convertibility to `bool` was too weak to reflect the expectation of implementations | requirements strengthened |

### See also

|  |  |
| --- | --- |
| Compare | a BinaryPredicate that establishes an ordering relation (named requirement) |
| strict_weak_order (C++20) | specifies that a `relation` imposes a strict weak ordering (concept) |
