# `alignof` operator (since C++11)

Queries alignment requirements of a type.

### Syntax

`alignof(` type-id `)`

Returns a value of type `std::size_t`.

### Explanation

Returns the alignment, in bytes, required for any instance of the type indicated by type-id, which is either complete object type, an array type whose element type is complete, or a reference type to one of those types.

If the type is reference type, the operator returns the alignment of referenced type; if the type is array type, alignment requirement of the element type is returned.

### Notes

See alignment for the meaning and properties of the value returned by `alignof`.

### Keywords

`alignof`

### Example

```cpp
#include <iostream>

struct Foo
{
    int   i;
    float f;
    char  c;
};

// Note: alignas(alignof(long double)) below can be
// simplified to alignas(long double) if desired.
struct alignas(alignof(long double)) Foo2
{
    // put your definition here
};

struct Empty {};

struct alignas(64) Empty64 {};

#define SHOW(expr) std::cout << #expr << " = " << (expr) << '\n'

int main()
{
    SHOW(alignof(char));
    SHOW(alignof(int*));
    SHOW(alignof(Foo));
    SHOW(alignof(Foo2));
    SHOW(alignof(Empty));
    SHOW(alignof(Empty64));
}
```

Possible output:

```text
alignof(char) = 1
alignof(int*) = 8
alignof(Foo) = 4
alignof(Foo2) = 16
alignof(Empty) = 1
alignof(Empty64) = 64
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| CWG 1305 | C++11 | type-id could not represent a reference to an array with an unknown bound but a complete element type | allowed |

### References

- C++23 standard (ISO/IEC 14882:2024):

- 7.6.2.6 Alignof [expr.alignof]

- C++20 standard (ISO/IEC 14882:2020):

- 7.6.2.5 Alignof [expr.alignof]

- C++17 standard (ISO/IEC 14882:2017):

- 8.3.6 Alignof [expr.alignof]

- C++14 standard (ISO/IEC 14882:2014):

- 5.3.6 Alignof [expr.alignof]

- C++11 standard (ISO/IEC 14882:2011):

- 5.3.6 Alignof [expr.alignof]

### See also

|  |  |
| --- | --- |
| Alignment requirement | restricts the addresses at which an object may be allocated |
| `alignas` (C++11) | specifies that the storage for the variable should be aligned by specific amount (specifier) |
| alignment_of (C++11) | obtains the type's alignment requirements (class template) |
| C documentation for `_Alignof`, `alignof` operator |  |
