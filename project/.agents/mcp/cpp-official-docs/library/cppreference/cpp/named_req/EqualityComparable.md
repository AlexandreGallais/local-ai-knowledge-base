# C++ named requirements: EqualityComparable

The type must work with `==` operator and the result should have standard semantics.

### Requirements

The type `T` satisfies EqualityComparable if given expressions `a`, `b` and `c` of type `T` or (since C++11) `const T`, the following expression is valid and has its specified effects:

| Expression | Type | Effects |
| --- | --- | --- |
| `a == b` | meets BooleanTestable (until C++20) | Establishes an equivalence relation, that is, it satisfies the following properties: For all values of `a`, `a == a` yields `true`. If `a == b`, then `b == a`. If `a == b` and `b == c`, then `a == c`. |
| models `boolean-testable` (since C++20) |  |  |

### Notes

To satisfy this requirement, types that do not have built-in comparison operators have to provide a user-defined `operator==`.

For the types that are both EqualityComparable and LessThanComparable, the C++ standard library makes a distinction between

- *Equality*, which is the value of the expression `a == b` and
- *Equivalence*, which is the value of the expression `!(a < b) && !(b < a)`.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 283 | C++98 | even if `T` is EqualityComparable, the requirements did not apply to `const T` objects | they apply to `const T` instead of `T` |
| LWG 2114 (P2167R3) | C++98 | convertibility to `bool` was too weak to reflect the expectation of implementations | requirements strengthened |

### See also

equality_comparable, equality_comparable_with (C++20) specifies that operator `==` is an equivalence relation (concept)
