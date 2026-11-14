# std::experimental::reflect::get_source_column

| Defined in header `<experimental/reflect>` |  |
| --- | --- |
| `template< Object T > struct get_source_column;` | (reflection TS) |

Provides the member constant `value` equal to the implementation-defined value representing some offset from the start of the line of the declaration of the entity or typedef-name reflected by `T`.

### Helper variable template

`template< class T > constexpr auto get_source_column_v = get_source_column<T>::value;` (reflection TS)

## Inherited from std::integral_constant

### Member constants

value [static] the implementation-defined value representing some offset from the start of the line of the declaration of the entity or typedef-name reflected by `T` (public static member constant)

### Member functions

|  |  |
| --- | --- |
| operator std::uint_least32_t | converts the object to `std::uint_least32_t`, returns `value` (public member function) |
| operator() (C++14) | returns `value` (public member function) |

### Member types

| Type | Definition |
| --- | --- |
| `value_type` | `std::uint_least32_t` |
| `type` | `std::integral_constant<std::uint_least32_t, value>` |

### Example

This section is incomplete Reason: examples

### See also

column return the column number represented by this object (public member function of `std::source_location`)
