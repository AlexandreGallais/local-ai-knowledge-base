# std::experimental::is_abi_tag

| Defined in header `<experimental/simd>` |  |
| --- | --- |
| `template< class T > struct is_abi_tag;` | (parallelism TS v2) |

If `T` is an ABI tag in the `simd_abi` namespace, provides the member constant `value` equal `true`. For any other type, `value` is `false`.

### Template parameters

T - a type to check

### Helper variable template

`template< class T > constexpr bool is_abi_tag_v = is_abi_tag<T>::value;` (parallelism TS v2)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is an ABI tag type, `false` otherwise (public static member constant)

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

static_assert(std::experimental::is_abi_tag_v<stdx::simd_abi::scalar>);
static_assert(!std::experimental::is_abi_tag_v<int>);

int main() {}
```

### See also

is_simd_flag_type (parallelism TS v2) checks if a type is a simd flag type (class template)
