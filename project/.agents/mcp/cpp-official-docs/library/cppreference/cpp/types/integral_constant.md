# std::integral_constant

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class T, T v > struct integral_constant;` | (since C++11) |

`std::integral_constant` wraps a static constant of specified type. It is the base class for the C++ type traits.

If the program adds specializations for `std::integral_constant`, the behavior is undefined.

### Helper alias templates

A helper alias template `std::bool_constant` is defined for the common case where `T` is `bool`.

`template< bool B > using bool_constant = integral_constant<bool, B>;` (since C++17)

### Specializations

Two typedefs for the common case where `T` is `bool` are provided:

| Defined in header `<type_traits>` |  |
| --- | --- |
| Name | Definition |
| `true_type` | `std::integral_constant<bool, true>` |
| `false_type` | `std::integral_constant<bool, false>` |

### Member types

| Name | Definition |
| --- | --- |
| `value_type` | `T` |
| `type` | `std::integral_constant<T, v>` |

### Member constants

| Name | Value |
| --- | --- |
| `constexpr T` value [static] | `v` (public static member constant) |

### Member functions

|  |  |
| --- | --- |
| **operator value_type** | returns the wrapped value (public member function) |
| **operator()** (C++14) | returns the wrapped value (public member function) |

## std::integral_constant::operator value_type

`constexpr operator value_type() const noexcept;`

Conversion function. Returns the wrapped value.

## std::integral_constant::operator()

`constexpr value_type operator()() const noexcept;` (since C++14)

Returns the wrapped value. This function enables `std::integral_constant` to serve as a source of compile-time function objects.

### Possible implementation

`template<class T, T v> struct integral_constant { static constexpr T value = v; using value_type = T; using type = integral_constant; // using injected-class-name constexpr operator value_type() const noexcept { return value; } constexpr value_type operator()() const noexcept { return value; } // since c++14 };`

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_integral_constant_callable` | `201304L` | (C++14) | `std::integral_constant::operator()` |
| `__cpp_lib_bool_constant` | `201505L` | (C++17) | `std::bool_constant` |

### Example

```cpp
#include <type_traits>

using two_t = std::integral_constant<int, 2>;
using four_t = std::integral_constant<int, 4>;

static_assert(not std::is_same_v<two_t, four_t>);
static_assert(two_t::value * 2 == four_t::value, "2*2 != 4");
static_assert(two_t() << 1 == four_t() >> 0, "2*2 != 4");

enum class E{ e1, e2 };
using c1 = std::integral_constant<E, E::e1>;
using c2 = std::integral_constant<E, E::e2>;
static_assert(c1::value != E::e2);
static_assert(c1() == E::e1);
static_assert(std::is_same_v<c2, c2>);

int main() {}
```

### See also

integer_sequence (C++14) implements compile-time sequence of integers (class template)
