# std::is_array

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class T > struct is_array;` | (since C++11) |

`std::is_array` is a UnaryTypeTrait.

Checks whether `T` is an array type. Provides the member constant `value` which is equal to `true`, if `T` is an array type. Otherwise, `value` is equal to `false`.

If the program adds specializations for `std::is_array` or `std::is_array_v`, the behavior is undefined.

### Template parameters

T - a type to check

### Helper variable template

`template< class T > constexpr bool is_array_v = is_array<T>::value;` (since C++17)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is an array type, `false` otherwise (public static member constant)

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

`template<class T> struct is_array : std::false_type {}; template<class T> struct is_array<T[]> : std::true_type {}; template<class T, std::size_t N> struct is_array<T[N]> : std::true_type {};`

### Example

```cpp
#include <array>
#include <type_traits>

class A {};
static_assert(std::is_array<A>::value == false);
static_assert(std::is_array<A[]>::value == true);
static_assert(std::is_array<A[3]>::value == true);

static_assert(std::is_array<float>::value == false);
static_assert(std::is_array<int>::value == false);
static_assert(std::is_array<int[]>::value == true);
static_assert(std::is_array<int[3]>::value == true);
static_assert(std::is_array<std::array<int, 3>>::value == false);

int main() {}
```

### See also

|  |  |
| --- | --- |
| is_bounded_array (C++20) | checks if a type is an array type of known bound (class template) |
| is_unbounded_array (C++20) | checks if a type is an array type of unknown bound (class template) |
| rank (C++11) | obtains the number of dimensions of an array type (class template) |
| extent (C++11) | obtains the size of an array type along a specified dimension (class template) |
| remove_extent (C++11) | removes one extent from the given array type (class template) |
| remove_all_extents (C++11) | removes all extents from the given array type (class template) |
