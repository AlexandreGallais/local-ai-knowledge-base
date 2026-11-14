# std::formatter<std::queue>

| Defined in header `<queue>` |  |
| --- | --- |
| `template< class CharT, class T, std::formattable<CharT> Container, class... U > struct formatter<std::queue<T, Container, U...>, CharT>;` | (since C++23) |

The template specialization of `std::formatter` for the container adaptor type `std::queue` allows users to convert the underlying container to its textual representation as a collection of elements using formatting functions.

The specialization is enabled if `std::formattable<Container, CharT>` is `true`.

### Member types

| Name | Definition |
| --- | --- |
| `maybe-const-container` | `fmt-maybe-const` `<Container, CharT>` (exposition-only member type*) |
| `maybe-const-adaptor` | `maybe-const` `<` `std::is_const_v<``maybe-const-container``>,` `std::queue<T, Container, U...>>` (exposition-only member type*) |

### Data members

| Name | Definition |
| --- | --- |
| `underlying_` | underlying formatter of type `std::formatter<ranges::ref_view<``maybe-const-container``>, CharT>` (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| parse | parses the format specifier as specified by range-format-spec (public member function) |
| format | writes the range formatted output as specified by range-format-spec (public member function) |

## std::formatter<std::queue>::parse

`template< class ParseContext > constexpr auto parse( ParseContext& ctx ) -> ParseContext::iterator;`

Equivalent to `return underlying_ .parse(ctx);`.

### Return value

An iterator past the end of the range-format-spec of the underlying container.

## std::formatter<std::queue>::format

`template< class FormatContext > auto format( /*maybe-const-adaptor*/& r, FormatContext& ctx ) const -> FormatContext::iterator;`

Equivalent to `return underlying_ .format(r.c, ctx);`.

### Return value

An iterator past the end of the output range.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| formatter (C++20) | defines formatting rules for a given type (class template) |
| range_formatter (C++23) | class template that helps implementing `std::formatter` specializations for range types (class template) |
