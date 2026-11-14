# C++ named requirements: BooleanTestable

Specifies that an expression of such a type and value category is convertible to `bool`, and for which the logical operators for the type or two different BooleanTestable types have the usual behavior (including short-circuiting).

### Requirements

Let `e` be an expression of a certain type and value category. The type and value category meet the BooleanTestable requirements if:

- `!e` is well-formed and does not modify the object denoted by `e`, if any, except that if `e` is an xvalue, the denoted object can be left in a valid but unspecified state(since C++11).
- Both `e` and `!e` are convertible to `bool` by both implicit conversion and `static_cast`.
- Conversions in both manners produce equal results and do not modify the source object, if any, except that if `e` or `!e` is an xvalue, the source object can be left in a valid but unspecified state(since C++11).
- `bool(!e) == !bool(e)` holds.
- No viable non-member `operator&&` and `operator||` is visible by argument-dependent lookup for the type of `e` or `!e`.
- If `e` or `!e` is of a class type, the class does not define any member `operator&&` or `operator||`.

### Notes

The standard does not define a named requirement with this name. It was originally proposed in an early resolution of LWG2114, but was superseded by the exposition-only concept `boolean-testable` in the final resolution P2167R3. Because implementations generally expect the provided types to model `boolean-testable` even in pre-C++20 modes, we intentedly treat P2167R3 as a defect report and transform the `boolean-testable` to legacy named requirements.

When the `&&` and `||` operators are used with operands whose type and value category are BooleanTestable, built-in versions are selected and short-circuit evaluation is performed.

The type and value category of an expression `e` meet the BooleanTestable requirements if and only if `decltype((e))` models `boolean-testable`. (since C++20)

Examples of BooleanTestable types (with any value category) include `bool`, `std::true_type`(since C++11), `std::bitset<N>::``reference`, and `int*`.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2114 (P2167R3) | C++98 | convertibility to `bool` was too weak to reflect the expectation of implementations | requirements strengthened |

### See also

*boolean-testable* (C++20) specifies that a type can be used in Boolean contexts (exposition-only concept*)
