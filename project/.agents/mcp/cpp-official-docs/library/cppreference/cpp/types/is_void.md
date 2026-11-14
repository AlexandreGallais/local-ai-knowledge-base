# std::is_void

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class T > struct is_void;` | (since C++11) |

`std::is_void` is a UnaryTypeTrait.

Checks whether `T` is a void type. Provides the member constant `value` that is equal to `true`, if `T` is the type `void`, `const void`, `volatile void`, or `const volatile void`. Otherwise, `value` is equal to `false`.

If the program adds specializations for `std::is_void` or `std::is_void_v`, the behavior is undefined.

### Template parameters

T - a type to check

### Helper variable template

`template< class T > constexpr bool is_void_v = is_void<T>::value;` (since C++17)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is the type `void` (possibly cv-qualified), `false` otherwise (public static member constant)

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

### Possible implementation

`template<class T> struct is_void : std::is_same<void, typename std::remove_cv<T>::type> {};`

### Example

```cpp
#include <type_traits>

void foo();

static_assert
(
    std::is_void_v<void> == true and
    std::is_void_v<const void> == true and
    std::is_void_v<volatile void> == true and
    std::is_void_v<void*> == false and
    std::is_void_v<int> == false and
    std::is_void_v<decltype(foo)> == false and
    std::is_void_v<std::is_void<void>> == false
);

int main() {}
```

### See also

|  |  |
| --- | --- |
| is_array (C++11) | checks if a type is an array type (class template) |
| is_pointer (C++11) | checks if a type is a pointer type (class template) |
| is_enum (C++11) | checks if a type is an enumeration type (class template) |
| is_union (C++11) | checks if a type is a union type (class template) |
| is_class (C++11) | checks if a type is a non-union class type (class template) |
| is_function (C++11) | checks if a type is a function type (class template) |
| is_object (C++11) | checks if a type is an object type (class template) |
