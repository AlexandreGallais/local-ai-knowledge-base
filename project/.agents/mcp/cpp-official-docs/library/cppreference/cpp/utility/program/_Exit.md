# std::_Exit

| Defined in header `<cstdlib>` |  |
| --- | --- |
| `[[noreturn]] void _Exit( int exit_code ) noexcept;` | (since C++11) |

Causes normal program termination to occur without completely cleaning the resources.

Destructors of variables with automatic, thread local and static storage durations are not called. Functions passed to `std::at_quick_exit()` or `std::atexit()` are not called. Whether open resources such as files are closed is implementation defined.

If `exit_code` is `0` or `EXIT_SUCCESS`, an implementation-defined status indicating successful termination is returned to the host environment. If `exit_code` is `EXIT_FAILURE`, an implementation-defined status, indicating *unsuccessful* termination, is returned. In other cases implementation-defined status value is returned.

A freestanding implementation is required to provide `std::_Exit`. (since C++23)

### Parameters

exit_code - exit status of the program

### Return value

(none)

### Notes

Although `_Exit` is required to be freestanding since C++23, it is not required to be available in a freestanding C implementation.

### Example

```cpp
#include <iostream>

class Static
{
public:
    ~Static()
    {
        std::cout << "Static dtor\n";
    }
};

class Local
{
public:
    ~Local()
    {
        std::cout << "Local dtor\n";
    }
};

Static static_variable; // dtor of this object will *not* be called

void atexit_handler()
{
    std::cout << "atexit handler\n";
}

int main()
{
    Local local_variable; // dtor of this object will *not* be called

    // handler will *not* be called
    const int result = std::atexit(atexit_handler);

    if (result != 0)
    {
        std::cerr << "atexit registration failed\n";
        return EXIT_FAILURE;
    }

    std::cout << "test" << std::endl; // flush from std::endl
        // needs to be here, otherwise nothing will be printed
    std::_Exit(EXIT_FAILURE);
}
```

Output:

```text
test
```

### See also

|  |  |
| --- | --- |
| abort | causes abnormal program termination (without cleaning up) (function) |
| exit | causes normal program termination with cleaning up (function) |
| C documentation for _Exit |  |
