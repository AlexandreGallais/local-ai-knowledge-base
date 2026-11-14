# std::experimental::source_location

| Defined in header `<experimental/source_location>` |  |
| --- | --- |
| `struct source_location;` | (library fundamentals TS v2) |

The `source_location` class represents certain information about the source code, such as file names, line numbers, and function names. Previously, functions that desire to obtain this information about the call site (for logging, testing, or debugging purposes) must use macros so that predefined macros like `__LINE__` and `__FILE__` are expanded in the context of the caller. The `source_location` class provides a better alternative.

### Member functions

|  |  |
| --- | --- |
| Creation |  |
| (constructor) | constructs a new `source_location` with implementation-defined values (public member function) |
| current [static] | constructs a new `source_location` (public static member function) |
| Other special member functions |  |
| (destructor) (implicitly declared) | destructs a `source_location` (public member function) |
| operator= (implicitly declared) | implicitly declared copy/move assignment operators (public member function) |
| Field access |  |
| line | return the line number represented by this object (public member function) |
| column | return the column number represented by this object (public member function) |
| file_name | return the file name represented by this object (public member function) |
| function_name | return the name of the function represented by this object, if any (public member function) |

### Example

```cpp
#include <experimental/source_location>
#include <iostream>
#include <string_view>

void log(const std::string_view message,
         const std::experimental::source_location location =
               std::experimental::source_location::current())
{
    std::cout << "info:"
              << location.file_name() << ':'
              << location.line() << ' '
              << message << '\n';
}

int main()
{
    log("Hello world!");
}
```

Possible output:

```text
info:main.cpp:15 Hello world!
```
