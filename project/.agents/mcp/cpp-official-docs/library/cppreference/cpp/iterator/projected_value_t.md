# std::projected_value_t

| Defined in header `<iterator>` |  |
| --- | --- |
| `template< std::indirectly_readable I, std::indirectly_regular_unary_invocable<I> Proj > using projected_value_t = std::remove_cvref_t<std::invoke_result_t<Proj&, std::iter_value_t<I>&>>;` | (since C++26) |

The alias template `projected_value_t` obtains the value type by stripping any reference and its topmost cv-qualifiers of the result type of applying `Proj` to `std::iter_value_t<I>&`.

`projected_value_t` is used to determine the default value type in some algorithms such as `ranges::contains`.

### Template parameters

|  |  |  |
| --- | --- | --- |
| I | - | an indirectly readable type |
| Proj | - | projection applied to an lvalue reference to value type of `I` |

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_algorithm_default_value_type` | `202403L` | (C++26) | default template type for algorithm values using `std::projected_value_t` |

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| indirect_result_t (C++20) | computes the result of invoking a callable object on the result of dereferencing some set of `indirectly_readable` types (alias template) |
| projected (C++20) | helper template for specifying the constraints on algorithms that accept projections (class template) |
