# std::experimental::ranges::TagSpecifier

| Defined in header `<experimental/ranges/utility>` |  |
| --- | --- |
| `template< class T > concept bool TagSpecifier = /* implementation-defined */;` | (ranges TS) |

The concept `TagSpecifier<T>` is satisfied if and only if `T` is a tag specifier for use with `ranges::tagged`.

The Ranges TS provides a set of tag specifiers in `<experimental/ranges/algorithm>`. Users cannot define their own tag specifiers.

### See also

|  |  |
| --- | --- |
| tagged | augument a tuple-like type with named accessors (class template) |
| in, in1, in2, out, out1, out2, fun, min, max, begin, end | tag specifiers for use with `ranges::tagged` (class) |
