# std::enable_nonlocking_formatter_optimization

| Defined in header `<format>` |  |
| --- | --- |
| `template< class T > constexpr bool enable_nonlocking_formatter_optimization = false;` | (since C++23) |

This template can be used by implementations to enable efficient implementations of `std::print` and `std::println`.

If `std::enable_nonlocking_formatter_optimization<T>` is `true`, printing an argument of type `T` can be performed in a more efficient way (see `std::print` for details). `std::enable_nonlocking_formatter_optimization` specializations can be `true` in the following cases:

- `T` is one of the types where `std::formatter``<T, CharT>` is a basic standard specialization or standard specialization for a library type (see below).
- A program may specialize this template for any cv-unqualified program-defined type `T`. Such specializations must be usable in constant expressions and have type `const bool`.

### Basic standard specializations

In the following list, `CharT` is either `char` or `wchar_t`, `ArithmeticT` is any cv-unqualified arithmetic type other than `char`, `wchar_t`, `char8_t`, `char16_t`, or `char32_t`:

|  |  |
| --- | --- |
| Nonlocking flag for character formatters |  |
| `template<> constexpr bool enable_nonlocking_formatter_optimization<CharT> = true;` | (1) |
| Nonlocking flag for string formatters |  |
| `template<> constexpr bool enable_nonlocking_formatter_optimization<CharT*> = true;` | (2) |
| `template<> constexpr bool enable_nonlocking_formatter_optimization<const CharT*> = true;` | (3) |
| `template< std::size_t N > constexpr bool enable_nonlocking_formatter_optimization<CharT[N]> = true;` | (4) |
| `template< class Traits, class Alloc > constexpr bool enable_nonlocking_formatter_optimization <std::basic_string<CharT, Traits, Alloc>> = true;` | (5) |
| `template< class Traits > constexpr bool enable_nonlocking_formatter_optimization <std::basic_string_view<CharT, Traits>> = true;` | (6) |
| Nonlocking flag for arithmetic formatters |  |
| `template<> constexpr bool enable_nonlocking_formatter_optimization<ArithmeticT> = true;` | (7) |
| Nonlocking flag for pointer formatters |  |
| `template<> constexpr bool enable_nonlocking_formatter_optimization<std::nullptr_t> = true;` | (8) |
| `template<> constexpr bool enable_nonlocking_formatter_optimization<void*> = true;` | (9) |
| `template<> constexpr bool enable_nonlocking_formatter_optimization<const void*> = true;` | (10) |

### Standard specializations for library types

Specializations of `enable_nonlocking_formatter_optimization` for all specializations of the following standard templates are defined as `true`:

- `std::chrono::zoned_time` when its template parameter type `TimeZonePtr` is `const std::chrono::time_zone*`

Specializations of `enable_nonlocking_formatter_optimization` for all specializations of the following standard templates are defined as conditionally `true`:

- `std::pair`
- `std::tuple`
- `std::chrono::duration`

Specialization of `enable_nonlocking_formatter_optimization` for all formattable range types are always defined as `false` for which the range format kind is not `std::range_format::disabled`.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_print` | `202403L` | (C++26) (DR23) | Formatted output with stream locking |
| `202406L` | (C++26) (DR23) | Enabling nonlocking formatter optimization for more formattable types |  |

### See also

|  |  |
| --- | --- |
| formatter (C++20) | defines formatting rules for a given type (class template) |
| print (C++23) | prints to `stdout` or a file stream using formatted representation of the arguments (function template) |
| println (C++23) | same as `std::print` except that each print is terminated by additional new line (function template) |
