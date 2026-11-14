# std::is_error_code_enum

| Defined in header `<system_error>` |  |
| --- | --- |
| `template< class T > struct is_error_code_enum;` | (since C++11) |

If `T` is an error code enumeration (such as `std::io_errc` and `std::future_errc`), this template provides the member constant `value` equal `true`. For any other type, `value` is `false`.

This template may be specialized for a program-defined type to indicate that the type is eligible for `std::error_code` implicit conversion.

### Helper variable template

`template< class T > constexpr bool is_error_code_enum_v = is_error_code_enum<T>::value;` (since C++17)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is an error code enum, `false` otherwise (public static member constant)

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

```cpp
#include <ios>
#include <system_error>

static_assert(std::is_error_code_enum_v<decltype(std::io_errc::stream)>);
static_assert(!std::is_error_code_enum_v<std::error_category>);

int main() {}
```

### See also

is_error_condition_enum (C++11) identifies an enumeration as an `std::error_condition` (class template)
