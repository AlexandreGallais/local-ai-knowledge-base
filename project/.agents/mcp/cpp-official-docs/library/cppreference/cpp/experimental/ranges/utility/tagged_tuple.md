# std::experimental::ranges::tagged_tuple

| Defined in header `<experimental/ranges/tuple>` |  |
| --- | --- |
| `template< TaggedType... Types > using tagged_tuple = /* see below */;` | (ranges TS) |

Convenience alias template for naming a `ranges::tagged` wrapping a `std::tuple`.

A `TaggedType` is a function type `S(T)`, where `S` is a `TagSpecifier` and `T` is the type of the element.

`tagged_tuple<S1(T1), ..., SN(TN)>` is an alias for `ranges::tagged<std::tuple<T1, ..., TN>, S1, ..., SN>`.

### Notes

Because a function type is used to "glue" the tag specifier and the corresponding element type together, the usual parameter type adjustments apply. In particular, top-level cv-qualifiers are removed and array types are adjusted to pointers: `tagged_tuple<tag::in(const int* const), tag::out(int[])>` is `ranges::tagged<std::tuple<const int*, int*>, tag::in, tag::out>`.

### See also

|  |  |
| --- | --- |
| TaggedType | specifies that a type represents a tag specifier and its element type (concept) |
| tagged | augument a tuple-like type with named accessors (class template) |
| tagged_pair | alias template for a tagged `std::pair` (alias template) |
| make_tagged_pair | convenience function for creating a `tagged_pair` (function template) |
| make_tagged_tuple | convenience function for creating a `tagged_tuple` (function template) |
| in, in1, in2, out, out1, out2, fun, min, max, begin, end | tag specifiers for use with `ranges::tagged` (class) |
