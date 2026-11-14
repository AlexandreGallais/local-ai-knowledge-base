# strncmp

Defined in header `<string.h>`

`int strncmp( const char* lhs, const char* rhs, size_t count );`

Compares at most `count` characters of two possibly null-terminated arrays. The comparison is done lexicographically. Characters following the null character are not compared.

The sign of the result is the sign of the difference between the values of the first pair of characters (both interpreted as `unsigned char`) that differ in the arrays being compared.

The behavior is undefined when access occurs past the end of either array `lhs` or `rhs`. The behavior is undefined when either `lhs` or `rhs` is the null pointer.

### Parameters

|  |  |  |
| --- | --- | --- |
| lhs, rhs | - | pointers to the possibly null-terminated arrays to compare |
| count | - | maximum number of characters to compare |

### Return value

Negative value if `lhs` appears before `rhs` in lexicographical order.

Zero if `lhs` and `rhs` compare equal, or if count is zero.

Positive value if `lhs` appears after `rhs` in lexicographical order.

### Notes

This function is not locale-sensitive, unlike `strcoll` and `strxfrm`.

### Example

```c
#include <stdio.h>
#include <string.h>

void demo(const char* lhs, const char* rhs, int sz)
{
    const int rc = strncmp(lhs, rhs, sz);
    if (rc < 0)
        printf("First %d chars of [%s] precede [%s]\n", sz, lhs, rhs);
    else if (rc > 0)
        printf("First %d chars of [%s] follow [%s]\n", sz, lhs, rhs);
    else
        printf("First %d chars of [%s] equal [%s]\n", sz, lhs, rhs);
}
int main(void)
{
    const char* string = "Hello World!";
    demo(string, "Hello!", 5);
    demo(string, "Hello", 10);
    demo(string, "Hello there", 10);
    demo("Hello, everybody!" + 12, "Hello, somebody!" + 11, 5);
}
```

Output:

```text
First 5 chars of [Hello World!] equal [Hello!]
First 10 chars of [Hello World!] follow [Hello]
First 10 chars of [Hello World!] precede [Hello there]
First 5 chars of [body!] equal [body!]
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.24.4.4 The strncmp function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.24.4.4 The strncmp function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.24.4.4 The strncmp function (p: 366)

- C99 standard (ISO/IEC 9899:1999):

- 7.21.4.4 The strncmp function (p: 329)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.11.4.4 The strncmp function

### See also

|  |  |
| --- | --- |
| strcmp | compares two strings (function) |
| wcsncmp (C95) | compares a certain amount of characters from two wide strings (function) |
| memcmp | compares two buffers (function) |
| strcoll | compares two strings in accordance to the current locale (function) |
| C++ documentation for strncmp |  |
