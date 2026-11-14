# std::add_lvalue_reference, std::add_rvalue_reference

| Defined in header `<type_traits>` |  |  |
| --- | --- | --- |
| `template< class T > struct add_lvalue_reference;` | (1) | (since C++11) |
| `template< class T > struct add_rvalue_reference;` | (2) | (since C++11) |

Creates an lvalue or rvalue reference type of `T`.

| Type trait | The type referred by the nested type `type` |  |
| --- | --- | --- |
| `T` is a referenceable type | `T` is not a referenceable type |  |
| (1) | `T&`[1] | `T` |
| (2) | `T&&`[2] |  |

1. ↑ This rule reflects the semantics of reference collapsing.
2. ↑ This rule reflects the semantics of reference collapsing. Note that `std::add_rvalue_reference<T&>::type` is `T&`, which is not an rvalue reference type.

If the program adds specializations for any of the templates described on this page, the behavior is undefined.

### Nested types

| Name | Definition |
| --- | --- |
| `type` | determined as above |

### Helper types

|  |  |
| --- | --- |
| `template< class T > using add_lvalue_reference_t = typename add_lvalue_reference<T>::type;` | (since C++14) |
| `template< class T > using add_rvalue_reference_t = typename add_rvalue_reference<T>::type;` | (since C++14) |

### Notes

The major difference to directly using `T&` or `T&&` is that `T` can be a non-referenceable type. For example, `std::add_lvalue_reference<void>::type` is `void`, while `void&` leads to a compilation error.

### Possible implementation

`namespace detail { template<class T> struct type_identity { using type = T; }; // or use std::type_identity (since C++20) template<class T> // Note that “cv void&” is a substitution failure auto try_add_lvalue_reference(int) -> type_identity<T&>; template<class T> // Handle T = cv void case auto try_add_lvalue_reference(...) -> type_identity<T>; template<class T> auto try_add_rvalue_reference(int) -> type_identity<T&&>; template<class T> auto try_add_rvalue_reference(...) -> type_identity<T>; } // namespace detail template<class T> struct add_lvalue_reference : decltype(detail::try_add_lvalue_reference<T>(0)) {}; template<class T> struct add_rvalue_reference : decltype(detail::try_add_rvalue_reference<T>(0)) {};`

### Example

```cpp
#include <type_traits>

using non_ref = int;
static_assert(std::is_lvalue_reference_v<non_ref> == false);

using l_ref = std::add_lvalue_reference_t<non_ref>;
static_assert(std::is_lvalue_reference_v<l_ref> == true);

using r_ref = std::add_rvalue_reference_t<non_ref>;
static_assert(std::is_rvalue_reference_v<r_ref> == true);

using void_ref = std::add_lvalue_reference_t<void>;
static_assert(std::is_reference_v<void_ref> == false);

int main() {}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2101 | C++11 | the program was ill-formed if `T` is a function type with cv or ref | the type produced is `T` in this case |

### See also

|  |  |
| --- | --- |
| is_reference (C++11) | checks if a type is either an *lvalue reference* or *rvalue reference* (class template) |
| remove_reference (C++11) | removes a reference from the given type (class template) |
| remove_cvref (C++20) | combines `std::remove_cv` and `std::remove_reference` (class template) |
