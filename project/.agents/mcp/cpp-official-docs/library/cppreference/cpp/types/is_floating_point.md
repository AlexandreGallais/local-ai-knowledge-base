# std::is_floating_point

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class T > struct is_floating_point;` | (since C++11) |

`std::is_floating_point` is a UnaryTypeTrait.

Checks whether `T` is a floating-point type. Provides the member constant `value` which is equal to `true`, if `T` is the type `float`, `double`, `long double`, or any extended floating-point types (`std::float16_t`, `std::float32_t`, `std::float64_t`, `std::float128_t`, or `std::bfloat16_t`)(since C++23), including any cv-qualified variants. Otherwise, `value` is equal to `false`.

If the program adds specializations for `std::is_floating_point` or `std::is_floating_point_v`, the behavior is undefined.

### Template parameters

T - a type to check

### Helper variable template

`template< class T > constexpr bool is_floating_point_v = is_floating_point<T>::value;` (since C++17)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is a floating-point type (possibly cv-qualified), `false` otherwise (public static member constant)

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

`template<class T> struct is_floating_point : std::integral_constant< bool, // Note: standard floating-point types std::is_same<float, typename std::remove_cv<T>::type>::value \|\| std::is_same<double, typename std::remove_cv<T>::type>::value \|\| std::is_same<long double, typename std::remove_cv<T>::type>::value // Note: extended floating-point types (C++23, if supported) \|\| std::is_same<std::float16_t, typename std::remove_cv<T>::type>::value \|\| std::is_same<std::float32_t, typename std::remove_cv<T>::type>::value \|\| std::is_same<std::float64_t, typename std::remove_cv<T>::type>::value \|\| std::is_same<std::float128_t, typename std::remove_cv<T>::type>::value \|\| std::is_same<std::bfloat16_t, typename std::remove_cv<T>::type>::value > {};`

### Example

```cpp
#include <type_traits>

class A {};
static_assert(!std::is_floating_point_v<A>);

static_assert(std::is_floating_point_v<float>);
static_assert(!std::is_floating_point_v<float&>);
static_assert(std::is_floating_point_v<double>);
static_assert(!std::is_floating_point_v<double&>);
static_assert(!std::is_floating_point_v<int>);

int main() {}
```

### See also

|  |  |
| --- | --- |
| is_iec559 [static] | identifies the IEC 559/IEEE 754 floating-point types (public static member constant of `std::numeric_limits<T>`) |
| is_integral (C++11) | checks if a type is an integral type (class template) |
| is_arithmetic (C++11) | checks if a type is an arithmetic type (class template) |
| floating_point (C++20) | specifies that a type is a floating-point type (concept) |
