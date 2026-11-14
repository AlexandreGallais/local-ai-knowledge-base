# std::is_lvalue_reference

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class T > struct is_lvalue_reference;` | (since C++11) |

`std::is_lvalue_reference` is a UnaryTypeTrait.

Checks whether `T` is an lvalue reference type. Provides the member constant `value` which is equal to `true`, if `T` is an lvalue reference type. Otherwise, `value` is equal to `false`.

If the program adds specializations for `std::is_lvalue_reference` or `std::is_lvalue_reference_v`, the behavior is undefined.

### Template parameters

T - a type to check

### Helper variable template

`template< class T > constexpr bool is_lvalue_reference_v = is_lvalue_reference<T>::value;` (since C++17)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is an lvalue reference type, `false` otherwise (public static member constant)

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

`template<class T> struct is_lvalue_reference : std::false_type {}; template<class T> struct is_lvalue_reference<T&> : std::true_type {};`

### Example

```cpp
#include <type_traits>

class A {};
static_assert(std::is_lvalue_reference_v<A> == false);
static_assert(std::is_lvalue_reference_v<A&> == true);
static_assert(std::is_lvalue_reference_v<A&&> == false);

static_assert(std::is_lvalue_reference_v<int> == false);
static_assert(std::is_lvalue_reference_v<int&> == true);
static_assert(std::is_lvalue_reference_v<int&&> == false);

int main() {}
```

### See also

|  |  |
| --- | --- |
| is_reference (C++11) | checks if a type is either an *lvalue reference* or *rvalue reference* (class template) |
| is_rvalue_reference (C++11) | checks if a type is an *rvalue reference* (class template) |
