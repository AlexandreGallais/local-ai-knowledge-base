# Member access operators

Member access operators allow access to the members of their operands.

| Operator | Operator name | Example | Description |
| --- | --- | --- | --- |
| `[]` | array subscript | `a[b]` | access the **b**th element of array **a** |
| `*` | pointer dereference | `*a` | dereference the pointer **a** to access the object or function it refers to |
| `&` | address of | `&a` | create a pointer that refers to the object or function **a** |
| `.` | member access | `a.b` | access member **b** of struct or union **a** |
| `->` | member access through pointer | `a->b` | access member **b** of struct or union pointed to by **a** |

### Subscript

The array subscript expression has the form

|  |  |
| --- | --- |
| pointer-expression `[` integer-expression `]` | (1) |
| integer-expression `[` pointer-expression `]` | (2) |

where

|  |  |  |
| --- | --- | --- |
| pointer-expression | - | an expression of type pointer to complete object |
| integer-expression | - | an expression of integer type |

The subscript operator expression is an lvalue expression whose type is the type of the object pointed to by pointer-expression.

By definition, the subscript operator `E1[E2]` is exactly identical to `*((E1)+(E2))`. If pointer-expression is an array expression, it undergoes lvalue-to-rvalue conversion and becomes a pointer to the first element of the array.

Due to the definition of the addition between a pointer and an integer, the result is the element of the array with the index equal to the result of integer-expression (or, if pointer-expression was pointing at ith element of some array, the index of the result is i plus the result of integer-expression)

Note: see array for the details on multidimensional arrays.

```c
#include <stdio.h>
int main(void)
{
    int a[3] = {1,2,3};
    printf("%d %d\n", a[2],  // n == 3
                      2[a]); // same, n == 3
    a[2] = 7; // subscripts are lvalues

    int n[2][3] = {{1,2,3},{4,5,6}};
    int (*p)[3] = &n[1]; // elements of n are arrays
    printf("%d %d %d\n", (*p)[0], p[0][1], p[0][2]); // access n[1][] via p
    int x = n[1][2]; // applying [] again to the array n[1]
    printf("%d\n", x);

    printf("%c %c\n", "abc"[2], 2["abc"]); // string literals are arrays too
}
```

Output:

```text
3 3
4 5 6
6
c c
```

### Dereference

The *dereference* or *indirection* expression has the form

`*` pointer-expression

where

pointer-expression - an expression of any pointer type

If pointer-expression is a pointer to function, the result of the dereference operator is a function designator for that function.

If pointer-expression is a pointer to object, the result is an lvalue expression that designates the pointed-to object.

Dereferencing a null pointer, a pointer to an object outside of its lifetime (a dangling pointer), a misaligned pointer, or a pointer with indeterminate value is undefined behavior, except when the dereference operator is nullified by applying the address-of operator to its result, as in `&*E`.

```c
#include <stdio.h>
int main(void)
{
    int n = 1;
    int* p = &n;
    printf("*p = %d\n", *p); // the value of *p is what's stored in n
    *p = 7; // *p is lvalue
    printf("*p = %d\n", *p);
}
```

Output:

```text
*p = 1
*p = 7
```

### Address of

The address-of expression has the form

|  |  |
| --- | --- |
| `&` function | (1) |
| `&` lvalue-expression | (2) |
| `&` `*` expression | (3) |
| `&` expression `[` expression `]` | (4) |

1) address of a function

2) address of an object

3) special case: `&` and `*` cancel each other, neither one is evaluated

4) special case: `&` and the `*` that is implied in `[]` cancel each other, only the addition implied in `[]` is evaluated.

where

lvalue-expression - an lvalue expression of any type that is not a bit-field and does not have register storage class

The address-of operator produces the non-lvalue address of its operand, suitable for initializing a pointer to the type of the operand. If the operand is a function designator (1), the result is a pointer to function. If the operand is an object (2), the result is a pointer to object.

If the operand is the dereference operator, no action is taken (so it's okay to apply &* to a null pointer), except that the result is not an lvalue.

If the operand is an array index expression, no action is taken other than the array-to-pointer conversion and the addition, so &a[N] is valid for an array of size N (obtaining a pointer one past the end is okay, dereferencing it is not, but dereference cancels out in this expression).

```c
int f(char c) { return c;}
int main(void)
{
   int n = 1;
   int *p = &n; // address of object n
   int (*fp)(char) = &f; // address of function f
   int a[3] = {1,2,3};
   int *beg=a, *end=&a[3]; // same as end = a+3
}
```

### Member access

The member access expression has the form

expression `.` member-name

where

|  |  |  |
| --- | --- | --- |
| expression | - | an expression of struct or union type |
| member-name | - | an identifier that names a member of the struct or union designated by expression |

The member access expression designates the named member of the struct or union designated by its left operand. It has the same value category as its left operand.

If the left operand is const or volatile qualified, the result is also qualified. If the left operand is atomic, the behavior is undefined.

Note: besides identifiers that name objects of struct or union type, the following expressions may have struct or union types: assignment, function call, comma operator, conditional operator, and compound literal.

```c
#include <stdio.h>
struct s {int x;};
struct s f(void) { return (struct s){1}; }
int main(void)
{
    struct s s;
    s.x = 1; // ok, changes the member of s
    int n = f().x; // f() is an expression of type struct s
//  f().x = 1; // Error: this member access expression is not an lvalue

    const struct s sc;
//  sc.x = 3;  // Error: sc.x is const, can't be assigned

    union { int x; double d; } u = {1};
    u.d = 0.1; // changes the active member of the union
}
```

### Member access through pointer

The member access expression has the form

expression `->` member-name

where

|  |  |  |
| --- | --- | --- |
| expression | - | an expression of type pointer to struct or union |
| member-name | - | an identifier that names a member of the struct or union pointed by expression |

The member access through pointer expression designates the named member of the struct or union type pointed to by its left operand. Its value category is always lvalue

If the type pointed to by the left operand is const or volatile qualified, the result is also qualified. If the type pointed to by the left operand is atomic, the behavior is undefined.

```c
#include <stdio.h>
struct s {int x;};
int main(void)
{
    struct s s={1}, *p = &s;
    p->x = 7; // changes the value of s.x through the pointer
    printf("%d\n", p->x); // prints 7
}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| DR 076 | C89 | unnessary indirection could not be cancelled by `&` | made cancellable |

### References

- C17 standard (ISO/IEC 9899:2018):

- 6.5.2.1 Array subscripting (p: 57-58)

- 6.5.2.3 Structure and union members (p: 58-59)

- 6.5.3.2 Address and indirection operators (p: 59-61)

- C11 standard (ISO/IEC 9899:2011):

- 6.5.2.1 Array subscripting (p: 80)

- 6.5.2.3 Structure and union members (p: 82-84)

- 6.5.3.2 Address and indirection operators (p: 88-89)

- C99 standard (ISO/IEC 9899:1999):

- 6.5.2.1 Array subscripting (p: 70)

- 6.5.2.3 Structure and union members (p: 72-74)

- 6.5.3.2 Address and indirection operators (p: 78-79)

- C89/C90 standard (ISO/IEC 9899:1990):

- 3.3.2.1 Array subscripting

- 3.3.2.3 Structure and union members

- 3.3.3.2 Address and indirection operators

### See also

- Operator precedence

| Common operators |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| assignment | increment decrement | arithmetic | logical | comparison | **member access** | other |
| `a = b a += b a -= b a *= b a /= b a %= b a &= b a \|= b a ^= b a <<= b a >>= b` | `++a --a a++ a--` | `+a -a a + b a - b a * b a / b a % b ~a a & b a \| b a ^ b a << b a >> b` | `!a a && b a \|\| b` | `a == b a != b a < b a > b a <= b a >= b` | `a[b] *a &a a->b a.b` | `a(...) a, b (type) a a ? b : c sizeof` `_Alignof` (since C11) (until C23) `alignof` (since C23) |

C++ documentation for Member access operators
