# C++ attribute: carries_dependency (since C++11)

Indicates that dependency chain in release-consume `std::memory_order` propagates in and out of the function, which allows the compiler to skip unnecessary memory fence instructions.

### Syntax

`[[carries_dependency]]`

### Explanation

This attribute may appear in two situations:

1) it may apply to the parameter declarations of a function or lambda-expressions, in which case it indicates that initialization of the parameter carries dependency into lvalue-to-rvalue conversion of that object.

2) It may apply to the function declaration as a whole, in which case it indicates that the return value carries dependency to the evaluation of the function call expression.

This attribute must appear on the first declaration of a function or one of its parameters in any translation unit. If it is not used on the first declaration of a function or one of its parameters in another translation unit, the program is ill-formed; no diagnostic required.

### Example

Adapted almost without change from SO.

```cpp
#include <atomic>
#include <iostream>

void print(int* val)
{
    std::cout << *val << std::endl;
}

void print2(int* val [[carries_dependency]])
{
    std::cout << *val << std::endl;
}

int main()
{
    int x{42};
    std::atomic<int*> p = &x;
    int* local = p.load(std::memory_order_consume);

    if (local)
    {
        // The dependency is explicit, so the compiler knows that local is
        // dereferenced, and that it must ensure that the dependency chain
        // is preserved in order to avoid a fence (on some architectures).
        std::cout << *local << std::endl;
    }

    if (local)
    {
        // The definition of print is opaque (assuming it is not inlined),
        // so the compiler must issue a fence in order to ensure that
        // reading *p in print returns the correct value.
        print(local);
    }

    if (local)
    {
        // The compiler can assume that although print2 is also opaque then
        // the dependency from the parameter to the dereferenced value is
        // preserved in the instruction stream, and no fence is necessary (on
        // some architectures). Obviously, the definition of print2 must actually
        // preserve this dependency, so the attribute will also impact the
        // generated code for print2.
        print2(local);
    }
}
```

Possible output:

```text
42
42
42
```

### References

- C++23 standard (ISO/IEC 14882:2024):

- 9.12.4 Carries dependency attribute [dcl.attr.depend]

- C++20 standard (ISO/IEC 14882:2020):

- 9.12.3 Carries dependency attribute [dcl.attr.depend]

- C++17 standard (ISO/IEC 14882:2017):

- 10.6.3 Carries dependency attribute [dcl.attr.depend]

- C++14 standard (ISO/IEC 14882:2014):

- 7.6.4 Carries dependency attribute [dcl.attr.depend]

- C++11 standard (ISO/IEC 14882:2011):

- 7.6.4 Carries dependency attribute [dcl.attr.depend]

### See also

kill_dependency (C++11) removes the specified object from the `std::memory_order_consume` dependency tree (function template)
