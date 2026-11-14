# std::experimental::ranges::tagged_pair

| Defined in header `<experimental/ranges/utility>` |  |
| --- | --- |
| `template< TaggedType T1, TaggedType T2 > using tagged_pair = /* see below */;` | (ranges TS) |

Convenience alias template for naming a `ranges::tagged` wrapping a `std::pair`.

A `TaggedType` is a function type `S(T)`, where `S` is a `TagSpecifier` and `T` is the type of the element.

`tagged_pair<S1(T1), S2(T2)>` is an alias for `ranges::tagged<std::pair<T1, T2>, S1, S2>`.

### Notes

Because a function type is used to "glue" the tag specifier and the corresponding element type together, the usual parameter type adjustments apply. In particular, top-level cv-qualifiers are removed and array types are adjusted to pointers: `tagged_pair<tag::in(const int* const), tag::out(int[])>` is `ranges::tagged<std::pair<const int*, int*>, tag::in, tag::out>`.

### See also

|  |  |
| --- | --- |
| TaggedType | specifies that a type represents a tag specifier and its element type (concept) |
| tagged | augument a tuple-like type with named accessors (class template) |
| make_tagged_pair | convenience function for creating a `tagged_pair` (function template) |
| tagged_tuple | alias template for a tagged `std::tuple` (alias template) |
| make_tagged_tuple | convenience function for creating a `tagged_tuple` (function template) |
| in, in1, in2, out, out1, out2, fun, min, max, begin, end | tag specifiers for use with `ranges::tagged` (class) |
