# `nullptr`, the pointer literal (since C++11)

### Syntax

`nullptr`

### Explanation

The keyword `nullptr` denotes the pointer literal. It is a prvalue of type `std::nullptr_t`. There exist implicit conversions from `nullptr` to null pointer value of any pointer type and any pointer to member type. Similar conversions exist for any null pointer constant, which includes values of type `std::nullptr_t` as well as the macro `NULL`.

### Keywords

`nullptr`

### Example

Demonstrates that `nullptr` retains the meaning of null pointer constant even if it is no longer a literal.

```cpp
#include <cstddef>
#include <iostream>

template<class T>
constexpr T clone(const T& t)
{
    return t;
}

void g(int*)
{
    std::cout << "Function g called\n";
}

int main()
{
    g(nullptr);        // Fine
    g(NULL);           // Fine
    g(0);              // Fine

    g(clone(nullptr)); // Fine
//  g(clone(NULL));    // ERROR: non-literal zero cannot be a null pointer constant
//  g(clone(0));       // ERROR: non-literal zero cannot be a null pointer constant
}
```

Output:

```text
Function g called
Function g called
Function g called
Function g called
```

### References

- C++23 standard (ISO/IEC 14882:2024):

- 7.3.12 Pointer conversions [conv.ptr]

- C++20 standard (ISO/IEC 14882:2020):

- 7.3.12 Pointer conversions [conv.ptr]

- C++17 standard (ISO/IEC 14882:2017):

- 7.11 Pointer conversions [conv.ptr]

- C++14 standard (ISO/IEC 14882:2014):

- 4.10 Pointer conversions [conv.ptr]

- C++11 standard (ISO/IEC 14882:2011):

- 4.10 Pointer conversions [conv.ptr]

### See also

|  |  |
| --- | --- |
| NULL | implementation-defined null pointer constant (macro constant) |
| nullptr_t (C++11) | the type of the null pointer literal **`nullptr`** (typedef) |
| C documentation for nullptr |  |
