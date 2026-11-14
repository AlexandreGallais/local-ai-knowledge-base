# typeof operators (since C23)

Determines the type of an object.

### Syntax

|  |  |
| --- | --- |
| `typeof(` type `)` | (1) |
| `typeof(` expression `)` | (2) |
| `typeof_unqual(` type `)` | (3) |
| `typeof_unqual(` expression `)` | (4) |

### Explanation

1) produces the type-name with any nested typeof-specifier evaluated

2) yields the type-name representing the type of its operand. No implicit conversions are applied to expression.

3,4) the same as (1) and (2) respectively but remove qualifiers

### Notes

`typeof` and `typeof_unqual` are collectively called the *typeof operators*. The `typeof` operators cannot be applied to bit-field members. If the type of the operand is a variably modified type, the operand is evaluated; otherwise, the operand is not evaluated. The result of the `typeof_unqual` operator is the non-atomic unqualified type that would result from the `typeof` operator. The `typeof` operator preserves all qualifiers.

### Example

This section is incomplete Reason: no example

### References

- C23 standard (ISO/IEC 9899:2024):

- 6.7.2.5 The typeof specifiers (p: 115-118)

### See also

C++ documentation for decltype
