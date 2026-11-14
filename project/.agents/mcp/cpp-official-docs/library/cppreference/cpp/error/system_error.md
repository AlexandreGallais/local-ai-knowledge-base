# std::system_error

| Defined in header `<system_error>` |  |
| --- | --- |
| `class system_error;` | (since C++11) |

`std::system_error` is the type of the exception thrown by various library functions (typically the functions that interface with the OS facilities, e.g. the constructor of `std::thread`) when the exception has an associated `std::error_code`, which may be reported.

std-system error-inheritance.svg

Inheritance diagram

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs the `system_error` object (public member function) |
| operator= | replaces the `system_error` object (public member function) |
| code | returns error code (public member function) |
| what [virtual] | returns an explanatory string (virtual public member function) |

## Inherited from std::exception

### Member functions

|  |  |
| --- | --- |
| (destructor) [virtual] | destroys the exception object (virtual public member function of `std::exception`) |
| what [virtual] | returns an explanatory string (virtual public member function of `std::exception`) |

### Example

```cpp
#include <iostream>
#include <system_error>
#include <thread>

int main()
{
    try
    {
        std::thread().detach(); // attempt to detach a non-thread
    }
    catch(const std::system_error& e)
    {
        std::cout << "Caught system_error with code "
                     "[" << e.code() << "] meaning "
                     "[" << e.what() << "]\n";
    }
}
```

Possible output:

```text
Caught system_error with code [generic:22] meaning [Invalid argument]
```
