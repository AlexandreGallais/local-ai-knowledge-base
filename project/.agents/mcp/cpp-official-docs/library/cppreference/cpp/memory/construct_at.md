# std::construct_at

| Defined in header `<memory>` |  |
| --- | --- |
| `template< class T, class... Args > constexpr T* construct_at( T* location, Args&&... args );` | (since C++20) |

Creates a `T` object initialized with the arguments in `args` at given address `location`.

Equivalent to `if constexpr (std::is_array_v<T>) return ::new (voidify (*location)) T[1](); else return ::new (voidify (*location)) T(std::forward<Args>(args)...);`, except that `construct_at` may be used in evaluation of constant expressions(until C++26).

When `construct_at` is called in the evaluation of some constant expression `expr`, `location` must point to either a storage obtained by `std::allocator<T>::allocate` or an object whose lifetime began within the evaluation of `expr`.

This overload participates in overload resolution only if all following conditions are satisfied:

- `std::is_unbounded_array_v<T>` is `false`.
- `::new(std::declval<void*>()) T(std::declval<Args>()...)` is well-formed when treated as an unevaluated operand.

If `std::is_array_v<T>` is `true` and `sizeof...(Args)` is nonzero, the program is ill-formed.

### Parameters

|  |  |  |
| --- | --- | --- |
| location | - | pointer to the uninitialized storage on which a `T` object will be constructed |
| args... | - | arguments used for initialization |

### Return value

`location`

### Example

```cpp
#include <bit>
#include <memory>

class S
{
    int x_;
    float y_;
    double z_;
public:
    constexpr S(int x, float y, double z) : x_{x}, y_{y}, z_{z} {}
    [[nodiscard("no side-effects!")]]
    constexpr bool operator==(const S&) const noexcept = default;
};

consteval bool test()
{
    alignas(S) unsigned char storage[sizeof(S)]{};
    S uninitialized = std::bit_cast<S>(storage);
    std::destroy_at(&uninitialized);
    S* ptr = std::construct_at(std::addressof(uninitialized), 42, 2.71f, 3.14);
    const bool res{*ptr == S{42, 2.71f, 3.14}};
    std::destroy_at(ptr);
    return res;
}
static_assert(test());

int main() {}
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
| allocate | allocates uninitialized storage (public member function of `std::allocator<T>`) |
| construct [static] | constructs an object in the allocated storage (function template) |
| destroy_at (C++17) | destroys an object at a given address (function template) |
| ranges::construct_at (C++20) | creates an object at a given address (algorithm function object) |
