# std::experimental::is_simd_flag_type

| Defined in header `<experimental/simd>` |  |
| --- | --- |
| `template< class T > struct is_simd_flag_type;` | (parallelism TS v2) |

If `T` is a valid type for the second argument to `copy_from`, `copy_to` or the corresponding load constructors of `simd` or `simd_mask`, provides the member constant `value` equal `true`. For any other type, `value` is `false`.

### Template parameters

T - a type to check

### Helper variable template

`template< class T > constexpr bool is_simd_flag_type_v = is_simd_flag_type<T>::value;` (parallelism TS v2)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is a load/store flag tag type, `false` otherwise (public static member constant)

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
#include <experimental/simd>
#include <iostream>

int main()
{
    namespace stdx = std::experimental;
    std::cout << std::boolalpha
              << stdx::is_simd_flag_type_v<stdx::element_aligned_tag> << '\n'
              << stdx::is_simd_flag_type_v<int> << '\n';
}
```

Output:

```text
true
false
```

### See also

is_abi_tag (parallelism TS v2) checks if a type is an ABI tag type (class template)
