# std::experimental::is_simd, std::experimental::is_simd_mask

| Defined in header `<experimental/simd>` |  |  |
| --- | --- | --- |
| `template< class T > struct is_simd;` | (1) | (parallelism TS v2) |
| `template< class T > struct is_simd_mask;` | (2) | (parallelism TS v2) |

1) If `T` is a specialization of the `simd` class template, provides the member constant `value` equal `true`. For any other type, `value` is `false`.

2) If `T` is a specialization of the `simd_mask` class template, provides the member constant `value` equal `true`. For any other type, `value` is `false`.

### Template parameters

T - a type to check

### Helper variable template

|  |  |
| --- | --- |
| `template< class T > constexpr bool is_simd_v = is_simd<T>::value;` | (parallelism TS v2) |
| `template< class T > constexpr bool is_simd_mask_v = is_simd_mask<T>::value;` | (parallelism TS v2) |

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is a `simd`/`simd_mask` type, `false` otherwise (public static member constant)

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

`is_simd_v<T>` is necessary but not sufficient for testing whether `T` can be used as a SIMD type. For example, `is_simd_v<simd<bool>>` is `true`, even though `bool` is not included in the permissible vectorizable types. The missing condition is `std::is_constructible_v<T>`, which is `false` for `simd<bool>`.

### Example

```cpp
#include <experimental/simd>
#include <iostream>
#include <string_view>

namespace stdx = std::experimental;

template<typename T>
void test_simd(std::string_view type_name)
{
    std::cout << std::boolalpha
              << "Type: " << type_name << '\n'
              << "  is_simd: " << stdx::is_simd_v<T> << '\n'
              << "  is_constructible: " << std::is_constructible_v<T> << '\n';
}

template<typename T>
void test_simd_mask(std::string_view type_name)
{
    std::cout << std::boolalpha
              << "Type: " << type_name << '\n'
              << "  is_simd_mask: " << stdx::is_simd_mask_v<T> << '\n'
              << "  is_constructible: " << std::is_constructible_v<T> << "\n\n";
}

int main()
{
    test_simd<int>("int");
    test_simd_mask<int>("int");

    test_simd<stdx::simd<float>>("simd<float>");
    test_simd_mask<stdx::simd_mask<float>>("simd_mask<float>");

    test_simd<stdx::simd<bool>>("simd<bool>");
    test_simd_mask<stdx::simd_mask<bool>>("simd_mask<bool>");
}
```

Output:

```text
Type: int
  is_simd: false
  is_constructible: true
Type: int
  is_simd_mask: false
  is_constructible: true

Type: simd<float>
  is_simd: true
  is_constructible: true
Type: simd_mask<float>
  is_simd_mask: true
  is_constructible: true

Type: simd<bool>
  is_simd: true
  is_constructible: false
Type: simd_mask<bool>
  is_simd_mask: true
  is_constructible: false
```
