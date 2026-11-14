# std::basic_format_args

| Defined in header `<format>` |  |  |
| --- | --- | --- |
| `template< class Context > class basic_format_args;` | (1) | (since C++20) |
| `using format_args = basic_format_args<std::format_context>;` | (2) | (since C++20) |
| `using wformat_args = basic_format_args<std::wformat_context>;` | (3) | (since C++20) |

Provides access to formatting arguments.

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `basic_format_args` object (public member function) |
| get | returns formatting argument at the given index (public member function) |

## std::basic_format_args::basic_format_args

`template< class... Args > basic_format_args( const /*format-arg-store*/<Context, Args...>& store ) noexcept;`

Constructs a `basic_format_args` object from the result of a call to `std::make_format_args` or `std::make_wformat_args`.

## std::basic_format_args::get

`std::basic_format_arg<Context> get( std::size_t i ) const noexcept;`

Returns a `std::basic_format_arg` holding the `i`-th argument in `args`, where `args` is the parameter pack passed to `std::make_format_args` or `std::make_wformat_args`.

If there's no such formatting argument (i.e. `*this` was default-constructed or `i` is not less than the number of formatting arguments), returns a default-constructed `std::basic_format_arg` (holding a `std::monostate` object).

### Deduction guides

`template< class Context, class... Args > basic_format_args( /*format-arg-store*/<Context, Args...> ) -> basic_format_args<Context>;` (since C++20)

### Notes

`std::basic_format_args` has reference semantics. It is the programmer's responsibility to ensure that `*this` does not outlive `store` (which, in turn, should not outlive the arguments to `std::make_format_args` or `std::make_wformat_args`).

### Example

This section is incomplete Reason: no example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| P2216R3 | C++20 | `format_args_t` was provided due to overparameterization of `vformat_to` | removed |
| LWG 3810 | C++20 | `basic_format_args` has no deduction guide | added |
| LWG 4106 | C++20 | `basic_format_args` was default-constructible | default constructor removed |

### See also

basic_format_arg (C++20) class template that provides access to a formatting argument for user-defined formatters (class template)
