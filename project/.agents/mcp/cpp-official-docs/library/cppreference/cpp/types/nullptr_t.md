# std::nullptr_t

| Defined in header `<cstddef>` |  |
| --- | --- |
| `using nullptr_t = decltype(nullptr);` | (since C++11) |

`std::nullptr_t` is the type of the null pointer literal `nullptr`. It is a distinct type that is not itself a pointer type or a pointer to member type. Prvalues of this type are null pointer constants, and may be implicitly converted to any pointer and pointer to member type.

`sizeof(std::nullptr_t)` is equal to `sizeof(void *)`.

### Notes

The C++ standard requires `<stddef.h>` to place the contents of `<cstddef>` in the global namespace, and thereby requires `nullptr_t` to be available in the global namespace when `<stddef.h>` is included.

`nullptr_t` is not a part of C until C23.

It is unspecified whether the declaration of `std::nullptr_t` is available in any other standard library header. An implementation may avoid introducing this name even when the standard requires `std::nullptr_t` to be used, by e.g. spelling `decltype(nullptr)` instead.

### Example

If two or more overloads accept different pointer types, an overload for `std::nullptr_t` is necessary to accept a null pointer argument.

```cpp
#include <cstddef>
#include <iostream>

void f(int*)
{
    std::cout << "Pointer to integer overload\n";
}

void f(double*)
{
    std::cout << "Pointer to double overload\n";
}

void f(std::nullptr_t)
{
    std::cout << "null pointer overload\n";
}

int main()
{
    int* pi{};
    double* pd{};

    f(pi);
    f(pd);
    f(nullptr); // would be ambiguous without void f(nullptr_t)
    // f(0);    // ambiguous call: all three functions are candidates
    // f(NULL); // ambiguous if NULL is an integral null pointer constant
                // (as is the case in most implementations)
}
```

Output:

```text
Pointer to integer overload
Pointer to double overload
null pointer overload
```

### See also

|  |  |
| --- | --- |
| `nullptr` (C++11) | the pointer literal which specifies a null pointer value |
| NULL | implementation-defined null pointer constant (macro constant) |
| is_null_pointer (C++11)(DR*) | checks if a type is `std::nullptr_t` (class template) |
| C documentation for nullptr_t |  |
