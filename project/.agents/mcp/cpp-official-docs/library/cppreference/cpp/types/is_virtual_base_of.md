# std::is_virtual_base_of

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class Base, class Derived > struct is_virtual_base_of;` | (since C++26) |

`std::is_virtual_base_of` is a BinaryTypeTrait.

If `Base` is a virtual base class of `Derived` (ignoring cv-qualification), provides the member constant `value` equal to `true`. Otherwise `value` is `false`.

If both `Base` and `Derived` are non-union class types (ignoring cv-qualification), `Derived` should be a complete type; otherwise the behavior is undefined.

If the program adds specializations for `std::is_virtual_base_of` or `std::is_virtual_base_of_v`, the behavior is undefined.

### Helper variable template

`template< class Base, class Derived > constexpr bool is_virtual_base_of_v = is_virtual_base_of<Base, Derived>::value;` (since C++26)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `Derived` is derived from virtual base class `Base` (ignoring cv-qualification), `false` otherwise (public static member constant)

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

`std::is_virtual_base_of_v<A, B>` is `true` even if `A` is a private, protected, or ambiguous base class of `B`.

If `std::is_virtual_base_of_v<A, B>` is `true`, then `std::is_base_of_v<A, B>` is also `true`. However, the converse is not always true because the check for virtual inheritance is more specific. In that case, `std::is_virtual_base_of_v<T, T>` is `false` even if `T` is a non-union class type.

### Example

```cpp
#include <type_traits>

class A {};
class B : A {};
class C : B {};
class D : virtual A {};
class E : D {};

union F {};
using I = int;

static_assert
(
    std::is_virtual_base_of_v<A, A> != true &&
    std::is_virtual_base_of_v<A, B> != true &&
    std::is_virtual_base_of_v<A, D> == true &&
    std::is_virtual_base_of_v<D, E> != true &&
    std::is_virtual_base_of_v<F, F> != true &&
    std::is_virtual_base_of_v<I, I> != true
);

int main() {}
```

### See also

|  |  |
| --- | --- |
| is_base_of (C++11) | checks if a type is a base of the other type (class template) |
| is_convertible, is_nothrow_convertible (C++11), (C++20) | checks if a type can be converted to the other type (class template) |
| derived_from (C++20) | specifies that a type is derived from another type (concept) |
