# Diagnostic directives

Shows the given error message and renders the program ill-formed, or shows the given warning message without affecting the validity of the program(since C++23).

### Syntax

|  |  |  |
| --- | --- | --- |
| `#error` diagnostic-message | (1) |  |
| `#warning` diagnostic-message | (2) | (since C++23) |

### Explanation

1) After encountering the `#error` directive, an implementation displays the message diagnostic-message and renders the program ill-formed (the compilation stops).

2) Same as (1), except the validity of the program is not affected and the compilation continues.

diagnostic-message can consist of several words not necessarily in quotes.

### Notes

Before its standardization in C++23, `#warning` has been provided by many compilers in all modes as a conforming extension.

### Example

```cpp
#if __STDC_HOSTED__ != 1
#   error "Not a hosted implementation"
#endif

#if __cplusplus >= 202302L
#   warning "Using #warning as a standard feature"
#endif

#include <iostream>

int main()
{
    std::cout << "The implementation used is hosted\n";
}
```

Possible output:

```text
The implementation used is hosted
```

### References

- C++23 standard (ISO/IEC 14882:2024):

- 15.8 Error directive [cpp.error]

- C++20 standard (ISO/IEC 14882:2020):

- 15.8 Error directive [cpp.error]

- C++17 standard (ISO/IEC 14882:2017):

- 19.5 Error directive [cpp.error]

- C++14 standard (ISO/IEC 14882:2014):

- 16.5 Error directive [cpp.error]

- C++11 standard (ISO/IEC 14882:2011):

- 16.5 Error directive [cpp.error]

- C++03 standard (ISO/IEC 14882:2003):

- 16.5 Error directive [cpp.error]

- C++98 standard (ISO/IEC 14882:1998):

- 16.5 Error directive [cpp.error]

### See also

C documentation for Diagnostic directives
