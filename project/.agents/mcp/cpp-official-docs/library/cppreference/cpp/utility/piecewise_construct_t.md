# std::piecewise_construct, std::piecewise_construct_t

| Defined in header `<utility>` |  |  |
| --- | --- | --- |
| `struct piecewise_construct_t { explicit piecewise_construct_t() = default; };` | (1) | (since C++11) |
| `constexpr std::piecewise_construct_t piecewise_construct{};` | (2) | (since C++11) (inline since C++17) |

1) `std::piecewise_construct_t` is an empty class tag type used to disambiguate between different functions that take two tuple arguments.

2) The constant `std::piecewise_construct` is an instance of (1).

The overloads that do not use `std::piecewise_construct_t` assume that each tuple argument becomes the element of a pair. The overloads that use `std::piecewise_construct_t` assume that each tuple argument is used to construct, piecewise, a new object of specified type, which will become the element of the pair.

### Standard library

The following standard library types and functions use it as a disambiguation tag:

|  |  |
| --- | --- |
| pair | implements binary tuple, i.e. a pair of values (class template) |
| uses_allocator_construction_args (C++20) | prepares the argument list matching the flavor of uses-allocator construction required by the given type (function template) |
| ranges::repeat_view, views::repeat (C++23) | a `view` consisting of a generated sequence by repeatedly producing the same value (class template) (customization point object) |

### Example

```cpp
#include <iostream>
#include <tuple>
#include <utility>

struct Foo
{
    Foo(std::tuple<int, float>)
    {
        std::cout << "Constructed a Foo from a tuple\n";
    }

    Foo(int, float)
    {
        std::cout << "Constructed a Foo from an int and a float\n";
    }
};

int main()
{
    std::tuple<int, float> t(1, 3.14);

    std::cout << "Creating p1...\n";
    std::pair<Foo, Foo> p1(t, t);

    std::cout << "Creating p2...\n";
    std::pair<Foo, Foo> p2(std::piecewise_construct, t, t);
}
```

Output:

```text
Creating p1...
Constructed a Foo from a tuple
Constructed a Foo from a tuple
Creating p2...
Constructed a Foo from an int and a float
Constructed a Foo from an int and a float
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2510 | C++11 | the default constructor was non-explicit, which could lead to ambiguity | made explicit |

### See also

(constructor) constructs new pair (public member function of `std::pair<T1,T2>`)
