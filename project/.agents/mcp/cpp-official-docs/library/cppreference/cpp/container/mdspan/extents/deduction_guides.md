# deduction guides for `std::extents`

| Defined in header `<mdspan>` |  |
| --- | --- |
| `template< class... Integrals > explicit extents( Integrals... ) -> /* see below */;` | (since C++23) |

A deduction guide is provided for `std::extents` to allow deduction from integral arguments.

The deduced type is equivalent to

|  |  |
| --- | --- |
| `std::dextents<std::size_t, sizeof...(Integrals)>` | (until C++26) |
| `std::extents<std::size_t, maybe-static-ext <Integrals>...>` | (since C++26) |

This overload participates in overload resolution only if `(std::is_convertible_v<Integrals, std::size_t> && ...)` is `true`.

### Example

This section is incomplete Reason: no example

### See also

(constructor) constructs an `extents` (public member function)
