# std::is_union

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class T > struct is_union;` | (since C++11) |

`std::is_union` is a UnaryTypeTrait.

Checks whether `T` is a union type. Provides the member constant `value`, which is equal to `true` if `T` is a union type. Otherwise, `value` is equal to `false`.

If the program adds specializations for `std::is_union` or `std::is_union_v`, the behavior is undefined.

### Template parameters

T - a type to check

### Helper variable template

`template< class T > constexpr bool is_union_v = is_union<T>::value;` (since C++17)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is a union type, `false` otherwise (public static member constant)

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

### Example

```cpp
#include <type_traits>

struct A {};
static_assert(!std::is_union_v<A>);

typedef union
{
    int a;
    float b;
} B;
static_assert(std::is_union_v<B>);

struct C { B d; };
static_assert(!std::is_union_v<C>);

static_assert(!std::is_union_v<int>);

int main() {}
```

### See also

is_class (C++11) checks if a type is a non-union class type (class template)
