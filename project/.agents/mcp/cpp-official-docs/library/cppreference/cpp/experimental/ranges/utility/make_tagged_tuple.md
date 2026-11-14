# std::experimental::ranges::make_tagged_tuple

| Defined in header `<experimental/ranges/tuple>` |  |
| --- | --- |
| `template< TagSpecifier... Tags, class... Types > requires sizeof...(Tags) == sizeof...(Types) constexpr ranges::tagged</*see below*/, Tags...> make_tagged_tuple( Types&&... t );` | (ranges TS) |

Convenience function for creating a tagged tuple, deducing the element types from the arguments (the tag specifiers must be explicitly specified).

The *see below* portion of the return type is `decltype(std::make_tuple(std::forward<Types>(t)...))`.

### Return value

`R(std::forward<Types>(t)...)`, where `R` is the return type.

### See also

|  |  |
| --- | --- |
| TaggedType | specifies that a type represents a tag specifier and its element type (concept) |
| tagged | augument a tuple-like type with named accessors (class template) |
| tagged_pair | alias template for a tagged `std::pair` (alias template) |
| make_tagged_pair | convenience function for creating a `tagged_pair` (function template) |
| tagged_tuple | alias template for a tagged `std::tuple` (alias template) |
| in, in1, in2, out, out1, out2, fun, min, max, begin, end | tag specifiers for use with `ranges::tagged` (class) |
