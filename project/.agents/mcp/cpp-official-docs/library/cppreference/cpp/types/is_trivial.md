# std::is_trivial

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class T > struct is_trivial;` | (since C++11) (deprecated in C++26) |

`std::is_trivial` is a UnaryTypeTrait.

If `T` is a trivial type, provides the member constant `value` equal to `true`. For any other type, `value` is `false`.

If `std::remove_all_extents_t<T>` is an incomplete type and not (possibly cv-qualified) `void`, the behavior is undefined.

If the program adds specializations for `std::is_trivial` or `std::is_trivial_v`, the behavior is undefined.

### Template parameters

T - a type to check

### Helper variable template

`template< class T > constexpr bool is_trivial_v = is_trivial<T>::value;` (since C++17) (deprecated in C++26)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is a trivial type, `false` otherwise (public static member constant)

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

struct A { int m; };
static_assert(std::is_trivial_v<A> == true);

struct B { B() {} };
static_assert(std::is_trivial_v<B> == false);

// The following class shows why std::is_trivial(_v) may be a pitfall.
class C
{
private:
    C() = default;
};

static_assert(std::is_trivial_v<C> == true);
static_assert(std::is_trivially_default_constructible_v<C> == false);

int main() {}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2015 | C++11 | `T` could be an array of incomplete class type with unknown bound | the behavior is undefined in this case |

### See also

|  |  |
| --- | --- |
| is_trivially_copyable (C++11) | checks if a type is trivially copyable (class template) |
| is_default_constructible, is_trivially_default_constructible, is_nothrow_default_constructible (C++11), (C++11), (C++11) | checks if a type has a default constructor (class template) |
