# std::experimental::parallel::is_execution_policy

| Defined in header `<experimental/execution_policy>` |  |
| --- | --- |
| `template< class T > struct is_execution_policy;` | (parallelism TS) |

Checks whether `T` is a standard or implementation-defined execution policy type.

Provides the member constant `value` which is equal to `true`, if `T` is `execution_policy`, `sequential_execution_policy`, `parallel_execution_policy`, `parallel_vector_execution_policy`, or an implementation-defined execution policy type. Otherwise, `value` is equal to `false`.

The behavior of a program that adds specializations for `is_execution_policy` is undefined.

### Template parameters

T - a type to check

### Helper template

| Defined in header `<experimental/execution_policy>` |  |
| --- | --- |
| `template< class T > constexpr bool is_execution_policy_v = is_execution_policy<T>::value;` | (parallelism TS) |

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
