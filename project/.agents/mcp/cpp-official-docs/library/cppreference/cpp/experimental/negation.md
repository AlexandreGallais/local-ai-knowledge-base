# std::experimental::negation

| Defined in header `<experimental/type_traits>` |  |  |
| --- | --- | --- |
| `template< class B > struct negation;` | (1) | (library fundamentals TS v2) |

Forms the logical negation of the type trait `B`.

The type `negation<B>` is a UnaryTypeTrait with a base characteristic of `std::integral_constant<bool, !bool(B::value)>`.

### Template parameters

B - any type such that the expression `bool(B::value)` is a valid constant expression

### Helper variable template

`template< class B > constexpr bool negation_v = negation<B>::value;` (library fundamentals TS v2)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `B` has a member `::value` such that `!bool(B::value)` is `true`, `false` otherwise (public static member constant)

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

### Possible implementation

`template<class B> struct negation : std::integral_constant<bool, !bool(B::value)> {};`

### Example

This section is incomplete Reason: no example

### See also

negation (C++17) logical NOT metafunction (class template)
