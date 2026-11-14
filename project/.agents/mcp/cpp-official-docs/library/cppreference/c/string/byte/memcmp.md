# memcmp

Defined in header `<string.h>`

`int memcmp( const void* lhs, const void* rhs, size_t count );`

Compares the first `count` bytes of the objects pointed to by `lhs` and `rhs`. The comparison is done lexicographically.

The sign of the result is the sign of the difference between the values of the first pair of bytes (both interpreted as `unsigned char`) that differ in the objects being compared.

The behavior is undefined if access occurs beyond the end of either object pointed to by `lhs` and `rhs`. The behavior is undefined if either `lhs` or `rhs` is a null pointer.

### Parameters

|  |  |  |
| --- | --- | --- |
| lhs, rhs | - | pointers to the objects to compare |
| count | - | number of bytes to examine |

### Return value

Negative value if `lhs` appears before `rhs` in lexicographical order.

Zero if `lhs` and `rhs` compare equal, or if count is zero.

Positive value if `lhs` appears after `rhs` in lexicographical order.

### Notes

This function reads object representations, not the object values, and is typically meaningful for byte arrays only: structs may have padding bytes whose values are indeterminate, the values of any bytes beyond the last stored member in a union are indeterminate, and a type may have two or more representations for the same value (different encodings for `+0` and `-0` or for `+0.0` and `–0.0`, indeterminate padding bits within the type).

### Example

```c
#include <stdio.h>
#include <string.h>

void demo(const char* lhs, const char* rhs, size_t sz)
{
    for(size_t n = 0; n < sz; ++n)
        putchar(lhs[n]);

    int rc = memcmp(lhs, rhs, sz);
    const char *rel = rc < 0 ? " precedes " : rc > 0 ? " follows " : " compares equal ";
    fputs(rel, stdout);

    for(size_t n = 0; n < sz; ++n)
        putchar(rhs[n]);
    puts(" in lexicographical order");
}

int main(void)
{
    char a1[] = {'a','b','c'};
    char a2[sizeof a1] = {'a','b','d'};

    demo(a1, a2, sizeof a1);
    demo(a2, a1, sizeof a1);
    demo(a1, a1, sizeof a1);
}
```

Output:

```text
abc precedes abd in lexicographical order
abd follows abc in lexicographical order
abc compares equal to abc in lexicographical order
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.24.4.1 The memcmp function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.24.4.1 The memcmp function (p: 266)

- C11 standard (ISO/IEC 9899:2011):

- 7.24.4.1 The memcmp function (p: 365)

- C99 standard (ISO/IEC 9899:1999):

- 7.21.4.1 The memcmp function (p: 328)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.11.4.1 The memcmp function

### See also

|  |  |
| --- | --- |
| strcmp | compares two strings (function) |
| strncmp | compares a certain amount of characters of two strings (function) |
| C++ documentation for memcmp |  |
