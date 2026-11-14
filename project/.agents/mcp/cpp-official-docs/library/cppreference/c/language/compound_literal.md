# Compound literals (since C99)

Constructs an unnamed object of specified type (which may be struct, union, or even array type) in-place.

### Syntax

|  |  |
| --- | --- |
| `(` storage-class-specifiers (optional)(since C23) type `)` `{` initializer-list `}` | (since C99) |
| `(` storage-class-specifiers (optional)(since C23) type `)` `{` initializer-list `,` `}` | (since C99) |
| `(` storage-class-specifiers (optional) type `)` `{` `}` | (since C23) |

where

|  |  |  |
| --- | --- | --- |
| storage-class-specifiers | - | (since C23) A list of storage class specifiers that can contain only `constexpr`, `static`, `register`, or `thread_local` |
| type | - | a type name specifying any complete object type or an array of unknown size, but not a VLA |
| initializer-list | - | list of initializers suitable for initialization of an object of type |

### Explanation

The compound literal expression constructs an unnamed object of the type specified by type and initializes it as specified by initializer-list. Designated initializers are accepted.

The type of the compound literal is type (except when type is an array of unknown size; its size is deduced from the initializer-list as in array initialization).

The value category of a compound literal is lvalue (its address can be taken).

|  |  |
| --- | --- |
| The unnamed object to which the compound literal evaluates has static storage duration if the compound literal occurs at file scope and automatic storage duration if the compound literal occurs at block scope (in which case the object's lifetime ends at the end of the enclosing block). | (until C23) |
| If the compound literal is evaluated outside the body of a function and outside of any parameter list, it is associated with file scope; otherwise, it is associated with the enclosing block. Depending on this association, the storage-class specifiers (possibly empty), type name, and initializer list, if any, shall be such that they are valid specifiers for an object definition in file scope or block scope, respectively, of the following form, storage-class-specifiers typeof(type) ID = { initializer-list }; where ID is an identifier that is unique for the whole program. A compound literal provides an unnamed object whose value, type, storage duration and other properties are as if given by the definition syntax above; if the storage duration is automatic, the lifetime of the instance of the unnamed object is the current execution of the enclosing block. If the storage-class specifiers contain other specifiers than `constexpr`, `static`, `register`, or `thread_local` the behavior is undefined. | (since C23) |

### Notes

Compound literals of const-qualified character or wide character array types may share storage with string literals.

```c
(const char []){"abc"} == "abc" // might be 1 or 0, unspecified
```

Each compound literal creates only a single object in its scope:

```c
int f (void)
{
    struct s {int i;} *p = 0, *q;
    int j = 0;
again:
    q = p, p = &((struct s){ j++ });
    if (j < 2) goto again; // note; if a loop were used, it would end scope here,
                           // which would terminate the lifetime of the compound literal
                           // leaving p as a dangling pointer
    return p == q && q->i == 1; // always returns 1
}
```

Because compound literals are unnamed, a compound literal cannot reference itself (a named struct can include a pointer to itself)

Although the syntax of a compound literal is similar to a cast, the important distinction is that a cast is a non-lvalue expression while a compound literal is an lvalue.

### Example

```c
#include <stdio.h>

int *p = (int[]){2, 4}; // creates an unnamed static array of type int[2]
                        // initializes the array to the values {2, 4}
                        // creates pointer p to point at the first element of
                        // the array
const float *pc = (const float []){1e0, 1e1, 1e2}; // read-only compound literal

struct point {double x,y;};

int main(void)
{
    int n = 2, *p = &n;
    p = (int [2]){*p}; // creates an unnamed automatic array of type int[2]
                       // initializes the first element to the value formerly
                       // held in *p
                       // initializes the second element to zero
                       // stores the address of the first element in p

    void drawline1(struct point from, struct point to);
    void drawline2(struct point *from, struct point *to);
    drawline1(
        (struct point){.x=1, .y=1},  // creates two structs with block scope and
        (struct point){.x=3, .y=4}); // calls drawline1, passing them by value
    drawline2(
        &(struct point){.x=1, .y=1},  // creates two structs with block scope and
        &(struct point){.x=3, .y=4}); // calls drawline2, passing their addresses
}

void drawline1(struct point from, struct point to)
{
    printf("drawline1: `from` @ %p {%.2f, %.2f}, `to` @ %p {%.2f, %.2f}\n",
        (void*)&from, from.x, from.y, (void*)&to, to.x, to.y);
}

void drawline2(struct point *from, struct point *to)
{
    printf("drawline2: `from` @ %p {%.2f, %.2f}, `to` @ %p {%.2f, %.2f}\n",
        (void*)from, from->x, from->y, (void*)to, to->x, to->y);
}
```

Possible output:

```text
drawline1: `from` @ 0x7ffd24facea0 {1.00, 1.00}, `to` @ 0x7ffd24face90 {3.00, 4.00}
drawline2: `from` @ 0x7ffd24facec0 {1.00, 1.00}, `to` @ 0x7ffd24faced0 {3.00, 4.00}
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 6.5.2.5 Compound literals (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 6.5.2.5 Compound literals (p: 61-63)

- C11 standard (ISO/IEC 9899:2011):

- 6.5.2.5 Compound literals (p: 85-87)

- C99 standard (ISO/IEC 9899:1999):

- 6.5.2.5 Compound literals (p: 75-77)
