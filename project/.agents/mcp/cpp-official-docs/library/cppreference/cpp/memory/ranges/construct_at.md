# std::ranges::construct_at

| Defined in header `<memory>` |  |
| --- | --- |
| Call signature |  |
| `template< class T, class... Args > constexpr T* construct_at( T* location, Args&&... args );` | (since C++20) |

Creates a `T` object initialized with the arguments in `args` at given address `location`.

Equivalent to `if constexpr (std::is_array_v<T>) return ::new (voidify (*location)) T[1](); else return ::new (voidify (*location)) T(std::forward<Args>(args)...);`, except that `construct_at` may be used in evaluation of constant expressions(until C++26).

When `construct_at` is called in the evaluation of some constant expression `expr`, `location` must point to either a storage obtained by `std::allocator<T>::allocate` or an object whose lifetime began within the evaluation of `expr`.

This overload participates in overload resolution only if all following conditions are satisfied:

- `std::is_unbounded_array_v<T>` is `false`.
- `::new(std::declval<void*>()) T(std::declval<Args>()...)` is well-formed when treated as an unevaluated operand.

If `std::is_array_v<T>` is `true` and `sizeof...(Args)` is nonzero, the program is ill-formed.

The function-like entities described on this page are *algorithm function objects* (informally known as *niebloids*), that is:

- Explicit template argument lists cannot be specified when calling any of them.
- None of them are visible to argument-dependent lookup.
- When any of them are found by normal unqualified lookup as the name to the left of the function-call operator, argument-dependent lookup is inhibited.

### Parameters

|  |  |  |
| --- | --- | --- |
| location | - | pointer to the uninitialized storage on which a `T` object will be constructed |
| args... | - | arguments used for initialization |

### Return value

`location`

### Notes

`std::ranges::construct_at` behaves exactly same as `std::construct_at`, except that it is invisible to argument-dependent lookup.

### Example

```cpp
#include <iostream>
#include <memory>

struct S
{
    int x;
    float y;
    double z;

    S(int x, float y, double z) : x{x}, y{y}, z{z} { std::cout << "S::S();\n"; }

    ~S() { std::cout << "S::~S();\n"; }

    void print() const
    {
        std::cout << "S { x=" << x << "; y=" << y << "; z=" << z << "; };\n";
    }
};

int main()
{
    alignas(S) unsigned char buf[sizeof(S)];

    S* ptr = std::ranges::construct_at(reinterpret_cast<S*>(buf), 42, 2.71828f, 3.1415);
    ptr->print();

    std::ranges::destroy_at(ptr);
}
```

Output:

```text
S::S();
S { x=42; y=2.71828; z=3.1415; };
S::~S();
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3436 | C++20 | `construct_at` could not create objects of array types | can value-initialize bounded arrays |
| LWG 3870 | C++20 | `construct_at` could create objects of cv-qualified types | only cv-unqualified types are permitted |

### See also

|  |  |
| --- | --- |
| ranges::destroy_at (C++20) | destroys an object at a given address (algorithm function object) |
| construct_at (C++20) | creates an object at a given address (function template) |
