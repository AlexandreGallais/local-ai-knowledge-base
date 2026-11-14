# std::is_implicit_lifetime

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class T > struct is_implicit_lifetime;` | (since C++23) |

`std::is_implicit_lifetime` is a UnaryTypeTrait.

If `T` is an implicit-lifetime type, provides the member constant `value` equal to `true`. For any other type, `value` is `false`.

The behavior is undefined if `T` is an incomplete type other than an array type or (possibly cv-qualified) `void`.

If the program adds specializations for `std::is_implicit_lifetime` or `std::is_implicit_lifetime_v`, the behavior is undefined.

### Template parameters

T - a type to check

### Helper variable template

`template< class T > constexpr bool is_implicit_lifetime_v = is_implicit_lifetime<T>::value;` (since C++23)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is an implicit-lifetime type, `false` otherwise (public static member constant)

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
| `__cpp_lib_is_implicit_lifetime` | `202302L` | (C++23) | `std::is_implicit_lifetime` |

### Example

```cpp
// The following types are collectively called implicit-lifetime types:
// * scalar types:
//     * arithmetic types
//     * enumeration types
//     * pointer types
//     * pointer-to-member types
//     * std::nullptr_t
// * implicit-lifetime class types
//     * is an aggregate whose destructor is not user-provided
//     * has at least one trivial eligible constructor and a trivial,
//       non-deleted destructor
// * array types
// * cv-qualified versions of these types.
#include <type_traits>

static_assert(std::is_implicit_lifetime_v<int>); // arithmetic type is a scalar type
static_assert(std::is_implicit_lifetime_v<const int>); // cv-qualified a scalar type

enum E { e };
static_assert(std::is_implicit_lifetime_v<E>); // enumeration type is a scalar type
static_assert(std::is_implicit_lifetime_v<int*>); // pointer type is a scalar type
static_assert(std::is_implicit_lifetime_v<std::nullptr_t>); // scalar type

struct S { int x, y; };
// S is an implicit-lifetime class: an aggregate without user-provided destructor
static_assert(std::is_implicit_lifetime_v<S>);

static_assert(std::is_implicit_lifetime_v<int S::*>); // pointer-to-member

struct X { ~X() = delete; };
// X is not implicit-lifetime class due to deleted destructor
static_assert(!std::is_implicit_lifetime_v<X>);

static_assert(std::is_implicit_lifetime_v<int[8]>); // array type
static_assert(std::is_implicit_lifetime_v<volatile int[8]>); // cv-qualified array type

int main() {}
```

### See also

|  |  |
| --- | --- |
| is_scalar (C++11) | checks if a type is a scalar type (class template) |
| is_array (C++11) | checks if a type is an array type (class template) |
| is_aggregate (C++17) | checks if a type is an aggregate type (class template) |
| start_lifetime_as, start_lifetime_as_array (C++23) | implicitly creates objects in given storage with the object representation reused (function template) |
