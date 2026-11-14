# std::tuple_element<std::complex>

| Defined in header `<complex>` |  |
| --- | --- |
| `template< std::size_t I, class T > struct tuple_element<I, std::complex<T>>;` | (since C++26) |

The partial specializations of `std::tuple_element` for `std::complex` provide compile-time access to the underlying real and imaginary number type of a `complex`, using tuple-like syntax. They are provided for structured binding support. The program is ill-formed if `I >= 2`.

### Member types

| Member type | Definition |
| --- | --- |
| `type` | `T` |

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_tuple_like` | `202311L` | (C++26) | Add tuple protocol to `std::complex` |

### Example

```cpp
#include <complex>
#include <type_traits>

static_assert([z = std::complex<float>()]
{
    using T = decltype(z);
    return
#if __cpp_lib_tuple_like >= 202311L
        std::is_same_v<std::tuple_element_t<0, T>, float> &&
        std::is_same_v<std::tuple_element_t<1, T>, float> &&
#endif
        std::is_same_v<T::value_type, float>;
}());

int main() {}
```

### See also

|  |  |
| --- | --- |
| Structured binding (C++17) | binds the specified names to sub-objects or tuple elements of the initializer |
| tuple_element (C++11) | obtains the element types of a tuple-like type (class template) |
| std::tuple_size<std::complex> (C++26) | obtains the size of a `std::complex` (class template specialization) |
| get(std::complex) (C++26) | obtains a reference to real or imaginary part from a `std::complex` (function template) |
