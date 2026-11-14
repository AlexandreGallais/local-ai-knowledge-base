# std::experimental::source_location::file_name

`constexpr const char* file_name() const noexcept;` (library fundamentals TS v2)

Returns the name of the current source file represented by this object, represented as a null-terminated byte string.

### Parameters

(none)

### Return value

The name of the current source file represented by this object, represented as a null-terminated byte string.

### Example

```cpp
#include <experimental/source_location>
#include <iostream>

inline void print_this_file_name(
    const std::experimental::source_location& location
        = std::experimental::source_location::current())
{
    // Name of file that contains the call-site of this function.
    std::cout << "File: " << location.file_name() << '\n';
}

int main()
{
    print_this_file_name();
}
```

Possible output:

```text
File: main.cpp
```

### See also

|  |  |
| --- | --- |
| line | return the line number represented by this object (public member function) |
| column | return the column number represented by this object (public member function) |
| function_name | return the name of the function represented by this object, if any (public member function) |
| C++ documentation for Filename and line information |  |
