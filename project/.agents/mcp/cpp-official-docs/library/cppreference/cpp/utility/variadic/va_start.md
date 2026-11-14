# va_start

Defined in header `<cstdarg>`

`void va_start( std::va_list ap, parm_n );`

The `va_start` macro enables access to the variable arguments following the named argument `parm_n`.

`va_start` should be invoked with an instance to a valid `va_list` object `ap` before any calls to `va_arg`.

If the `parm_n` is a pack expansion or an entity resulting from a lambda capture, the program is ill-formed, no diagnostic required. (since C++11)

If `parm_n` is of reference type, or of a type not compatible with the type that results from default argument promotions, the behavior is undefined.

### Parameters

|  |  |  |
| --- | --- | --- |
| ap | - | an object of the `va_list` type |
| parm_n | - | the named parameter preceding the first variable parameter |

### Expanded value

(none)

### Notes

`va_start` is required to support `parm_n` with overloaded `operator&`.

### Example

```cpp
#include <cstdarg>
#include <iostream>

int add_nums(int count...)
{
    int result = 0;
    std::va_list args;
    va_start(args, count);
    for (int i = 0; i < count; ++i)
        result += va_arg(args, int);
    va_end(args);
    return result;
}

int main()
{
    std::cout << add_nums(4, 25, 25, 50, 50) << '\n';
}
```

Output:

```text
150
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| CWG 273 | C++98 | it was unclear whether `va_start` is required to support `parm_n`s with overloaded `operator&` | required |
| LWG 2099 | C++98 | the behavior was undefined if `parm_n` is declared with a function, array, or reference type | the behavior is undefined if `parm_n` is of reference type |

### See also

|  |  |
| --- | --- |
| va_arg | accesses the next variadic function argument (function macro) |
| va_end | ends traversal of the variadic function arguments (function macro) |
| C documentation for va_start |  |
