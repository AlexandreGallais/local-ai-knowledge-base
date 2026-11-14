# Assignment operators

Assignment operators modify the value of the object.

| Operator name | Syntax | Over​load​able | Prototype examples (for `class T`) |  |
| --- | --- | --- | --- | --- |
| Inside class definition | Outside class definition |  |  |  |
| simple assignment | `a = b` | Yes | `T& T::operator =(const T2& b);` | N/A |
| addition assignment | `a += b` | Yes | `T& T::operator +=(const T2& b);` | `T& operator +=(T& a, const T2& b);` |
| subtraction assignment | `a -= b` | Yes | `T& T::operator -=(const T2& b);` | `T& operator -=(T& a, const T2& b);` |
| multiplication assignment | `a *= b` | Yes | `T& T::operator *=(const T2& b);` | `T& operator *=(T& a, const T2& b);` |
| division assignment | `a /= b` | Yes | `T& T::operator /=(const T2& b);` | `T& operator /=(T& a, const T2& b);` |
| remainder assignment | `a %= b` | Yes | `T& T::operator %=(const T2& b);` | `T& operator %=(T& a, const T2& b);` |
| bitwise AND assignment | `a &= b` | Yes | `T& T::operator &=(const T2& b);` | `T& operator &=(T& a, const T2& b);` |
| bitwise OR assignment | `a \|= b` | Yes | `T& T::operator \|=(const T2& b);` | `T& operator \|=(T& a, const T2& b);` |
| bitwise XOR assignment | `a ^= b` | Yes | `T& T::operator ^=(const T2& b);` | `T& operator ^=(T& a, const T2& b);` |
| bitwise left shift assignment | `a <<= b` | Yes | `T& T::operator <<=(const T2& b);` | `T& operator <<=(T& a, const T2& b);` |
| bitwise right shift assignment | `a >>= b` | Yes | `T& T::operator >>=(const T2& b);` | `T& operator >>=(T& a, const T2& b);` |
| **Notes** All built-in assignment operators return `*this`, and most user-defined overloads also return `*this` so that the user-defined operators can be used in the same manner as the built-ins. However, in a user-defined operator overload, any type can be used as return type (including `void`). `T2` can be any type including `T`. |  |  |  |  |

### Definitions

*Copy assignment* replaces the contents of the object `a` with a copy of the contents of `b` (`b` is not modified). For class types, this is performed in a special member function, described in copy assignment operator.

*Move assignment* replaces the contents of the object `a` with the contents of `b`, avoiding copying if possible (`b` may be modified). For class types, this is performed in a special member function, described in move assignment operator. (since C++11)

For non-class types, copy and move assignment are indistinguishable and are referred to as *direct assignment*.

*Compound assignment* replace the contents of the object `a` with the result of a binary operation between the previous value of `a` and the value of `b`.

### Assignment operator syntax

The assignment expressions have the form

|  |  |
| --- | --- |
| target-expr `=` new-value | (1) |
| target-expr op new-value | (2) |

|  |  |  |
| --- | --- | --- |
| target-expr | - | the expression[1] to be assigned to |
| op | - | one of `*=`, `/=` `%=`, `+=` `-=`, `<<=`, `>>=`, `&=`, `^=`, `\|=` |
| new-value | - | the expression[2](until C++11)initializer clause(since C++11) to assign to the target |

1. ↑ target-expr must have higher precedence than an assignment expression.
2. ↑ new-value cannot be a comma expression, because its precedence is lower.

1) Simple assignment expression.

2) Compound assignment expression.

If new-value is not an expression, the assignment expression will never match an overloaded compound assignment operator. (since C++11)

### Built-in simple assignment operator

For the built-in simple assignment, target-expr must be a modifiable lvalue.

The object referred to by target-expr is modified by replacing its value with the result of new-value. If the object referred is of an integer type `T`, and the result of new-value is of the corresponding signed/unsigned integer type, the value of the object is replaced with the value of type `T` with the same value representation of the result of new-value.

The result of a built-in simple assignment is an lvalue of the type of target-expr, referring to target-expr. If target-expr is a bit-field, the result is also a bit-field.

#### Assignment from an expression

If new-value is an expression, it is implicitly converted to the cv-unqualified type of target-expr. When target-expr is a bit-field that cannot represent the value of the expression, the resulting value of the bit-field is implementation-defined.

If target-expr and new-value identify overlapping objects, the behavior is undefined (unless the overlap is exact and the type is the same).

If the type of target-expr is volatile-qualified, the assignment is deprecated, unless the (possibly parenthesized) assignment expression is a discarded-value expression or an unevaluated operand. (since C++20)

Assignment from a non-expression initializer clause new-value is only allowed not to be an expression in following situations: target-expr is of a scalar type `T`, and new-value is empty or has only one element. In this case, given an invented variable `t` declared and initialized as `T t = new-value`, the meaning of `x = new-value` is `x = t`. target-expr is of class type. In this case, new-value is passed as the argument to the assignment operator function selected by overload resolution. `#include <complex> std::complex<double> z; z = {1, 2}; // meaning z.operator=({1, 2}) z += {1, 2}; // meaning z.operator+=({1, 2}) int a, b; a = b = {1}; // meaning a = b = 1; a = {1} = b; // syntax error` (since C++11)

In overload resolution against user-defined operators, for every type `T`, the following function signatures participate in overload resolution:

`T*& operator=(T*&, T*);`

`T*volatile & operator=(T*volatile &, T*);`

For every enumeration or pointer to member type `T`, optionally volatile-qualified, the following function signature participates in overload resolution:

`T& operator=(T&, T);`

For every pair `A1` and `A2`, where `A1` is an arithmetic type (optionally volatile-qualified) and `A2` is a promoted arithmetic type, the following function signature participates in overload resolution:

`A1& operator=(A1&, A2);`

### Built-in compound assignment operator

The behavior of every built-in compound-assignment expression `target-expr op = new-value` is exactly the same as the behavior of the expression `target-expr = target-expr op new-value`, except that target-expr is evaluated only once.

The requirements on target-expr and new-value of built-in simple assignment operators also apply. Furthermore:

- For `+=` and `-=`, the type of target-expr must be an arithmetic type or a pointer to a (possibly cv-qualified) completely-defined object type.
- For all other compound assignment operators, the type of target-expr must be an arithmetic type.

In overload resolution against user-defined operators, for every pair `A1` and `A2`, where `A1` is an arithmetic type (optionally volatile-qualified) and `A2` is a promoted arithmetic type, the following function signatures participate in overload resolution:

`A1& operator*=(A1&, A2);`

`A1& operator/=(A1&, A2);`

`A1& operator+=(A1&, A2);`

`A1& operator-=(A1&, A2);`

For every pair `I1` and `I2`, where `I1` is an integral type (optionally volatile-qualified) and `I2` is a promoted integral type, the following function signatures participate in overload resolution:

`I1& operator%=(I1&, I2);`

`I1& operator<<=(I1&, I2);`

`I1& operator>>=(I1&, I2);`

`I1& operator&=(I1&, I2);`

`I1& operator^=(I1&, I2);`

`I1& operator\|=(I1&, I2);`

For every optionally cv-qualified object type `T`, the following function signatures participate in overload resolution:

`T*& operator+=(T*&, std::ptrdiff_t);`

`T*& operator-=(T*&, std::ptrdiff_t);`

`T*volatile & operator+=(T*volatile &, std::ptrdiff_t);`

`T*volatile & operator-=(T*volatile &, std::ptrdiff_t);`

### Example

```cpp
#include <iostream>

int main()
{
    int n = 0;        // not an assignment

    n = 1;            // direct assignment
    std::cout << n << ' ';

    n = {};           // zero-initialization, then assignment
    std::cout << n << ' ';

    n = 'a';          // integral promotion, then assignment
    std::cout << n << ' ';

    n = {'b'};        // explicit cast, then assignment
    std::cout << n << ' ';

    n = 1.0;          // floating-point conversion, then assignment
    std::cout << n << ' ';

//  n = {1.0};        // compiler error (narrowing conversion)

    int& r = n;       // not an assignment
    r = 2;            // assignment through reference
    std::cout << n << ' ';

    int* p;
    p = &n;           // direct assignment
    p = nullptr;      // null-pointer conversion, then assignment
    std::cout << p << ' ';

    struct { int a; std::string s; } obj;
    obj = {1, "abc"}; // assignment from a braced-init-list
    std::cout << obj.a << ':' << obj.s << '\n';
}
```

Possible output:

```text
1 0 97 98 1 2 (nil) 1:abc
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| CWG 1527 | C++11 | for assignments to class type objects, the right operand could be an initializer list only when the assignment is defined by a user-defined assignment operator | removed user-defined assignment constraint |
| CWG 1538 | C++11 | `E1 = {E2}` was equivalent to `E1 = T(E2)` (`T` is the type of `E1`), this introduced a C-style cast | it is equivalent to `E1 = T{E2}` |
| CWG 2654 | C++20 | compound assignment operators for volatile -qualified types were inconsistently deprecated | none of them is deprecated |
| CWG 2768 | C++11 | an assignment from a non-expression initializer clause to a scalar value would perform direct-list-initialization | performs copy-list- initialization instead |
| CWG 2901 | C++98 | the value assigned to an `unsigned int` object through an `int` lvalue is unclear | made clear |
| P2327R1 | C++20 | bitwise compound assignment operators for volatile types were deprecated while being useful for some platforms | they are not deprecated |

### See also

Operator precedence

Operator overloading

| Common operators |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| **assignment** | increment decrement | arithmetic | logical | comparison | member access | other |
| `a = b a += b a -= b a *= b a /= b a %= b a &= b a \|= b a ^= b a <<= b a >>= b` | `++a --a a++ a--` | `+a -a a + b a - b a * b a / b a % b ~a a & b a \| b a ^ b a << b a >> b` | `!a a && b a \|\| b` | `a == b a != b a < b a > b a <= b a >= b a <=> b` | `a[...] *a &a a->b a.b a->*b a.*b` | function call `a(...)` |
| comma `a, b` |  |  |  |  |  |  |
| conditional `a ? b : c` |  |  |  |  |  |  |
| Special operators |  |  |  |  |  |  |
| `static_cast` converts one type to another related type `dynamic_cast` converts within inheritance hierarchies `const_cast` adds or removes cv-qualifiers `reinterpret_cast` converts type to unrelated type C-style cast converts one type to another by a mix of `static_cast`, `const_cast`, and `reinterpret_cast` `new` creates objects with dynamic storage duration `delete` destructs objects previously created by the new expression and releases obtained memory area `sizeof` queries the size of a type `sizeof...` queries the size of a pack (since C++11) `typeid` queries the type information of a type `noexcept` checks if an expression can throw an exception (since C++11) `alignof` queries alignment requirements of a type (since C++11) |  |  |  |  |  |  |

C documentation for Assignment operators
