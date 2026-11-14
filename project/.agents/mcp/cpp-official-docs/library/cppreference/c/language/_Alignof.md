# _Alignof (since C11)(deprecated in C23), alignof (since C23) operator

Queries the alignment requirement of its operand type.

### Syntax

|  |  |
| --- | --- |
| `_Alignof(` type-name `)` | (since C11)(deprecated in C23) |
| `alignof(` type-name `)` | (since C23) |

This operator is typically used through the convenience macro `alignof`, which is provided in the header `<stdalign.h>` (until C23)

### Explanation

Returns the alignment requirement of the type named by type-name. If type-name is an array type, the result is the alignment requirement of the array element type. The type-name cannot be function type or an incomplete type.

The result is an integer constant of type `size_t`.

The operand is not evaluated (so external identifiers used in the operand do not have to be defined).

If type-name is a VLA type, its size expression is not evaluated.

### Notes

The use of `_Alignof`(until C23)`alignof`(since C23) with expressions is allowed by some C compilers as a non-standard extension.

### Keywords

`alignof`, `_Alignof`

### Example

```c
#include <stdalign.h>
#include <stddef.h>
#include <stdio.h>

int main(void)
{
    printf("Alignment of char = %zu\n", alignof(char));
    printf("Alignment of max_align_t = %zu\n", alignof(max_align_t));
    printf("alignof(float[10]) = %zu\n", alignof(float[10]));
    printf("alignof(struct{char c; int n;}) = %zu\n",
            alignof(struct {char c; int n;}));
}
```

Possible output:

```text
Alignment of char = 1
Alignment of max_align_t = 16
alignof(float[10]) = 4
alignof(struct{char c; int n;}) = 4
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| DR 494 | C11 | whether the size expression in a VLA is evaluated in `_Alignof` was unspecified | it is unevaluated |

### References

- C23 standard (ISO/IEC 9899:2024):

- 6.5.3.4 The sizeof and alignof operators (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 6.5.3.4 The sizeof and _Alignof operators (p: 64-65)

- C11 standard (ISO/IEC 9899:2011):

- 6.5.3.4 The sizeof and _Alignof operators (p: 90-91)

### See also

|  |  |
| --- | --- |
| max_align_t (C11) | a type with alignment requirement as great as any other scalar type (typedef) |
| `_Alignas`(until C23)`alignas`(since C23) | sets alignment requirements of an object (specifier) |
| C++ documentation for `alignof` operator |  |
