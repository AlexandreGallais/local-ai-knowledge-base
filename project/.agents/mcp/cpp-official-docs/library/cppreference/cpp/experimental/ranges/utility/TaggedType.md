# std::experimental::ranges::TaggedType

| Defined in header `<experimental/ranges/utility>` |  |
| --- | --- |
| `template< class T > concept bool TaggedType = /* implementation-defined */;` | (ranges TS) |

The concept `TaggedType<T>` is satisfied if and only if `T` is a unary function type of the form `R(A)`, where `R` is a `TagSpecifier`.

Such types are used with the convenience alias templates `tagged_tuple` and `tagged_pair`.

### See also

|  |  |
| --- | --- |
| tagged_tuple | alias template for a tagged `std::tuple` (alias template) |
| tagged_pair | alias template for a tagged `std::pair` (alias template) |
| in, in1, in2, out, out1, out2, fun, min, max, begin, end | tag specifiers for use with `ranges::tagged` (class) |
