# std::*range-default-formatter*<std::range_format::set>

| Defined in header `<format>` |  |
| --- | --- |
| `template< ranges::input_range R, class CharT > struct /*range-default-formatter*/<range_format::set, R, CharT>;` | (since C++23) (exposition only*) |

The class template `/*range-default-formatter*/` for range types is specialized for formatting range as a set of keys if `std::format_kind<R>` is `std::range_format::set`.

### Member types

| Member | Definition |
| --- | --- |
| `maybe-const-set` (private) | `fmt-maybe-const``<R, CharT>` (exposition-only member type*) |

### Data members

| Member | Definition |
| --- | --- |
| `underlying_` (private) | the underlying formatter of type: `std::range_formatter<std::remove_cvref_t<` `ranges::range_reference_t<``maybe-const-set``>>, CharT>` (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `range-default-formatter` (public member function) |
| parse | parses the format specifier as specified by range-format-spec (public member function) |
| format | writes the range formatted output as specified by range-format-spec (public member function) |

## std::*range-default-formatter*<std::range_format::set>::*range-default-formatter*

`constexpr /*range-default-formatter*/();`

Equivalent to a call to `underlying_.set_brackets(STATICALLY_WIDEN<CharT>("{"), STATICALLY_WIDEN<CharT>("}"))`

where `STATICALLY_WIDEN<CharT>("...")` is `"..."` if `CharT` is `char`, and `L"..."` if `CharT` is `wchar_t`.

## std::*range-default-formatter*<std::range_format::set>::parse

`template< class ParseContext > constexpr auto parse( ParseContext& ctx ) -> ParseContext::iterator;`

Equivalent to `return underlying_.parse(ctx);`.

Returns an iterator past the end of the *range-format-spec*.

## std::*range-default-formatter*<std::range_format::set>::format

`template< class FormatContext > auto format( maybe-const-set& r, FormatContext& ctx ) const -> FormatContext::iterator;`

Equivalent to `return underlying_.format(r, ctx);`.

Returns an iterator past the end of the output range.

### See also

|  |  |
| --- | --- |
| formatter (C++20) | defines formatting rules for a given type (class template) |
| range_formatter (C++23) | class template that helps implementing `std::formatter` specializations for range types (class template) |
