# std::is_class

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class T > struct is_class;` | (since C++11) |

`std::is_class` is a UnaryTypeTrait.

Checks whether `T` is a non-union class type. Provides the member constant `value` which is equal to `true`, if `T` is a class type (but not union). Otherwise, `value` is equal to `false`.

If the program adds specializations for `std::is_class` or `std::is_class_v`, the behavior is undefined.

### Template parameters

T - a type to check

### Helper variable template

`template< class T > constexpr bool is_class_v = is_class<T>::value;` (since C++17)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is a non-union class type, `false` otherwise (public static member constant)

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

`namespace detail { template<class T> std::integral_constant<bool, !std::is_union<T>::value> test(int T::*); template<class> std::false_type test(...); } template<class T> struct is_class : decltype(detail::test<T>(nullptr)) {};`

### Example

```cpp
#include <type_traits>

struct A {};
static_assert(std::is_class<A>::value);

class B {};
static_assert(std::is_class_v<B>);
static_assert(not std::is_class_v<B*>);
static_assert(not std::is_class_v<B&>);
static_assert(std::is_class_v<const B>);

enum class E {};
static_assert(not std::is_class<E>::value);

union U { class UC {}; };
static_assert(not std::is_class_v<U>);
static_assert(std::is_class_v<U::UC>);

static_assert(not std::is_class_v<int>);

static_assert(std::is_class_v<struct S>, "incomplete class");
static_assert(std::is_class_v<class C>, "incomplete class");

int main() {}
```

### See also

is_union (C++11) checks if a type is a union type (class template)
