# C++ named requirements: NullablePointer (since C++11)

Specifies that the type is a pointer-like object which can be compared to `std::nullptr_t` objects.

### Requirements

The type must meet all of the following requirements:

- EqualityComparable
- DefaultConstructible
- CopyConstructible
- CopyAssignable
- Swappable
- Destructible

In addition, a value-initialized object of the type must produce a null value of that type. This null value shall only be equivalent to itself. Default initialization of the type may have an indeterminate or erroneous(since C++26) value.

A value of the type must be contextually convertible to `bool`. The effect of this conversion returns `false` if the value is equivalent to its null value and `true` otherwise.

None of the operations that this type performs may throw exceptions.

The type must satisfy the following additional expressions, given two values `p` and `q` that are of the type, and that `np` is a value of `std::nullptr_t` type (possibly const-qualified):

| Declaration | Effects |
| --- | --- |
| `Type p(np);` `Type p = np;` | Afterwards, `p` is equivalent to `nullptr` |
| Expression | Effects |
| `Type(np)` | A temporary object that is equivalent to `nullptr` |
| `p = np` | Must return a `Type&`, and afterwards, `p` is equivalent to `nullptr` |
| `p != q` | Type and value meet the BooleanTestable requirements (until C++20) `decltype(p != q)` models `boolean-testable` (since C++20) The effect is `!(p == q)` |
| `p == np` `np == p` | Type and value of both expressions the BooleanTestable requirements (until C++20) `decltype(p == np)` and `decltype(np == p)` each model `boolean-testable` (since C++20) The effect is `(p == Type())` |
| `p != np` `np != p` | Type and value of both expressions the BooleanTestable requirements (until C++20) `decltype(p != np)` and `decltype(np != p)` each model `boolean-testable` (since C++20) The effect is `!(p == np)` |

### Notes

Note that dereferencing (`operator*` or `operator->`) is not required for a NullablePointer type. A minimalistic type that satisfies these requirements is

```cpp
class handle
{
    int id = 0;
public:
    handle() = default;
    handle(std::nullptr_t) {}
    explicit operator bool() const { return id != 0; }
    friend bool operator==(handle l, handle r) { return l.id == r.id; }
    friend bool operator!=(handle l, handle r) { return !(l == r); }
    // or only a defaulted operator== (since C++20)
};
```

### Standard library

The following types satisfy NullablePointer:

- `std::exception_ptr`.

The following types must satisfy NullablePointer in order to communicate with standard library components:

- The member types `X::pointer`, `X::const_pointer`, `X::void_pointer` and `X::const_void_pointer` of every Allocator type `X`.
- The member type `pointer` of `std::unique_ptr`.

The adapted pointer type of `std::inout_ptr_t` and `std::out_ptr_t`. (since C++23)

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2114 (P2167R3) | C++11 | contextual convertibility to `bool` was too weak to reflect the expectation of implementations | requirements strengthened |
