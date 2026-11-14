# std::to_string

| Defined in header `<stacktrace>` |  |
| --- | --- |
| `std::string to_string( const std::stacktrace_entry& f );` | (since C++23) |

Returns a string with a description of `f`.

The standard recommends that the description should provide information about the contained evaluation, including information from `f.source_file()` and `f.source_line()`.

### Parameters

f - a `stacktrace_entry` whose description is to be returned

### Return value

A string with a description of `f`.

### Exceptions

May throw implementation-defined exceptions.

### Notes

Custom allocators support for this function is not provided, because the implementations usually require platform specific allocations, system calls and a lot of CPU intensive work, while a custom allocator does not provide benefits for this function as the platform specific operations take an order of magnitude more time than the allocation.

### Example

```cpp
#include <stacktrace>
#include <string>
#include <iostream>

int main()
{
    auto st = std::stacktrace::current();
    std::cout <<
        "Description of an empty stacktrace entry:\n" +
        std::to_string(std::stacktrace_entry{}) << '\n';
    if (st.size() > 0) {
        std::cout <<
            "Description of a non-empty stacktrace entry:\n" +
            std::to_string(st[0]) << '\n';
    }
}
```

Possible output:

```text
Description of an empty stacktrace entry:

Description of a non-empty stacktrace entry:
0x0000000000402DE9 in ./prog.exe
```

### See also

to_string (C++23) returns a string with a description of the `basic_stacktrace` (function template)
