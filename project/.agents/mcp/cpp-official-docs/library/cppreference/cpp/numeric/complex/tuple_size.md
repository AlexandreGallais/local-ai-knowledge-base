# std::tuple_size<std::complex>

| Defined in header `<complex>` |  |
| --- | --- |
| `template< class T > struct tuple_size<std::complex<T>> : std::integral_constant<std::size_t, 2> {};` | (since C++26) |

The partial specialization of `std::tuple_size` for `std::complex` provides a compile-time way to obtain the number of components of a `complex`, which is always `2`, using tuple-like syntax. It is provided for structured binding support.

## Inherited from std::integral_constant

### Member constants

value [static] the constant value 2 (public static member constant)

### Member functions

|  |  |
| --- | --- |
| operator std::size_t | converts the object to `std::size_t`, returns `value` (public member function) |
| operator() (C++14) | returns `value` (public member function) |

### Member types

| Type | Definition |
| --- | --- |
| `value_type` | `std::size_t` |
| `type` | `std::integral_constant<std::size_t, value>` |

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_tuple_like` | `202311L` | (C++26) | Add tuple protocol to `std::complex` |

### Example

```cpp
#include <complex>

static_assert(std::tuple_size_v<std::complex<float>> == 2);

static_assert([]
{
    using namespace std::literals;
    auto [re, im] = -1.5 + 2.5i;
    return re == -1.5 && im == 2.5;
}());

static_assert([]
{
    using namespace std::literals;
    auto z = std::complex<double>{};
    auto& [re, im] = z;
    re = 1.0;
    im = 2.0;
    return z == 1.0 + 2.0i;
}());

int main() {}
```

### See also

|  |  |
| --- | --- |
| Structured binding (C++17) | binds the specified names to sub-objects or tuple elements of the initializer |
| tuple_size (C++11) | obtains the number of elements of a tuple-like type (class template) |
| std::tuple_element<std::complex> (C++26) | obtains the underlying real and imaginary number type of a `std::complex` (class template specialization) |
| get(std::complex) (C++26) | obtains a reference to real or imaginary part from a `std::complex` (function template) |
