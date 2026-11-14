# EXIT_SUCCESS, EXIT_FAILURE

Defined in header `<cstdlib>`

`#define EXIT_SUCCESS /*implementation defined*/`

`#define EXIT_FAILURE /*implementation defined*/`

The `EXIT_SUCCESS` and `EXIT_FAILURE` macros expand into integral constant expressions that can be used as arguments to the `std::exit` function (and, therefore, as the values to return from the main function), and indicate program execution status.

A freestanding implementation is required to provide `EXIT_SUCCESS` and `EXIT_FAILURE`. (since C++23)

| Constant | Description |
| --- | --- |
| `EXIT_SUCCESS` | successful execution of a program |
| `EXIT_FAILURE` | unsuccessful execution of a program |

### Notes

Both `EXIT_SUCCESS` and the value zero indicate successful program execution status (see `std::exit`), although it is not required that `EXIT_SUCCESS` equals zero.

Although `EXIT_SUCCESS` and `EXIT_FAILURE` are required to be freestanding since C++23, they are not required to be available in a freestanding C implementation.

### Example

```cpp
#include <cstdlib>
#include <iostream>

int main(int argc, char* argv[])
{
    if (argc <= 1)
    {
        std::cout << "At least one command-line argument required\n";
        return EXIT_FAILURE;
    }

    std::cout << argv[1] << '\n';
    return EXIT_SUCCESS;
}
```

Possible output:

```text
The quick brown fox jumps over the lazy cat
```

### See also

C documentation for EXIT_SUCCESS, EXIT_FAILURE
