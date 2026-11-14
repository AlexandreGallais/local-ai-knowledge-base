# std::is_execution_policy

| Defined in header `<execution>` |  |
| --- | --- |
| `template< class T > struct is_execution_policy;` | (since C++17) |

Checks whether `T` is a standard or implementation-defined execution policy type.

Provides the member constant `value` which is equal to `true`, if `T` is a standard execution policy type, or an implementation-defined execution policy type. Otherwise, `value` is equal to `false`.

If the program adds specializations for `std::is_execution_policy` or `std::is_execution_policy_v`, the behavior is undefined.

### Template parameters

T - a type to check

### Helper template

| Defined in header `<execution>` |  |
| --- | --- |
| `template< class T > constexpr bool is_execution_policy_v = std::is_execution_policy<T>::value;` | (since C++17) |

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is a standard or implementation-defined execution policy type, `false` otherwise (public static member constant)

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
#include <execution>

static_assert(std::is_execution_policy_v<std::execution::unsequenced_policy>);
static_assert(!std::is_execution_policy_v<int>);

int main() {}
```

### See also

|  |  |
| --- | --- |
| sequenced_policy, parallel_policy, parallel_unsequenced_policy, unsequenced_policy (C++17), (C++17), (C++17), (C++20) | execution policy types (class) |
| seq, par, par_unseq, unseq (C++17), (C++17), (C++17), (C++20) | global execution policy objects (constant) |
