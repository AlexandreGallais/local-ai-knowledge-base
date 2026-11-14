# std::is_bounded_array

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class T > struct is_bounded_array;` | (since C++20) |

`std::is_bounded_array` is a UnaryTypeTrait.

Checks whether `T` is an array type of known bound. Provides the member constant `value` which is equal to `true`, if `T` is an array type of known bound. Otherwise, `value` is equal to `false`.

If the program adds specializations for `std::is_bounded_array` or `std::is_bounded_array_v`, the behavior is undefined.

### Template parameters

T - a type to check

### Helper variable template

`template< class T > constexpr bool is_bounded_array_v = is_bounded_array<T>::value;` (since C++20)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is an array type of known bound, `false` otherwise (public static member constant)

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

`template<class T> struct is_bounded_array : std::false_type {}; template<class T, std::size_t N> struct is_bounded_array<T[N]> : std::true_type {};`

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_bounded_array_traits` | `201902L` | (C++20) | `std::is_bounded_array`, `std::is_unbounded_array` |

### Example

```cpp
#include <iostream>
#include <type_traits>

#define OUT(...) std::cout << #__VA_ARGS__ << " : " << __VA_ARGS__ << '\n'

class A {};

int main()
{
    std::cout << std::boolalpha;
    OUT(std::is_bounded_array_v<A>);
    OUT(std::is_bounded_array_v<A[]>);
    OUT(std::is_bounded_array_v<A[3]>);
    OUT(std::is_bounded_array_v<float>);
    OUT(std::is_bounded_array_v<int>);
    OUT(std::is_bounded_array_v<int[]>);
    OUT(std::is_bounded_array_v<int[3]>);
}
```

Output:

```text
std::is_bounded_array_v<A> : false
std::is_bounded_array_v<A[]> : false
std::is_bounded_array_v<A[3]> : true
std::is_bounded_array_v<float> : false
std::is_bounded_array_v<int> : false
std::is_bounded_array_v<int[]> : false
std::is_bounded_array_v<int[3]> : true
```

### See also

|  |  |
| --- | --- |
| is_array (C++11) | checks if a type is an array type (class template) |
| is_unbounded_array (C++20) | checks if a type is an array type of unknown bound (class template) |
| extent (C++11) | obtains the size of an array type along a specified dimension (class template) |
