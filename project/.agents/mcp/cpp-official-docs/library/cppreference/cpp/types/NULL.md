# NULL

Defined in header `<clocale>`

Defined in header `<cstddef>`

Defined in header `<cstdio>`

Defined in header `<cstdlib>`

Defined in header `<cstring>`

Defined in header `<ctime>`

Defined in header `<cwchar>`

`#define NULL /* implementation-defined */`

The macro `NULL` is an implementation-defined null pointer constant.

### Possible implementation

`#define NULL 0 // since C++11 #define NULL nullptr`

### Notes

In C, the macro `NULL` may have the type `void*`, but that is not allowed in C++ because null pointer constants cannot have that type.

### Example

```cpp
#include <cstddef>
#include <iostream>
#include <type_traits>
#include <typeinfo>

class S;

int main()
{
    int* p = NULL;
    int* p2 = static_cast<std::nullptr_t>(NULL);
    void(*f)(int) = NULL;
    int S::*mp = NULL;
    void(S::*mfp)(int) = NULL;
    auto nullvar = NULL; // may trigger a warning when compiling with gcc/clang

    std::cout << "The type of nullvar is " << typeid(nullvar).name() << '\n';

    if constexpr(std::is_same_v<decltype(NULL), std::nullptr_t>)
        std::cout << "NULL implemented with type std::nullptr_t\n";
    else
        std::cout << "NULL implemented using an integral type\n";

    [](...){}(p, p2, f, mp, mfp); // < suppresses "unused variable" warnings
}
```

Possible output:

```text
The type of nullvar is long
NULL implemented using an integral type
```

### See also

|  |  |
| --- | --- |
| `nullptr` (C++11) | the pointer literal which specifies a null pointer value |
| nullptr_t (C++11) | the type of the null pointer literal `nullptr` (typedef) |
| C documentation for NULL |  |
