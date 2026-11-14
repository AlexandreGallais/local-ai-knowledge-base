# std::to_string

| Defined in header `<stacktrace>` |  |
| --- | --- |
| `template< class Allocator > std::string to_string( const std::basic_stacktrace<Allocator>& st );` | (since C++23) |

Returns a string with a description of `st`.

The description of a `basic_stacktrace` typically contains description of its entries, although the number of lines is not required to be equal to `size()`.

### Parameters

st - a `basic_stacktrace` whose description is to be returned

### Return value

A string with a description of `st`.

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
    auto trace = std::stacktrace::current();
    std::cout << std::to_string(trace) << '\n';
}
```

Possible output:

```text
 0# 0x0000000000402D97 in ./prog.exe
 1# __libc_start_main in /lib/x86_64-linux-gnu/libc.so.6
 2# 0x0000000000402CA9 in ./prog.exe
```

### See also

to_string (C++23) returns a string with a description of the `stacktrace_entry` (function)
