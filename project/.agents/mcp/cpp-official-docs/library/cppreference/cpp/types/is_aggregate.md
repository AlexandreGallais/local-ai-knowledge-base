# std::is_aggregate

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class T > struct is_aggregate;` | (since C++17) |

`std::is_aggregate` is a UnaryTypeTrait.

If `T` is an aggregate type, provides the member constant `value` equal `true`. For any other type, `value` is `false`.

If `T` is an incomplete type other than an array type or (possibly cv-qualified) `void`, the behavior is undefined.

If the program adds specializations for `std::is_aggregate` or `std::is_aggregate_v`, the behavior is undefined.

### Template parameters

T - a type to check

### Helper variable template

`template< class T > constexpr bool is_aggregate_v = is_aggregate<T>::value;` (since C++17)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is an aggregate type, `false` otherwise (public static member constant)

### Member functions

|  |  |
| --- | --- |
| operator bool | converts the object to `bool`, returns `value` (public member function) |
| operator() (C++14) | returns `value` (public member function) |

### Member types

| Type | Definition |
| --- | --- |
| `value_type` | `bool` |
| `type` | `std::integral_constant<bool, value>` |

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_is_aggregate` | `201703L` | (C++17) | `std::is_agregate` |

### Example

```cpp
#include <algorithm>
#include <cassert>
#include <cstddef>
#include <new>
#include <string_view>
#include <type_traits>
#include <utility>

// Constructs a T at the uninitialized memory pointed to by p using
// list-initialization for aggregates and non-list initialization otherwise.
template<class T, class... Args>
T* construct(T* p, Args&&... args)
{
    if constexpr (std::is_aggregate_v<T>)
        return ::new (static_cast<void*>(p)) T{std::forward<Args>(args)...};
    else
        return ::new (static_cast<void*>(p)) T(std::forward<Args>(args)...);
}

struct A { int x, y; };
static_assert(std::is_aggregate_v<A>);

struct B
{
    int i;
    std::string_view str;

    B(int i, std::string_view str) : i(i), str(str) {}
};
static_assert(not std::is_aggregate_v<B>);

template <typename... Ts>
using aligned_storage_t = alignas(Ts...) std::byte[std::max({sizeof(Ts)...})];

int main()
{
    aligned_storage_t<A, B> storage;

    A& a = *construct(reinterpret_cast<A*>(&storage), 1, 2);
    assert(a.x == 1 and a.y == 2);

    B& b = *construct(reinterpret_cast<B*>(&storage), 3, "4");
    assert(b.i == 3 and b.str == "4");
}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3823 | C++17 | The behavior is undefined if `T` is an array type but `std::remove_all_extents_t<T>` is an incomplete type. | The behavior is defined regardless of the incompleteness of `std::remove_all_extents_t<T>` as long as `T` is an array type. |
