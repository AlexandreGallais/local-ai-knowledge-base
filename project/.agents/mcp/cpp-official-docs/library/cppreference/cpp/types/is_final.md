# std::is_final

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class T > struct is_final;` | (since C++14) |

`std::is_final` is a UnaryTypeTrait.

If `T` is a final class, provides the member constant `value` equal `true`. For any other type, `value` is `false`.

If `T` is an incomplete class type, the behavior is undefined.

If the program adds specializations for `std::is_final` or `std::is_final_v`(since C++17), the behavior is undefined.

### Template parameters

T - a type to check

### Helper variable template

`template< class T > constexpr bool is_final_v = is_final<T>::value;` (since C++17)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is a final class type, `false` otherwise (public static member constant)

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

`std::is_final` is introduced by the resolution of LWG issue 2112.

A union can be declared `final` (and `std::is_final` will detect that), even though unions cannot be used as bases in any case.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_is_final` | `201402L` | (C++14) | `std::is_final` |

### Example

```cpp
#include <type_traits>

class A {};
static_assert(std::is_final_v<A> == false);

class B final {};
static_assert(std::is_final_v<B> == true);

union U final
{
    int x;
    double d;
};
static_assert(std::is_final_v<U> == true);

int main()
{
}
```

### See also

|  |  |
| --- | --- |
| is_class (C++11) | checks if a type is a non-union class type (class template) |
| is_polymorphic (C++11) | checks if a type is a polymorphic class type (class template) |
